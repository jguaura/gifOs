//?  Elementos seleccionados
const searchInput = document.querySelector('#inputBusqueda');
const btnInput = document.querySelector('#btnInput');
const busquedaAfter = document.querySelector('#busquedaAfter');
const btnDropdown = document.querySelector('.elegirTema');
const btnFlecha = document.querySelector('.btnFlecha');
const dropdown = document.querySelector('#dropdown');
const apiKey = "9U7DlV9VJp8CXxdm3HO6rSyXJwWkKyO8";
const seccionSugerencias = document.querySelector('#sugerencias');
const seccionTendencias = document.querySelector('#tendencias');
const btnHash = document.querySelector('.traerInput');
const btnInicio = document.querySelector('#btnInicio');
const btnRosalia = document.querySelector('#btnRosalia');
const btnSeinfeld = document.querySelector('#btnSeinfeld');
const btnAtlanta = document.querySelector('#btnAtlanta');
const btnOffice = document.querySelector('#btnTheOffice');
const btnCrearGifos = document.querySelector('#btnCrearGifos');
// const btnAlertaCancelar = document.querySelector('#btnAlertaCancelar');
// const btnAlertaComenzar = document.querySelector('#btnAlertaComenzar');
const btnMisGifos = document.querySelector('#misGifos');
const lupa = document.querySelector('#lupaImg');
const lupaComun = document.querySelector('.lupaImg');
const lupaBlanca = document.querySelector('.lupaBlanca')
const darkTheme = document.querySelector('#darkTheme');
const btnLightTheme = document.querySelector('#btnLightTheme');
const btnDarkTheme = document.querySelector('#btnDarkTheme');
let controladorBusquedaAfter = 0;
let cD = 0;
let controladorSearch = 0;

btnInput.disabled = "true";

//? Cambia los estilos de la barra de busqueda
const mostrarBusquedaAfter = () => {

    if (controladorBusquedaAfter == 0) {
        busquedaAfter.style.display = "flex";
        btnInput.classList.remove("btnInput");
        btnInput.classList.add("btnInputRosa");
        btnInput.disabled = false;
        controladorBusquedaAfter = 1;
    } else {
        busquedaAfter.style.display = "none";
        btnInput.classList.remove("btnInputRosa");
        btnInput.classList.add("btnInput")
        btnInput.disabled = true;
        controladorBusquedaAfter = 0;
    }
}



//? Muestra el menu dropdown
dropdown.style.display = "none";
const mostrarDropdown = () => {
    if (dropdown.style.display === "none") {
        dropdown.style.display = "flex";
    } else {
        dropdown.style.display = "none";
    }
}
//!Conseguir Sugerencias
const conseguirSugerencias = () => {

    const sug0 = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=La Rosalia&limit=30`;
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const gif0 = document.querySelector('#gifSugerido0');
                gif0.setAttribute("src", res.data[20].images.fixed_width.url);
            })
    }

    const sug1 = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=Seinfeld&limt=30`;
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const gif1 = document.querySelector('#gifSugerido1');
                gif1.setAttribute("src", res.data[16].images.fixed_width.url);
            })
    }

    const sug2 = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=AtlantaFX&limt=30`;
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const gif2 = document.querySelector('#gifSugerido2');
                gif2.setAttribute("src", res.data[12].images.fixed_width.url);
            })
    }

    const sug3 = () => {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=The Office&limt=30`;
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const gif3 = document.querySelector('#gifSugerido3');
                gif3.setAttribute("src", res.data[22].images.fixed_width.url);
            })
    }

    sug0();
    sug1();
    sug2();
    sug3();

}


//! Sacar el display de las secciones sugerencias y tendencias
const ocultarSecciones = () => {
    let search = document.querySelector('#resultadosBusqueda');
    if (controladorSearch === 0) {
        seccionSugerencias.style.display = "none";
        seccionTendencias.style.display = "none";
        search.style.display = "block";
        controladorSearch = 1;
    } else if (controladorSearch === 1) {
        search.style.display = 'grid';
        controladorSearch = 0;
    } else {
        seccionSugerencias.style.display = "block";
        seccionTendencias.style.display = "block";
        controladorSearch = 1;
    }
}


//! Busqueda
const busquedaGifs = () => {
    let input = document.querySelector('#inputBusqueda').value;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input}&limit=12`;
    let mayuscula = input.substring(0, 1).toUpperCase();
    let minuscula = input.substring(1);
    let inputCapitalizado = `${mayuscula}${minuscula}`;
    inputCapitalizado = inputCapitalizado.replace(/\s+/g, ''); // snippet copiado de stackoverflow
    btnHash.innerHTML = `#${inputCapitalizado}`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            let resultados = document.querySelector('#resultadosBusquedaImg');
            if (res.data.length < 12) return;
            for (i = 0; i < 12; i++) {
                let append = document.getElementById('gifs' + i);
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
    ocultarSecciones();
}

//! Tendencias
const conseguirTendencias = () => {

    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            // console.log(res);
            let resultados = document.getElementById('resultadosTendencias');
            if (res.data.length < 12) return;
            for (let i = 0; i < 12; i++) {
                let append = document.getElementById('gif' + i)
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
}

//! Lanzar busqueda al hacer click en los botones de sugeridos
const buscarRosalia = () => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=Rosalia&limit=12`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            let resultados = document.getElementById('resultadosBusquedaImg');
            if (res.data.length < 12) return;
            for (let i = 0; i < 12; i++) {
                let append = document.getElementById('gifs' + i)
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
    ocultarSecciones();
}

const buscarSeinfeld = () => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=Seinfeld&limit=12`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            let resultados = document.getElementById('resultadosBusquedaImg');
            if (res.data.length < 12) return;
            for (let i = 0; i < 12; i++) {
                let append = document.getElementById('gifs' + i)
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
    ocultarSecciones();
}

const buscarAtlanta = () => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=AtlantaFX&limit=12`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            let resultados = document.getElementById('resultadosBusquedaImg');
            if (res.data.length < 12) return;
            for (let i = 0; i < 12; i++) {
                let append = document.getElementById('gifs' + i)
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
    ocultarSecciones();
}

const buscarTheOffice = () => {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=the office&limit=12`;
    fetch(url)
        .then(data => data.json())
        .then(res => {
            let resultados = document.getElementById('resultadosBusquedaImg');
            if (res.data.length < 12) return;
            for (i = 0; i < 12; i++) {
                let append = document.getElementById('gifs' + i);
                append.setAttribute("src", res.data[i].images.fixed_width.url);
                resultados.appendChild(append);
            }
        })
    ocultarSecciones();
}

//! Eventos
conseguirSugerencias();
conseguirTendencias();

searchInput.addEventListener('click', () => {
    mostrarBusquedaAfter();
});
btnInput.addEventListener('click', mostrarBusquedaAfter);
btnInput.addEventListener('click', busquedaGifs);
searchInput.addEventListener('keyup', () => {
    if (event.keyCode == 13) {
        busquedaGifs();
        mostrarBusquedaAfter();
    }
})

btnRosalia.addEventListener('click', () => {
    buscarRosalia();
});

btnSeinfeld.addEventListener('click', () => {
    buscarSeinfeld();
})

btnAtlanta.addEventListener('click', () => {
    buscarAtlanta();
})

btnOffice.addEventListener('click', () => {
    buscarTheOffice();
})

btnHash.addEventListener('click', () => {
    let btn = document.querySelector('#btnResultado1');
    btn.style.display = "none";
})

btnFlecha.addEventListener('click', mostrarDropdown);

btnLightTheme.addEventListener('click', () => {
    darkTheme.setAttribute("href", "");
    mostrarDropdown();
})

btnDarkTheme.addEventListener('click', () => {
    darkTheme.setAttribute("href", "/css/darkTheme.css");
    mostrarDropdown();
})

btnInicio.addEventListener('click', () => location.href = "index.html");

btnCrearGifos.addEventListener('click', () => location.href = "captura.html");


//! Termina eventos