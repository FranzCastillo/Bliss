export function fetchProducts() {
    return [
        {
            id: 1,
            name: "Producto 1",
            price: 100,
            quantity: 1,
        },
        {
            id: 2,
            name: "Producto 2",
            price: 200,
            quantity: 2,
        },
        {
            id: 3,
            name: "Producto 3",
            price: 300,
            quantity: 3,
        }
    ]
}

export function getProductData(id){
    let productData = fetchProducts().find(product => product.id === id)
    if(productData === undefined){
        alert("No se encontró el producto")
    }
    return productData;
}