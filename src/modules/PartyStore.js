import PartyService from '../services/PartyService.js';

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
        partys: [],
        emptyParty:{
            name: '',
            price: '',
            type: 'Funny',
            createdAt: Date.now(),
            inStock: false
        }
    },
    getters: {
        emptyParty(state){
            return state.emptyParty
        },
        isProcessing(state){
            return state.isProcessing
        },
        partys(state){
            return state.partys
        },
        filterBy(state){
            return state.filterBy
        },
    },
    mutations: {
        setIsProcessing(state, {isProcessing}){
            state.isProcessing = isProcessing
        },
        setPartys(state,{partys}){
            state.partys = partys
        },
        updateFilterBy(state,{filterBy}){
            state.filterBy = filterBy
        },
        removeParty(state, {id}) {
            const idx = state.partys.findIndex(curr => curr._id === id);
            state.partys.splice(idx, 1);
        },
        addParty(state, {party}) {
            state.partys.push(party)
        },
        updateParty(state,{party}){
            const idx = state.partys.findIndex(currParty => currParty._id === party._id);
            state.partys.splice(idx,1,party)
        },
    },
    actions: {
        // LOAD
        loadPartys({ commit, state }) {
            commit({ type: 'setIsProcessing', isProcessing: true })
            
            return PartyService.query(state.filterBy)
            .then(partys=>{
                commit({type: 'setPartys', partys})
                commit({type: 'setIsProcessing', isProcessing: false})
                    return partys
                })
        },

        // DELETE
        removeParty({commit},{id}){
            return PartyService.remove(id)
                .then(()=>{
                    commit({type:'removeParty',id:id })
                    return
                })
        },

        // ADD/UPDATE
        saveParty({commit},{party}){
            const type = party._id?'updateParty':'addParty'
            return PartyService.save(party)
                .then(party=>{
                    commit({type:type,party})
                    return party
                })
        }
    }
};