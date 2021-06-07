
import { FunctionComponent } from 'react'
import {RouteComponentProps} from 'react-router-dom'
import PasswordLogin from '../../pages/Login/PasswordLogin'
import PhoneLogin from '../../pages/Login/PhoneLogin'
import CodeRegister from '../../pages/Register/CodeRegister'
import PasswordRegister from '../../pages/Register/PasswordRegister'
import PhoneRegister from '../../pages/Register/PhoneRegister'
import CountryPicker from '../../components/CountryPicker'
export interface Route {
    path: string;
    component: FunctionComponent<RouteComponentProps>;
}
export const routes: Route[] = [
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
    },
    {
        path: '/countryPicker',
        component: CountryPicker
    }
]
