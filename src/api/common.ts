import axios, { AxiosPromise } from 'axios'

export const reqCountryData: () => AxiosPromise = () => {
    return axios({
        method: "GET",
        url: '/api/common/countryData'
    })
}