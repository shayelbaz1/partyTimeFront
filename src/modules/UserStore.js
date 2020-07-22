import UserService from '@/services/UserService.js'

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export default {
    state: {
        loggedinUser : {username:"Guest", email:"guest@gmail.com" ,isAdmin: false, imgURL:"https://picsum.photos/200"},
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
        loggedinUser(state) {
            return state.loggedinUser
        }
    },
    mutations: {
        setUser(state, {user}) {
            state.loggedinUser = user;
        },
        setCurrUser(state, {user}) {
            console.log('user setted in set curr user:', user)
            state.currUser = user;
        },
        setUsers(state, {users}) {
            state.users = users;
        },
        removeUser(state, {userId}) {
            state.users = state.users.filter(user => user._id !== userId)
        },
    },
    actions: {
        async login(context, {creds}) {
            const user = await UserService.login(creds);
            context.commit({type: 'setUser', user})
            return user;
        },
        async signup(context, {creds}) {
            const user = await UserService.signup(creds)
            context.commit({type: 'setUser', user})
            return user;
            
        },
        async logout(context) {
            await UserService.logout()
            context.commit({type: 'setUsers', users: []})
            context.commit({type: 'setUser', user: null})
        },
        async loadUsers(context) {
            const users = await UserService.getUsers();
            context.commit({type: 'setUsers', users})
        },
        async removeUser(context, {userId}) {
            await UserService.remove(userId);
            context.commit({type: 'removeUser', userId})
        },
        async getById(context, {userId}) {
            console.log('userId in userStore:', userId)
            const user = await UserService.getById(userId);
            console.log('user founded in store:', user)
            context.commit({type: 'setCurrUser', user})
            return user
        },
        async updateUser(context, {user}) {
            user = await UserService.update(user);
            context.commit({type: 'setUser', user})
        }
    }
}