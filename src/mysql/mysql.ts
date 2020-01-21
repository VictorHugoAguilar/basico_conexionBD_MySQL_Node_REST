/* Utilizaremos el patron singleton para que sea solo una instancia */

import mysql = require('mysql');


export default class MySQL {

    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('Clase MySQL inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            port: 8889,
            password: '123456',
            database: 'node_bd',

        });

        this.conectarDB();
    }

    public static get instace() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: any) {

        this.instace.cnn.query(query, (err, results: Object[], fields) => {
            
            if(err){
                console.log("Error en query");
                console.log(err);
                return callback( err );
            }

            if(results.length === 0){
                callback('Registro solicitado no existe');
            }

            callback( null, results);
        })

        
    }


    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('DB OFFLINE');
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('DB ONLINE');
        });
    }
}

