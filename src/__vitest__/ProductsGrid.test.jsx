import {describe, test, expect} from 'vitest'
import {render, waitFor} from '@testing-library/react'
import ProductsGrid from '../pages/ProductsGrid'
import { BrowserRouter } from 'react-router-dom'
import { FetchProducts } from '../fetchProducts'

describe('ProductsGrid', () => {
    test('should render ProductsGrid page', async () => {
        const products = await FetchProducts()
        const page = render(
            <BrowserRouter>
                <ProductsGrid products={products}/>
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(page).not.toBeNull()
        })     
    })
})