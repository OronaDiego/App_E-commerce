
const carrito= []

//let eleccionCompra;

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

alert(`Bienvenido a TiendaMusic`)
const comprarBateria = (listaOrdenada)=>{
    let volverAComprar;
    let bataElejida = '';
    let bataCantidad = 0;

    do{
        bataElejida = prompt(`Que bateria te gustaria comprar? \n${listaOrdenada.join('\n')}`);
        bataCantidad = parseInt(prompt(`Cuantas vas a comprar?`))

        const bata = baterias.find(b=> b.marca.toLowerCase() === bataElejida.toLowerCase())
        console.log(bata);
        

        if(bata){
            alert(`${bataCantidad} Bateria ${bata.marca} Agregada al carrito`)
            carrito.push(bata.marca, bata.precio)
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







// const bienvenida = ()=>{
//     alert(`Bienvenido a TiendaMusic`)
    
//     let opcionUser = parseInt(prompt(`Digite: \n1-para ver los productos \n2- para salir`))

//     while(opcionUser !== 1 && opcionUser !==2){
//         alert('Opcion no válida')
//         opcionUser = parseInt(prompt(`Digite una opcion válida: \n1-para ver los productos \n2- para salir`))
//     }
    
//     if(opcionUser === 1){
//             alert(`Baterias\n${bata}`)
//             eleccionCompra = prompt("Ingrese uno de los productos para comprar")
            
//         }else if(opcionUser === 2){
//             alert('Gracias por su visita, vuelva pronto')
//         }else{
//             alert('Opcion no válida')
//             opcionUser = parseInt(prompt(`Digite una opcion válida: \n1-para ver los productos \n2- para salir`))
//         }
        
//         return eleccionCompra
//     }
    
    

    // function buscarBata(){
    //     let bate = baterias.find((bata)=> bata.marca === opcionInicial)
    //     if(bate.stock > 0){
    //         alert(`Felicidades tenemos stock de ${opcionInicial} \nLa agregaremos al carrito para poder hacer la compra`)
    //         carrito.push(bate)
    //     }else{
    //         alert(`Lo lamentamos pero no nos queda mas stock de ${opcionInicial}`)
    //     }
    //     return bate;
    // }

    
    // let opcionInicial = bienvenida()
    // console.log(buscarBata());
    // console.log(carrito);
    
    
    
    