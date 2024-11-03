const dias = ["Domingo","Lunes", "Martes", "Miercoles","Jueves","Viernes","Sabado"];
const meses = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre","Diciembre"]
const fecha = new Date()
const anio = fecha.getFullYear()

const dia = dias[fecha.getDay()];
const mes = meses[fecha.getMonth()];
