import { AxiosResponse } from 'axios'
import { IArtist } from '../../../types/IArtist'
import axios from '../axios'

interface IFindManyResponse<T> {
  items: T[]
  lastPage: number
  page: number
  total: number
  limit: number
}

export interface IFindManyRequest {
  limit: number
  page: number
  sort: string
  title: string
  description: string
}

const defaultParams: IFindManyRequest = {
  page: 1,
  limit: 10,
  sort: '_id',
  title: '',
  description: '',
}

const endpoints = {
  findMany: (
    data: IFindManyRequest = defaultParams
  ): Promise<AxiosResponse<IFindManyResponse<IArtist>>> => {
    const uri = '/artists'
    const findParts = []

    if (data.title) {
      findParts.push(`"title": {"$regex": ".*${data.title}.*"}`)
    }

    if (data.description) {
      findParts.push(`"description": {"$regex": ".*${data.description},*"}`)
    }

    const query = `?query={
      "find": {${findParts.join(',')}},
      "sort": "${data.sort}",
      "limit": ${data.limit},
      "page": ${data.page}
    }`

    return axios.get(`${uri}${query}`)
  },
}

export default endpoints
