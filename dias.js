const dias = ["Domingo","Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado"];
const meses = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre","Diciembre"]
const fecha = new Date()
const anio = fecha.getFullYear()

const dia = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];

const containerInfo = document.getElementById('info')

containerInfo.innerHTML = `
    <a href="https://www.linkedin.com/in/diego-oron%C3%A1/">Diego Oroná</a>
    <p> ${mes}-${anio}</p>
    <a href="./index.html">home</a>
`
