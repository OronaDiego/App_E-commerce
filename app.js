
const carrito= []

const listaOrdenada = ()=>{
    const listaOrdenada = baterias.map(bata =>{
        return `-${bata.marca} > Precio: $${bata.precio}`});
        comprarBateria(listaOrdenada)
}

//***************Ordeno la lista de menor a mayor*****/
const ordXPrecioMenorMayor = () => {
    baterias.sort((a,b)=> a.precio - b.precio);
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
const comprarBateria = (listaOrdenada)=>{
    let volverAComprar;
    let bataElejida = '';
    let bataCantidad = 0;

    do{
        bataElejida = prompt(`Que bateria te gustaria comprar? \n${listaOrdenada.join('\n')}`);
        bataCantidad = parseInt(prompt(`Cuantas vas a comprar?`))

        const bata = baterias.find(b=> b.marca.toLowerCase() === bataElejida.toLowerCase())
        //console.log(bata);
        
        if(bata){
            alert(`${bataCantidad} Bateria ${bata.marca} Agregada al carrito`)
            agregarBataCarrito(bata.marca, bata.precio, bataCantidad)
            //carrito.push(bata.marca, bata.precio, bataCantidad)
        }else if(bata === undefined){
            alert(`ALERTA!! \nPor favor ingresa una bata para poder realizar la busqueda en nuestra base de datos \nEl dato ingresado: ${bataElejida} no se permite`)
        }else{
            alert('Lo siento pero no podemos encontrar el producto elejido')
        }

        volverAComprar = confirm('Queres realizar otra compra?')
    }while(volverAComprar)
}

listaOrdenada()



console.log(carrito);