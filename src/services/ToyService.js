import HttpService from './HttpService.js'

export default {
    query,
    getById,
    remove,
    save,
    getEmptyToy
}

// CRUD
// CREATE READ UPDATE DELETE

function query(filterBy = { txt: '' ,isInStock:'',order:'asc',type:'',sort:'name'}) {
    
    
    const query = `?txt=${filterBy.txt}&_sort=${filterBy.sort}&_order=${filterBy.order}&inStock_like=${filterBy.isInStock}&type_like=${filterBy.type}`;

    return HttpService.get(`toy/${query}`)
}

function getById(id) {
        return HttpService.get(`toy/${id}`)
}

function remove(id) {
    return HttpService.delete(`toy/${id}`)
}

function save(toy) {
    return (toy._id) ? _update(toy) : _add(toy)
}

function _add(toy) {
    return HttpService.post('toy/', toy)
}
    
function _update(toy) {
    return HttpService.put(`toy/${toy._id}`, toy)
}

function getEmptyToy() {
    return {
        txt: '',
        isDone: false
    }
}



