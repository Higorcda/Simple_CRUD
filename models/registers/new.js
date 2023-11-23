

const mysql_database = require('./../../database/mysql_database.js');

function new_register(people, callback) 
{

    mysql_database.then( (mysql) => 
    {

        mysql.query(`insert into registers (name, email, age, sex) values (?, ?, ?, ?)`, [people.name, people.email, people.age, people.sex], (mysql_database_query_error, results, fields) => 
        {

            if (mysql_database_query_error) 
            {
            
                callback({ status: false, failure_type: 'mysql_database_query', error: 'Falha no processo de inserção dos dados' });

                return;

            }

            callback({ status: true, failure_type: null, error: null });

        });

    }).catch( (error) => 
    {

        callback({ status: false, failure_type: 'mysql_database_connection', error: error });

    });

}

module.exports = new_register;