const carritoHeader = document.querySelector('.carrito');

const buttons = document.querySelectorAll('.btnAdd');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let modalCarrito = document.querySelector('.bodyCarrito')
        const cardContent = e.target.id;
        let match = baterias.find((b) => b.id == cardContent)
        let p = document.createElement('p')
        p.innerHTML = `<p>Producto ${match.marca}</p> `
        
        alert('Producto agregado')
        
        modalCarrito.appendChild(p)
    });
});


let content = carritoHeader.textContent 
console.log(content);



