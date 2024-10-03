
// convierto el array en una cadena de texto para el usuario
function formatearProductos(product) {
    return product.map(producto => {
        return `Marca: ${producto.marca}, Precio: $${producto.precio}`;
    }).join('\n'); // separa las baterías en líneas diferentes
}
let bata = formatearProductos(baterias);
let eleccionCompra;
let carrito= []


const bienvenida = ()=>{
    alert(`Bienvenido a TiendaMusic`)
    
    let opcionUser = parseInt(prompt(`Digite: \n1-para ver los productos \n2- para salir`))

    while(opcionUser !== 1 && opcionUser !==2){
        alert('Opcion no válida')
        opcionUser = parseInt(prompt(`Digite una opcion válida: \n1-para ver los productos \n2- para salir`))
    }
    
    if(opcionUser === 1){
            alert(`Baterias\n${bata}`)
            eleccionCompra = prompt("Ingrese uno de los productos para comprar")
            
        }else if(opcionUser === 2){
            alert('Gracias por su visita, vuelva pronto')
        }else{
            alert('Opcion no válida')
            opcionUser = parseInt(prompt(`Digite una opcion válida: \n1-para ver los productos \n2- para salir`))
        }
        
        return eleccionCompra
    }
    
    

    function buscarBata(){
        let bate = baterias.find((bata)=> bata.marca === opcionInicial)
        if(bate.stock > 0){
            alert(`Felicidades tenemos stock de ${opcionInicial} \nLa agregaremos al carrito para poder hacer la compra`)
            carrito.push(bate)
        }else{
            alert(`Lo lamentamos pero no nos queda mas stock de ${opcionInicial}`)
        }
        return bate;
    }

    
    let opcionInicial = bienvenida()
    console.log(buscarBata());
    console.log(carrito);
    
    
    
    