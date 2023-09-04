
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
const refUser = null;
refUser.on('value', (snapshot) => {
  const valor = snapshot.val();
  // Hacer algo con el valor leído
  console.log(valor);

});

auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("signin");

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