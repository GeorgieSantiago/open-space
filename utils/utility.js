export const primary = "#010038"
export const secondary = "#293a80"
export const trinary = "#537ec5"
export const accent = "#f39422"

/**
 * Capitalize the first letter of every word.
 * @param {string} str
 * @return {string} 
 * @example titleCase('national aeronautics & space') : National Aeronautics & Space
 */
export function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}
 