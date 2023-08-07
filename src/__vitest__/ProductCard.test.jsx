import {describe, test, expect} from 'vitest'
import {render, waitFor} from '@testing-library/react'
import ProductCard from '../pages/ProductCard'
import { BrowserRouter } from 'react-router-dom'
import { FetchProducts } from '../fetchProducts'

describe('ProductCard', () => {
    test('should render ProductCard page', async () => {
        const products = await FetchProducts()
        const page = render(
            <BrowserRouter>
                <ProductCard product={products[1]}/>
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(page).not.toBeNull()
        })     
    })
})