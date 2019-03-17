export const state = () => ({
    features: [],
    newFeature: null
})

export const mutations = {
    add(state, payload) {
        state.features.push(payload)
    },
    addNewFeature(state, payload) {
        state.newFeature = payload
    }
}

