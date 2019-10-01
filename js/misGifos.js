const btnCrearGifos = document.querySelector('#btnCrearGifos');
const btnFlecha = document.querySelector('#btnFlecha');
const dropdownMisGifos = document.querySelector('#dropdownMisGifos');
dropdownMisGifos.style.display = "none";
const img11 = document.querySelector('#img11');
const imgg22 = document.querySelector('#img22');
img11.addEventListener('click', () => {
    let url = img11.getAttribute("src");
    localStorage.setItem("url", url);
    let url2 = localStorage.getItem("url");
    imgg22.setAttribute("src", url2);
})

const retrieve = () => {
    let url2 = localStorage.getItem("url");
}

function show() {
    if (dropdownMisGifos.style.display === "none") {
        dropdownMisGifos.style.display = "flex";
    } else {
        dropdownMisGifos.style.display = "none";
    }
}

btnFlecha.addEventListener('click', show);






btnCrearGifos.addEventListener('click', () => location.href = "captura.html");