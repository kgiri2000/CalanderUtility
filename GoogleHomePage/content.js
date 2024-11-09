// Create a <style> element to add custom CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .custom-search {
    padding: 8px;
    width: 200px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    margin-top: 10px;
  }

  .custom-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .custom-div {
    flex: 1;
    padding: 10px;
    background-color: #f4f4f4;
    border-radius: 5px;
    margin: 0 10px;
  }

  .custom-div1 {
    flex: 1;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin: 0 10px;
    text-align: center;
  }

  .custom-div2 {
    flex: 1;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin: 0 10px;
    text-align: center;
  }

  .custom-div1 h3, .custom-div2 h3 {
    margin-bottom: 10px;
  }

  .custom-div1 .weather-info, .custom-div2 .traffic-info {
    font-size: 16px;
    font-weight: bold;
  }
`;
document.head.appendChild(style);

// Find the target container (e.g., the element with class 'o3j99 qarstb')
const container = document.querySelector('.o3j99.qarstb');
if (container) {
  // Create two div elements
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  
  // Add classes to the divs
  div1.classList.add('custom-div1');
  div2.classList.add('custom-div2');

  // Fetch the weather data (Example: OpenWeatherMap API)
  const weatherApiKey = 'bae2be234d0502bbe242cf5ea4ea592f';  // Replace with your OpenWeatherMap API key
  const city = 'Laramie';  // Replace with the desired city

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Create elements to display weather info
      const weatherTitle = document.createElement('h3');
      weatherTitle.textContent = `Weather in ${data.name}`;

      const weatherInfo = document.createElement('div');
      weatherInfo.classList.add('weather-info');
      weatherInfo.innerHTML = `
        Temperature: ${data.main.temp}°C<br>
        Weather: ${data.weather[0].description}<br>
        Humidity: ${data.main.humidity}%<br>
        Wind Speed: ${data.wind.speed} m/s
      `;

      // Append weather information to div1
      div1.appendChild(weatherTitle);
      div1.appendChild(weatherInfo);

      // Fetch the traffic data (Example: Google Maps Traffic API)
      const googleMapsApiKey = 'AIzaSyCodNBhsx9OynsFVjw3Ff4q8xCca0t_TF4'; // Replace with your Google Maps API key
      const origin = 'Laramie';  // Replace with your origin
      const destination = 'Denver';  // Replace with your destination

      fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&key=${googleMapsApiKey}`)
        .then(response => response.json())
        .then(trafficData => {
          // Check for traffic information and display it
          if (trafficData.routes && trafficData.routes.length > 0) {
            const trafficInfo = trafficData.routes[0].legs[0];
            const trafficTitle = document.createElement('h3');
            trafficTitle.textContent = `Traffic Information`;

            const trafficDetails = document.createElement('div');
            trafficDetails.classList.add('traffic-info');
            trafficDetails.innerHTML = `
              Duration: ${trafficInfo.duration.text}<br>
              Distance: ${trafficInfo.distance.text}<br>
              Traffic: ${trafficInfo.duration_in_traffic.text}
            `;

            // Append traffic information to div2
            div2.appendChild(trafficTitle);
            div2.appendChild(trafficDetails);
          } else {
            div2.textContent = 'No traffic data available.';
          }

          // Append div1 (weather info) and div2 (traffic info) to the container
          container.classList.add('custom-container');
          container.appendChild(div1);
          container.appendChild(div2);
        })
        .catch(error => {
          console.error('Error fetching traffic data:', error);
          div2.textContent = 'Failed to load traffic data';
          container.appendChild(div2);
        });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      div1.textContent = 'Failed to load weather data';
      container.appendChild(div1);
    });
}
