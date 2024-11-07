const app = require('./app');

app.listen(get.app, () => {
    console.log("servidor escuchando en el puerto", app.get('port'));
});