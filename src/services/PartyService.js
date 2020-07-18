import HttpService from './HttpService.js'
import GeocodeService from './GeocodeService.js'

export default {
  query,
  getById,
  remove,
  save,
  getEmptyParty,
  addLike,
  getPartyByLocation,
  getMusicPartyTypes,
}

// CRUD
// CREATE READ UPDATE DELETE

function query(
  filterBy = { txt: '', isInStock: '', order: 'asc', type: '', sort: 'name' },
) {
  // const query = `?txt=${filterBy.txt}&_sort=${filterBy.sort}&_order=${filterBy.order}&inStock_like=${filterBy.isInStock}&type_like=${filterBy.type}`;
  // const query = ''
  // return HttpService.get(`party/${query}`)
  return HttpService.get(`party/`)
}

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
  console.log(location);
  party.location.lat = location.lat
  party.location.lng = location.lng
  return party._id ? _update(party) : _add(party)
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
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/glow-disco-party-poster-template-2d310ac36d313dfc6fbc11b714f3859f_screen.jpg?ts=1561530801',
    fee: '',
    likes: 0,
    startDate: '',
    endDate: '',
    durationHours: 0,
    createdAt: 0,
    location: {
      name: '',
      lat: 0,
      lng: 0,
    },
    extraData: {
      musicTypes: [],
      partyTypes: [],
      createdBy: {
        _id: '',
        fullName: '',
        imgUrl: '',
      },
      members: [
        {
          _id: '',
          fullName: '',
          imgUrl: '',
        },
        {
          _id: '',
          fullName: '',
          imgUrl: '',
        },
      ],
      reviews: [],
    },
  }
}

async function getMusicPartyTypes() {
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

async function getPartyByLocation() {
  const parties = await query()
  return parties
}
