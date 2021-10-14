import { required } from '../Login'
import {render,screen,fireEvent} from '@testing-library/react'
import Login from "../Login"
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../Dashboard/Dashboard';


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

describe('Test Login: valid login, invalid login', () => {
  var login = async (password) => {
    render(
    <BrowserRouter>
      <Login/>
    </BrowserRouter>)
    const emailInput = screen.getByTitle('email');
    const passwordInput = screen.getByTitle('password');
    // fill in email and password
    fireEvent.change(emailInput,{target: {value: "testing@test.com"}});
    fireEvent.change(passwordInput,{target: {value: password}});

    const button = screen.getByTitle('submit')
    // submit inputs
    fireEvent.click(button);
      try {
        const alert = await screen.findByRole("alert")
      } catch {
        throw new Error()
      };
      return alert.innerHTML;
    }
    
  it('Valid Login',async () => {
    // throws if unvalid password
    await expect(login("test123")).rejects.toThrow();
  })

  it('Invalid Login: Wrong password', async () => {

    // fill in the form with email and wrong password

    // activate the submit button 

    // check the response from server states credentials are invalid
  })

})

