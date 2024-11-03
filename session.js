const btnLogin = document.getElementById('btnLogin'); // Asegúrate de que exista en HTML
const btnSession = document.getElementById('btnSession');
const btnRegister = document.getElementById('btnRegister');
const inputEmail = document.getElementById('email');
const inputEmailSession = document.getElementById('emailSession'); // Asegúrate de que el campo esté en HTML

// Inicializa el array de usuarios y carga el estado de sesión del localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

// Verifica el estado de sesión al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn) {
        mostrarEmail(localStorage.getItem('loggedInUserEmail'));
        cambiarBotonLogin(true); // Cambia el botón a "Cerrar Sesión"
        Swal.fire(`Bienvenido Nuevamente a Tienda Drummer`);
    } else {
        setTimeout(() => {
            if (users.length === 0) {
                alert('Por favor, regístrese para continuar en la web');
                showRegistrationForm();
            } else {
                showLoginForm(); // Muestra el formulario de inicio de sesión si hay usuarios registrados
            }
        }, 5000);
    }
});

// Muestra el formulario de registro si el usuario no está registrado
const showRegistrationForm = () => {
    const modalLogin = bootstrap.Modal.getInstance(document.getElementById('iniciarSession'));
    if (modalLogin) modalLogin.hide();
    new bootstrap.Modal(document.getElementById('iniciarRegistro')).show();
};

// Muestra el formulario de inicio de sesión
const showLoginForm = () => {
    const modalRegistro = bootstrap.Modal.getInstance(document.getElementById('iniciarRegistro'));
    if (modalRegistro) modalRegistro.hide();
    new bootstrap.Modal(document.getElementById('iniciarSession')).show();
};

// Generador de IDs
const idGenerator = () => Math.floor(Math.random() * Date.now()).toString(23);

// Guarda un usuario en el localStorage
const guardarUsuario = (user) => {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};

// Cambia el botón de inicio/cierre de sesión
const cambiarBotonLogin = (loggedIn) => {
    btnSession.textContent = loggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión';
    btnSession.onclick = loggedIn ? cerrarSesion : showLoginForm; // Cambia la función onclick según el estado
};

// Muestra el email del usuario logueado
const mostrarEmail = (email) => {
    const div = document.getElementById('divEmail');
    div.innerHTML = `<p>Bienvenido ${email}</p>`;
};

// Registro de usuario y logueo automático después de registro
btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    if (email === "") {
        Swal.fire('Por favor, ingrese un email válido');
        return;
    }
    const user = { id: idGenerator(), email };

    guardarUsuario(user); // Guarda el usuario en localStorage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('loggedInUserEmail', email);

    Swal.fire('Registro exitoso');
    bootstrap.Modal.getInstance(document.getElementById('iniciarRegistro')).hide();
    mostrarEmail(email);
    cambiarBotonLogin(true); // Cambia el botón a "Cerrar Sesión"
});

// Función de inicio de sesión
const iniciarSesion = () => {
    const emailSession = inputEmailSession.value;
    const userFound = users.find(user => user.email === emailSession);

    if (userFound) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('loggedInUserEmail', emailSession);

        Swal.fire({
            title: "Éxito",
            text: "Acceso correcto",
            icon: "success"
        });

        bootstrap.Modal.getInstance(document.getElementById('iniciarSession')).hide();
        mostrarEmail(emailSession);
        cambiarBotonLogin(true); // Cambia el botón a "Cerrar Sesión"
    } else {
        Swal.fire({
            title: 'Acceso denegado',
            text: "Usuario no registrado",
            icon: "error"
        });
        showRegistrationForm(); // Muestra el formulario de registro
    }
};

// Función para cerrar sesión
const cerrarSesion = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('loggedInUserEmail');
    mostrarEmail(''); // Limpia el mensaje de bienvenida
    cambiarBotonLogin(false); // Cambia el botón a "Iniciar Sesión"
    alert('Ha cerrado sesión');
};

// Agrega el evento de inicio de sesión al botón btnLogin
btnLogin.addEventListener('click', iniciarSesion);

// Inicializa el botón según el estado de sesión
cambiarBotonLogin(isLoggedIn);

