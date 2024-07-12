document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('contraseña');
    const mensajeError = document.getElementById('mensaje-error');

    const expresiones = {
        password: /^.{4,12}$/, // 4 a 12 caracteres
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };

    const validarCampo = (expresion, input) => {
        if (expresion.test(input.value)) {
            input.classList.remove('input-incorrecto');
            input.classList.add('input-correcto');
            input.nextElementSibling.style.display = 'none';
            return true;
        } else {
            input.classList.add('input-incorrecto');
            input.classList.remove('input-correcto');
            input.nextElementSibling.style.display = 'block';
            return false;
        }
    };

    const validarFormulario = (e) => {
        e.preventDefault();

        const camposCorrectos =
            validarCampo(expresiones.email, inputEmail) &&
            validarCampo(expresiones.password, inputPassword);

        if (camposCorrectos) {
            formulario.submit();
        } else {
            mensajeError.style.display = 'block';
        }
    };

    formulario.addEventListener('submit', validarFormulario);

    // Validar en tiempo real
    inputEmail.addEventListener('input', () => {
        validarCampo(expresiones.email, inputEmail);
    });

    inputPassword.addEventListener('input', () => {
        validarCampo(expresiones.password, inputPassword);
    });
});
