import { FetchProducts } from "../../fetchProducts";

test('should fetch products', async () =>{
    const CantidadDeProductosActual = 9
    const prods = await FetchProducts()
    expect(prods.length).toBe(CantidadDeProductosActual)
});