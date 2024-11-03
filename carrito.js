const carrito = [];
const contCarrito = document.querySelector('.carritoHeader')
const btnFinalizarCompra = document.querySelector('#finalizarCompra')

const buttons = document.querySelectorAll('.btnAdd');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let modalCarrito = document.querySelector('.bodyCarrito');
        const cardContent = e.target.id;
        
        // Buscar el producto en el stock de baterías
        let match = baterias.find((b) => b.id == cardContent);
        
        if (match) {
            // Verificar si el producto ya está en el carrito
            let itemEnCarrito = carrito.find(item => item.id === match.id);
            
            if (itemEnCarrito) {
                // Si ya existe, incrementa la cantidad
                itemEnCarrito.cantidad++;
            } else {
                // Si no existe, agregar al carrito con cantidad 1
                carrito.push({ ...match, cantidad: 1 });
            }
        }
        actualizarCantidadCarrito()
        
        // Actualizar el contenido del modal con el carrito
        renderCarrito(modalCarrito);
        Swal.fire({
            title: `${match.marca}`,
            text:"Se Agrego al carrito",
            icon:"success",
            showConfirmButton: false,
            timer:1000
        });
    });
});

// Funcion para actualizar la cantidad de productos que hay en el carrito
function actualizarCantidadCarrito() {
    let total = carrito.reduce((acc,element)=>acc+element.cantidad,0)    
    contCarrito.innerHTML = `<i class="fas fa-shopping-cart"></i> ${total}`;
}

// Llamamos a actualizarEstadoBoton() cada vez que cambie el carrito
document.addEventListener('DOMContentLoaded', () => {
    actualizarEstadoBoton(); // Chequeo inicial al cargar la página
});


// function para mostrar el btn de finalizar compra
function actualizarEstadoBoton() {
    if (carrito.length === 0) {
        btnFinalizarCompra.style.display = 'none'; // Oculta el botón si el carrito está vacío
    } else {
        btnFinalizarCompra.style.display = 'block'; // Muestra el botón si hay elementos en el carrito
    }
}


// Función para renderizar el carrito en el modal
function renderCarrito(modalCarrito) {
    // Limpiar el contenido anterior del carrito
    modalCarrito.innerHTML = '';
    
    carrito.forEach(item => {
        // Crear la estructura HTML para cada producto
        let div = document.createElement('div');
        div.classList.add('container', 'carrito-desc');
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center ">
                <p><strong>Producto:</strong> ${item.marca}</p>
                <p><strong>Precio:</strong> $${item.precio}</p>
                <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                <button class="btn btn-remove bt" data-id="${item.id}">X</button>
            </div>
            <hr>
        `;
        actualizarEstadoBoton()
        // Agregar el producto al modal del carrito
        modalCarrito.appendChild(div);
        
    });

    // Evento para los botones de eliminar
    const removeButtons = modalCarrito.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const idToRemove = e.target.getAttribute('data-id');
            Swal.fire({
                title:'Esta seguro de eliminar este producto?',
                icon:"warning",
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result)=>{
                if(result.isConfirmed){
                    Swal.fire({
                        title:"Eliminado!",
                        text: "Producto eliminado con exito",
                        icon:"success"
                    })
                    eliminarDelCarrito(idToRemove);
                    renderCarrito(modalCarrito);
                }
            })
        });
    });
    actualizarEstadoBoton()
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id == id);
    
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCantidadCarrito()
    }
}

// Accion sobre el btin finalizar compra 
btnFinalizarCompra.addEventListener("click",(e)=>{
    e.preventDefault()
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
    redirigirResumenCarrito()
    
})

//function que redirecciona al resumen
function redirigirResumenCarrito() {
    window.location.href = './resumen.html'; 
}

