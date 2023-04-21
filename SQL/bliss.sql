CREATE TABLE categorias(
    id SERIAL PRIMARY KEY,
    precio NUMERIC NOT NULL
);

CREATE TABLE producto(
    id SERIAL PRIMARY KEY,
    categoria_id INTEGER REFERENCES categorias(id),
    nombre VARCHAR(50),
    descripcion VARCHAR(100)
);

CREATE TABLE tallas(
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES producto(id),
    talla VARCHAR(10) NOT NULL
);

CREATE TABLE disponibilidad_de_producto(
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES producto(id),
    talla_id INTEGER REFERENCES tallas(id),
    cantidad NUMERIC NOT NULL
);

CREATE TABLE roles_de_usuario(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    rol_id INTEGER REFERENCES roles_de_usuario(id)
);

CREATE TABLE carrito(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE productos_en_carrito(
    id SERIAL PRIMARY KEY,
    carrito_id INTEGER REFERENCES carrito(id),
    producto_id INTEGER REFERENCES producto(id),
    talla_id INTEGER REFERENCES tallas(id),
    cantidad NUMERIC NOT NULL
);

CREATE TABLE tipos_de_pago(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE pedidos(
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    pago_id INTEGER REFERENCES tipos_de_pago(id)
);