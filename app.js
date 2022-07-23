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

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve('./view/carrito.html'));
});

app.get('/detalle', (req, res) => {
    res.sendFile(path.resolve('./view/detalle.html'));
});

app.get('/formulario', (req, res) => {
    res.sendFile(path.resolve('./view/formulario.html'));
});

/* LOGIN ALL */
app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./view/login-all/login.html'));
});
app.get('/password-lost', (req, res) => {
    res.sendFile(path.resolve('./view/login-all/password-lost.html'));
});