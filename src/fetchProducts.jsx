import {supabase} from './supabase/client.js';

export async function FetchProducts() {
    try {
        const {data: productData, error} = await supabase.rpc('getproducts');
        if (error) {
            console.error('Error fetching product data:', error);
            return [];
        }

        const {data: productSizes, error: sizeError} = await supabase
            .from("disponibilidad_de_producto")
            .select("producto_id, talla");
        if (sizeError) {
            console.error('Error fetching product sizes:', sizeError);
            return [];
        }

        const {data: productAvailability, error: availabilityError} = await supabase
            .from("disponibilidad_de_producto")
            .select("producto_id, talla, cantidad");
        if (sizeError) {
            console.error('Error fetching product availability:', availabilityError);
            return [];
        }

        const grupos = {};
        productSizes.forEach((dato) => {
            const {producto_id, talla} = dato;
            if (!grupos[producto_id]) {
                grupos[producto_id] = [talla];
            } else {
                grupos[producto_id].push(talla);
            }
        });

        const grupos2 = {};
        productAvailability.forEach((dato) => {
            const {producto_id, talla, cantidad} = dato;
            const arr = [];
            arr.push(talla);
            arr.push(cantidad);

            if (!grupos2[producto_id]) {
                grupos2[producto_id] = [arr];
            } else {
                grupos2[producto_id].push(arr);
            }
        });

        const tallas = Object.values(grupos);
        const disponibilidad = Object.values(grupos2);

        console.log(tallas[0])

        const products = productData.map((dato) => ({
            id: dato.id,
            categoryId: dato.categoria_id,
            name: dato.nombre,
            detail: dato.descripcion,
            code: dato.codigo,
            price: dato.precio,
            imageUrl: dato.imagen,
            sizes: tallas.shift() || [],
            availability: disponibilidad.shift() || [],
        }));
        return products;
    } catch (error) {
        console.error('Error in FetchProducts:', error);
        return [];
    }
}

export async function getProductData(id) {
    const products = await FetchProducts();
    let productData = products.find((product) => product.id === id);
    if (productData === undefined) {
        alert("No se encontró el producto");
    }
    return productData;
}
