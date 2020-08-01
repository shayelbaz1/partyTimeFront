import HttpService from './HttpService.js'
import GeocodeService from './GeocodeService.js'

export default {
  query,
  getById,
  remove,
  save,
  getEmptyParty,
  addLike,
  getMusicPartyTypes,
  getPartyLocations,
  addPartyReview
}

// CRUD
// CREATE READ UPDATE DELETE

function query(filterBy) {
  const query = `?sortBy=${filterBy.sortBy}&fee=${filterBy.partyDetails.fee}&locations=${JSON.stringify(filterBy.selectedLocations)}&partyTypes=${JSON.stringify(filterBy.selectedTypes)}&startTime=${filterBy.startTime}&distance=${filterBy.partyDetails.distance}&userLocation=${JSON.stringify(filterBy.userLocation)}`
  return HttpService.get(`party/${query}`)
}

function getPartyLocations() {
  return HttpService.get(`party/locations`)
}

//TODO:REFACTOR CODE
function addLike(party) {
  party.likes++
  return HttpService.put(`party/${party._id}`, party)
}

function getById(id) {
  return HttpService.get(`party/${id}`)
}

function remove(partyId) {
  return HttpService.delete(`party/${partyId}`)
}

async function save(party) {
  const location = await GeocodeService.getLatLng(party.location.name)
  party.location.lat = location.lat
  party.location.lng = location.lng
  party.location.coordinates[0] = location.lat
  party.location.coordinates[1] = location.lng
  return party._id ? _update(party) : _add(party)
}

function addPartyReview(review) {
  return HttpService.put('party/addReview', review)
}

function _add(party) {
  return HttpService.post('party/', party)
}

function _update(party) {
  return HttpService.put(`party/${party._id}`, party)
}

function getEmptyParty() {
  return {
    name: '',
    desc: '',
    imgUrl:
      'https://res.cloudinary.com/partytime/image/upload/v1596154782/partyImgs/xvu8pz4mrmntrqqqe6ko.png',
    fee: 0,
    likes: 0,
    startDate: '',
    endDate: '',
    durationHours: 0,
    createdAt: new Date(),
    location: {
      name: '',
      lat: 0,
      lng: 0,
      type: "Point",
      coordinates: [
        40.7127753,
        -74.0059728
      ]
    },
    extraData: {
      musicTypes: [],
      partyTypes: [],
      createdBy: {
        _id: '',
        username: '',
        imgURL: '',
      },
      members: [],
      reviews: [],
      likes: [],
      membersCnt: 0
    },
  }
}

function getMusicPartyTypes() {
  const types = {
    musicTypes: [
      'Acoustic',
      'Blues',
      'Bollywood',
      'Classical',
      'Country',
      'Disco',
      'Drum & Bass',
      'Drum & Electrtonic',
      'Folk',
      'Funk',
      'Hip Hop',
      'House',
      'Jazz',
      'Latin',
      'Metal',
      'Pop',
      'R&B',
      'Reggae',
      'Retro',
      'Rock',
      'Techno',
      'Trance',
      'World',
    ],
    partyTypes: [
      'After Party',
      'Beach Party',
      'Clubbing',
      'Day Party',
      'Ecstatic Dance',
      'Fetsival',
      'House Party',
      'Jamming',
      'Karaoke',
      'Sing',
      'Late Night',
      'Live Concert',
      'Open Mic',
      'Pool',
      'Rave',
      'Workshop',
    ],
  }
  return types
}
