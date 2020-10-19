let formValidation = (function() {

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit');

    function eventListenerSetup() {
    nameInput.addEventListener('input', evt => textInputValidation(evt.target));
    emailInput.addEventListener('input', evt => emailValidation(evt.target));
    messageInput.addEventListener('input', evt => textInputValidation(evt.target));
    submitBtn.addEventListener('click', evt => validateInput(evt));
    }

    function textInputValidation(target) {
        const formSection = target.parentElement;

        if (target.value === '') {
            formSection.classList = 'form-section error';
            showError(formSection, false);
        } else {
            formSection.classList = 'form-section success';
        }
    }

    function emailValidation(target) {
        const formSection = target.parentElement;

        // varför i helvete funkar inte detta!?
        // const userEmail = target.value;
        if (emailInput.value === '') {
            formSection.classList = 'form-section error';
            showError(formSection, false)
        } else if (!emailInput.validity.valid) {
            formSection.classList = 'form-section error';
            showError(formSection, 'Email must be valid');
        } else {
            formSection.classList = 'form-section success';
        }
    }

    function showError(target, message) {

        message === false ? message = 'Must be filled out' : message = message;

        const errorContainer = target.querySelector('.error-message');
        errorContainer.textContent = message;
    }

    function validateInput(evt) {
        textInputValidation(nameInput);
        textInputValidation(messageInput);
        emailValidation(emailInput);

        const errors = document.querySelectorAll('.error');
        const errorArr = Array.from(errors);
        if(errorArr.length > 0) {
            evt.preventDefault();
        }
    }

    return {
        init: () => {
            eventListenerSetup();
        }
    }
})();

let menuCtrl = (function() {
    function eventListenerSetup() {
        const menuLinks = document.querySelectorAll('li');
        const menuCheckbox = document.querySelector('input[type="checkbox"]');

        menuLinks.forEach(cur => cur.addEventListener('click', function() {
            menuCheckbox.checked = false;
        }));
    }

    return {
        init: function() {
            eventListenerSetup();
        }
    }
})();

formValidation.init();

menuCtrl.init();