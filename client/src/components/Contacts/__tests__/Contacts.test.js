import {render,screen,fireEvent} from '@testing-library/react'
import Contacts from "../Contacts"
import { BrowserRouter } from 'react-router-dom';
import AuthService from "../../../services/auth.service"


describe('Test all contact functionality', () => {
  
  it('List of contacts is rendered', async () => {
    const login = await AuthService.login("testing@test.com","test123")
    render(
    <BrowserRouter>
      <Contacts/>
    </BrowserRouter>)
    const list = screen.getAllByRole('list')
    expect(list.length > 0).toBe(true);
  })


})