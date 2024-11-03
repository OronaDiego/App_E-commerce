
let carritoStorage = localStorage.getItem('carrito')


// En resumen.html, carga el carrito del storage y lo muestra en la página
document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('#carritoContainer');

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

