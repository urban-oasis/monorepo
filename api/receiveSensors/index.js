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

async function getLatest(farm) {
    var file = bucket.file(`farm=${farm}/racks.json`)
    var fileData = await file.download()
    return await JSON.parse(fileData[0])
}

async function updateLatest(newData) {
    var racksData = await getLatest(newData.farm_id)
    for (var i = 0; i < racksData['racks'].length; i++) {
        if (racksData['racks'][i].id === newData.id) {
            racksData['racks'][i] = newData
        }
    }
    return racksData

}

async function saveFile(path, data) {
    const file = bucket.file(path)
    await file.save(JSON.stringify(data), function (err) {
        if (!err) {
            console.log(`New file created: ${path}`)
            return true
        }
        else {
            console.log(err)
            return false
        }
    })
}

app.post('/', [
    header('authorization').exists(),
    body('data').exists()
], async (req, res, next) => {
    if (req.headers.authorization !== AUTH_TOKEN || !validationResult(req).isEmpty()){
        res.status(401).send()
        return next()
    }
    console.log(`Incoming data: ${JSON.stringify(req.body.data)}`)
    const time = datetime.create(req.body.data.timestamp)._now
    const hourPath = `farm=${req.body.data.farm_id}/rack=${req.body.data.id}/year=${time.getFullYear()}/month=${time.getMonth() + 1}/day=${time.getUTCDate()}/${time.toISOString()}.json`
    const latestPath = `farm=${req.body.data.farm_id}/racks.json`
    var latestData = await updateLatest(req.body.data)
    await saveFile(latestPath, latestData)
    await saveFile(hourPath, req.body.data)
    res.status(200).send()
})

module.exports = {
    app
}