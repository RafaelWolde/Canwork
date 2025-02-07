navigator.geolocation.getCurrentPosition(
  function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude
    let loc = "Latitude: " + latitude + ", Longitude: " + longitude
    
    sendInfo(loc)
    alert(loc)
  },
  function(error) {
    console.error("Error getting location: ", error.message);
  }
);
sendInfo('hermit crab')
function sendInfo(location) {
  let url = "https://rafaelmenna.pythonanywhere.com/info/?info="+location
  fetch(url).then((res) => {
      return res.text()
  }).then((text) => {
      console.log(text)
  })
}