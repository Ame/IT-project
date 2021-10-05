import { required, validEmail, vpassword } from '../Signup'

test('required function should return warning message if nothing is inputted', () => {
  expect(required()).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
})

test("required function should be undefined if there is input", () => {
  expect(required("hello")).toBeUndefined();
});

test("String of letters entered into email will return warning message", () => {
  expect(validEmail("hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
})

test("String of letters with .com entered into email will return warning", () => {
  expect(validEmail("hello.com")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
});

test("String of letters with @ symbol will return warning", () => {
  expect(validEmail("hello@hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
});

test("Valid email returns undefined", () => {
  expect(validEmail("hello@hello.com")).toBeUndefined();
});

test("Password of less than 6 characters returns warning", () => {
  expect(vpassword("hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      The password must be between 6 and 40 characters.
    </div>
  );
})

test("Password of greater than 6 characters returns undefined", () => {
  expect(vpassword("hello123")).toBeUndefined();
});
