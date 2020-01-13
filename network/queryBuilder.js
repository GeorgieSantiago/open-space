/**
 * @class QueryBuilder
 * @extends null
 */
class QueryBuilder {
    constructor(base, client) {
        /**@var axios */
        this.client = client
        /**@var string basepath */
        this.basepath = base
        /**@var array rebuild */
        this._rebuild = []
        /**@var string api key */
        this._apikey = 'G2UvddKer9xGwTPCsUMOQ2W734Xl4I39GuCgtlKU'
        /**@var string starting point of the query */
        this.query = `${base}?`
    }

    _getApiKey() {
        return `api_key=${this._apikey}`
    }

    /**
     * Rebuild query string with previous wheres
     * @param {string} path 
     */
    _rebuildPath(path) {
        return path + "?" + this._rebuild.map(({key, value}) => `${key}=${value}`)
    }

    /**
     * Rebuild query string with path additions
     */
    path = (addition) => {
        let base = `${base}/${addition}`
        base = this._rebuildPath(base)
        this.query = base
        return this
    }

    /**
     * Add where clause
     * @param {string} key
     * @param {string} value
     * @return {QueryBuilder}
     */
    where = async (key, value) => {
        this.query += `${key}=${value}&`
        await this._rebuild.push({
            key: key,
            value: value
        })
        
        return this
    }

    /**
     * Add an array of items to the string
     */
    withMany = (key, values) => {
        let str = `${key}=`
        values.map(value => {
            str += `${value},`
        })
        //Add this to rebuild
        return this
    }

    /**
     * @param {array} items
     * @return {QueryBuilder}
     */
    only = items => {
        //Select fields yo
        return this
    }

    /**
     * Execute request with API key.
     * @return {Promise}
     */
    get = async () => {
        try {
            const response = await this.client.get(`${this.query}${this._getApiKey()}`)
            return response
        } catch (e) {
            //Global network request error handling
        }
    }
}

export default QueryBuilder