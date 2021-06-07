import axios, { AxiosPromise } from 'axios'
// 验证验证码
export const reqVerifyCode: (code: string, phone: string) => AxiosPromise = (code, phone) => {
    console.log('函数调用成功');
    return axios({
        method: "POST",
        url: '/api/regist/verify_code',
        data: {
            code,
            phone
        }
    })
}

// 验证手机号
export const reqVerifyPhone: (phone: string) => AxiosPromise = (phone) => {
    console.log('函数调用成功');
    return axios({
        method: "POST",
        url: '/api/regist/verify_phone',
        data: {
            phone
        }
    })
}
// 注册账户
export const reqRegister: (phone: string, password: string) => AxiosPromise = (phone, password) => {
    console.log('函数调用成功');
    return axios({
        method: "POST",
        url: '/api/regist/user',
        data: {
            phone,
            password
        }
    })
}

