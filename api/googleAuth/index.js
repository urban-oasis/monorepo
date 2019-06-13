const { check, validationResult } = require('express-validator/check')
const assert = require('assert')
const express = require('express')
const google = require('./google')

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())


app.post('/', [check('tokenId').exists()],
  async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
      try {
        const token = await google.verifyGoogleAccount(req.body.tokenId)
        res.status(200).send({
          token: token
        })
      } catch (err) {
        throw err
      }
    } else {
      res.status(401).send()
      next()
    }
  }
)

module.exports = {
  app
}
