const { Storage } = require('@google-cloud/storage')
const express = require('express')
const { check, validationResult, body, header } = require('express-validator/check')
const bodyParser = require('body-parser');
const datetime = require('node-datetime')

const app = express()
app.use(bodyParser.json());
const BUCKET = 'urbanoasis-sensors'
const AUTH_TOKEN = process.env.AUTH_TOKEN
const storage = new Storage()
const bucket = storage.bucket(BUCKET)

app.post('/', [
    header('authorization').exists(),
    body('data').exists()
], (req, res, next) => {
    if (req.headers.authorization !== AUTH_TOKEN || !validationResult(req).isEmpty()){
        res.status(401).send()
        return next()
    }
    const time = datetime.create()._now
    const path = `farm=${req.body.farm}/rack=${req.body.rack}/year=${time.getFullYear()}/month=${time.getMonth() + 1}/day=${time.getUTCDate()}/${time.toISOString()}.json`
    const file = bucket.file(path)
    file.save(JSON.stringify(req.body.data), function (err) {
        if (!err) {
            console.log(`New file created: ${path}`)
            res.status(200).send()
        }
        else {
            console.log(err)
            res.status(400).send(err)
        }
    })
})

module.exports = {
    app
}