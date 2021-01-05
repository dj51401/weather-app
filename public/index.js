var city;
$('#form').on('submit', function(e){
    e.preventDefault();
    city = document.getElementById("cityinput").value;
    apiCall();
})

function apiCall(){
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            key: '',
            q: city,
        })
    }).then(res => res.json()).then(data => {
        setWeather(data);
    })

    var locationOutput = document.querySelector('[data-location]')
    var tempOutput = document.querySelector('[data-temp]')
    var feelsLike = document.querySelector('[data-feels-like]')

    function setWeather(data){
        locationOutput.innerHTML = data.location.name;
        tempOutput.innerHTML = data.current.temp_f + "ºF";
        feelsLike.innerHTML = data.current.feelslike_f + "ºF";
    }

}




