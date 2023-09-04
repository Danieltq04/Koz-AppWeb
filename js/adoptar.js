import * as ServiceAdopciones from "../js/services/AdoptarService.js";

let listaAdopciones;
window.onload = () => {
    ServiceAdopciones.default().then((x) => Cargar(x));

};

function Cargar(x) {
    listaAdopciones = x;
  CargarAdopciones();
}

function CargarAdopciones() {

    console.log(listaAdopciones)
    sessionStorage.setItem('adopciones', JSON.stringify(listaAdopciones));
    var i = 0;
    var main = $('#card-adopcioens');
    listaAdopciones.forEach(adopcion => {
            var card = `
                <button class="tarjeta" data-toggle="modal" data-target="#adoptarModal" value='${i}'
                data-valor=${i}>
                    <img src=${adopcion.url_imagen} class="imagen-perdido">
                    <div class="text-bottom">
                        <p>${adopcion.nombre}</p>
                    </div>
                </button>
            `
            main.append(card);
            i++;
    })
}



$(document).on('click', '.tarjeta', function () {
    console.log(this.value)
    
    let objeto_adopcion= JSON.parse(sessionStorage.getItem("adopciones"))[this.value];
    console.log(objeto_adopcion)

    /********** AGREGO EL NOMBRE ************/ 
    $('.adoptar-title').empty();
    var contenido = $('.adoptar-title');
    var text = `
        ${objeto_adopcion.nombre}
    `;
    contenido.append(text);

    /********** AGREGO LA IMAGEN ************/ 
    $('.imagen-body').empty();
    var contenido = $('.imagen-body');
    var text = `
        <img src=${objeto_adopcion.url_imagen}>
    `;
    contenido.append(text);

    /********** AGREGO LA RAZA ************/ 
    $('.raza').empty();
    var contenido = $('.raza');
    var text = `
        <label for="autor" class="info">Raza: </label>
        <label>${objeto_adopcion.raza}</label>
    `;
    contenido.append(text);

    /********** AGREGO EL TAMAÑO ************/ 
    $('.tamanio').empty();
    var contenido = $('.tamanio');
    var text = `
        <label for="autor" class="info">Tamaño: </label>
        <label>${objeto_adopcion.tamanio}</label>
    `;
    contenido.append(text);

    /********** AGREGO EL TAMAÑO ************/ 
    $('.sexo').empty();
    var contenido = $('.sexo');
    var text = `
        <label for="autor" class="info">Sexo: </label>
        <label>${objeto_adopcion.sexo}</label>
    `;
    contenido.append(text);

    /********** AGREGO EL TELEFONO ************/ 
    $('.tel-refugio').empty();
    var contenido = $('.tel-refugio');
    var text = `
        <label for="autor" class="info">Contacto: </label>
        <label>${objeto_adopcion.telefonoRefugio}</label>
    `;
    contenido.append(text);

    /********** AGREGO EL UBICACIÓN ************/ 
    $('.ubicacion').empty();
    var contenido = $('.ubicacion');
    var text = `
        <label for="autor" class="info">Ubicación: </label>
        <label>${objeto_adopcion.ubicacionRefugio}</label>
    `;
    contenido.append(text);

    /********** AGREGO LA DESCRIPCIÓN ************/ 
    $('.adoptar-footer').empty();
    var contenido = $('.adoptar-footer');
    var text = `
        <label for="autor" class="info">Descripción: </label>
        <label>${objeto_adopcion.descripción}</label>
    `;
    contenido.append(text);
    /*
    $('.modal-img').empty();
    var contenido = $('.modal-img');
    var text = `<div class="div-imagen"
    style=" background-image: url('${objeto_libro.imagen}');"
    ></div>`;
    contenido.append(text);

    $('.autor-libro').empty();
    var contenido = $('.autor-libro');
    var text = `<label for="autor" id="resp">${objeto_libro.autor}</label>`;
    contenido.append(text);

    $('.isbn-libro').empty();
    var contenido = $('.isbn-libro');
    var text = `<label for="isbn" id="resp">${objeto_libro.isbn}</label>`;
    contenido.append(text);

    $('.editorial-libro').empty();
    var contenido = $('.editorial-libro');
    var text = `<label for="editorial" id="resp">${objeto_libro.editorial}</label>`;
    contenido.append(text);

    $('.edicion-libro').empty();
    var contenido = $('.edicion-libro');
    var text = `<label for="edicion" id="resp">${objeto_libro.edicion}</label>`;
    contenido.append(text);

    $('.stock-libro').empty();
    var contenido = $('.stock-libro');
    var text = `<label for="stock" id="resp">${objeto_libro.stock}</label>`;
    contenido.append(text);
    */
});
