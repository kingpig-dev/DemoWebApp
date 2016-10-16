$(document).ready(function() {
  getWeather();
  getForecast();

  $("#search-box").keyup( event => {
    if (event.keyCode == 13) {
      $("#search-button").click();
    }
  });
});

function initMap( lat, long ) {
  var uluru = { lat: lat, lng: long };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function getWeather( searchQuery ) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?'; // url for the API
  var params = {
    APPID: apiKey,
    units: 'imperial'
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 4930956
  }

  $.ajax(url + $.param( params ), {
    success: ( data ) => onSuccess( data ),
    error: function (error) {
      $('.error-message').text('An error occurred!');
    }
  });

  function onSuccess( data ) {
    let temp = Math.round(data.main.temp);
    let max = Math.round(data.main.temp_max);
    let min = Math.round(data.main.temp_min);

    if ( data.weather[0].description === 'clear sky') {
      data.weather[0].description = 'clear skies';
    }

    $('.city').text(data.name);
    $('.weather').text(data.weather[0].description);
    $('.temp').text(temp + ' °F');
    $('.max').text(max + ' °F');
    $('.min').text(min + ' °F');
    $('.humidity').text(data.main.humidity + '%');

    var lat = parseFloat(data.coord.lat);
    var long = parseFloat(data.coord.lon);

    initMap( lat, long );
  }
}

function searchWeather() {
  var searchQuery = $('.search').val(); // grab value from search input
  getWeather(searchQuery);
}

function searchForecast() {
  var searchQuery = $('.search').val();
  getForecast(searchQuery);
}

function getForecast( searchQuery ) {
  var url = 'http://api.openweathermap.org/data/2.5/forecast?';
  var params = {
    APPID: apiKey,
    units: 'imperial'
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 4930956
  }

  $.ajax(url + $.param( params ), {
    success: ( data ) => onSuccess( data ),
    error: function (error) {
      $('.error-message').text('An error occurred!');
    }
  });

  function onSuccess( data ) {
    let dayOne = data.list[0];

    $('.dayOne').text(dayOne.main.temp);
  }
}
