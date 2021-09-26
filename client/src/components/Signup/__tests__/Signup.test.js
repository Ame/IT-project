import { required, validEmail, vpassword } from '../Signup'

test('required function returns warning message if nothing is inputted', () => {
  expect(required()).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
})

test("required function is undefined if there is input, as it is valid", () => {
  expect(required("hello")).toBeUndefined();
});

test("validEmail function displays warning message when email that is a string of letters/numbers is entered", () => {
  expect(validEmail("hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
})

test("validEmail function displays warning message when string of alphanumeric characters containing .com is entered", () => {
  expect(validEmail("hello.com")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
});

test("validEmail function displays warning message when string of alphanumeric characters containing the @ symbol is entered", () => {
  expect(validEmail("hello123@hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This is not a valid email.
    </div>
  );
});

test("validEmail function returns undefined when valid email is entered, with .com as suffix", () => {
  expect(validEmail("hello123@hello.com")).toBeUndefined();
});

test("validEmail returns undefined when valid email is entered, with .org as suffix", () => {
  expect(validEmail("hello123@hello.org")).toBeUndefined();
});

test("vpassword function returns warning when password of less than 6 characters is entered, is invalid", () => {
  expect(vpassword("hello")).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      The password must be between 6 and 40 characters.
    </div>
  );
})

test("vpassword function returns undefined when password of greater than 6 characters is entered, as it is valid", () => {
  expect(vpassword("hello123")).toBeUndefined();
});
