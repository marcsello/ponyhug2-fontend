import axios from 'axios'

const API_BASE_URL = "http://localhost:5000/"
const LOCAL_STORAGE_KEY = "JWT"

const COMMON_ERROR_CODES = {
    403: "Hozzáférés megtagadva",
    401: "Sikertelen hitelesítés",
    400: "Érvénytelen kérés"
}

export default new class {

    _setupHTTPObject() {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY)

        let headers = {}
        if (token) {
            headers = {'Authorization': 'Bearer ' + token}
        }

        this.http = axios.create({
            baseURL: API_BASE_URL,
            timeout: 15000, // 15 sec, mert szar a mobilnet
            headers: headers
        })
    }

    constructor() {
        this._setupHTTPObject()
    }

    get haveToken() {
        return !!localStorage.getItem(LOCAL_STORAGE_KEY)
    }

    _performApiCall(method, url, data, precheckToken, expectedStatus, errorTexts = COMMON_ERROR_CODES) {

        return new Promise((resolve, reject) => {

            if (precheckToken && !this.haveToken) {
                return reject({
                    text: "Nem vagy regisztrálva!"
                })
            }

            this.http.request({
                url, method, data
            }).then((response) => {

                if (response.status === expectedStatus) {
                    return resolve(response.data)
                } else {
                    return reject({
                        text: errorTexts[response.status] || "Hálózati vagy szerver hiba. Próbáld újra később!"
                    })
                }


            }).catch((error) => {

                if (error.response.status === expectedStatus) {
                    return resolve(error.response.data)
                } else {
                    return reject({
                        text: errorTexts[error.response.status] || "Hálózati vagy szerver hiba. Próbáld újra később!"
                    })
                }

            })

        })

    }

    performRegister(playername) {

        return new Promise((resolve, reject) => {

            this._performApiCall('post', '/players', {playername}, false, 201, {
                422: "A név mező hiányos!",
                409: "A név már foglalt!",
                ...COMMON_ERROR_CODES
            }).then((data) => {

                localStorage.setItem(LOCAL_STORAGE_KEY, data.jwt)
                this._setupHTTPObject() // Update JWT token memes
                return resolve({
                    playername: data.playername,
                    is_admin: data.is_admin
                    // Do not pass JWT token any further
                })

            }).catch(reject)

        })

    }

    getMyInfo() {
        return this._performApiCall('get', '/players/me', null, true, 200)
    }

    getCurrentTimeframe() {
        return this._performApiCall('get', '/timeframes/current', null, false, 200, {
            404: "A játék jelenleg inaktív",
            ...COMMON_ERROR_CODES
        })
    }

    getLeaderStat() {
        return this._performApiCall('get', '/stats/leader', null, true, 200)
    }

    getHuggedPonies() {
        return this._performApiCall('get', '/ponies', null, true, 200)
    }

    getHuggedPony(id) {
        return this._performApiCall('get', '/ponies/' + id, null, true, 200)
    }

    getHugs() {
        return this._performApiCall('get', '/hugs', null, true, 200)
    }

    getHug(id) {
        return this._performApiCall('get', '/hugs/' + id, null, true, 200)
    }

    performHug(key) {
        return this._performApiCall('post', '/hugs', {key}, true, 201, {
            423: "A játék jelenleg inaktív",
            409: "Ezt a pónit már megölelted",
            ...COMMON_ERROR_CODES
        })
    }

}