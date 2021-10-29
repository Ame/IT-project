import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";

import { BrowserRouter } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { ExpectationFailed } from "http-errors";

test("Test if dashboard loads correctly", async () => {
  // Login then render dashboard
  const email = "testing@test.com";
  const login = await AuthService.login(email, "test123");
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const emailHeading = screen.getByTestId("heading");
  // users email should appear on the page
  expect(emailHeading.innerHTML).toEqual("Email: " + email);
});
