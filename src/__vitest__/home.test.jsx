import {describe, test, expect} from 'vitest'
import {render} from '@testing-library/react'
import Home from '../pages/Home'
import { BrowserRouter } from 'react-router-dom'

describe('Home', () => {
    test('should render home page', () => {
        const {getByText} = render(
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        )
        expect(getByText('¿Cómo llegar?')).toBeInTheDocument()
    })
})