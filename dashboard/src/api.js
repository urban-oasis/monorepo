import forge from 'mappersmith'
import EncodeJson from 'mappersmith/middleware/encode-json'
import TimeoutMiddleware from 'mappersmith/middleware/timeout'
const Timeout = TimeoutMiddleware(5000)

const AuthMiddleware = () => ({
  request (request) {
    const accessToken = window.localStorage.getItem('accessToken')
    if (!accessToken) {
      return request
    }
    return request.enhance({
      headers: { 'Authorization': accessToken }
    })
  }
})

export default forge({
  middleware: [ EncodeJson, AuthMiddleware, Timeout ],
  host: 'https://europe-west2-urbanoasis.cloudfunctions.net/',
  resources: {
    Farms: {
      all: { path: '/getFarms', method: 'get' }
    },
    Racks: {
      all: { path: '/getRacks', method: 'get' }
    },
    Sensors: {
      all: { path: '/getSensors', method: 'get' },
      update: { path: '/getSensors', method: 'put' }
    },
    Session: {
      create: { path: '/auth/google', method: 'post' }
    }
  }
})
