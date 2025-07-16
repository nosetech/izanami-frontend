import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { LRUCache } from 'lru-cache'

const options = {
  max: 500,
  ttl: 1000 * 60 * 5,
}
const cache = new LRUCache(options)

export const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: process.env.NEXT_PUBLIC_RESTAPI_URI,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json',
    withCredentials: true,
  }),
  cache: cache,
})
