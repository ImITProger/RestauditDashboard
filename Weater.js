window.onload = function() {
    myWeater();
    updateWeatherImage(); // Обновляем изображение при загрузке
};

// Устанавливаем интервал обновления погоды каждые 10 минут (600000 мс)
setInterval(myWeater, 600000);

function myWeater() {
    const city = 'Тюмень'; // Установите город по умолчанию
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11c0d3dc6093f7442898ee49d2430d20&units=metric`)
        .then(function (resp) {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.cod === '404') {
                document.querySelector('#CityError').textContent = "Город не найден";
                document.querySelector('#City').textContent = "";
                
                document.querySelector('#WindSpeed').textContent = "";
                document.querySelector('#AirTemp').textContent = "";
            } else {
                document.querySelector('#CityError').textContent = "";
                document.querySelector('#City').textContent = data.name;
                
                document.querySelector('#WindSpeed').textContent = `Ветер: ${data.wind.speed} m/s`;
                document.querySelector('#AirTemp').textContent = data.main.temp;
                document.querySelector('#weatherImages').src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
            }
        })
        .catch(function () {
            console.error("Ошибка при получении данных о погоде");
        });
}

function updateWeatherImage() {
    const hour = new Date().getHours(); // Получаем текущий час
    const weatherImage = document.querySelector('#weatherImage');

    if (hour >= 6 && hour < 18) {
        // Если время от 6:00 до 17:59, используем дневное изображение
        weatherImage.src = 'night.png'; // Замените на путь к вашему дневному изображению
    } else {
        // В противном случае используем ночное изображение
        weatherImage.src = 'day.png'; // Замените на путь к вашему ночному изображению
    }
}


function updateDateTime() {
    // Определяем временную зону Екатеринбурга
    const ekbTimeZone = 'Asia/Yekaterinburg';
    
    // Получаем текущее время в Екатеринбурге
    const currentTime = new Date().toLocaleTimeString('ru-RU', { timeZone: ekbTimeZone });

    // Получаем текущую дату в Екатеринбурге
    const currentDate = new Date().toLocaleDateString('ru-RU', { timeZone: ekbTimeZone });
    
    // Выводим время и дату на страницу
    document.getElementById('Time').textContent = currentTime;
    document.getElementById('DataTime').textContent = currentDate;
}

// Обновляем дату и время каждые 1 секунду
setInterval(updateDateTime, 1000);
