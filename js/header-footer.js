const ingresar = document.querySelector(".ingresar");
const logueado = document.querySelector(".logueado");
const loggedUser = document.getElementById("logged-user1");
const modalContent = document.getElementById("modal-body");



/* Variables App*/

let estado_sanitizante, base_co2, base_ozono, base_minutos, estado_detener,
  detener_por_co2, detener_por_ozono, detener_por_minutos, estado_extractor;

/* Variables Disp*/
let co2, ozono_liberado, minutos_encendido, monoxido, gas_natural, temperatura, ozono;

let flag; // No sé para qué se usa

const divAutomatizacionCo2 = document.querySelector('.automatizacion_co2');
// const limiteCO2 = document.getElementById('limite_co2');

const divAutomatizacionOzono = document.querySelector('.automatizacion_ozono');
const barraOzono = document.getElementById('barra_ozono');
const limiteOzono = document.getElementById('limite_ozono');

const divAutomatizacionMinutos = document.querySelector('.automatizacion_minutos');
// const limiteMinutos = document.getElementById('limite_minutos');

const inputCO2 = document.getElementById('base_co2');
const inputOzono = document.getElementById('base_ozono');
const inputMinutos = document.getElementById('base_minutos');


/* Configuraciones */
const divAguja = document.querySelector('.aguja');
const cbActivar = document.getElementById('check-config');

const divDetenerCuando = document.querySelector('.detener_cuando');
const inputDetenerPorCO2 = document.getElementById('detener_por_co2');
const divTextCO2 = document.getElementById('tb-CO2');
const inputBaseCO2 = document.getElementById('base_co2');
const inputDetenerPorOzono = document.getElementById('detener_por_ozono');
const divTextOzono = document.getElementById('tb-ozono');
const inputBaseOzono = document.getElementById('base_ozono');
const inputDetenerPorMinutos = document.getElementById('detener_por_minutos');
const divTextMinutos = document.getElementById('tb-minutos');
const inputBaseMinutos = document.getElementById('base_minutos');




let btnPower;
// let btnPower = document.getElementById('btn_power');





const firebaseConfig = {
  apiKey: "AIzaSyD-vYQZydNHc1uzqoEPBwdUNOh8jtI-K1s",
  authDomain: "kozapp-8529c.firebaseapp.com",
  databaseURL: "https://kozapp-8529c-default-rtdb.firebaseio.com",
  projectId: "kozapp-8529c",
  storageBucket: "kozapp-8529c.appspot.com",
  messagingSenderId: "254335785667",
  appId: "1:254335785667:web:dd27bad275cb2ddeb76076"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logout")
  auth.signOut().then(() => {
    console.log("signup out");

    sessionStorage.removeItem('userSave');

    location.reload();
  });
});


window.addEventListener("load", () => {
  //console.log("Funcionó el onload");
  let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));

  if (saveUserStorage) {
    ingresar.style.display = "none";
    logueado.style.display = "block";
    loggedUser.innerHTML = `<label class="logged-user">${saveUserStorage.username}</label>`;
    logueado.classList.add("loggerprint");
    modalContent.innerHTML = `
            <p>${saveUserStorage.username}</p>
            <p>${saveUserStorage.email}</p>
    `

  } else {
    ingresar.style.display = "block";
    logueado.style.display = "none";
    logueado.classList.remove("loggerprint");
    window.location.href = "../html/login.html";
  }
  //console.log(saveUserStorage);
});


/* ************************************************************* */
/*                           JS FIREBASE                         */
/* ************************************************************* */

const loginCheck = (user) => {
  if (user) {
    console.log("El usuario está logueado")
    console.log(user)


  } else {
    console.log("El usuario no está logueado")
  }
};
let refUser = null;
let refApp = null;
let refDev = null;


auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
    console.log(user);
    refUser = database.ref(user.uid + "/Username");
    refUser.on('value', (snapshot) => {
      const valor = snapshot.val();
      console.log(valor);

    });
    refApp = database.ref(user.uid + "/Application");
    refApp.on('value', (snapshot) => {
      const valor = snapshot.val();
      console.log(valor);
      var partes = valor.split("-");

      var var1 = partes[0];
      var var2 = partes[1];
      var var3 = partes[2];
      var var4 = partes[3];
      var var5 = partes[4];
      var var6 = partes[5];
      var var7 = partes[6];
      var var8 = partes[7];
      var var9 = partes[8];
      CargarDatosDeApplication(var1, var2, var3, var4, var5, var6, var7, var8, var9);

    }, (error) => {
      console.error("Error al escuchar cambios en 'Application':", error);
    });
    refDev = database.ref(user.uid + "/Device");
    refDev.on('value', (snapshot) => {
      const valor = snapshot.val();
      console.log(valor);
      var partes = valor.split("-");

      var var1 = partes[0];
      var var2 = partes[1];
      var var3 = partes[2];
      var var4 = partes[3];
      var var5 = partes[4];
      var var6 = partes[5];
      CargarDatosDelDevice(var1, var2, var3, var4, var5, var6);


    });
    // const referencia = database.ref(user.uid /*+ "/Username"*/);

    // referencia.on('value', (snapshot) => {
    //   const valor = snapshot.val();
    //   // Hacer algo con el valor leído
    //   console.log(valor);
    //   console.log(user);
    //   // debugger;
    //   loginCheck(user);

    // });

  } else {
    console.log("signout");
    //setupPosts([]);
    loginCheck(user);
    window.location.href = "../index.html";

  }
});


/* ***************************************************************************** */



const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
btnMenu.addEventListener("click", function () {
  menu.classList.toggle("mostrar");
});


const nav = document.querySelector('header')
window.addEventListener('scroll', fixNav)

function fixNav() {
  if (window.scrollY > nav.offsetHeight + 50) {
    nav.classList.add('active')
  } else {
    nav.classList.remove('active')
  }
}




/*  ********************************************** INDEX ************************************************/






function CargarDatosDeApplication(_estado_sanitizante, _base_co2, _base_ozono, _base_minutos,
  _estado_detener, _detener_por_co2, _detener_por_ozono, _detener_por_minutos, _estado_extractor) {
  estado_sanitizante = _estado_sanitizante;
  base_co2 = _base_co2;
  base_ozono = _base_ozono;
  base_minutos = _base_minutos;
  estado_detener = _estado_detener;
  detener_por_co2 = _detener_por_co2;
  detener_por_ozono = _detener_por_ozono;
  detener_por_minutos = _detener_por_minutos;
  estado_extractor = _estado_extractor;


  /********** Limite CO2 ************/
  $('#limite_co2').empty();
  var contenido = $('#limite_co2');
  var card = `<label for="valor-co2" id="limite_co2">${base_co2}</label>`
  contenido.append(card);
  /********** Limite Ozono ************/
  $('#limite_ozono').empty();
  var contenido = $('#limite_ozono');
  var card = `<label for="valor-ozono" id="limite_ozono">${base_ozono}</label>`
  contenido.append(card);
  /********** Limite Minutos ************/
  $('#limite_minutos').empty();
  var contenido = $('#limite_minutos');
  var card = `<label for="valor-minutos" id="limite_minutos">${base_minutos}:00</label>`
  contenido.append(card);



  $('.btn-activar').empty();
  var contenido = $('.btn-activar');
  if (estado_sanitizante == "Activado") {
    card = `<button type="button" class="btn btn-success" id="btn_power">Activado</button>`
  } else {
    card = `<button type="button" class="btn btn-danger" id="btn_power">Desactivado</button>`
  }
  contenido.append(card);
  btnPower = document.getElementById('btn_power');

  // Agrega el evento click al botón
  btnPower.addEventListener('click', function() {
    power();
  });

  
  if (estado_sanitizante == "Activado" && estado_detener == "1") {
    if (detener_por_co2 == "1") {
      divAutomatizacionCo2.style.display = 'block';
    }
    if (detener_por_ozono == "1") {
      barraOzono.style.display = 'block';
      limiteOzono.style.display = 'block';
    }
    if (detener_por_minutos == "1") {
      divAutomatizacionMinutos.style.display = 'block';
    }
  } else {

    divAutomatizacionCo2.style.display = 'block';

    barraOzono.style.display = 'none';
    limiteOzono.style.display = 'none';

    divAutomatizacionMinutos.style.display = 'block';
  }






  /* Configuraciones */
  /********** Limite CO2 ************/


  inputCO2.value = base_co2;
  inputOzono.value = base_ozono;
  inputMinutos.value = base_minutos;





  if (estado_detener == "1") {
    // cbActivar.setChecked(true);
    // cbActivar.setText("Activado");
    divDetenerCuando.style.display = 'block';
    inputDetenerPorCO2.style.display = 'block';
    divTextCO2.style.display = 'block';
    inputBaseCO2.style.display = 'block';
    inputDetenerPorOzono.style.display = 'block';
    divTextOzono.style.display = 'block';
    inputBaseOzono.style.display = 'block';
    inputDetenerPorMinutos.style.display = 'block';
    divTextMinutos.style.display = 'block';
    inputBaseMinutos.style.display = 'block';
  } else {
    // cbActivar.setChecked(false);
    // cbActivar.setText("Desactivado");
    divDetenerCuando.style.display = 'none';
    inputDetenerPorCO2.style.display = 'none';
    divTextCO2.style.display = 'none';
    inputBaseCO2.style.display = 'none';
    inputDetenerPorOzono.style.display = 'none';
    divTextOzono.style.display = 'none';
    inputBaseOzono.style.display = 'none';
    inputDetenerPorMinutos.style.display = 'none';
    divTextMinutos.style.display = 'none';
    inputBaseMinutos.style.display = 'none';
  }
  if (detener_por_co2 == "1") {
    inputDetenerPorCO2.checked = true;
  } else {
    inputDetenerPorCO2.checked = false;
  }
  if (detener_por_ozono == "1") {
    inputDetenerPorOzono.checked = true;
  } else {
    inputDetenerPorOzono.checked = false;
  }
  if (detener_por_minutos == "1") {
    inputDetenerPorMinutos.checked = true;
  } else {
    inputDetenerPorMinutos.checked = false;
  }

  

}





function CargarDatosDelDevice(_co2, _ozono_liberado, _minutos_encendido, _monoxido, _gas_natural, _temperatura) {
  console.log("Cargar Datos");
  co2 = _co2;
  ozono_liberado = _ozono_liberado;
  minutos_encendido = _minutos_encendido;
  monoxido = _monoxido;
  gas_natural = _gas_natural;
  temperatura = _temperatura;

  /********** CO2 ************/
  $('.text-co2').empty();
  var contenido = $('.text-co2');
  var card = `<p>${co2}</p>`
  contenido.append(card);
  /********** Monóxido ************/
  $('.valor-monoxido').empty();
  var contenido = $('.valor-monoxido');
  var card = `<p>${monoxido}</p>`
  contenido.append(card);
  /********** Gas Natural ************/
  $('.valor-gas-natural').empty();
  var contenido = $('.valor-gas-natural');
  var card = `<p>${gas_natural}</p>`
  contenido.append(card);
  /********** Temperatura ************/
  $('.valor-temperatura').empty();
  var contenido = $('.valor-temperatura');
  var card = `<p>${temperatura}</p>`
  contenido.append(card);



  /*############################## ESTO NO ESTÁ EN LA APLICACIÓN ANDROID #########################*/ 
  document.getElementById('nivel_co2').textContent = co2;
  document.getElementById('ozono_liberado').textContent = ozono_liberado;
  document.getElementById('minutos_encendido').textContent = minutos_encendido;


  /********** Rotación aguja ************/
  const rotacion = (((220 + 45) * co2) / 400) - 45;
  divAguja.style.transform = `rotate(${rotacion}deg)`;




  /* Datos de apagado automático */

  if (estado_sanitizante == "Activado" && estado_detener == "1") {
    if (detener_por_co2 == "1") {
      if (co2 <= base_co2) {
        detenerDispositivo();
      } else {
        divAutomatizacionCo2.style.display = 'block';
      }
    }
    if (detener_por_ozono == "1") {
      if (ozono_liberado >= base_ozono) {
        detenerDispositivo();
      } else {
        barraOzono.style.display = 'block';
        limiteOzono.style.display = 'block';
      }
    }
    if (detener_por_minutos == "1") {
      //if(Integer.parseInt(part_minutos_encendido)>=Integer.parseInt(base_minutos)){
      let minutoSs = minutos_encendido.toString().split(":")[0];
      if (minutoSs >= base_minutos) {
        detenerDispositivo();
      } else {
        divAutomatizacionMinutos.style.display = 'block';
      }
    }
  } else {
    // detenerReloj();

    divAutomatizacionCo2.style.display = 'block';

    barraOzono.style.display = 'none';
    limiteOzono.style.display = 'none';

    divAutomatizacionMinutos.style.display = 'block';
  }


  /********** Button esto lo saqué... no me parece que tenga que estar acá ************/
  // $('.btn-activar').empty();
  // var contenido = $('.btn-activar');
  // if (estado == "Activado") {
  //     card = `<button type="button" class="btn btn-danger" id="logout">Desactivar</button>`
  // } else {
  //     card = `<button type="button" class="btn btn-success" id="logout">Activar</button>`
  // }
  // contenido.append(card);

}

// btnPower.addEventListener("click", (e) => {
//   power();
// });


function power(){
  console.log("power")
  let mensaje = "";
  if (estado_sanitizante == "Desactivado") {
    if (estado_detener == "1" && ((detener_por_co2 == "1" && base_co2 < part_co2) ||
        (detener_por_ozono == "1") || (detener_por_minutos == "1"))) {
      mensaje += "Se purificará hasta cumplir una opción: ";
      if (detener_por_co2 == "1" && base_co2 < part_co2) {
        mensaje += "\nQue el nivel del contaminante baje hasta " + base_co2 + ".";
      }
      if (detener_por_ozono == "1") {
        mensaje += "\nHasta liberar " + base_ozono + " de ozono.";
      }
      if (detener_por_minutos == "1") {
        mensaje += "\nQue transcurran " + base_minutos + " minutos.";
      }
    } else {
      mensaje += "\nSe purificará hasta que se desactive manualmente.";
    }
    if (co2<= base_co2) {
      flag = false;
    } else {
      flag = true;
    }
    mensaje += "\n¿Estás seguro?";
    alertConfirm(mensaje,true); // no se usa el flag...
    console.log(mensaje, true);

  } else {
    mensaje += "Se detendrá la purificación. ¿Estás seguro?";
    alertConfirm(mensaje,false);
    console.log(mensaje, false);
  }

}



function detenerDispositivo() {
  // detenerReloj();

  let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));
  let datosAEnviar = '';

  datosAEnviar = "Desactivado" + "-" + base_co2 + "-" + base_ozono + "-" + base_minutos +
    "-" + estado_detener + "-" + detener_por_co2 + "-" + detener_por_ozono + "-" + detener_por_minutos +
    "-" + estado_extractor;

  console.log(datosAEnviar);
  // refApp.set(datosAEnviar)
  //       .then(() => {
  //           console.log('Datos enviados con éxito a Firebase Realtime Database');
  //       })
  //       .catch((error) => {
  //           console.error('Error al enviar datos a Firebase:', error);
  //       });

}


function alertConfirm(mensaje) {
  Swal.fire({
    // type: "success",
    title: "Purificador",
    text: mensaje,
    showConfirmButton: true,
    showCloseButton: true,
    showCancelButton: true,
    // confirmButtonColor: "#44A8C0",
    confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Activar',
    cancelButtonText:
    '<i class="fa fa-thumbs-down"></i> Cancelar',

    // imageUrl: "../img/good_luck.png",
    imageUrl: "../img/ozonizar.png",
  }).then((result) => {
    // console.log(result.value)
    if (result.value) {
      if (estado_sanitizante == "Desactivado") {
        // startStopTapped();
        // PararReloj();
        cambiarEstado("Activado");
      } else {
        // detenerReloj();
        cambiarEstado("Desactivado");
      }

    } else {
      console.log("Nada, cierra el modal")
    }
  });

}

function cambiarEstado(nuevo_estado) {

  console.log("cambiando estado a: "+nuevo_estado );
  let datosAEnviar = nuevo_estado + "-" + base_co2 + "-" + base_ozono + "-" + base_minutos +
    "-" + estado_detener + "-" + detener_por_co2 + "-" + detener_por_ozono + "-" + detener_por_minutos +
    "-" + estado_extractor;

  console.log(datosAEnviar)
  // refDev.set(datosAEnviar)
  //     .then(() => {
  //         console.log('Datos enviados con éxito a Firebase Realtime Database');
  //     })
  //     .catch((error) => {
  //         console.error('Error al enviar datos a Firebase:', error);
  //     });

}

function detenerReloj() {
  // resetTapped();
}

function resetTapped() {
  // if(timerTask != null)
  // {
  //     timerTask.cancel();
  //     time = 0.0;
  //     //minutos_encendido.setText(formatTime(0,0,0));
  //     minutos_encendido.setText(formatTime(30,59));
  // }
}

function startStopTapped() {
  // startTimer();
}

function startTimer() {
  // timerTask = new TimerTask()
  // {
  //     @Override
  //     public void run()
  //     {
  //         getActivity().runOnUiThread(new Runnable()
  //         {
  //             @Override
  //             public void run()
  //             {
  //                 time++;
  //                 minutos_encendido.setText(getTimerText());
  //             }
  //         });
  //     }

  // };
  // timer.scheduleAtFixedRate(timerTask, 0 ,1000);
}

function getTimerText() {
  // int rounded = (int) Math.round(time);

  // int seconds = ((rounded % 86400) % 3600) % 60;
  // int minutes = ((rounded % 86400) % 3600) / 60;

  // return formatTime(seconds, minutes);
}

function formatTime(seconds, minutes) {
  // return String.format("%02d",minutes) + ":" + String.format("%02d",seconds);
}
const configurationForm = document.querySelector("#save");




cbActivar.addEventListener('change', function() {
  if(cbActivar.checked){
    // cbActivar.setText("Activado");
    divDetenerCuando.style.display = 'block';
    inputDetenerPorCO2.style.display = 'block';
    divTextCO2.style.display = 'block';
    inputBaseCO2.style.display = 'block';
    inputDetenerPorOzono.style.display = 'block';
    divTextOzono.style.display = 'block';
    inputBaseOzono.style.display = 'block';
    inputDetenerPorMinutos.style.display = 'block';
    divTextMinutos.style.display = 'block';
    inputBaseMinutos.style.display = 'block';
  }else{
    // cbActivar.setText("Desactivado");
    divDetenerCuando.style.display = 'none';
    inputDetenerPorCO2.style.display = 'none';
    divTextCO2.style.display = 'none';
    inputBaseCO2.style.display = 'none';
    inputDetenerPorOzono.style.display = 'none';
    divTextOzono.style.display = 'none';
    inputBaseOzono.style.display = 'none';
    inputDetenerPorMinutos.style.display = 'none';
    divTextMinutos.style.display = 'none';
    inputBaseMinutos.style.display = 'none';
  }
});



configurationForm.addEventListener("click", (e) => {
  e.preventDefault();
  estado_detener = document.getElementById('check-config').checked;
  detener_por_co2 = document.getElementById('detener_por_co2').checked;
  base_co2 = document.getElementById('base_co2').value;
  detener_por_ozono = document.getElementById('detener_por_ozono').checked;
  base_ozono = document.getElementById('base_ozono').value;
  detener_por_minutos = document.getElementById('detener_por_minutos').checked;
  base_minutos = document.getElementById('base_minutos').value;

  // Luego puedes hacer lo que quieras con estos valores
  console.log('Nivel de Cpnfig es (Checkbox):', estado_detener);
  console.log('Nivel de CO2 es (Checkbox):', detener_por_co2);
  console.log('Nivel de CO2:', base_co2);
  console.log('Ozono liberado es (Checkbox):', detener_por_ozono);
  console.log('Ozono liberado:', base_ozono);
  console.log('Transcurren minutos (Checkbox):', detener_por_minutos);
  console.log('Minutos:', base_minutos);



  let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));
  console.log(refDev)
  console.log(saveUserStorage)

  // const refDev = database.ref(saveUserStorage.id + '/Device');

  // let datosAEnviar = '185-10-1-40-41-42';

  /*
              nuevo_estado+"-" +base_co2+"-"+base_ozono+"-"+base_minutos+
                      "-"+estado_detener+"-"+detener_por_co2+"-"+detener_por_ozono
                      +"-"+detener_por_minutos+"-"+estado_extractor)
              .addOnCompleteListener(new OnCompleteListener<Void>() {

  */
  let datosAEnviar = '';
  if (estado_detener && !detener_por_co2 && !detener_por_ozono && !detener_por_minutos) {
    console.log("Para activar la detención automática debe activar alguna opción para su detenimiento.")
  } else {
    datosAEnviar = estado_sanitizante + "-" + base_co2 + "-" + base_ozono + "-" + base_minutos +
      "-" + estado_detener + "-" + detener_por_co2 + "-" + detener_por_ozono + "-" + detener_por_minutos +
      "-" + estado_extractor;
  }

  console.log(datosAEnviar)
  // refDev.set(datosAEnviar)
  //     .then(() => {
  //         console.log('Datos enviados con éxito a Firebase Realtime Database');
  //     })
  //     .catch((error) => {
  //         console.error('Error al enviar datos a Firebase:', error);
  //     });


});







/* 


public class GalleryFragment extends Fragment {

    private GalleryViewModel galleryViewModel;
    private FragmentGalleryBinding binding;
    DatabaseReference mDatabase;

    private Button buttonExtractor;
    ProgressDialog progress;
    String estado_sanitizante, base_co2, base_ozono, base_minutos, estado_detener,
            detener_por_co2, detener_por_ozono, detener_por_minutos, estado_extractor;
    String cadena_push;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        galleryViewModel =
                new ViewModelProvider(this).get(GalleryViewModel.class);

        binding = FragmentGalleryBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        progress = ProgressDialog.show(getContext(), "Koz",
                "Iniciando...", true);
        buttonExtractor = (Button) root.findViewById(R.id.buttonExtractor);

        buttonExtractor.setOnClickListener(btnExtractor);
        mDatabase = FirebaseDatabase.getInstance().getReference();
        String token_id = UserSharePreferences.getTokenId(getContext());

        mDatabase.child(token_id).child("Application").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.exists()){
                    //String nombre = snapshot.child("S8pCz46TNANzOTUkj0Iibd17vis2").getValue().toString();
                    String nombre = snapshot.getValue().toString();
                    //textView.setText(nombre);
                    String[] partes = nombre.split("-");
                    estado_sanitizante = partes[0];
                    base_co2 = partes[1];
                    base_ozono = partes[2];
                    base_minutos = partes[3];
                    estado_detener = partes[4];
                    detener_por_co2 = partes[5];
                    detener_por_ozono = partes[6];
                    detener_por_minutos = partes[7];
                    estado_extractor = partes[8];

                    if(estado_extractor.equals("1")){
                        buttonExtractor.setText("Activado");
                        buttonExtractor.setBackgroundColor(getResources().getColor(R.color.on));
                    }else{
                        buttonExtractor.setText("Desactivado");
                        buttonExtractor.setBackgroundColor(getResources().getColor(R.color.off));
                    }
                    progress.dismiss();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });






        //final TextView textView = binding.textGallery;
        galleryViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {

                //textView.setText(s);
            }
        });
        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
    private View.OnClickListener btnExtractor = new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            String user = UserSharePreferences.getTokenId(getContext());

            if(estado_extractor.equals("1")){
                estado_extractor = "0";

            }else{
                estado_extractor = "1";
            }

            mDatabase = FirebaseDatabase.getInstance().getReference().child(user);

            //Toast.makeText(getContext(), "Deteniendo...", Toast.LENGTH_LONG).show();

            mDatabase.child("Application").setValue(
                    estado_sanitizante+"-"+base_co2+"-"+base_ozono+"-"+base_minutos+
                            "-"+estado_detener+"-"+detener_por_co2+"-"+detener_por_ozono
                            +"-"+detener_por_minutos+"-"+estado_extractor)
                    .addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {

                        }
                    });
        }
    };
}
*/