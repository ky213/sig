export const state = () => ({
    schemas: {},
    layerGroups: []
})

export const mutations = {
    add(state, payload) {
        state.schemas = payload
    },
    addLayerGroup(state, payload) {
        state.layerGroups.push(payload)
    }
}

export const getters = {
    names(state) {
        return state.schemas.map(({ name }) => name)
    }
}