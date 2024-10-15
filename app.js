
const carrito = []


const resumen = document.getElementById('resumen')
resumen.className = "res";
const btnAction = document.getElementById('btnAction');
const btnCarrito = document.querySelector('.btn')
console.log(btnCarrito.innerText);


//******************Muestro una lista ordenada y modificada para el usuario */
const listaOrdenada = () => {
    const listaOrdenada = baterias.map(bata => {
        return `-${bata.marca} > Precio: $${bata.precio}`
    });
    comprarBateria(listaOrdenada)
}

//***************Ordeno la lista de menor a mayor*****/
const ordXPrecioMenorMayor = () => {
    baterias.sort((a, b) => a.precio - b.precio);
    listaOrdenada()
}



//******************Carrito*****/
const agregarBataCarrito = (bateriaMarca, bateriaPrecio, bataCantidad) => {
    const bataIgual = carrito.find(b => b.marca === bateriaMarca);
    // Si la bata está en el carrito, actualizo cantidad
    if (bataIgual) {
        bataIgual.cantidad += bataCantidad;
    } else {
        // sino esta, agrego la bata completa.
        carrito.push({
            marca: bateriaMarca,
            precio: bateriaPrecio,
            cantidad: bataCantidad
        });
    }
}

// alert(`Bienvenido a TiendaMusic`)



//********************Funcion Comprar bateria************/
const comprarBateria = (listaOrdenada) => {
    let volverAComprar;
    let bataElejida = '';
    let bataCantidad = 0;

        alert("Bienvenido a TiendaDrummer")
    do {

        bataElejida = prompt(`Que bateria te gustaria comprar? \n${listaOrdenada.join('\n')}`);

        bataCantidad = parseInt(prompt(`Cuantas vas a comprar?`))
        const sinstock = comprobarStock(bataElejida)
        
        while ((bataCantidad <= 0) || isNaN(bataCantidad)) {
            alert(`ATENCION!!! \nNo podes llevar ${bataCantidad} productos`)
            bataCantidad = parseInt(prompt(`Vuelve a ingresar la cantidad. \n"Recorda ingresar un valor numerico mayor a 0"`))
        }
        let bata = baterias.find(b => b.marca.toLowerCase() === bataElejida.toLowerCase())

        if(sinstock){
            alert('no quedo stock de este producto')
            bata = false
        }
        
        if (bata) {
            alert(`${bataCantidad} unidades de Bateria ${bata.marca} agregada al carrito`)
            agregarBataCarrito(bata.marca, bata.precio, bataCantidad)
            //carrito.push(bata.marca, bata.precio, bataCantidad)
        } else if (bata === undefined) {
            alert(`ALERTA!! \nPor favor ingresa una bata para poder realizar la busqueda en nuestra base de datos \n\nEl dato ingresado: ${bataElejida} no se permite`)
        } else {
            alert('Lo siento pero no pudimos agregarlo al carrito')
        }

        volverAComprar = confirm('Queres realizar otra compra?')
    } while (volverAComprar)

    if ((bataElejida !== null) && (carrito.length !== 0)) {
        confirmarCarrito()
    }else{
        alert("Gracias por su visita\nVuelva pronto!")
    }
}





//**************compruebo Stock*******/
const comprobarStock = (bataElejida,) => {

    const comprobarStock = baterias.filter(s => s.stock === 0)
    // console.log(comprobarStock);
    //retorna true si no hay stock
    const noStock = comprobarStock.some(m => m.marca.toLowerCase() === bataElejida.toLowerCase())
    // console.log(noStock);
    return noStock
}



//******************Confirmacion del carrito****************/
const confirmarCarrito = () => {
    const listaCarrito = carrito.map(b => {
        return ` ${b.marca}  ${b.cantidad} u`
    })

    // const total = listaCarrito.reduce((acc,element)=>acc + (element.precio * element.cantidad),0 )
    // console.log(total);
    

    const aceptar = confirm(`Confirmar compra: \n ${listaCarrito.join('\n')}\n\nPresione: \n->ACEPTAR para confirmar \n->CANCELAR para cancelar la compra`)
    if (aceptar) {
        alert('Felicidades ya casi es tuyo')
        finalizarCompra(listaCarrito)
    } else {
        alert(`Gracias por su visita, guardaremos su ${listaCarrito.join('\n')}\nLo tendremos listo para cuando vuelva`)
        localStorage.setItem('carrito', listaCarrito)
        console.log(listaCarrito);
        
    }
}



const finalizarCompra = (listaCarrito) => {
  const cantidadTotal = carrito.reduce((acc,element)=>acc + element.cantidad,0)
  const costoTotal = carrito.reduce((acc,element)=> acc + element.precio * element.cantidad,0)
  const desc = costoTotal * 0.80;
    if(costoTotal >100000){
        alert(`Obtuvo un descuento del 20% sobre el total\nQuedando en: $${desc}`)
    }

  alert(`Resumen de su compra: \n${listaCarrito.join('\n')}
        \nTotal de productos : ${cantidadTotal}\nCosto parcial: $${costoTotal}
        \nTotal a pagar con descuento incluido: $${desc}
  `)
  resumen.innerHTML = `<div>
        <h2>Resumen de su compra:</h2>
        <h3>Lista de productos a llevar :<br>${listaCarrito.join('</br>')}</h3>
        <p>Total de productos : ${cantidadTotal} U.</p>
        <p>Costo parcial: $${costoTotal}</p>
        <p>Total a pagar con el descuento incluido: $${desc}</p></div>  `
  btnCarrito.innerText = cantidadTotal;      

}

// listaOrdenada()
// btnAction.onclick = ()=>{listaOrdenada()}
