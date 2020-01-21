import Server from './server/server';
import router from './router/routes';
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use( router );

/** Instanciamos a MySql */
// MySQL.instace;

server.start(() => {
    console.log('Servidor corriendo en el puerto 3000')
});







