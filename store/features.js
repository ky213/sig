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
    },
    updateFeature(state, { layerId, newProps, newPosition }) {
        const index = state.features.findIndex(({ _id }) => _id === layerId)

        state.features[index].properties = newProps
        state.features[index].geometry.coordinates = newPosition
    }
}

