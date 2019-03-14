export const state = () => ({
    schemas: {},
})

export const mutations = {
    add(state, payload) {
        state.schemas = payload
    },
    names(state, payload) {
        state.names = payload
    }
}


export const getters = {
    names(state) {
        return state.schemas.map(({ name }) => name)
    }
}