import PartyService from '../services/PartyService.js'

export default {
  state: {
    place: {},
    // place: {pos:{lat:32.068424,lng:34.824785}},
    filterBy: {
      // userLocation: {pos:{lat:32.068424,lng:34.824785}},
      userLocation: {},
      startTime: '',
      selectedLocations: [],
      selectedTypes: [],
      sortBy: 'startDate',
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
    setUserLocation(state, { place }) {
      console.log('place:', place)
      state.filterBy.userLocation = place
    }
    ,
    setPlace(state, {place}) {
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
      console.log('state.filterBy in PartyStore before:', state.filterBy)
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

    getPartyLocations({ commit }) {
      return PartyService.getPartyLocations().then((locations) => {
        return locations
      })
    },

    addPartysDistance({ commit }, { place }) {
      return PartyService.addPartysDistance(place).then(() => {
        commit({ type: 'updateParty', party })
        return party
      })
    },
  },
}
