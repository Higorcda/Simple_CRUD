
const modals = document.querySelectorAll('.register_modal');

modals.forEach( (modal) => 
{

    modal.addEventListener('click', (event) => 
    {

        if (event.target.className.includes('register_modal_main_class') == true || event.target.className.includes('register_modal__center-top__close_modal_button') == true) 
        {
        
            modal.style.display = 'none';
        
        }

    });

});

function open_new_register_modal() 
{ 
    
    const new_register_modal = document.getElementById('new_register_modal'); new_register_modal.style.display = 'flex'; 

}