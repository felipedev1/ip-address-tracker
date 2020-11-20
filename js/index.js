const geolocationApiKey = 'at_RbRs82dbY15EhtWPECU9VkJVTRXZ1'
let ipAddress = ''

const ipField = document.getElementById('ip')
const locationField = document.getElementById('location')
const timezoneField = document.getElementById('timezone')
const ispField = document.getElementById('isp')

//add leaflet map
let map = L.map('map')
L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const iconLocation = L.icon({
  iconUrl: '../images/icon-location.svg',
  iconSize: [38, 42],
})


//fetch data
window.addEventListener('load', getIpInfo())

document.getElementById('searchIp').addEventListener('change', (event) => {
  ipAddress = event.target.value
})

document.getElementById('searchIpForm').addEventListener('submit', (event) => {
  event.preventDefault()

  getIpInfo()
})

//ip info close
const ipInfo = document.querySelector('.ip-info')
ipInfo.addEventListener('click', () => {
  ipInfo.classList.toggle('closed')
})


function getIpInfo() {
  fetch(`https://geo.ipify.org/api/v1?apiKey=${geolocationApiKey}&ipAddress=${ipAddress}`)
  .then(res => res.json())
  .then(response => {
    if(response.ip) {
      ipField.innerHTML = response.ip
      locationField.innerHTML = `${response.location.city}, ${response.location.country}`
      timezoneField.innerHTML = response.location.timezone
      ispField.innerHTML = response.isp
      map.setView([response.location.lat, response.location.lng], 15)
      L.marker([response.location.lat, response.location.lng]).setIcon(iconLocation).addTo(map);
    } else {
      throw Error
    }
    })
  .catch(error => alert('Invalid IP address'))
}