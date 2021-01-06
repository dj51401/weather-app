$('#form').on('submit',(e) => {
    e.preventDefault();
})

const searchElement = document.querySelector('[data-search-bar]')
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if(place == null) return
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            key: '',
            lat: `${lat}`,
            lon: `${lon}`,
            days: 3,
        })
    }).then(res => res.json()).then(data => {
        setWeather(data, place.formatted_address);
    })

    var locationOutput = document.querySelector('[data-location]')
    var tempOutput = document.querySelector('[data-temp]')
    var feelsLike = document.querySelector('[data-feels-like]')
    var weatherIcon = document.querySelector('[data-icon]')

    function setWeather(data, place){
        locationOutput.innerHTML = place;
        tempOutput.innerHTML = data.current.temp_f + "ºF";
        feelsLike.innerHTML = "Feels like: " + data.current.feelslike_f + "ºF";
        weatherIcon.src = data.current.condition.icon;
    }

})




