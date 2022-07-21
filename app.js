const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.use(express.static('public'))


app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
    });

    app.get('/', (req, res) => {
        res.sendFile(path.resolve('./view/home.html'));
    });

    app.get('/carrito.html', (req, res) => {
        res.sendFile(path.resolve('./view/carrito.html'));
    });

    app.get('/detalle.html', (req, res) => {
        res.sendFile(path.resolve('./view/detalle.html'));
    });

    app.get('/formulario.html', (req, res) => {
        res.sendFile(path.resolve('./view/formulario.html'));
    });

    app.get('/login.html', (req, res) => {
        res.sendFile(path.resolve('./view/login.html'));
    });