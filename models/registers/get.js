
const mysql_database = require('./../../database/mysql_database.js');

function get_registers(callback) 
{

    mysql_database.then( (mysql) => 
    {

        mysql.query('select * from registers', (mysql_database_query_error, results, fields) => 
        {

            if (mysql_database_query_error) 
            {

                callback({ status: false, failure_type: 'mysql_database_query', error: 'Falha no processo de leitura dos dados requisitados' });

                return;

            }

            callback({ status: true, failure_type: null, error: null, registers: results });

        });

    }).catch( (error) => 
    {

        callback({ status: false, failure_type: 'mysql_database_connection', error: error });

    });

}

module.exports = get_registers;