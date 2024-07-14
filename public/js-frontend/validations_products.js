document.addEventListener('DOMContentLoaded', () => {
    const formularioCrear = document.getElementById('formulario-crear');
    const inputName = document.getElementById('name');
    const inputDescription = document.getElementById('description');
    const inputImage = document.getElementById('image');
    const inputPrice = document.getElementById('price');

    const expresiones = {
        name: /^.{1,50}$/, // 1 a 50 caracteres
        description: /^.{10,400}$/, // Máximo 400 caracteres
        image: /^.{0,400}$/, // 1 a 400 caracteres
        price: /^[0-9]+$/ // Solo números
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

        const camposCorrectos = validarCampo(expresiones.name, inputName) &&
            validarCampo(expresiones.description, inputDescription) &&
            validarCampo(expresiones.image, inputImage) &&
            validarCampo(expresiones.price, inputPrice);

        if (camposCorrectos) {
            formularioCrear.submit();
        }
    };

    formularioCrear.addEventListener('submit', validarFormulario);

    // Validar en tiempo real
    inputName.addEventListener('input', () => {
        validarCampo(expresiones.name, inputName);
    });

    inputDescription.addEventListener('input', () => {
        validarCampo(expresiones.description, inputDescription);
    });

    inputImage.addEventListener('input', () => {
        validarCampo(expresiones.image, inputImage);
    });

    inputPrice.addEventListener('input', () => {
        validarCampo(expresiones.price, inputPrice);
    });
});
