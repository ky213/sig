export const state = () => ({
    features: []
})

export const mutations = {
    add(state, payload) {
        state.features.push(payload)
    }
}

