
const carrito = []

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

alert(`Bienvenido a TiendaMusic`)

const comprarBateria = (listaOrdenada) => {
    let volverAComprar;
    let bataElejida = '';
    let bataCantidad = 0;

    do {
        bataElejida = prompt(`Que bateria te gustaria comprar? \n${listaOrdenada.join('\n')}`);

        bataCantidad = parseInt(prompt(`Cuantas vas a comprar?`))

        while ((bataCantidad <= 0) || isNaN(bataCantidad)) {
            alert(`ATENCION!!! \nNo podes llevar ${bataCantidad} productos`)
            bataCantidad = parseInt(prompt(`Vuelve a ingresar la cantidad. \n"Recorda ingresar un valor numerico mayor a 0"`))
        }

        const bata = baterias.find(b => b.marca.toLowerCase() === bataElejida.toLowerCase())

        if (bata) {
            alert(`${bataCantidad} unidades de Bateria ${bata.marca} agregada al carrito`)
            agregarBataCarrito(bata.marca, bata.precio, bataCantidad)
            //carrito.push(bata.marca, bata.precio, bataCantidad)
        } else if (bata === undefined) {
            alert(`ALERTA!! \nPor favor ingresa una bata para poder realizar la busqueda en nuestra base de datos \nEl dato ingresado: ${bataElejida} no se permite`)
        } else {
            alert('Lo siento pero no podemos encontrar el producto elejido')
        }

        volverAComprar = confirm('Queres realizar otra compra?')
    } while (volverAComprar)

    if (bataElejida !== null) {
        confirmarCarrito()
    }
}


const confirmarCarrito = () => {
    const listaCarrito = carrito.map(b => {
        return `* ${b.marca} Unidades: ${b.cantidad}`
    })

    const cant = carrito.map(c => {
        return `${c.cantidad}`
    })

    const canBatas = carrito.length;


    const aceptar = confirm(`Confirmar compra: \n ${listaCarrito.join('\n')}\n Presione: \n->ACEPTAR para confirmar \n->CANCELAR para cancelar la compra`)

    if (aceptar) {
        alert('Felicidades ya casi es tuyo')
        if ((canBatas > 2)|| (cant > 1)) {
            descuento()
        }
    } else {
        alert(`Gracias por su visita, guardaremos su ${listaCarrito.join('\n')}\ny lo tendremos listo para cuando vuelva`)
    }

}


const descuento = () => {

    const desc = carrito.map(d => {
        return `20% ${d.precio * 0.80}`
    })
    alert(`Obtuvo un descuento del ${desc} por llevar esa cantidad de productos`)
}

listaOrdenada()

