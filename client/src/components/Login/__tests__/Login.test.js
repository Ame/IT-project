import { required } from '../Home'

test("required function should return warning message if nothing is inputted", () => {
  expect(required()).toStrictEqual(
    <div className="alert alert-danger" role="alert">
      This field is required!
    </div>
  );
});

test("required function should be undefined if there is input", () => {
  expect(required("hello")).toBeUndefined();
});