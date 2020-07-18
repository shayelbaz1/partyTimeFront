import HttpService from './HttpService.js'

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

function save(party) {
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
    txt: '',
    isDone: false,
  }
}

async function getPartyByLocation(locationName) {
  const parties = await HttpService.get(`party?location.name_like=${locationName}`)
  return parties.map(party => {
    return { lat: party.location.lat, lng: party.location.lng }
  })
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
    ]
  }
  return types
}