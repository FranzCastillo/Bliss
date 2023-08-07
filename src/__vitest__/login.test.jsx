import {describe, test, expect} from 'vitest'
import {render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/login'
import { BrowserRouter } from 'react-router-dom'
describe('login', () => {
    test('should render login page', () => {
        const page = render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        )
        expect(page).not.toBeNull
    })
    test('should throw error when field is not provided', async () => {
        const {getByText, getByRole} = render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        )
        await getByRole('button').click()
        await waitFor(() => {
            expect(getByText('*Email and password are required')).toBeInTheDocument
        })
    })
    test('should throw error when credentials are not valid', async () => {
        const {getByText, getByRole, getByLabelText} = render(
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        )
        const emailField = getByRole('textbox', { name: /email/i })
        const passwordField = getByLabelText(/Password/i)
        await userEvent.type(emailField, 'test@gmail.com')
        await userEvent.type(passwordField, 'test')
        await getByRole('button').click()
        await waitFor(() => {
            expect(getByText('*Invalid login credentials')).toBeInTheDocument
        })
    })
})