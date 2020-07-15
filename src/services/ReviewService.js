import HttpService from './HttpService'

export default {
    add,
    query,
    remove
}

function query(id) {
    return HttpService.get(`review?id=${id}`)
}

function remove(reviewId) {
    return HttpService.delete(`review/${reviewId}`)
}
function add(review) {
    return HttpService.post(`review`, review)
}



