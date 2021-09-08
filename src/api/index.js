import axios from 'axios'

const API_BASE_URL = process.env.VUE_APP_API_LOCATION
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
                    status: null,
                    text: "Nem vagy regisztrálva!",
                    data: null
                })
            }

            this.http.request({
                url, method, data
            }).then((response) => {

                if (response.status === expectedStatus) {
                    return resolve(response.data)
                } else {
                    return reject({
                        status: response.status,
                        text: errorTexts[response.status] || "Hálózati vagy szerver hiba. Próbáld újra később!",
                        data: response.data
                    })
                }


            }).catch((error) => {

                if (!error.response) { // Network error (CORS?)


                    return reject({
                        status: null,
                        text: "Hálózati hiba. Próbáld újra később!",
                        data: null
                    })

                } else {  // Server side errror

                    if (error.response.status === expectedStatus) {
                        return resolve(error.response.data)
                    } else {

                        return reject({
                            status: error.response.status,
                            text: errorTexts[error.response.status] || "Szerver oldali hiba. Próbáld újra később!",
                            data: error.response.data
                        })

                    }
                }

            })

        })

    }

    performRegister(name) {

        return new Promise((resolve, reject) => {

            this._performApiCall('post', '/players', {name}, false, 201, {
                422: "A név mező hiányos!",
                409: "A név már foglalt!",
                ...COMMON_ERROR_CODES
            }).then((data) => {

                localStorage.setItem(LOCAL_STORAGE_KEY, data.jwt)
                this._setupHTTPObject() // Update JWT token memes
                return resolve({
                    name: data.name,
                    is_admin: data.is_admin,
                    faction: data.faction
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

    getFactionData(id) {
        return this._performApiCall('get', '/factions/' + id, null, true, 200, {
            404: "Ilyen csapat nincs",
            ...COMMON_ERROR_CODES
        })
    }

    getMyFactionData() {
        return this._performApiCall('get', '/factions/my', null, true, 200)
    }

    getAllFactionData() {
        return this._performApiCall('get', '/factions', null, true, 200)
    }

    getLeaderStat() {
        return this._performApiCall('get', '/stats/leader', null, true, 200)
    }

    getFactionsStat() {
        return this._performApiCall('get', '/stats/factions', null, true, 200)
    }

    getTotalPonyCount() {
        return this._performApiCall('get', '/ponies/count', null, true, 200)
    }

    getPony(id) {
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
            200: "Ezt a pónit már megölelted", // This is not an error actually..
            404: "Érvénytelen kód",
            ...COMMON_ERROR_CODES
        })
    }

    adminPerformPromote(key) {
        return this._performApiCall('post', '/admin/promote', {key}, true, 204)
    }

    adminGetAllPlayers() {
        return this._performApiCall('get', '/players', null, true, 200)
    }

    adminGetAllTimeframes() {
        return this._performApiCall('get', '/timeframes', null, true, 200)
    }

    adminGetAllPonies() {
        return this._performApiCall('get', '/ponies', null, true, 200)
    }


}