// const btnLogin = document.getElementById('btnLogin')
// const inputEmail = document.getElementById('email');
// const password = document.getElementById('password');    
// const btnRegister = document.getElementById('btnRegister')

// const users= [];

// //escucha el dom cuando carga 
// document.addEventListener('DOMContentLoaded', ()=>{
//     setTimeout(()=>{
        
//         if(!localStorage.getItem("user")){
//             showRegistrationForm()
//         }
//     },5000)
// })
// //muestra el modal Fomr de registro
// const showRegistrationForm = ()=>{
// alert('Por favor, registrese para continuar en la web')
// let myModal = new bootstrap.Modal(document.getElementById('iniciarRegistro'));
// myModal.show();
// }

// //genero ID
// const idGenerator = ()=>{
//     const id = Math.floor(Math.random() * Date.now()).toString(23)
//     return id
// }

// // evento click sobre el boton del modal register
// btnRegister.addEventListener('click', (e)=> {
//     e.preventDefault()
//     let id = idGenerator()
//     let email = inputEmail.value;

//     guardarUsuarios(id,email)
//     console.log(users);
    
//     // localStorage.setItem('user',JSON.stringify(users))
//     alert("Registro exitoso")

//     let modal = bootstrap.Modal.getInstance(document.getElementById('iniciarRegistro')); 
//     modal.hide();
// });

// //evento sobre el btn IniciarSession
// btnLogin.addEventListener('click', (e) => {
//     e.preventDefault()
//     let emailSession = document.getElementById('emailSession').value
//     let passwordSession = document.getElementById('passwordSession').value
//     let storage = JSON.parse(localStorage.getItem('user')) 
//     console.log(emailSession);
//     console.log(passwordSession);
//     console.log(storage[0].email);
//     if(storage[0].email === emailSession){
//         alert("acceso correcto")
//     }else{
//         alert('acceso denegado \nUsted no esta registrado')
//         showRegistrationForm()
//     }
    
// })

// //Guardo usuarios en el array users creando un objeto por cada usuario
// const guardarUsuarios = (id,email)=>{
//     let user = {
//         id:id,
//         email: email,
//     }
//     users.push(user)
// }

// // const saveStorage = (clave,valor)=>{
// //     localStorage.setItem(clave,valor)
// // }
// // for(const usuarios of users){
// //     saveStorage(usuarios.id,users);
// // }

const btnLogin = document.getElementById('btnLogin');
const inputEmail = document.getElementById('email');
const password = document.getElementById('password');    
const btnRegister = document.getElementById('btnRegister');

// Inicializa el array de usuarios
let users = [];

// Escucha el DOM cuando carga
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!localStorage.getItem("users")) {
            showRegistrationForm();
        }
    }, 5000);
});

// Muestra el modal Form de registro
const showRegistrationForm = () => {
    alert('Por favor, registrese para continuar en la web');
    let modalLogin = bootstrap.Modal.getInstance(document.getElementById('iniciarSession'));
    if (modalLogin) {
        modalLogin.hide();
    }
    let myModal = new bootstrap.Modal(document.getElementById('iniciarRegistro'));
    myModal.show();
};

// Generador de IDs
const idGenerator = () => {
    const id = Math.floor(Math.random() * Date.now()).toString(23);
    return id;
};

// Carga los usuarios desde el localStorage (si existen)
const cargarUsuarios = () => {
    let storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
};

// Guarda los usuarios en el localStorage
const guardarUsuarios = (id, email) => {
    let users = cargarUsuarios();  // Carga los usuarios existentes desde localStorage
    let user = {
        id: id,
        email: email
    };
    users.push(user);  // Agrega el nuevo usuario al array
    localStorage.setItem('users', JSON.stringify(users));  // Guarda el array actualizado
};

// Evento click sobre el botón de registro
btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    
    let id = idGenerator();
    let email = inputEmail.value;

    guardarUsuarios(id, email);  // Guarda el usuario en el array y en el localStorage
    alert("Registro exitoso");

    // Cierra el modal de registro
    let modal = bootstrap.Modal.getInstance(document.getElementById('iniciarRegistro')); 
    modal.hide();
});

// Evento sobre el botón Iniciar Sesión
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    
    let emailSession = document.getElementById('emailSession').value;
    let users = cargarUsuarios();  // Carga los usuarios desde localStorage

    // Verifica si el email de inicio de sesión coincide con algún usuario registrado
    let userFound = users.find(user => user.email === emailSession);

    if (userFound) {
        alert("Acceso correcto");
        let modalLogin = bootstrap.Modal.getInstance(document.getElementById('iniciarSession')); 
        modalLogin.hide();
    } else {
        alert('Acceso denegado \nUsted no está registrado');
        showRegistrationForm();
    }
    
});



