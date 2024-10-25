const contenedorClima = document.getElementById('weather')

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=db765fac1a5faaa470deacba508c3d0b")
    .then(response => response.json())
    .then(data => {

        // console.log(data);
        // console.log(data.main.temp_max);

        const tempActual = data.main.temp;
        const tempMax = data.main.temp_max;
        const tempMin = data.main.temp_min;
        const humedad = data.main.humidity;
        const clima = data.weather[0].description;

        const div = document.createElement('div')
        div.classList.add("clima")

        div.innerHTML = `
                <div class="i">
                    <p > Cielo ${clima}</p>
                    <div class="icon">
                    </div>
                </div>
                <p> TempActual ${tempActual}</p>
                <p> TempMax ${tempMax}</p>
                <p> TempMin ${tempMin}</p>
                <p> Hum ${humedad}%</p>
    `

        contenedorClima.appendChild(div);

        const icon = document.querySelector('.icon')
        // console.log(icon);
        if ((clima.includes('nubes')) || (clima.includes('nuboso')) ) {
            icon.classList.add('nubes')
        } else if (clima.includes('lluvia')) {
            icon.classList.add('lluvia')
        } else {
            icon.classList.add('sol')
        }
    })