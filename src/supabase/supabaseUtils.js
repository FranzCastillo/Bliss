import {supabase} from "../supabase/client";

// Get all categories from the database
export async function getCategories() {
    const {data, error} = await supabase.from("categorias").select("id, categoria");

    if (error) {
        console.error("Error fetching categories:", error.message);
        return [];
    } else {
        return data.map((item) => ({id: item.id, categoria: item.categoria}));
    }
}

// Get the security level of a user
export async function getUserSecurityLevel(email) {
    const {data, error} = await supabase
        .from("usuarios")
        .select("rol_id")
        .eq("email", email);

    if (data) {
        return data[0].rol_id;
    } else {
        console.log(error);
        return null;
    }
}

// Authenticate a user with email and password
export async function signInWithEmailAndPassword(email, password) {
    return supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
}

// Get user data by user email
export async function getUserDataByEmail(email) {
    return supabase.from("usuarios").select("id").eq("email", email);
}

// Get cart data by user id
export async function getCartDataByUserId(userId) {
    return supabase
        .from("productos_en_carrito")
        .select("producto_id, cantidad, talla")
        .eq("usuario_id", userId);
}

// Sign up a new user
export async function signUpUser(firstName, lastName, email, phone, address, password) {
    try {
        const {user, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            return {error: error.message};
        }

        await supabase
            .from("usuarios")
            .insert({
                nombre: firstName,
                apellido: lastName,
                email: email,
                direccion: address,
                telefono: phone,
            });

        return {user};

    } catch (error) {
        return {error: error.message};
    }
}

// Get user id by user session
export async function getUserId(){
    const session = supabase.auth.getSession();
    const email = (await session).data.session.user.email;
    const {data, error} = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email);

    if (error) {
        console.error("Error fetching user id:", error.message);
        return null;
    } else {
        return data[0].id;
    }
}