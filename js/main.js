const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
var db = firebase.firestore();

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// SignUp


// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
    $("#logoutModal").modal("hide");


  });
});

// SingIn
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    // close the modal
    $("#signinModal").modal("hide");
  });
});

// Posts
const postList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title}</h5>
        <p>${post.content}</p>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<h4 class="text-white">Logeate para iniciar</h4>';
  }
};

// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
  var menu = document.getElementById("accordionSidebar");
  var menuLogin = document.getElementById("BarraLogin");
  var Contenido = document.getElementById("Contenido");
  var ContenidoLogin = document.getElementById("ContenidoLogin");

  if (user) {



    if (user.email.substr(-12) == "@uptc.edu.co") {

      alert('correo correcto');
      menu.style.display = "block";
      Contenido.style.display = "block";
      menuLogin.style.display = "none";


      console.log("signin");
      document.getElementById('MenuLogin').textContent = user.email;
      loginCheck(user);

    } else {

      alert('el correo tiene que ser institucional UPTC');

      menu.style.display = "none";
      Contenido.style.display = "none";
      menuLogin.style.display = "block"
      var user = firebase.auth().currentUser;

      user.delete().then(function () {
        // User deleted.
      }).catch(function (error) {
        // An error happened.
      });
      logoutPrincipal();

      loginCheck(user);


    }


  } else {

    console.log("signout");

    menu.style.display = "none";
    Contenido.style.display = "none";
    menuLogin.style.display = "block";
    ContenidoLogin.style.display = "block";

    document.getElementById('MenuLogin').textContent = "Logeate";
    loginCheck(user);
  }
});

// Login with Google
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {

  e.preventDefault();
  signInForm.reset();
  $("#signinModal").modal("hide");
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider).then((result) => {
    console.log("google sign in");

  })
    .catch(err => {
      console.log(err);
    })
});

function logoutPrincipal() {
  auth.signOut().then(() => {
    console.log("signup out");
  });
}
// Login with Facebook


$('#myList a').on('click', function (e) {
  e.preventDefault()
  $('#myList a[href="#home"]').tab('show') // Select tab by name
  $('#myList a[href="#profile"]').tab('show') // Select tab by name
  $('#myList a:last-child').tab('show') // Select last tab
  $('#myList a:nth-child(3)').tab('show') // Select third tab
})


//leer datos firestore

var tabla = document.getElementById('dtBasicExample');
db.collection("users").get().then((querySnapshot) => {

  
  querySnapshot.forEach((doc) => {
    

tabla.insertRow(-1).innerHTML= `
    
<tr>
    <th>${doc.id}</th>
    <th>${doc.data().active}</th>
    <th>${doc.data().career}</th>
    <th>${doc.data().code}</th>
    <th>${doc.data().email}</th>
    <th>${doc.data().isTutor}</th>
    <th>${doc.data().name }</th>
  
    <td><button data-toggle="modal" data-target="#EditarModal" class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().active}','${doc.data().isTutor}','${doc.data().name}')">Editar</button></td>
</tr> 

`
  });

  $(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });

});




//editar documentos
function editar(id,active,isTutor,name){
  console.log(id,active,isTutor,name);

  document.getElementById('NombreUser').value = name;

  document.getElementById('CheckTrueAdmin').value = active;
  var boton = document.getElementById('GuardarCambios');


  boton.onclick = function(){
      var washingtonRef = db.collection("users").doc(id);
      // Set the "capital" field of the city 'DC'

      var name = document.getElementById('NombreUser').value;
      var active = document.getElementById('CheckTrueAdmin').value;

      return washingtonRef.update({
          name: name,
          active: active
      })
      .then(function() {
          console.log("Document successfully updated!");
          location.reload();
          
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
  }
}






