let input = document.querySelector('.form__input-image');
let buttons = document.querySelectorAll('.type-of-upload__button');
let file = document.querySelector('.form__input-image-by-upload');
let inputs = document.querySelectorAll('.input-image');
let langOption = document.querySelectorAll('#lang option');
let form = document.querySelector('.form');
let key = 'helloworld';
let block = document.querySelector('.detected-text textarea');
let lang = '';
let text = '';
let errorBlock = document.querySelector('.error-message');
let loading = document.querySelector('.loading');
let imgBlock = document.querySelector('.image');
let urlToFile;
// chooseUploadType.js
// let bar = document.querySelector('.type-of-upload__bar') 

function recogniseTextFromImage(key, lang, file, urlOfImage) {
    let myHeaders = new Headers();
    myHeaders.append("apikey", key);

    let formdata = new FormData();
    if (inputs[0].classList.contains('hidden')) {
        formdata.append("url", file, urlOfImage);
    } else {
        formdata.append("url", urlOfImage);
    }
    formdata.append("language", lang);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch("https://api.ocr.space/parse/image", requestOptions)
        .then(response => {
            return response.json();
        });
}

function disableButtons (isDisabled) {
    buttons[0].disabled = isDisabled;
    buttons[1].disabled = isDisabled;
    if (isDisabled) {
        bar.classList.add('bar-disabled');
    } else {
        bar.classList.remove('bar-disabled');
    }
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    for (let elem = 0; elem < langOption.length; elem++) {
        if (langOption[elem].selected) {
            lang = langOption[elem].value;
        }
    }
    errorBlock.classList.add('hidden');
    disableButtons(true);
    loading.innerHTML = '<img class=\"loading__image\" src=\"img/loading.svg\" alt=\"loading\"><span class=\"loading__text\">loading...</span>';
    if (inputs[0].classList.contains('hidden')) {
        urlToFile = file.value;
    } else {
        urlToFile = input.value;
    }
    recogniseTextFromImage(key, lang, file.files[0], urlToFile)
        .then(data => {
            loading.innerHTML = '';
            
            isError = data['IsErroredOnProcessing'];
            if (isError) {
                text = data['ErrorMessage'][0];
                errorBlock.textContent = 'Error. ' + text;
                errorBlock.classList.remove('hidden');
            } else {
                text = data['ParsedResults'][0]['ParsedText'];
                block.innerHTML = text;
                if (inputs[0].classList.contains('hidden')) {
                    let reader = new FileReader();
                    reader.addEventListener('load', function () {
                        imgBlock.innerHTML = '<img class=\"uploaded-img\" src=\"'+reader.result+'\" alt=\"uploaded image\">';
                    });
                    reader.readAsDataURL(file.files[0]);
                } else {
                    imgBlock.innerHTML = '<img class=\"uploaded-img\" src=\"'+input.value+'\" alt=\"uploaded image\">';
                }
            }
            disableButtons(false);
        })
        .catch(err => {
            loading.innerHTML = '';
            errorBlock.textContent = 'Error. ' + err;
            errorBlock.classList.remove('hidden');
            disableButtons(false);
        });
});