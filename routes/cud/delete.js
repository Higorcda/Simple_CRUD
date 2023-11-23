
const remove_register_model = require('./../../models/registers/remove.js');

global.express_router.delete('/registers/delete/:people_identifier', (request, response) => 
{

    const remove_register_model_instance = new remove_register_model();

    const people_identifier = request.params.people_identifier;

    remove_register_model_instance.verify_register_existence(people_identifier, (result) => 
    {

        if (result.status == false && result.failure_type != null && result.error != null) 
        {

            response.json({ status: false, error: result.error }); return;

        }

        remove_register();

    });

    function remove_register() 
    {
    
        remove_register_model_instance.delete_register(people_identifier, (result) => 
        {

            if (result.status == false && result.failure_type != null && result.error != null) 
            {

                response.json({ status: false, error: result.error }); return;

            }

            response.json({ status: true, error: null });

        });
    
    }

});