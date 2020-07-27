const axios = require('axios');

export default {
    getLatLng,
    getCityByLatLng
}

async function getLatLng(address) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAIRUoau4daansiuIk9xffRyjL8yJYv8SI`
    )
    const geocode = response.data
    return geocode.results[0].geometry.location
}
async function getCityByLatLng(pos) {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&sensor=true&key=AIzaSyAIRUoau4daansiuIk9xffRyjL8yJYv8SI`
    )
    let cityName = response.data.plus_code.compound_code
    cityName = cityName.substr(cityName.indexOf(" ") + 1);
    return cityName
}
