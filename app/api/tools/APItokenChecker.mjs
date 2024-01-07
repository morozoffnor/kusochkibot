import {config} from "../../config.mjs";

export const tokenChecker = function (req, res, next) {
  if (req.path === '/github/webhook/release/') {
    next()
    return
  }
  const token = req.headers['x-api-token']
  if (token === undefined) {
    res.status(401).send('Unauthorized')
  } else if (token !== config.apiToken) {
    res.status(401).send('Unauthorized')
  } else {
    next()
  }
}