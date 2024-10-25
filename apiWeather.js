const contenedorClima = document.getElementById('weather')

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&appid=db765fac1a5faaa470deacba508c3d0b")
.then(response => response.json())
.then(data => {

    console.log(data);
    // console.log(data.main.temp_max);
    
    const tempActual = data.main.temp;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;
    const humedad = data.main.humidity;
    const clima = data.weather[0].description;
    const vientoVelocidad = data.wind.speed;
    
    const div = document.createElement('div')
    div.classList.add("clima")
    div.innerHTML = `
                <p> Temp ${tempActual}</p>
                <p> Temp Max ${tempMax}</p>
                <p> Temp Min ${tempMin}</p>
                <p> Hum ${humedad}</p>
                <p> Cielo ${clima}</p>
                <p> Velocidad del viento: ${vientoVelocidad}</p>
    `
    contenedorClima.appendChild(div);
})