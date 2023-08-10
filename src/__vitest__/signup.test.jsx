import {describe, test, expect} from 'vitest'
import {render, waitFor} from '@testing-library/react'
import Signup from '../pages/signup'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { supabase } from '../supabase/client'
describe('signup', () => {
    test('should render signup page', () => {
        const page = render(
            <BrowserRouter>
                <Signup/>
            </BrowserRouter>
        )
        expect(page).not.toBeNull
    })
    test('should throw error when password is not provided', async () => {
        const {getByText, getByRole} = render(
            <BrowserRouter>
                <Signup/>
            </BrowserRouter>
        )
        await getByRole('button').click()
        await waitFor(() => {
            expect(getByText('*Signup requires a valid password')).toBeInTheDocument
        })
    })
    test('should create user when credentials are valid', async () => {
        const {getByRole, getByLabelText, getByText} = render(
            <BrowserRouter>
                <Signup/>
            </BrowserRouter>
        )
        const firstNameField = getByRole('textbox', { name: /First Name/i })
        const lastNameField = getByRole('textbox', { name: /Last Name/i })
        const emailField = getByRole('textbox', { name: /Email Address/i })
        const phoneField = getByRole('textbox', { name: /Phone number/i })
        const addressField = getByRole('textbox', { name: "Address" })
        const passwordField = getByLabelText(/Password/i)
        await userEvent.type(firstNameField, 'Test')
        await userEvent.type(lastNameField, 'User')
        await userEvent.type(emailField, 'TestUser@gmail.com')
        await userEvent.type(phoneField, '1234567890')
        await userEvent.type(addressField, 'Test Address')
        await userEvent.type(passwordField, '123456')
        await getByRole('button').click()
        let err = null
        try {
            await waitFor(() => {     
                  
                getByText('*User already registered')
            }).then(async () => {
                await supabase
                    .from('usuarios')
                    .delete()
                    .eq('email', 'TestUser@gmail.com')
            })
        } catch (error) {
            err = error
        }
        if (err===null){
            throw new Error('User already registered, to perform this test please delete the user \"TestUser@gmail.com\" from the database')
        }
        expect(err).not.equal(null)

    })
    test('should throw error when user is already registered', async () => {
        const {getByRole, getByLabelText, getByText} = render(
            <BrowserRouter>
                <Signup/>
            </BrowserRouter>
        )
        const firstNameField = getByRole('textbox', { name: /First Name/i })
        const lastNameField = getByRole('textbox', { name: /Last Name/i })
        const emailField = getByRole('textbox', { name: /Email Address/i })
        const phoneField = getByRole('textbox', { name: /Phone number/i })
        const addressField = getByRole('textbox', { name: "Address" })
        const passwordField = getByLabelText(/Password/i)
        await userEvent.type(firstNameField, 'Test')
        await userEvent.type(lastNameField, 'User')
        await userEvent.type(emailField, 'TestUser@gmail.com')
        await userEvent.type(phoneField, '1234567890')
        await userEvent.type(addressField, 'Test Address')
        await userEvent.type(passwordField, '123456')
        await getByRole('button').click()
        await waitFor(() => {
            expect(getByText('*User already registered')).toBeInTheDocument
        })
    })
})