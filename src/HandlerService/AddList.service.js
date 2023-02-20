import http from './InitialHttp/Http.name';

export const doPromiseResolveAdd = (res, { ...setterStates }) => {
    const setter = { ...setterStates }

    if (res.config.url === '/po/v1/add') {
        setter.setInfoOpen(true)
        setter.setInfoText("Data Sukses Di Simpan")
    }

}
export const doPromiseRejectAdd = (err, { ...setterStates }) => {
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

export const AddList = async (data) => {
    return await http.post('/po/v1/add', data)
}

const apiAdd = {
    AddList
}

export default apiAdd;