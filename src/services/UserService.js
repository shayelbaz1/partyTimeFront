import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update
}


function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

async function login(creds) {
    console.log(creds);
    const user = await HttpService.post('auth/login', creds)
    return _handleLogin(user)
}

async function signup(creds) {
    // console.log('user service', creds);
    const user = await HttpService.post('auth/signup', creds)
    console.log(user);
    return _handleLogin(user)
}

async function logout() {
    await HttpService.post('user/');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}