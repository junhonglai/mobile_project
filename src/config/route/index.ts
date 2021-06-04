
import { FunctionComponent } from 'react'
import PasswordLogin from '../../pages/Login/PasswordLogin'
import PhoneLogin from '../../pages/Login/PhoneLogin'
import CodeRegister from '../../pages/Register/CodeRegister'
import PasswordRegister from '../../pages/Register/PasswordRegister'
import PhoneRegister from '../../pages/Register/PhoneRegister'

export const routes = [
    {
        path: '/passwordLogin',
        component: PasswordLogin
    },
    {
        path: '/phoneLogin',
        component: PhoneLogin
    },
    {
        path: '/codeRegister',
        component: CodeRegister
    },
    {
        path: '/passwordRegister',
        component: PasswordRegister
    },
    {
        path: '/phoneRegister',
        component: PhoneRegister
    }
]
