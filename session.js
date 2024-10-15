const btnSession = document.getElementById('btnSession')
const btnLogin = document.getElementById('btnLogin')
const username = document.getElementById('username');
const password = document.getElementById('password');    

const users= [];

btnLogin.addEventListener('click', (e)=> {
    e.preventDefault()
    let user = username.value;
    let pass = password.value;

    guardarUsuarios(user,pass)
    localStorage.setItem('user',JSON.stringify(users))
    // validarUser(user,pass)
});

let userStorage = JSON.parse(localStorage.getItem('user'))
console.log(userStorage);


const validarUser = (u,p)=>{
    if((u === "deco") && (p === "123")){
        console.log('exito');
        
    }else{
        console.log('ERROR');
    }
}

const guardarUsuarios = (u,p)=>{
    let user = {
        user: u,
    }
    users.push(user)
}




