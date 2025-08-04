const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('confirmPassword');
const phoneNumber = document.getElementById('phoneNumber');

function error(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const div = input.nextElementSibling;
    div.innerText = '';
}

function checkEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(input.value.trim())) {
        success(input);
    } else {
        error(input, 'Geçerli bir email adresi giriniz.');
    }
}

function checkRequired(inputs) {
    inputs.forEach(function (input) {
        if (input.value.trim() === '') {
            error(input, `${input.id} Gerekli!`);
        } else {
            success(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır.`);
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır.`);
    } else {
        success(input);
    }
}

function checkPasswordsMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        error(pass2, 'Şifreler eşleşmiyor!');
    } else {
        success(pass2);
    }
}
function checkPhoneNumber(input) {
    const re = /^[0-9]{10,11}$/;
    if (re.test(input.value.trim())) {
        success(input);
    } else {
        error(input, 'Telefon numarası sadece 10-11 rakamdan oluşmalıdır.');
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    
    checkRequired([username, email, phoneNumber, password, repassword]);

    
    checkEmail(email);
    checkLength(username, 7, 15);
    checkLength(password, 6, 20);
    checkPasswordsMatch(password, repassword);
    checkPhoneNumber(phoneNumber);
});

