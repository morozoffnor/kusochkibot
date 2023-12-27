import {config} from "../../config.mjs";

export const tokenChecker = function (req, res, next) {
  const token = req.headers['x-api-token']
  if (token === undefined) {
    res.status(401).send('Unauthorized')
  } else if (token !== config.apiToken) {
    res.status(401).send('Unauthorized')
  } else {
    next()
  }
}