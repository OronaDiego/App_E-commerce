let carritoStorage = localStorage.getItem('carrito')
// Inicializar jsPDF
const doc = new window.jspdf.jsPDF();

// En resumen.html, carga el carrito del storage y lo muestra en la página
document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('#carritoContainer');

    const local = localStorage.getItem('isLoggedIn')
    console.log(local);
    
    if(local=== 'false'){
        Swal.fire("Debe iniciar sesison")
        setInterval((()=>{
            window.location.href = './index.html';
        }),500)
    }

    // Crear la tabla y sus encabezados
    const table = document.createElement('table');
    table.classList.add('table');

    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">fecha</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // Añadir las filas del carrito
    const tableBody = table.querySelector('tbody');
    carrito.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${item.id}</th>
            <td>${item.marca}</td>
            <td>$${item.precio}</td>
            <td>${dia}/${mes}/${anio}</td>
        `;
        tableBody.appendChild(row);
    });

    // Calcular el total después de añadir todos los productos
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);

    // Añadir una fila de total al final de la tabla
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3" class="text-end"><strong>Total:</strong></td>
        <td><strong>$${total}</strong></td>
    `;
    tableBody.appendChild(totalRow);

    carritoContainer.appendChild(table);
});

// obtener valores del form
const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const inputemail = document.getElementById('email')
const inputDireccion = document.getElementById('direccion')
const inputTransaccion = document.getElementById('transaccion')
const fomrCompra = document.getElementById('formCompra')
const btnFinalizarPago = document.getElementById('finalizarPago')

// Función para generar el PDF de comprobante
function generarComprobantePDF() {    
    // Obtener datos del carrito y del formulario
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const transaccion = document.getElementById('transaccion').value;

    // Agregar título y datos del comprador
    doc.setFontSize(16);
    doc.text("Comprobante de Compra", 10, 10);
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre} ${apellido}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Dirección: ${direccion}`, 10, 40);
    doc.text(`ID de Transacción: ${transaccion}`, 10, 50);

    // Añadir encabezado de tabla de productos
    let y = 70;
    doc.setFontSize(14);
    doc.text("Productos Comprados:", 10, y);
    y += 10;

    // Agregar cada producto del carrito
    carrito.forEach((item, index) => {
        doc.setFontSize(12);
        doc.text(`ID: ${item.id}`, 10, y);
        doc.text(`Producto: ${item.marca}`, 40, y);
        doc.text(`Precio: $${item.precio}`, 110, y);
        y += 10;
    });

    // Calcular y agregar el total
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: $${total}`, 10, y);

    // Guardar el PDF con un nombre dinámico
    doc.save(`comprobante_${nombre}_${apellido}.pdf`);
}




// Evento para generar PDF con barra de progreso
btnFinalizarPago.addEventListener('click', (e) => {
    e.preventDefault();
    // Configuración inicial de la barra de progreso
    Swal.fire({
        title: 'Generando comprobante...',
        html: '<div class="progress-bar" id="progressBar"></div>',
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
            const progressBar = document.getElementById('progressBar');
            let progress = 0;

            // Simulación de progreso con intervalos
            const interval = setInterval(() => {
                progress += 20; // Incremento del progreso (simulación)
                progressBar.style.width = `${progress}%`;

                // Cuando el progreso se completa, detener el intervalo
                if (progress >= 100) {
                    clearInterval(interval);
                    Swal.close();
                    // Mostrar mensaje de éxito y generar el PDF
                    generarComprobantePDF();
                    Swal.fire({
                        title: "Resumen",
                        text: `${inputNombre.value} ${inputApellido.value}, ${inputDireccion.value}, ${inputemail.value}`,
                        icon: "success"
                    });
                }
            }, 500); // Actualización cada 500ms
        },
    });
});


