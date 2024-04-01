// importar express bodyparser
const express = require('express');
const bodyParser = require('body-parser');
//inicializa
const app =express();

app.use(bodyParser.json());

//ruta de ejemplo
// app.get('/', (req, res) =>{
//     res.send("hola con nodejs");
// });
let items = ['manzana','papaya','limon'];
app.get('/', (req, res) =>{
    res.send("hola con nodejs");
});
//endpoint 1 / rutas GET
app.get('/items', (req, res) =>{
    res.status(200).json(items);
});
//endpoint 2 / rutas POST
app.post('/items', (req, res) =>{
    const fruta = req.body; 
    if (fruta) {
        items.push(fruta.item);
        // res.status(200).send(`Se agrego la fruta: ${fruta.item}`);
        res.status(200).send(`Se agrego la fruta: ${fruta.item} \n Lista: ${JSON.stringify(items)}`);
    } else {
        res.status(400).send("este item es invalido");
    }
});
//endpoint 3 / rutas PUT
// Endpoint PUT para actualizar un ítem en el arreglo
app.put('/items/:index', (req, res) => {
    const index = req.params.index;
    const nuevaFruta = req.body.item;

    if (index >= 0 && index < items.length) {
        items[index] = nuevaFruta;
        res.status(200).send(`Fruta en la posición ${index} actualizada a ${nuevaFruta}`);
    } else {
        res.status(404).send('Índice inválido');
    }
});



//endpoint 4 / rutas DELETE
// Endpoint DELETE para eliminar un ítem del arreglo
app.delete('/items/:index', (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < items.length) {
        const eliminado = items.splice(index, 1);
        res.status(200).send(`Fruta en la posición ${index} eliminada: ${eliminado}`);
    } else {
        res.status(404).send('Índice inválido');
    }
});

//escuchar en el puerto 30000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Servidor en funcionando en puerto: ${PORT}`) });