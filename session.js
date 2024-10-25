const btnLogin = document.getElementById('btnLogin');
// const btnSession =document.getElementById('bntSession')
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
    Swal.fire('registro exitoso')

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
        Swal.fire({
            title: "Éxito",
            text: "Aceso correcto",
            icon:"success"
        });
        let modalLogin = bootstrap.Modal.getInstance(document.getElementById('iniciarSession'));
        mostrarEmail(emailSession)
        modalLogin.hide();
    } else {
        Swal.fire({
            title: 'Acceso denegado',
            text: "Usted no esta registrado",
            icon: "error"
        })
        showRegistrationForm();
    }
    
});
const btnSession= document.querySelector('#btnSession')

const mostrarEmail = (email)=>{
    let div=document.getElementById('divEmail')
    let p = document.createElement('p')
    p.innerHTML = ` <p>Bienvenido ${email}</p> `
    
    div.appendChild(p)
    
}




