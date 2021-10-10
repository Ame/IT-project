import {render,screen,fireEvent} from '@testing-library/react'
import Contacts from "../Contacts"
import { BrowserRouter } from 'react-router-dom';
import AuthService from "../../../services/auth.service"


describe('Test all contact functionality', () => {
  render(
  <BrowserRouter>
    <Contacts/>
  </BrowserRouter>)
  it('List of contacts is rendered', () => {
    const list = screen.getAllByRole('list')
    console.log(AuthService.getCurrentUser());
    expect(list.length > 0).toBe(true);
  })
})