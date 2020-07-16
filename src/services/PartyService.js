import HttpService from './HttpService.js'

export default {
    query,
    getById,
    remove,
    save,
    getEmptyParty
}

// CRUD
// CREATE READ UPDATE DELETE

function query(filterBy = { txt: '' ,isInStock:'',order:'asc',type:'',sort:'name'}) {
    
    
    // const query = `?txt=${filterBy.txt}&_sort=${filterBy.sort}&_order=${filterBy.order}&inStock_like=${filterBy.isInStock}&type_like=${filterBy.type}`;
    // const query = ''
    // return HttpService.get(`party/${query}`)
    return HttpService.get(`party/`)
}

function getById(id) {
        return HttpService.get(`party/${id}`)
}

function remove(id) {
    return HttpService.delete(`party/${id}`)
}

function save(party) {
    return (party._id) ? _update(party) : _add(party)
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
        isDone: false
    }
}



