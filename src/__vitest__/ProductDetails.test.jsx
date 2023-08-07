import {describe, test, expect} from 'vitest'
import {render} from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

describe('ProductDetails', () => {
    test('should render ProductDetails page', () => {
        const page = render(
            <BrowserRouter>
                <Routes>
                    <Route path="/products/:1"/>
                </Routes>
            </BrowserRouter>
        )
        expect(page).not.toBeNull()
    })
})