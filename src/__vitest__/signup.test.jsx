import {describe, test, expect} from 'vitest'
import {render, waitFor} from '@testing-library/react'
import Signup from '../pages/signup'
import { BrowserRouter } from 'react-router-dom'
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
})