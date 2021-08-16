"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _path = require("path");

var _core = require("@babel/core");

function addDisplayNameInCreateClass(id, call) {
  const props = call.arguments[0].properties;
  let safe = true;

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];

    const key = _core.types.toComputedKey(prop);

    if (_core.types.isLiteral(key, {
      value: "displayName"
    })) {
      safe = false;
      break;
    }
  }

  if (safe) {
    props.unshift(_core.types.objectProperty(_core.types.identifier("displayName"), _core.types.stringLiteral(id)));
  }
}

function getDisplayNameReferenceIdentifier(path) {
  let id;
  path.find(function (path) {
    if (path.isAssignmentExpression()) {
      id = path.node.left;
    } else if (path.isObjectProperty()) {
      id = path.node.key;
    } else if (path.isVariableDeclarator()) {
      id = path.node.id;
    } else if (path.isStatement()) {
      return true;
    }

    if (id) return true;
  });
  if (!id) return;

  if (_core.types.isMemberExpression(id)) {
    id = id.property;
  }

  if (!_core.types.isIdentifier(id)) return;
  return id;
}

function isCreateContext(node) {
  let callee;
  return _core.types.isCallExpression(node) && _core.types.isMemberExpression(callee = node.callee) && _core.types.isIdentifier(callee.object, {
    name: "React"
  }) && (!callee.computed && _core.types.isIdentifier(callee.property, {
    name: "createContext"
  }) || _core.types.isStringLiteral(callee.property, {
    value: "createContext"
  }));
}

function buildDisplayNameAssignment(ref, displayName) {
  return _core.types.assignmentExpression("=", _core.types.memberExpression(_core.types.cloneNode(ref), _core.types.identifier("displayName")), _core.types.stringLiteral(displayName));
}

function addDisplayNameAfterCreateContext(id, path) {
  const {
    parentPath
  } = path;

  if (parentPath.isVariableDeclarator()) {
    const ref = parentPath.node.id;
    parentPath.parentPath.insertAfter(buildDisplayNameAssignment(ref, id));
  } else if (parentPath.isAssignmentExpression()) {
    const ref = parentPath.node.left;
    parentPath.insertAfter(buildDisplayNameAssignment(ref, id));
  } else {
    const {
      scope
    } = path;
    const ref = scope.generateUidIdentifier("ref");
    scope.push({
      id: ref
    });
    path.replaceWith(_core.types.sequenceExpression([_core.types.assignmentExpression("=", _core.types.cloneNode(ref), path.node), buildDisplayNameAssignment(ref, id), _core.types.cloneNode(ref)]));
  }
}

const createContextVisited = new WeakSet();

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);

  const isCreateClassCallExpression = _core.types.buildMatchMemberExpression("React.createClass");

  const isCreateClassAddon = callee => callee.name === "createReactClass";

  function isCreateClass(node) {
    if (!node || !_core.types.isCallExpression(node)) return false;

    if (!isCreateClassCallExpression(node.callee) && !isCreateClassAddon(node.callee)) {
      return false;
    }

    const args = node.arguments;
    if (args.length !== 1) return false;
    const first = args[0];
    if (!_core.types.isObjectExpression(first)) return false;
    return true;
  }

  return {
    name: "transform-react-display-name",
    visitor: {
      ExportDefaultDeclaration({
        node
      }, state) {
        if (isCreateClass(node.declaration)) {
          const filename = state.filename || "unknown";

          let displayName = _path.basename(filename, _path.extname(filename));

          if (displayName === "index") {
            displayName = _path.basename(_path.dirname(filename));
          }

          addDisplayNameInCreateClass(displayName, node.declaration);
        }
      },

      CallExpression(path) {
        const {
          node
        } = path;

        if (isCreateClass(node)) {
          const id = getDisplayNameReferenceIdentifier(path);

          if (id) {
            addDisplayNameInCreateClass(id.name, node);
          }
        } else if (isCreateContext(node)) {
          if (createContextVisited.has(node)) {
            return;
          }

          createContextVisited.add(node);
          const id = getDisplayNameReferenceIdentifier(path);

          if (id) {
            addDisplayNameAfterCreateContext(id.name, path);
          }
        }
      }

    }
  };
});

exports.default = _default;