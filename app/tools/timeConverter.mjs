

/**
 * Converts time to human-readable string
 * @param {Number} number - time in seconds
 * @returns {Promise<String>} - time in human-readable format
 */
export async function convertNumberToTimeString(number) {
  const date = new Date(number * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds()
  let timeString = ''
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