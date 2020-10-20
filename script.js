let formValidation = (function() {

    let formItems = Array.from(document.forms[0]);
    const emailInput = document.getElementById('email');

    function eventListenerSetup() {
    
        formItems.forEach(formItem => {
            if(formItem.type !== 'submit') {
                formItem.addEventListener('input', evt => inputValidation(evt.target));
            } else {
                formItem.addEventListener('click', evt => validateForm(evt));
            }
        })
    }

    function inputValidation(target) {

        /* Preventing submit-eventListener puting error-class on parent(which is <form>) */
        if(target.type !== 'submit') {
            const formSection = target.parentElement;

            if (target.value === '') {
                if(formSection.classList.contains('success')) { 
                    formSection.classList.remove('success');
                }
                formSection.classList.add('error');
                showError(formSection, false);
            } else if (target.type === 'email') {

                if(!emailInput.validity.valid) {
                    if(formSection.classList.contains('success')) { 
                        formSection.classList.remove('success');
                    }
                    formSection.classList.add('error')
                    showError(formSection, 'Email must be valid');
                } else {
                    formSection.classList.remove('error');
                    formSection.classList.add('success');
                }

            } else {
                formSection.classList.remove('error');
                formSection.classList.add('success');
            }
        }
    }

    const showError = (target, message) => target.querySelector('.error-message').textContent = !message ? 'Must be filled out' : message;

    function validateForm(evt) {

        formItems.forEach(formItem => inputValidation(formItem));

        const errors = document.querySelectorAll('.error');
        if(errors.length > 0) {
            evt.preventDefault();
        }
    }

    return {
        init: () => eventListenerSetup()
    }
})();

let menuCtrl = (function() {

    function eventListenerSetup() {

        const menuUL = document.querySelector('ul');
        const menuCheckbox = document.querySelector('input[type="checkbox"]');

        menuUL.addEventListener('click', () => {
            menuCheckbox.checked = false;
        });
    }

    return {
        init: () => eventListenerSetup()
    }
})();

formValidation.init();
menuCtrl.init();