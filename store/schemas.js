export const state = () => ({
    schemas: {},
    layerGroups: []
})

export const mutations = {
    add(state, payload) {
        state.schemas = payload
    },
    addNewSchema(state, payload) {
        state.schemas.push(payload)
    }
    ,
    addLayerGroup(state, payload) {
        state.layerGroups.push(payload)
    }
}
