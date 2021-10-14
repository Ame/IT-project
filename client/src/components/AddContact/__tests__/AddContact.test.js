import {render,screen,fireEvent} from '@testing-library/react'
import AddContact from "../AddContact"
import Contacts from "../../Contacts/Contacts"

import { BrowserRouter } from 'react-router-dom';
import AuthService from "../../../services/auth.service"


describe('Test you can add a contact', () => {
  render(
    <BrowserRouter>
      <AddContact/>
    </BrowserRouter>)
  const email = "test@testguy.com"
  it('Add a contact', async () => {
    const login = await AuthService.login("testing@test.com","test123")

    console.log("Curr user = " + login);
    const nameInput = screen.getByRole('name')
    const emailInput = screen.getByRole('email')
    const phoneInput = screen.getByRole('phone')
    const birthdayInput = screen.getByRole('birthday');

    fireEvent.change(nameInput,{target: {value: "test guy"}});
    fireEvent.change(emailInput,{target: {value: email}});
    fireEvent.change(phoneInput,{target: {value: "+6126998827"}});
    fireEvent.change(birthdayInput,{target: {value: "19-02-2008"}});

    const button = screen.getByTitle('submit')
    fireEvent.click(button);
  })


  it('Check a contact was added', async () => {

     // check the contact displays
     render(
      <BrowserRouter>
        <Contacts/>
      </BrowserRouter>)
      // get all emails of contacts on page
      const contacts = await screen.findAllByTitle('email');
      console.log(contacts);
      expect(contacts).toContain(email)

  })

})