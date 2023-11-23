
const new_register_model = require('./../../models/registers/new.js');

global.express_router.post('/registers/create', (request, response) => 
{

    const { name, email, age, sex } = request.body;

    const people =
    {
        name: name, email: email, age: age, sex: sex
    };

    var errors = [];

    if (!people.name)        {   errors.push('Informe o Nome da pessoa que deseja registrar'); }

    if (!people.email)       { errors.push('Informe o E-mail da pessoa que deseja registrar'); }

    if (!people.age)         {  errors.push('Informe a Idade da pessoa que deseja registrar'); }

    if (people.sex == 'sex') {   errors.push('Informe o Sexo da pessoa que deseja registrar'); }

    if (errors.length > 0) 
    {

        response.render('index', { new_register_form_failure: true, errors: errors }); return;

    }

    new_register_model(people, (result) => 
    {

        if (result.status == false && result.failure_type != null && result.error != null) 
        {

            request.flash('failure', result.error); response.redirect('/'); return;

        }

        request.flash('success', 'Dados cadastrados com sucesso'); response.redirect('/');

    });

});