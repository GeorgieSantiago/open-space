import axios from 'axios'
import * as utility from './utility'
import * as roverActions from '../store/actions/rover-actions'
import * as homeActions from '../store/actions/home-actions'
import * as appActions from '../store/actions/app-actions'
//import { localStorage } from './localStorage'

/**
 * Connect to open-space-api
 * @package https://github.com/GeorgieSantiago/open-space-api
 */
export const client = axios.create({
    //baseURL: 'http://192.168.4.14:8000/api',
    baseURL: 'http://192.168.1.3:8000/api',
    timeout: 15000,
});


/**
 * Handles network request errors global
 * @param {Error} e 
 * @param {string} message
 * @package https://github.com/GeorgieSantiago/react-native-error-page
 */
function networkError(e, message) {
    console.error(e, message)

    return false
}

/**
 * Network request handler
 */
/*const request = async queuedPromise => {
    try {
        return queuedPromise()
    } catch (e) {
        console.error(JSON.stringify(e))
    }
}*/

/**
 * Attempt the cache before using the network request
 * @param {string} cacheString 
 * @param {object} request
 * @return {Promise} 
 */
/*export async function withFallback(cacheString, request) {
    if(localStorage.has(cacheString)) {
        return await localStorage.get(cacheString)
    }

    return await request()
           .then(response => response)
           .finally(response => localStorage.store(cacheString, response))
}*/

/**
 * Get Picture of the day from cache.
 * @return {Promise}
 */
export function apod() {
    return client.get('/apod')
}

/**
 * Get Rovers
 * @return {Promise}
 */
export function getRovers() {
    return client.get('/rovers')
}

/**
 * Get Rover by ID
 * @param {integer} id 
 * @return {Promise}
 */
export function getRover(id) {
    return client.get(`/rover/${id}`)
}

export function getBodies(page=1) {
    return client.get(`/bodies?page=${page}`)
}

/**
 * Local Rover Image
 */
const curiosityImage = require("../assets/images/static/curiosity.jpg")
const spiritImage = require("../assets/images/static/spirit.jpg")
const opportunityImage = require("../assets/images/static/opportunity.jpg")
export const getLocalRoverImage = name => {
    switch(name.toLowerCase()) {
        case "curiosity": 
            return curiosityImage
        case "spirit": 
            return spiritImage
        case "opportunity":
            return opportunityImage
    }
}

/**
 * @return {Promise}
 */
export function getRoverImgFilters(id) {
    return client.get(`/roverimg/filters?rover_id=${id}`)
}

/**
 * Get rovers images
 * @param {integer} sol 
 * @param {integer} page 
 * @param {object} rover
 * @return {Promise} 
 */
export function getRoverImg(sol, page, rover) {
    //
}

/**
 * Get exoplanets
 * @param {integer} page
 * @return {Promise} 
 */
export function getExoplanets(page=1) {
    console.log("Making exoplanet request for page " + page)
    return client.get(`/exoplanets?page=${page}`)
}

/**
 * Get exoplanet by ID
 * @param {integer} id
 * @return {Promise} 
 */
export function getExoplanet(id) {
    return client.get(`/exoplanet/${id}`)
}

/**
 * Get exoplanet filter
 * @return {Promise}
 */
export function getExoplanetFilters() {
    return client.get('exoplanets/filters')
}

/**
 * Get earth orbitals
 * @return {Promise}
 */
export function getOrbitals() {
    console.log("Making orbitals request")
    return client.get('/orbitals')
}

/**
 * Get near earth objects
 * @return {Promise}
 */
export function getNeos() {
    console.log("Making neos request")
    return client.get('/neo')
}

/**
 * 
 * @param {integer} page
 * @return {Promise} 
 */
export function getProjects(page=1) {
    return client.get(`/projects?page=${page}`)
}

/**
 * Query NASA media endpoint through the api proxy
 * @param {string} query 
 * @param {integer} page
 * @return {Promise} 
 */
export function mediaSearch(query, page) {
    return client.get(`/media?search=${query}&page=${page}`)
}

export function getMedia(id) {
    return client.get(`media/getById?media_id=${id}`)
}