export function fetchProducts() {
    return [
        {
            id: 1,
            name: "Producto 1",
            price: 100,
            detail: "Descripción del Producto 1",
            code: "123456",
            price: 10.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            name: "Producto 2",
            price: 200,
            quantity: 2,
            detail: "Descripción del Producto 2",
            code: "123456",
            price: 15.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            name: "Producto 3",
            detail: "Descripción del Producto 3",
            code: "123456",
            price: 12.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },

        {
            id: 4,
            name: "Producto 3",
            detail: "Descripción del Producto 3",
            code: "123456",
            price: 12.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },

        {
            id: 5,
            name: "Producto 3",
            detail: "Descripción del Producto 3",
            code: "123456",
            price: 12.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },

        {
            id: 6,
            name: "Producto 3",
            detail: "Descripción del Producto 3",
            code: "123456",
            price: 12.99,
            imageUrl: "https://via.placeholder.com/300x200",
        },
    ];
}

export function getProductData(id){
    let productData = fetchProducts().find(product => product.id === id)
    if(productData === undefined){
        alert("No se encontró el producto")
    }
    return productData;
}