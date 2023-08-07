import {describe, test, expect} from 'vitest'
import {render} from '@testing-library/react'
import MyOrders from '../pages/MyOrders'
import { BrowserRouter } from 'react-router-dom'

describe('MyOrders', () => {
    test('should render MyOrders page', () => {
        const page = render(
            <BrowserRouter>
                <MyOrders/>
            </BrowserRouter>
        )
        expect(page).not.toBeNull()
    })
})