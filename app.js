const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.use(express.static('public'))


app.listen(process.env.PORT || 3030, () => {
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

/* FOOTER ALL */
app.get('/footer/nosotros', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/nosotros-QuienesSomos.html'));
});

app.get('/footer/informacion/politicasPrivacidad', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/informacion/politicas-privacidad.html'));
});
app.get('/footer/informacion/terminosCondiciones', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/informacion/terminos-condiciones.html'));
});
app.get('/footer/informacion/puntosEntrega', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/informacion/puntos-entrega.html'));
});

app.get('/footer/ayuda/comoComprar', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/ayuda/comoComprar.html'));
});
app.get('/footer/ayuda/preguntasFrecuentes', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/ayuda/preguntasFrecuentes.html'));
});
app.get('/footer/ayuda/metodosDePago', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/ayuda/metodosDePago.html'));
});

app.get('/footer/defensaDelConsumidor/reclamosIngresarAqui', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/defensaDelConsumidor/reclamosIngresarAqui.html'));
});
app.get('/footer/defensaDelConsumidor/botonDeArrepentimiento', (req, res) => {
    res.sendFile(path.resolve('./view/footer-all/defensaDelConsumidor/botonDeArrepentimiento.html'));
});

