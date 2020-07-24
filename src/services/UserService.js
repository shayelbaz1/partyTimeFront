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

async function update(user) {
    const updatedUser = await HttpService.put(`user/${user._id}`, user)
    return _handleLogin(updatedUser)
}

async function login(creds) {
    const user = await HttpService.post('auth/login', creds)
    return _handleLogin(user)
}

async function signup(creds) {
    console.log('user service signup creds', creds);
    const user = await HttpService.post('auth/signup', creds)
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