
const edit_register_model          = require('../../models/registers/edit.js');
const edit_register_model_instance =                   new edit_register_model();

global.express_router.get('/registers/update/:people_identifier', (request, response) => 
{

    const people_identifier = request.params.people_identifier;

    edit_register_model_instance.verify_register_existence(people_identifier, (result) => 
    {

        if (result.status == false && result.failure_type != null && result.error != null) 
        {

            request.flash('failure', result.error); response.redirect('/'); return;

        }

        var i = result.register_infos;

        i['edit_register'] = true;

        request.session.register_infos = result.register_infos;

        response.render('index', i);

    });

});

global.express_router.post('/registers/update', (request, response) => 
{

    const { name, email, age, sex } = request.body;

    const people = 
    {
        name: name, email: email, age: age, sex: sex
    };

    var errors = [];

    if (!people.name)  {   errors.push('O Campo de Nome não pode ser vazio'); }

    if (!people.email) { errors.push('O Campo de E-mail não pode ser vazio'); }

    if (!people.age)   {  errors.push('O Campo de Idade não pode ser vazio'); }

    if (errors.length > 0) 
    {

        var i = request.session.register_infos;

        i['edit_register']              =   true;
        i['edit_register_form_failure'] =   true;
        i['errors']                     = errors;

        response.render('index', i); return;

    }

    edit_register_model_instance.update_register(people, (result) => 
    {

        if (result.status == false || result.failure_type != null || result.error != null) 
        {
            
            request.flash('failure', result.error); response.redirect('/'); return;

        }

        delete request.session.register_infos;

        request.flash('success', 'Dados atualizados com sucesso'); response.redirect('/');

    });

});