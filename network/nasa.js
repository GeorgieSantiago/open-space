import axios from 'axios'
import * as utility from '../utils/utility'

const apikey = () => {
    return `api_key=${key}`
}

/**
 * Picture of the day
 */
export function apod() {
    return `https://api.nasa.gov/planetary/apod?${apikey()}`
}

/**
 * @param {string} str The request string
 * @return {Promise} Use this promise to set data in state
 * @TODO wrap this in async storage to cut down on request
 */
export function request(str) {
    return axios.get(str)
}

/**
 * Health check the API and Network
 */
function test() {
    request(apod())
        .then(response => {
            console.log("Working!", {
                response
            })
        })
        .catch(e => {
            console.error("Failing...", {
                e
            })
        })
}

/**
 * 
 */
export const marsRovers = {
    _url: "https://api.nasa.gov/mars-photos/api/v1",
    registered: ["curiosity", "opportunity", "spirit"],
    curiosity: {
        cameras: [
            'fhaz'
        ]
    },
    opportunity: {
        cameras: [
            'fhaz'
        ]
    },
    spirit: {
        cameras: [
            'fhaz'
        ]
    },
    /**
     * Example
     * https://api.nasa.gov/mars-photos/api/v1//rovers/spirit/photos?sol=1&api_key=G2UvddKer9xGwTPCsUMOQ2W734Xl4I39GuCgtlKU
     * Query string param list
     * @param {string} rover
     * @param {string} camera
     * @param {number} sol
     * @param {number} page
     */
    photos: (rover, camera = "", sol = 100, page = 1) => {
        //Does this rover exist?
        if (!marsRovers[rover]) throw new Error(`The rover ${rover} does not exist`)
        //Does the camera exist?
        console.log("hello there" , marsRovers[rover].cameras[camera])
        if (camera) {
            if (!marsRovers[rover].cameras) throw new Error(`${rover} camera ${camera} does not exist`)
        }

        return `${marsRovers._url}/rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${page}&${apikey()}`
    },
    manifest: (rover) => {
        if (marsRovers[rover]) {
            //https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=G2UvddKer9xGwTPCsUMOQ2W734Xl4I39GuCgtlKU
            return `https://api.nasa.gov/mars-photos/api/v1/manifests/${utility.titleCase(rover)}?${apikey()}`
        }
        return false
    }
}

export const planets = {
    base: "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac",
    default: () => {
        return `${this.base}&where=pl_kepflag=1`
    },
    getByKplFlag: flag => {
        return `${this.base}&where=pl_kepflag=${flag}`
    }
}

/**
 * The TLE API provides up to date two line element set records, 
 * the data is updated daily from CelesTrak and served in JSON format. 
 * A two-line element set (TLE) is a data format encoding a list of orbital elements of an
 * Earth-orbiting object for a given point in time. For more information on TLE data format
 * visit Definition of Two-line Element Set Coordinate System.
 */
export const tle = {
    _url: "http://data.ivanstanojevic.me",
    searchBySatilite: (search) => {
        return `${tle._url}/api/tle?search=${search}`
    },
    searchById: (id) => {
        return `${tle._url}/api/tle/${id}`
    }
}

/**
 * More and more NASA imagery is being made available via web services (WMS, WMTS, etc.) 
 * and a significant percentage of it is being produced and published in near real time 
 * (NRT=within a few hours after acquisition). This ability means that NASA imagery can 
 * be used more routinely to examine current natural events as they happen.
 * Using client applications, such as NASA EOSDIS’ Worldview, users can browse the entire
 *  globe daily and look for natural events as they occur. Storms are regularly spotted in 
 * the tropics, dust storms over deserts, forest fires in the summers. 
 * These events are occurring constantly and NASA NRT imagery can represent them all using a 
 * variety of different data parameters. However, the user’s experience is tailored, 
 * and therefore restricted, by the client application. What if there was an API that provided 
 * a curated list of natural events and provided a way to link those events to event-related
 *  NRT image layers? Enter EONET.
 * The Earth Observatory Natural Event Tracker (EONET) is a prototype web service with the goal of: 
 * providing a curated source of continuously updated natural event metadata; providing a service 
 * that links those natural events to thematically-related web service-enabled image sources 
 * (e.g., via WMS, WMTS, etc.). Please see our API documentation to learn more about how to use 
 * the EONET web services. 
 * Development of EONET began in 2015 and has been supported by NASA’s Earth Observatory and 
 * Earth Science Data and Information System (ESDIS) Project.
 * @DOCS https://eonet.sci.gsfc.nasa.gov/docs/v2.1
 * @EXTRA https://worldview.earthdata.nasa.gov/
 * @depedencies react-maps, WMTS support
 */
export const eonet = {

}

/**
 * Potentially a super good win for this little app explorer
 * Use this API to access the NASA Image and Video Library site at images.nasa.gov. 
 * For the latest documentation, please go here.
 * The images.nasa.gov API is organized around REST, has predictable/resource­-oriented URLs and uses
 * HTTP response codes to indicate API errors. This API uses built-­in HTTP features such as HTTP 
 * authentication and HTTP verbs, which are understood by many off-­the-­shelf HTTP clients.
 * Please note that JSON is returned by all API responses, including errors.
 * Each of the endpoints described below also contains example snippets which use the curl 
 * command­-line tool, Unix pipelines, and the python command­-line tool to output API responses
 * in an easy­ to ­read format.
 * @DOCS https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 */
export const NASAMedia = {
    _url: process.env.API_HOST,
    default: () => {
        return `${NASAMedia._url}/search?q=space&page=1`
    },
    search: (query) => {
        return `${NASAMedia._url}/search?q=${query}`
    },
}

/**
 * Woah this is for the future FR
 * Vesta/Moon/Mars Trek WMTS Here we have the collection of APIs that power the awesome Mars Trek 
 * and Vesta Trek NASA web-based portals for exploration and have newly added Moon Trek. 
 * These APIs can be leveraged using your favorite OGC RESTFul Web Map and Tile Service (WMTS) 
 * client. Please visit http://www.opengeospatial.org/standards/wmts for more information about
 * WMTS. To help you get started, we've included some demos using the ESRI javascript client 
 * library for Mars and Vesta. This API is maintained and provided by the NASA 
 * Solar System Exploration Research Virtual Institute (SSERVI) and the Jet Propulsion Lab (JPL) 
 * Trek team. Available Moon Mosaics 
 * Here is basic information about how to request image tiles from a RESTful WMTS service.
 *  The basic URL template is as follows: 
 * http://{WMTS endpoint}/1.0.0/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
 * Some services are .png and some are .jpg. Please look at WMTS GetCapabilities ResourcesURL
 *  element to find out what extension to use. In order to fill in the variables in the template 
 * URL, you need to parse the WMTS GetCapabilities XML. GetCapabilities XML can be found for each 
 * product below. From the WMTS GetCapabilities XML, find ows:Identifier element inside Style
 *  element. This value replaces{Style}. The ows:Identifier element inside TileMatrixSet element
 *  replaces{TileMatrixSet}. Inside the TileMatrixSet element in WMTS Capabilities, there is a 
 * list of TileMatrix. This is the Zoom level. Replace{TileMatrix}with the ows:Identifier found in
 *  TileMatrix element.{TileRow}and{TileCol}are row and col index for tiles. The first zoom level
 *  for a product that covers the entire globe will have two columns and one row so that the URLs
 *  are as follows: 
 * http://moontrek.jpl.nasa.gov/trektiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/0/0/0.jpg 
 * http://moontrek.jpl.nasa.gov/trektiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/0/0/1.jpg 
 * The second zoom level has four columns and two rows and so on. If the image tile is missing, 
 * that means there is no data coverage in that area. You can also use coverage Bbox to calculate 
 * the coverage before requesting image tiles. 
 * For a complete listing of the Moon's Equirectangular, North Polar and South Polar based Services,  
 * please see 
 * @TODO dream feature
 * @depedencies react-maps, WMTS support
 */
export const trek = {

}
/**
 * Welcome to TechPort - NASA's resource for collecting and sharing information about NASA-funded 
 * technology development. Techport allows the public to discover the technologies NASA is working
 *  on every day to explore space, understand the universe, and improve aeronautics.
 *  NASA is developing technologies in areas such as propulsion, nanotechnology, robotics, and 
 * human health. NASA is committed to making its data available and machine-readable through an
 *  Application Programming Interface (API) to better serve its user communities. As such, the 
 * NASA TechPort system provides a RESTful web services API to make technology project data
 *  available in a machine-readable format. This API can be used to export TechPort data into 
 * either an XML or a JSON format, which can then be further processed and analyzed. Complete 
 * documentation (in Swagger 2.0 format) of the available objects, properties, RESTful URIs is 
 * available in the online API specification at: 
 * https://api.nasa.gov/techport/api/specification?api_key=DEMO_KEY.
 * @example https://api.nasa.gov/techport/api/projects?updatedSince=2016-01-01&api_key=DEMO_KEY
 */
export const projects = {
    _now: Date(),
    _url: `https://api.nasa.gov/techport/api/projects?updatedSince=${this._now}&${apikey()}`,
    get: () => {
        return `${this._url}`
    }
}


/**
 * FUTURES
 * - GENELAB
 * - EPIC
 * - ExoPlanet Explorer
 */