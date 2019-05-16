const { Storage } = require('@google-cloud/storage/build/src')
const express = require('express')
const { validationResult, query, header } = require('express-validator/check')
const bodyParser = require('body-parser')
const cors = require('./node_modules/cors/lib')

const app = express()
app.enable('trust proxy')
app.disable('etag')

app.use(cors())
app.use(bodyParser.json());
const BUCKET = 'urbanoasis-sensors'

const storage = new Storage()
const bucket = storage.bucket(BUCKET)

async function getData(files) {
    data = []
    for (const filePath of files) {
        var file = bucket.file(filePath)
        var fileData = await file.download()
        data.push(JSON.parse(fileData[0].toString()))
    }
    return data
}

app.get('/', [
    header('authorization').exists(),
    query('farm').exists()
], async (req, res, next) => {
    if (req.headers.authorization !== process.env.AUTH_TOKEN || !validationResult(req).isEmpty()) {
        res.status(401).send()
        return next()
    }

    const data = await getData([`farm=${req.query.farm}/racks.json`])
    res.status(200).send(data)
})

module.exports = {
    app
}