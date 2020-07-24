import UserService from '@/services/UserService.js'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser :{_id:'u101',username:"Guest", email:"guest@gmail.com" ,isAdmin: false, imgURL:"https://picsum.photos/200"},
        users: [],
        currUser: {}
    },
    getters: {
        currUser(state) {
            return state.currUser
        },
        users(state) {
            return state.users;
        },
        loggedInUser(state) {
            return JSON.parse(state.loggedInUser)

        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedInUser = user;
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
    },
    actions: {
        async login(context, { creds }) {
            const user = await UserService.login(creds);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async signup(context, {creds}) {
            const user = await UserService.signup(creds)
            context.commit({ type: 'setUser', user })
            return user;

        },
        async logout(context) {
            await UserService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
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
            context.commit({type: 'setUser', user})
        }
    }
}