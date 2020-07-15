import ToyService from '@/services/ToyService.js';

export default {
    strict: true,
    state: {
        isProcessing: false,
        filterBy:{
            txt: "",
            isInStock: "",
            order: "asc",
            type: "",
            sort: "name"
        },
        toys: [],
        emptyToy:{
            name: '',
            price: '',
            type: 'Funny',
            createdAt: Date.now(),
            inStock: false
        }
    },
    getters: {
        emptyToy(state){
            return state.emptyToy
        },
        isProcessing(state){
            return state.isProcessing
        },
        toys(state){
            return state.toys
        },
        filterBy(state){
            return state.filterBy
        },
    },
    mutations: {
        setIsProcessing(state, {isProcessing}){
            state.isProcessing = isProcessing
        },
        setToys(state,{toys}){
            state.toys = toys
        },
        updateFilterBy(state,{filterBy}){
            state.filterBy = filterBy
        },
        removeToy(state, {id}) {
            const idx = state.toys.findIndex(curr => curr._id === id);
            state.toys.splice(idx, 1);
        },
        addToy(state, {toy}) {
            state.toys.push(toy)
        },
        updateToy(state,{toy}){
            const idx = state.toys.findIndex(currToy => currToy._id === toy._id);
            state.toys.splice(idx,1,toy)
        },
    },
    actions: {
        // LOAD
        loadToys({ commit, state }) {
            commit({ type: 'setIsProcessing', isProcessing: true })
            
            return ToyService.query(state.filterBy)
            .then(toys=>{
                commit({type: 'setToys', toys})
                commit({type: 'setIsProcessing', isProcessing: false})
                    return toys
                })
        },

        // DELETE
        removeToy({commit},{id}){
            return ToyService.remove(id)
                .then(()=>{
                    commit({type:'removeToy',id:id })
                    return
                })
        },

        // ADD/UPDATE
        saveToy({commit},{toy}){
            const type = toy._id?'updateToy':'addToy'
            return ToyService.save(toy)
                .then(toy=>{
                    commit({type:type,toy})
                    return toy
                })
        }
    }
};