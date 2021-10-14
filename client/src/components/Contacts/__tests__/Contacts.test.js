import {render,screen,fireEvent} from '@testing-library/react'
import Contacts from "../Contacts"
import { BrowserRouter } from 'react-router-dom';
import AuthService from "../../../services/auth.service"


describe('Test all contact functionality', () => {
  
  it('List of contacts is rendered', () => {
    render(
    <BrowserRouter>
      <Contacts/>
    </BrowserRouter>)
    AuthService.login("test@testing.com","test123")
    console.log(AuthService.getCurrentUser());
    const list = screen.getAllByRole('list')
    expect(list.length > 0).toBe(true);
  })


})