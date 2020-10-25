// DOM Elements
const time = document.querySelector('.time'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const btn_img = document.querySelector('.btn_img');

const weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    speed = document.querySelector('.speed-wind'),
    weatherDescription = document.querySelector('.weather-description'),
    air = document.querySelector('.air-humidity'),
    city = document.querySelector('.city');

// Options
//const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    year = today.getFullYear();
    day = today.getDate();
    var months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    month = months[today.getMonth()];
    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    name_day = days[today.getDay()];
    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}</br> ${name_day}<span>,</span> ${day} ${month}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// images background 
const baseNight = './assets/images/night/';
const baseMorning = './assets/images/morning/';
const baseDay = './assets/images/day/';
const baseEvening = './assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

var arrImg = new Array(6);

for (let i = 0; i < arrImg.length; i++) {

    var item = Math.floor(Math.random() * images.length);

    if (arrImg.includes(images[item]) === false) {
        arrImg[i] = images[item];
    } else {
        i--;
    }
}

var arrRandom = new Array(24);

for (let i = 0; i < arrRandom.length; i++) {
    if (i >= 6 && i < 12) {
        arrRandom[i] = baseMorning + arrImg[i - 6]
    } else if (i >= 12 && i < 18) {
        arrRandom[i] = baseDay + arrImg[i - 12]
    } else if (i >= 18 && i < 24) {
        arrRandom[i] = baseEvening + arrImg[i - 18]
    } else {
        arrRandom[i] = baseNight + arrImg[i]
    }
}

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

let today = new Date(),
    hour = today.getHours(),
    i = hour;

function getImage() {
    if (i == arrRandom.length - 1) {
        i = 0;
    }
    viewBgImage(arrRandom[i]);
    i++;
    btn_img.disabled = true;
    setTimeout(function() { btn_img.disabled = false }, 1000);
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour > 6 && hour < 12) {
        // Morning
        document.body.style.backgroundImage =
            `url(${arrRandom[hour]})`;

        greeting.textContent = 'Доброе утро, ';

    } else if (hour > 12 && hour < 18) {
        // Afternoon
        document.body.style.backgroundImage =
            `url(${arrRandom[hour]})`;

        greeting.textContent = 'Добрый день, ';

    } else if (hour > 18 && hour < 24) {
        // Evening
        document.body.style.backgroundImage =
            `url(${arrRandom[hour]})`;
        greeting.textContent = 'Добрый вечер, ';
        document.body.style.color = 'white';
    } else {
        // Evening
        document.body.style.backgroundImage =
            `url(${arrRandom[hour]})`;

        greeting.textContent = 'Доброй ночи, ';
        document.body.style.color = 'white';
    }
}


// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Введите имя]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}


// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Введите ]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setField(e, field) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            field.blur();
            if (e.target.innerText !== '') {
                localStorage.setItem(field.id, e.target.innerText);
            } else {
                field.textContent = localStorage.getItem(field.id);
            }
            return true;
        }
    } else {
        if (e.target.innerText !== '') {
            localStorage.setItem(field.id, e.target.innerText);
        } else {
            field.textContent = localStorage.getItem(field.id);
        }
    }
    return false;
}

function clickField(e) {
    e.target.textContent = "";
}
// Set Name
function setName(e) {
    setField(e, name);
}

function setFocus(e) {
    setField(e, focus);
}
// Weather
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=4017a46d5c2a3717549d8bebeeaba72c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        city.textContent = `${data.message}`;
        temperature.textContent = `-°C`;
        speed.textContent = ` - м/с`;
        air.textContent = ` - %`;
        weatherIcon.classList.add(`none`);
        weatherDescription.textContent = "-";
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    speed.textContent = ` ${data.wind.speed} м/с`;
    air.textContent = ` ${data.main.humidity} %`;
}

// City
function getCity() {
    if (localStorage.getItem('city') === null) {
        city.textContent = 'London';
    } else {
        city.textContent = localStorage.getItem('city');
    }
    getWeather();
}


function setCity(e) {
    if (setField(e, city)) {
        getWeather();
    }

}

//Quote
async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);
btn_img.addEventListener('click', getImage);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clickField);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickField);


city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', clickField);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getImage();
getQuote();
getWeather();
getCity();