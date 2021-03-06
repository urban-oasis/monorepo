const { Storage } = require('./node_modules/@google-cloud/storage/build/src')
const express = require('./node_modules/express')
const { validationResult, header } = require('./node_modules/express-validator/check')
const bodyParser = require('./node_modules/body-parser')
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
    header('authorization').exists()
], async (req, res, next) => {
    if (req.headers.authorization !== process.env.AUTH_TOKEN || !validationResult(req).isEmpty()) {
        res.status(401).send()
        return next()
    }

    const data = await getData(['farms.json'])
    res.status(200).send(data)
})

module.exports = {
    app
}