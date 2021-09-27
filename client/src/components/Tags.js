import { useState } from 'react'

// https://dev.to/prvnbist/create-a-tags-input-component-in-reactjs-ki
// https://blog.logrocket.com/building-a-tag-input-field-component-for-react/


const TagsInput = ({ sendTags }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState([]);

  const addTags = (e) => {

    const trimmedInput = input.trim();

    if (trimmedInput.length && !tags.includes(trimmedInput)) {
        e.preventDefault();
        setTags(prevstate => [...prevstate, trimmedInput]);
        sendTags(trimmedInput);
        setInput("");
    }
  };

  const removeTags = (index) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  const onChange = (e) => {
      const { value } = e.target;
      setInput(value);
  }


  return (
    <div className="tags-input">
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <button type="button" onClick={() => removeTags(index)}>x</button>
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Add tags" onChange={onChange} value={input}/>
      <button type="button" onClick={addTags}>
        Add
      </button>
    </div>
  );
};
export default TagsInput;
