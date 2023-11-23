
const search_registers_model = require('./../models/registers/search.js');

global.express_router.get('/search', (request, response) => 
{

    const q = request.query.q;

    search_registers_model(q, (result) => 
    {

        if (result.status == false && result.failure_type != null && result.error != null) 
        {
                        
            request.flash('failure', result.error); response.redirect('/'); return;

        }

        response.render('index', { registers: result.registers });

    });

});