import { render, screen, fireEvent } from "@testing-library/react";
import Admin from "../Admin";

import { BrowserRouter } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { ExpectationFailed } from "http-errors";

test("Test if users viewed", async () => {
  const login = await AuthService.login("admin@admin.com", "adminadmin");
  render(
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  );
  const list = screen.getByRole("list");
  expect(list).toEqual(expect.anything());
});
