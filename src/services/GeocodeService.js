const axios = require('axios');

export default {
    getLatLng
  }

async function getLatLng(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB5jw90V3SohX_6yfkksWy85ejIIPboA7A`
    )
    const geocode = response.data
    return geocode.results[0].geometry.location
}