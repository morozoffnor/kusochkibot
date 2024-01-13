/**
 * Converts time to human-readable string
 * @param {Number} number - time in seconds
 * @returns {Promise<String>} - time in human-readable format
 */
export async function convertNumberToTimeString(number) {
    const days = Math.floor((number / (1000*60*60*24)))
    const hours = Math.floor(((number/ (1000*60*60)) % 24))
    const minutes = Math.floor(((number / (1000*60)) % 60))
    const seconds = Math.floor(((number / 1000) % 60))
    
    let timeString = ''
    if (days > 0) {
        timeString += days + 'д '
    }
    if (hours > 0) {
        timeString += hours + 'ч '
    }
    if (minutes > 0) {
        timeString += minutes + 'м '
    }
    if (seconds > 0) {
        timeString += seconds + 'с'
    }
    return timeString
}