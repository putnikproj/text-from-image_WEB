let pickButtons = document.querySelectorAll('.type-of-upload__button');
let imageInputs = document.querySelectorAll('.input-image');
let bar = document.querySelector('.type-of-upload__bar');

for (let i = 0; i < pickButtons.length; i++) {
    pickButtons[i].addEventListener('click', function() {
        if (pickButtons[i].classList.contains('active')) {

        } else {
            pickButtons[0].classList.toggle('active');
            pickButtons[1].classList.toggle('active');

            imageInputs[0].classList.toggle('hidden');
            imageInputs[1].classList.toggle('hidden');

            if (bar.classList.contains('bar-animation')) {
                bar.classList.add('bar-reverse-animation');
                bar.classList.remove('bar-animation');
            } else {
                bar.classList.remove('bar-reverse-animation');
                bar.classList.add('bar-animation');
            }
            
            if (imageInputs[0].required) {
                imageInputs[0].required = false;
                imageInputs[1].required = true;
            } else {
                imageInputs[0].required = true;
                imageInputs[1].required = false;
            }
        }
    });
}