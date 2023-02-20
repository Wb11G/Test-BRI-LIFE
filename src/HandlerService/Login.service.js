import http from './InitialHttp/Http.name';

export const doPromiseResolve = (res, { ...setterStates }) => {
    const setter = { ...setterStates }

    if (res.config.url === '/auth/v1/login') {
        sessionStorage.setItem('token', res.data.token);
        localStorage.removeItem("LOGGED_OUT")
        window.location.replace('/frominput');
    }

}
export const Login = async (data) => {
    return await http.post('/auth/v1/login', data)
}

const api = {
    Login
}

export default api;