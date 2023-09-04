//let url_post = "http://localhost:8080/api/volantes";
let url_post = "https://servidor-refugio.herokuapp.com/api/volantes";

window.addEventListener("load", () => {
  //console.log("Funcionó el onload");
  let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));

  if (!saveUserStorage) {
    window.location.href = "../index.html";
  }
});

function Cargar(x) {
  console.log(x);
}

const form = document.querySelector("form");
//let url_imagen = document.getElementById("form-urlImagen").value;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log(tipo_animal)
  //console.log("Datos:" + url_imagen.value + descripcion.value + ubicacion.value + telefono.value + tipo_animal.val());
  let url_imagen = document.getElementById("form-urlImagen");
  let descripcion = document.getElementById("form-descripcion");
  let ubicacion = document.getElementById("select-form-ubicacion");
  let telefono = document.getElementById("form-telefono");
  let tipo_animal = $("input[name=gridRadios]:checked", "#form-tipo");

  let nuevo_volante = {
    idUsuario: JSON.parse(sessionStorage.getItem("userSave")).id,
    tipoAnimal: tipo_animal.val(),
    url_imagen: url_imagen.value,
    descripción: descripcion.value,
    ubicacion: ubicacion.value,
    telefono: telefono.value,
  };
  console.log(nuevo_volante);
  
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo_volante),
  };
  fetch(url_post, options)
    .then((response) => {
      console.log("Status: " + response.status);
    })
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("ERROR: " + err));
    
  Swal.fire({
    // type: "success",
    title: "El volante se agregó exitosamente",
    text: "¡Mucha suerte en tu búsqueda!",
    showConfirmButton: true,
    confirmButtonColor: "#44A8C0",
    imageUrl: "../img/good_luck.png"
  });
  form.reset()
});
