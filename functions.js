const checkDefault = document.querySelector("#flexCheckDefault")
const checkMayor = document.querySelector('#flexCheckChecked')
const form = document.querySelector('.form-check')
const contenedor = document.getElementById('resumen')

const btnAdd = document.getElementsByClassName("btnAdd")

// Eventos de los checks
checkDefault.addEventListener('change', () => {
   if (checkDefault.checked) {
      checkMayor.checked = false; // Desmarcar el otro checkbox
   }
   filtrarPorMenor()
   mostrarProductosDom();
})
checkMayor.addEventListener('change', () => {
   if (checkMayor.checked) {
      checkDefault.checked = false; // Desmarcar el otro checkbox
   }
   filtrarPorMayor()
   mostrarProductosDom();
})


//Funciones de filtrado de los productos
const filtrarPorMayor = () => {
   let mayor = baterias.sort((a, b) => b.precio - a.precio)
   return mayor

}
const filtrarPorMenor = () => {
   let menor = baterias.sort((a, b) => a.precio - b.precio)
   return menor
}


// Renderizo los productos 
const mostrarProductosDom = () => {
   contenedor.innerHTML = '';
   baterias.forEach(batas => {
      const div = document.createElement('div')
      div.className = "card";

      div.innerHTML = `
            <div class="card-image">
                  <img src="${batas.img}">
                  <span class="card-title">${batas.marca}</span>
            </div>
                  <div class="card-content">
                     <p>$${batas.precio}</p>
                     <button class="btnAdd" id="${batas.id}">Agregar Al carrito</button>
                  </div>
      `
      contenedor.appendChild(div)
   })
}

mostrarProductosDom();






