
const mysql_database = require('./../../database/mysql_database.js');

class edit_register_model 
{

    verify_register_existence(people_identifier, callback) 
    {

        mysql_database.then( (mysql) => 
        {

            mysql.query(`select * from registers where database_identifier = ?`, people_identifier, (mysql_database_query_error, results, fields) => 
            {

                if (mysql_database_query_error) 
                {
                    
                    callback({ status: false, failure_type: 'mysql_database_query_error', error: `Falha no processo de verificação do ID do registro (${people_identifier})` });

                    return;

                }

                if (!results[0]) 
                {

                    callback({ status: false, failure_type: 'no_register', error: `ID (${people_identifier}) inválido, você está tentando atualizar um registro inexistente` });

                    return;

                }

                callback({ status: true, failure_type: null, error: null, register_infos: results[0] });

            });

        }).catch( (error) => 
        {

            callback({ status: false, failure_type: 'mysql_database_connection', error: error });

        });

    }

    update_register(people, callback) 
    {

        mysql_database.then( (mysql) => 
        {

            mysql.query(`update registers set name = ?, email = ?, age = ?, sex = ?`, [people.name, people.email, people.age, people.sex], (mysql_database_query_error, results, fields) => 
            {

                if (mysql_database_query_error) 
                {
                    
                    callback({ status: false, failure_type: 'mysql_database_query', error: 'Falha no processo de atualização dos dados' });

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

module.exports = edit_register_model;