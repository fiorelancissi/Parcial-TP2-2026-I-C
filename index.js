const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/api/usuarios", (req, res) => {
    const ruta = path.join(__dirname, "usuarios.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const usuarios = JSON.parse(contenido);
    res.json(usuarios);
});

app.post("/api/usuarios", (req, res) => {
    const { nombre, email, contrasena } = req.body;

    if (!nombre || !email || !contrasena) {
        return res.status(400).json({ error: "Faltan datos. El body debe tener nombre, email y contrasena" });
    }

    const ruta = path.join(__dirname, "usuarios.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const usuarios = JSON.parse(contenido);

    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: nombre,
        email: email,
        contrasena: contrasena
    };

    usuarios.push(nuevoUsuario);

    fs.writeFileSync(ruta, JSON.stringify(usuarios));

    res.status(201).json(nuevoUsuario);
});

app.get("/api/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    const ruta = path.join(__dirname, "usuarios.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const usuarios = JSON.parse(contenido);

    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
});

app.get("/api/productos", (req, res) => {
    const ruta = path.join(__dirname, "productos.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const productos = JSON.parse(contenido);
    res.json(productos);
});

app.post("/api/productos", (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !categoria || !precio) {
        return res.status(400).json({ error: "Faltan datos. El body debe tener nombre, categoria y precio" });
    }

    const ruta = path.join(__dirname, "productos.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const productos = JSON.parse(contenido);

    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock || 0
    };

    productos.push(nuevoProducto);

    fs.writeFileSync(ruta, JSON.stringify(productos));

    res.status(201).json(nuevoProducto);
});

app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    const ruta = path.join(__dirname, "productos.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const productos = JSON.parse(contenido);

    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

app.put("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    const ruta = path.join(__dirname, "productos.json");
    const contenido = fs.readFileSync(ruta, "utf-8");
    const productos = JSON.parse(contenido);

    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (req.body.nombre !== undefined) producto.nombre = req.body.nombre;
    if (req.body.categoria !== undefined) producto.categoria = req.body.categoria;
    if (req.body.precio !== undefined) producto.precio = req.body.precio;
    if (req.body.stock !== undefined) producto.stock = req.body.stock;

    fs.writeFileSync(ruta, JSON.stringify(productos));

    res.json(producto);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});