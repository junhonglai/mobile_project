import axios, { AxiosPromise } from 'axios'

export const reqPhoneDigit: (data:string) => AxiosPromise = (data) => {
    return axios({
        method: "POST",
        url: '/api/login/digits',
        data: {
            phone: data
        }
    }) 
}