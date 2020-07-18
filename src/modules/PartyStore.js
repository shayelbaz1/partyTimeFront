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
            name: "",
            desc: "",
            imgUrl: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/glow-disco-party-poster-template-2d310ac36d313dfc6fbc11b714f3859f_screen.jpg?ts=1561530801",
            fee: "",
            likes: 3,
            startDate: "",
            endDate: "",
            durationHours: 12,
            createdAt: 1541652422,
            location: {
              name: "",
              lat: 20.55,
              lng: 20.77
            },
            extraData: {
              musicTypes: [
              ],
              partyTypes: "",
              createdBy: {
                _id: "u101",
                fullName: "Orly Amdadi",
                imgUrl: "http://some-img"
              },
              members: [
                {
                  _id: "u101",
                  fullName: "Orly Amdadi",
                  imgUrl: "http://some-img"
                },
                {
                  _id: "u101",
                  fullName: "Orly Amdadi",
                  imgUrl: "http://some-img"
                }
              ],
              reviews: []
            }
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
        removeParty(state, {partyId}) {
            const idx = state.partys.findIndex(curr => curr._id === partyId);
            state.partys.splice(idx, 1);
        },
        addParty(state, {party}) {
            state.partys.push(party)
        },
        updateParty(state,{party}){
            const idx = state.partys.findIndex(currParty => currParty._id === party._id);
            state.partys.splice(idx,1,party)
        }
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
        deleteParty({commit},{partyId}){
            console.log(partyId);
            return PartyService.remove(partyId)
                .then(()=>{
                    commit({type:'removeParty', partyId })
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
        },

        //ADD LIKE 
        addLike({commit}, {party}){
            return PartyService.addLike(party)
                .then(party => {
                    commit({type:"updateParty", party})
                    return party
                })
        },

        getPartyByLocation({commit}, {locationName}){
            return PartyService.getPartyByLocation(locationName)
                .then(locations => {
                    console.log(locations);
                    return locations
                })
        },

    }
};