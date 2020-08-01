import UserService from '@/services/UserService.js'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        isLoggedIn: false,
        loggedInUser: { _id: 'u101', username: "Guest", email: "guest@gmail.com", isAdmin: false, imgURL: "https://picsum.photos/200",goingPartys:[] },
        users: [],
        currUser: {},
        isLoginError: false
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        currUser(state) {
            return state.currUser
        },
        users(state) {
            return state.users;
        },
        loggedInUser(state) {
            return state.loggedInUser
        },
        // isLoginError(state) {
        //     return state.isLoginError
        // }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user;
            // console.log('logged in user in UserStore:', state.loggedInUser)
        },
        setIsLoggedIn(state, { bool }) {
            console.log('bool:', bool)
            state.isLoggedIn = bool;
            console.log('state.isloggedIn:', state.isLoggedIn)
        },
        setCurrUser(state, { user }) {
            state.currUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        removeUser(state, { userId }) {
            state.users = state.users.filter(user => user._id !== userId)
        },
        // isLoginError(state, { isLoginError }) {
        //     state.isLoginError = isLoginError
        // },
    },
    actions: {
        async loginGoogle(context, { id_token }) {
            id_token = { id_token: id_token }
            const user = await UserService.loginGoogle(id_token);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async login(context, { creds }) {
            console.log('creds go to store', creds);
            const user = await UserService.login(creds);
            if (user === undefined) {
                // context.commit({ type: 'isLoginError', isLoginError: true });
                return;
            }
            else {
                // context.commit({ type: 'isLoginError', isLoginError: false });
                context.commit({ type: 'setUser', user })
                return user;
            }
        },
        async signup(context, { creds }) {
            const user = await UserService.signup(creds)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await UserService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: { _id: 'u101', username: "Guest", email: "guest@gmail.com", isAdmin: false, imgURL: "https://picsum.photos/200" } })
        },
        async loadUsers(context) {
            const users = await UserService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
        async removeUser(context, { userId }) {
            await UserService.remove(userId);
            context.commit({ type: 'removeUser', userId })
        },
        async getById(context, { userId }) {
            const user = await UserService.getById(userId);
            context.commit({ type: 'setCurrUser', user })
            return user
        },
        async updateUser(context, { user }) {
            user = await UserService.update(user);
            context.commit({ type: 'setUser', user })
        }
    }
}