
export const Weather = (lat, lon) => {
return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=55612027b5e7e215367451a9c745f79a&units=imperial`)
.then(response => response.json())
}
//https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}

// export const fetchWeather = () => {
//     return fetch(`${weatherKey}`) 
//         .then(response => response.json())
//         .then((weatherFetched) => {
//             weatherState = weatherFetched
//             console.log(weatherFetched)
//         }
//     )
// }
export const popUpText = (weatherBox) => {
    let html = `<div id="overlay">
    <div id="popup">
    <button id="popupclose">X</button>
    <div class="popupcontent">
    <img src="https://th.bing.com/th/id/R.5558bbf1826d282a9c8a6f89ed2f0d71?rik=GiaLpRnnDCdeHg&riu=http%3a%2f%2fclipart-library.com%2fimages%2fkcMnxX9Xi.png&ehk=MMap2R4kS4DBPxZ61jSTXobR%2bQpOOy2%2fI3KAEVgYeLI%3d&risl=&pid=ImgRaw&r=0" width="50px" height="50px">
        <h2> Today's weather for ${weatherBox.name}</h2>
        <h3>The temperature is ${weatherBox.main.temp}</h3>
        <h3>It feels like ${weatherBox.main.feels_like}</h3>
        <h3>The humidity is ${weatherBox.main.humidity}</h3>
    </div>
</div>
</div>
`
const popUp = document.querySelector("#popUpGoHere")
    popUp.innerHTML = html

}
document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "popupclose") {
        // const mainContainer = document.querySelector("#container")
        // mainContainer.innerHTML = TruncheonsAndFlagons()
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
 
    // Close Popup Event
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
})