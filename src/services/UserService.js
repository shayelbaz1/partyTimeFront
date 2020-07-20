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
    //TODO: GET ALL USERS
    //TODO: FIND SPECIFIC USER BY USERNAME AND Pssword
    //todo: if found return user

    console.log(creds);
    const user = findUserByCreds(creds.username)
    return _handleLogin(user)
}
async function signup(creds) {
    console.log(creds);
    const user = findUserByCreds(creds.username);

    if (user.length) return user;
    if (!user.length) return await HttpService.post('user/', creds);

    return _handleLogin(user)
}

async function findUserByCreds(creds) {
    const user = await HttpService.get(`user?userName=${creds}`)
    return user
}

async function logout() {
    await HttpService.post('user/');
    sessionStorage.clear();
}
function getUsers() {
    return HttpService.get('user')
}

function _handleLogin(user) {
    console.log('user:', user)
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}