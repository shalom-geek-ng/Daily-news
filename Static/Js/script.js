
// $('.navbar li a[href*="#"]:not([href="#"])').click(function (){
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//         var target = $(this.hash);
//         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//         if (target.length) {
//             $('html, body').animate({
//                 scrollTop: target.offset().top - 100
//             }, 1000);
//             return false;
//         }
//     }
// });


let body = document.querySelector("body");
let globalLanguage = "en";
let previousLanguage = globalLanguage


console.log(body.innerText)

// Selleting all elements with i18n
const elements = document.querySelectorAll("[data-i18n]");

let textArr = []
const replaceText = (el) => {
    const key = el.innerText;
    // el.innerText = translateText(el.innerText, "yo", "en")
}
elements.forEach(el => {
    textArr = [...textArr, `${el.innerText}`]
});

console.log(textArr)

function changeGlobalLanguage(lang) {
    previousLanguage = globalLanguage
    globalLanguage = lang;

    translateText(globalLanguage, previousLanguage)
}





// dYNAMICALLY TRANSLATING WITH RAPID API


function translateText(code, initialCode) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '803b715318msh2f9c02a24ad196ap186853jsn7e8d0a0df12f',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        body: `{"q": [${textArr.map((text) => '"' + text + '"')}],"source": "${initialCode}","target": "${code}"}`
    };
    
    fetch('https://deep-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            textArr = response.data.translations.translatedText

            console.log(textArr)
            textArr.forEach((text, index) => {
                elements[index].innerText = textArr[index]
            })
        })
        .catch(err => console.error(err));
}

