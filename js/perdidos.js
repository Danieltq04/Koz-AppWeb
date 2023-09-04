import * as ServiceAlquiler from "../js/services/VolanteService.js";

let listaVolantes;
window.onload = () => {
    //CargarVolantes();
    CargarVolantesInicio();
};

window.addEventListener("load", () => {
    //console.log("Funcionó el onload");
    let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));
  
    if (saveUserStorage) {
        var main = $('.agregar-volante');
        var card = `
        <button type="button" class="btn" id="agregar">Agregar volante</button>
        `
        main.append(card);
        document.querySelector("#agregar").addEventListener("click",()=>{
            window.location.href = "./volante.html";
        })
    } 

    
});



function CargarVolantesInicio() {
  ServiceAlquiler.default().then((x) => Cargar(x));
}
function Cargar(x) {
  listaVolantes = x;
  CargarVolantes();
}



$(document).ready(function(){

	$('.btn-filtro').click(function(){
        // OCULTANDO PRODUCTOS =========================
        // $('.cartel').css('transform', 'scale(0)');
        // function hideProduct(){
        //     $('.cartel').hide();
        // } setTimeout(hideProduct,400);

        // // MOSTRANDO PRODUCTOS =========================
        // function showProduct(){
        //     $('.cartel').show();
        //     $('.cartel').css('transform', 'scale(1)');
        // } setTimeout(showProduct,400);

        function aaa(){
            console.log("a")
        }

	});

});



let select_ubicacion = document.getElementById("select-ubicacion");
let tipo_seleccionado = "";


select_ubicacion.addEventListener("click",(e)=>{
    $('#carteles').empty();
    CargarVolantes(tipo_seleccionado,(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value) 
})
/*
document.querySelector("#btn-perro").addEventListener("click",()=>{
    // setTimeout(hideProduct,400)
    // $('#carteles').empty();
    console.log("asadas")
    $('.cartel').css('transform', 'scale(0)');
        function hideProduct(){
            $('.cartel').hide();
        } 
        setTimeout(hideProduct,400);
        //$('#carteles').empty();
        // MOSTRANDO PRODUCTOS =========================
        function showProduct(){
            $('.cartel').show();
            $('.cartel').css('transform', 'scale(1)');
        } setTimeout(showProduct,400);

})*/
/*
function hideProduct(){
    $('.cartel').hide();
    $('#carteles').empty();

}
function showProduct(){
    $('.cartel').show();
    $('.cartel').css('transform', 'scale(1)');
} */

document.getElementById("btn-todo").addEventListener("click",()=>{
    // $('.cartel').css('transform', 'scale(0)');
    // setTimeout(()=>{
    //     $('.cartel').hide()
    //     $('#carteles').empty()
    //     $('.cartel').css('display', 'none');

    // },400);
    

    // setTimeout(()=>{
    //     $('.cartel').css('transform', 'scale(1)');
    //     tipo_seleccionado = ""
    //     CargarVolantes("",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)

    //     $('.cartel').show();
    //     $('.cartel').css('display', 'block');

    // },400);
    //$('#carteles').empty();
    /*

    $('.cartel').css('transform', 'scale(0)');
        function hideProduct(){
            $('.cartel').hide();
            $('#carteles').empty();
        } 
        setTimeout(hideProduct,400);
        //
        

        // MOSTRANDO PRODUCTOS =========================
        function showProduct(){

            tipo_seleccionado = ""
            CargarVolantes("",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
            
            $('.cartel').show();
            $('.cartel').css('transform', 'scale(1)');
        
        } setTimeout(showProduct,400);
        */
        tipo_seleccionado = ""
        CargarVolantes("",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)

})
document.getElementById("btn-perro").addEventListener("click",()=>{
    /*$('.cartel').css('transform', 'scale(0)');
        function hideProduct(){
            $('.cartel').hide();
            $('#carteles').empty();
        } 
        setTimeout(hideProduct,400);
        //
        

        // MOSTRANDO PRODUCTOS =========================
        function showProduct(){
            tipo_seleccionado = "Perro"
            CargarVolantes("Perro",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
            $('.cartel').show();
            $('.cartel').css('transform', 'scale(1)');
        
        } setTimeout(showProduct,400);
        */

        $('#carteles').empty();
        tipo_seleccionado = "Perro"
        CargarVolantes("Perro",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)

})
document.getElementById("btn-gato").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = "Gato"
    CargarVolantes("Gato",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)

})
document.getElementById("btn-otro").addEventListener("click",()=>{
    $('#carteles').empty();
    tipo_seleccionado = "Otro"
    CargarVolantes("Otro",(select_ubicacion.value == "Cualquier ubicación")?"":select_ubicacion.value)
})
function CargarVolantes(tipoAnimal,ubicacion) {

    var i = 0;
    var main = $('#carteles');
    listaVolantes.forEach(volante => {
        /*console.log(i)
        console.log(volante)*/
        //if(!tipoAnimal || tipoAnimal && volante.tipoMascota == tipoAnimal){
            
        
        if(
            (!tipoAnimal && !ubicacion) ||
            (!tipoAnimal && ubicacion && ubicacion == volante.ubicacion) ||
            (!ubicacion && tipoAnimal && tipoAnimal == volante.tipoAnimal) ||
            (ubicacion && ubicacion == volante.ubicacion && tipoAnimal && tipoAnimal == volante.tipoAnimal) 
            ){
            var card = `
            <article class="cartel">
                    <header id="cartel${i}">
                        <h4>SE BUSCA</h4>
                    </header>
                    <main class="contenido-cartel">
                        <img src="${volante.url_imagen}" class="imagen-cartel" alt="Perro">
                        <div class="contenido">
                            <p>
                            ${volante.descripción}
                            </p>
                        </div>
                    </main>
                    <footer>
                        <div class="ubicacion">
                            <img src="../img/perdidos/zona.png" alt="zona" id="zona">
                            <p>${volante.ubicacion}</p>
                        </div>
                        <div class="contacto">
                            <img src="../img/perdidos/whatsapp.png" alt="whatsapp" id="whatsapp">
                            <p>(+549) ${volante.telefono}</p>
                        </div>
                    </footer>
                </article>
            `
            main.append(card);
            i++;
        }
        /*
        var main2 = $('#cartel'+i);
        if(JSON.parse(sessionStorage.getItem("userSave"))){
            if(JSON.parse(sessionStorage.getItem("userSave")).id == volante.idUsuario){
                console.log("Lo tiene")
                var card2 = `
                    <p id="cruz">X</p>
                `
            }
        }
        main2.append(card2);*/
    })
    $('#resultados').empty();
    if(i){
        document.getElementById("resultados").innerHTML = "Resultados encontrados: "+i;
    }
    else{
        document.getElementById("resultados").innerHTML = "No hay resultados que mostrar";
    }
    console.log(i)
}
