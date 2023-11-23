
const get_registers_model = require('./../models/registers/get.js');

global.express_router.get('/', (request, response) => 
{

    get_registers_model( (result) => 
    {

        if (result.status == false || result.failure_type != null && result.error != null) 
        {

            response.render('index', { failure: result.error });

        }

        response.render('index', { registers: result.registers });

    });

});