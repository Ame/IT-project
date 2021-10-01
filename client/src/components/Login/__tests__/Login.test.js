import { render } from 'jade';
import { JsonWebTokenError } from 'jsonwebtoken';
import Login, { required } from '../Login'

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

test("successful login", async () => {
  render(<Login />);

  const emailField = screen.getByLabelText("Email");
  const passwordField = screen.getByLabelText("Password");
  const button = screen.getByRole("button");

  fireEvent.change(emailField, { target: { value: "test@email.com" } });
  fireEvent.change(passwordField, { target: { value: "password" } });
  fireEvent.click(button);

  // Wait for dashboard page to be rendered
  // Check the contents of the dashboard page: should display the user's name and email
});

