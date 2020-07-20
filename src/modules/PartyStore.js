import PartyService from '../services/PartyService.js'

export default {
  state: {
    place:{},
    isProcessing: false,
    filterBy: {
      selectedLocations: [],
      selectedTypes: [],
      sortBy: '',
      partyDetails: {
        distance: 0,
        fee: 100,
        locality: '',
        musicType: '',
        partyType: '',
      },
      date: {
        startTime: 0,
      },
    },
    partys: [],
  },
  getters: {
    place(state) {
      return state.place
    },
    isProcessing(state) {
      return state.isProcessing
    },
    partys(state) {
      return state.partys
    },
    filterBy(state) {
      return state.filterBy
    },
  },
  mutations: {
    setPlace(state, {place}) {
        console.log('place:', place)
        state.place = place
    },  
    setFilter(state, { filterBy }) {
        state.filterBy = filterBy
    },  
    setIsProcessing(state, { isProcessing }) {
      state.isProcessing = isProcessing
    },
    setPartys(state, { partys }) {
      state.partys = partys
    },
    updateFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    removeParty(state, { partyId }) {
      const idx = state.partys.findIndex((curr) => curr._id === partyId)
      state.partys.splice(idx, 1)
    },
    addParty(state, { party }) {
      state.partys.push(party)
    },
    updateParty(state, { party }) {
      const idx = state.partys.findIndex(
        (currParty) => currParty._id === party._id,
      )
      state.partys.splice(idx, 1, party)
    },
  },
  actions: {
    // LOAD
    loadPartys({ commit, state }) {
      commit({ type: 'setIsProcessing', isProcessing: true })
      console.log(state.filterBy);
      return PartyService.query(state.filterBy).then((partys) => {
        commit({ type: 'setPartys', partys })
        commit({ type: 'setIsProcessing', isProcessing: false })
        return partys
      })
    },

    // DELETE
    deleteParty({ commit }, { partyId }) {
      console.log(partyId)
      return PartyService.remove(partyId).then(() => {
        commit({ type: 'removeParty', partyId })
        return
      })
    },

    // ADD/UPDATE
    saveParty({ commit }, { party }) {
      const type = party._id ? 'updateParty' : 'addParty'
      return PartyService.save(party).then((party) => {
        commit({ type: type, party })
        return party
      })
    },

    //ADD LIKE
    addLike({ commit }, { party }) {
      return PartyService.addLike(party).then((party) => {
        commit({ type: 'updateParty', party })
        return party
      })
    },

    getPartyByLocation({ commit }) {
      return PartyService.getPartyByLocation().then((locations) => {
        console.log(locations)
        return locations
      })
    },
  },
}
