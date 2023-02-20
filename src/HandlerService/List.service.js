import http from './InitialHttp/Http.name';

export const doPromiseResolve = (res, { ...setterStates }) => {
    const setter = { ...setterStates }

    if (res.config.url === '/po/v1/list') {
        setter.setDataTable(res.data.data)
    }

}
export const doPromiseReject = (err, { ...setterStates }) => {
    const setter = { ...setterStates }

    if (err.response) {
        if (err.response.data) {
            if (err.response.data.message) setter.setInfoText(err.response.data.message)
        }
        else setter.setInfoText(err.response.message)
    }
    else setter.setInfoText(err.message)
    setter.setInfoOpen(true)
}

export const List = async (data) => {
    return await http.get('/po/v1/list')
}

const api = {
    List
}

export default api;