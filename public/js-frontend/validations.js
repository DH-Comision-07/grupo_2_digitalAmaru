document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('contraseña');
    const mensajeError = document.getElementById('mensaje-error');

    const expresiones = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, máximo 40 caracteres
        password: /^.{4,12}$/, // 4 a 12 caracteres
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Email válido
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

        const camposCorrectos = validarCampo(expresiones.name, inputNombre) &&
            validarCampo(expresiones.email, inputEmail) &&
            validarCampo(expresiones.password, inputPassword);

        if (camposCorrectos) {
            formulario.submit();
        } else {
            mensajeError.style.display = 'block'; // Mostrar mensaje de error
        }
    };

    formulario.addEventListener('submit', validarFormulario);

    // Validar en tiempo real
    inputNombre.addEventListener('input', () => {
        validarCampo(expresiones.name, inputNombre);
    });

    inputEmail.addEventListener('input', () => {
        validarCampo(expresiones.email, inputEmail);
    });

    inputPassword.addEventListener('input', () => {
        validarCampo(expresiones.password, inputPassword);
    });
});
