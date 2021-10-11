import { required } from '../Login'

test("required function returns warning message if nothing is inputted", () => {
  expect(required()).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
});

test("required function is undefined if there is input, as it is valid", () => {
  expect(required("hello")).toBeUndefined();
});