import PartyService from '../services/PartyService.js'

export default {
  state: {
    isProcessing: true,
    place: {
      name: "Tel Aviv-Yafo, Israel",
      pos: {
        lat: 32.0852999,
        lng: 34.78176759999999
      }
    },
    filterBy: {
      userLocation: {
        name: "Tel Aviv-Yafo, Israel",
        pos: {
          lat: 32.0852999,
          lng: 34.78176759999999
        }
      },
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
    setPlace(state, { place }) {
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
    addReview(state, { review }) {
      const party = state.partys.find(
        (currParty) => currParty._id === review.currPartyId,
      )
      party.extraData.reviews.unshift(review)
    },
  },
  actions: {
    // LOAD
    loadPartys({ commit, state }) {
      commit({ type: 'setIsProcessing', isProcessing: true })
      return PartyService.query(state.filterBy).then((partys) => {
        commit({ type: 'setPartys', partys })
        commit({ type: 'setIsProcessing', isProcessing: false })

        return partys
      })
    },

    // DELETE
    deleteParty({ commit }, { partyId }) {
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

    addPartyReview({ commit }, { review }) {
      console.log("got review in service:", review);
      return PartyService.addPartyReview(review).then((party) => {
        commit({ type: 'addReview', review })
        return party
      })
    },
  },
}
