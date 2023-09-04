
const ingresar = document.querySelector(".ingresar");
const logueado = document.querySelector(".logueado");
const loggedUser = document.getElementById("logged-user1");
const modalContent = document.getElementById("modal-body");

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
    loggedUser.innerHTML = `<label class="logged-user">${saveUserStorage.username}</label>` ;
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
      refUser = database.ref(user.uid + "/Username");
      refUser.on('value', (snapshot) => {
        const valor = snapshot.val();
        console.log(valor);
      
      });
      refApp = database.ref(user.uid + "/Application");
      refApp.on('value', (snapshot) => {
        const valor = snapshot.val();
        console.log(valor);
        var cadena = "Desactivado-184-30-5-1-1-0-0-0";
        var partes = cadena.split("-");

        var var1 = partes[0];
        var var2 = partes[1];
        var var3 = partes[2];
        var var4 = partes[3];
        var var5 = partes[4];
        var var6 = partes[5];
        var var7 = partes[6];
        var var8 = partes[7];
        var var9 = partes[8];

        // Ahora puedes acceder a las variables var1 y var2
        console.log("var1: " + var1);
        console.log("var2: " + var2);
        console.log("var3: " + var3);
        
      });
      refDev = database.ref(user.uid + "/Device");
      refDev.on('value', (snapshot) => {
        const valor = snapshot.val();
        console.log(valor);
      
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
btnMenu.addEventListener("click", function(){
    menu.classList.toggle("mostrar");
});


const nav = document.querySelector('header')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 50) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}