
const place = document.getElementById('place');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const pressureContent = document.querySelector('.pressureContent');
const humidityContent = document.querySelector('.humidityContent');
const sunriseContent = document.querySelector('.sunriseContent');
const sunsetContent = document.querySelector('.sunsetContent');
const btn = document.querySelector('.btn');
const text = document.getElementById('mycity');

let latitude, longitude;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5cc7c1fc547a2619b29962019df3ca67`;
        getmap(latitude,longitude,url)
    }, function () {
        alert('cant access location')
    });
}
 function getmap(latitude,longitude,url) { 
    const coords = [latitude, longitude]
    const map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(coords).addTo(map)
        .bindPopup('Your Location')
        .openPopup();
        
        getweather(url);
    
    }
    
    async function getweather(url){
        const respone = await fetch(url);
        const decodedUrl = await respone.json();
        console.log(decodedUrl);
        displayResult(decodedUrl);
    }

    function displayResult(decodedUrl){
        place.textContent = decodedUrl['name'];
        let temperature = decodedUrl['main']['temp'] - 273.17;
        temp.textContent = temperature.toFixed(2) + temp.textContent.substr(-2);
        weather.textContent = decodedUrl['weather'][0]['description'];
        pressureContent.textContent = decodedUrl['main']['pressure'] + " hpa";
        humidityContent.textContent = decodedUrl['main']['humidity'] + " %";

        let sunrise = new Date(decodedUrl['sys']['sunrise']*1000);
        let hours = sunrise.getHours();
        let minutes ="0"+ sunrise.getMinutes();
        let seconds = "0"+sunrise.getSeconds();
        sunriseContent.textContent = hours+": "+minutes.substr(-2)+": "+seconds.substr(-2)+" AM";


        let sunset = new Date(decodedUrl['sys']['sunset']*1000);
         hours = sunset.getHours();
         minutes ="0"+ sunset.getMinutes();
         seconds = "0"+sunset.getSeconds();
        sunsetContent.textContent = hours+": "+minutes.substr(-2)+": "+seconds.substr(-2)+" PM";

        
    }

btn.addEventListener('click',()=>{
    if(text.value=="")alert('enter any city');
    else{
        const city = text.value;
        text.value="";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5cc7c1fc547a2619b29962019df3ca67`;
        getweather(url);
    }
    
});