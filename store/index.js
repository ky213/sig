import axios from "axios";

export const actions = {
    async nuxtServerInit({ commit }, context) {
        const { data: { Schemas } } = await axios('http://localhost:3000/schemas')
        const names = Schemas.map(({ name }) => name)
        const requests = names.map(name => () => axios(`http://localhost:3000/collections/${name}`))
        const response = await axios.all(requests.map(req => req()))

        response.forEach(({ data: { Collections }, request: { path } }) =>
            Collections.forEach((doc) =>
                commit('features/add', { ...doc, schema: path.split('/')[2] })
            ));
        commit('schemas/add', Schemas)
    }
}
