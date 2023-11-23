
const mysql_database = require('mysql2');

let mysql_database_connection_promise = new Promise( (resolve, reject) => 
{

    const mysql_database_connection = mysql_database.createConnection
    ({
        host     : process.env.MYSQL_DATABASE_HOST,
        port     : process.env.MYSQL_DATABASE_PORT,
        user     : process.env.MYSQL_DATABASE_USER,
        password : process.env.MYSQL_DATABASE_PASS,
        database : process.env.MYSQL_DATABASE_NAME
    });

    mysql_database_connection.connect( (mysql_database_connection_error) => 
    {

        if (mysql_database_connection_error) 
        {
        
            reject('Falha de conexão com o Banco de Dados'); return;
        
        }

        resolve(mysql_database_connection);

    });

});

module.exports = mysql_database_connection_promise;