import axios from "axios";

export const actions = {
    async nuxtServerInit({ commit }, context) {
        const { data: { Schemas } } = await axios(`http://${process.env.HOST}:3000/schemas`)
        const slugs = Schemas.map(({ slug }) => slug)
        const requests = slugs.map(slug => () => axios(`http://${process.env.HOST}:3000/collections/${slug}`))
        const response = await axios.all(requests.map(req => req()))

        response.forEach(({ data, request: { path } }) => {
            const schemaName = path.split('/')[2]
            const features = data[schemaName]
            features.forEach(feature => {
                feature.schema = schemaName
                commit('features/add', feature)
            })
            commit('schemas/add', Schemas)
        })

    }
}
