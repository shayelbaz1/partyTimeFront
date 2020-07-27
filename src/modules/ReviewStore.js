import ReviewService from '../services/ReviewService.js'

export default {
    state: {
        reviews: []
    },
    getters: {
        reviews(state) {
            return state.reviews;
        },

    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.unshift(review)
        },
        removeReview(state, { reviewId }) {
            state.reviews = state.reviews.filter(review => review._id !== reviewId)
        },
    },
    actions: {
        async addReview(context, { review }) {
            review = await ReviewService.add(review)
            context.commit({ type: 'addReview', review })
            return review;
        },

        async loadReviews(context, { id = '' }) {
            const reviews = await ReviewService.query(id);
            context.commit({ type: 'setReviews', reviews })
        },
        async removeReview(context, { reviewId }) {
            await ReviewService.remove(reviewId);
            context.commit({ type: 'removeReview', reviewId })
        },

    }
}