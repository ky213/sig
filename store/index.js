import axios from "axios";
const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://box.eadn.dz/sig-backend'
const pathSLot = process.env.NODE_ENV === "development" ? 2 : 3

export const actions = {
  async nuxtServerInit({
    commit
  }, context) {
    const {
      data: {
        Schemas
      }
    } = await axios(`${host}/schemas`)
    const slugs = Schemas.map(({
      slug
    }) => slug)
    const requests = slugs.map(slug => () => axios(`${host}/collections/${slug}`))
    const response = await axios.all(requests.map(req => req()))

    response.forEach(({
      data,
      request: {
        path
      }
    }) => {
      const schemaName = path.split('/')[pathSLot]
      const features = data[schemaName]

      features.forEach(feature => {
        feature.schema = schemaName
        commit('features/add', feature)
      })
      commit('schemas/add', Schemas)
    })

  }
}
