
const mysql_database = require('./../../database/mysql_database.js');

class remove_register_model 
{

    verify_register_existence(people_identifier, callback) 
    {

        mysql_database.then( (mysql) => 
        {

            mysql.query(`select * from registers where database_identifier = ?`, people_identifier, (mysql_database_query_error, results, fields) => 
            {

                if (mysql_database_query_error) 
                {

                    callback({ status: false, failure_type: 'mysql_database_query', error: `Falha no processo de verificação do ID do registro (${people_identifier})` });

                    return;

                }

                if (!results[0]) 
                {

                    callback({ status: false, failure_type: 'no_register', error: `ID (${people_identifier}) inválido, você está tentando deletar um registro inexistente` });

                    return;

                }

                callback({ status: true, failure_type: null, error: null });

            });

        }).catch( (error) => 
        {

            callback({ status: false, failure_type: 'mysql_database_connection', error: error });

        });

    }

    delete_register(people_identifier, callback) 
    {

        mysql_database.then( (mysql) => 
        {

            mysql.query(`delete from registers where database_identifier = ?`, people_identifier, (mysql_database_query_error, results, fields) => 
            {

                if (mysql_database_query_error) 
                {
                
                    callback({ status: false, failure_type: 'mysql_database_query', error: 'Falha no processo de remoção dos dados' });

                    return;
                
                }

                callback({ status: true, failure_type: null, error: null });

            });

        }).catch( (error) => 
        {

            callback({ status: false, failure_type: 'mysql_database_connection', error: error });

        });

    }

}

module.exports = remove_register_model;