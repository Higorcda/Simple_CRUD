
const mysql_database = require('./../../database/mysql_database.js');

function search_registers(q, callback) 
{

    mysql_database.then( (mysql) => 
    {

        mysql.query(`select * from registers where name like '%${q}%'`, (mysql_database_query_error, results, fields) => 
        {

            if (mysql_database_query_error) 
            {
            
                callback({ status: false, failure_type: 'mysql_database_query', error: 'Não foi possível realizar a busca, uma falha ocorreu no processo de leitura dos dados requisitados' });

                return;
            
            }

            callback({ status: true, failure_type: null, error: null, registers: results });

        });

    }).catch( (error) => 
    {

        callback({ status: false, failure_type: 'mysql_database_connection', error: error });

    });

} 

module.exports = search_registers;