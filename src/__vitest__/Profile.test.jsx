import {describe, test, expect} from 'vitest'
import {render} from '@testing-library/react'
import Profile from '../pages/Profile'
import { BrowserRouter } from 'react-router-dom'

describe('Profile', () => {
    test('should render Profile page', () => {
        const page = render(
            <BrowserRouter>
                <Profile/>
            </BrowserRouter>
        )
        expect(page).not.toBeNull()
    })
})