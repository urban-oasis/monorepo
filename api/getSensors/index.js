const { Storage } = require('./node_modules/@google-cloud/storage/build/src')
const express = require('./node_modules/express')
const { validationResult, query, header } = require('./node_modules/express-validator/check')
const bodyParser = require('./node_modules/body-parser')
const cors = require('./node_modules/cors/lib')
const datetime = require('node-datetime')

const app = express()
app.enable('trust proxy')
app.disable('etag')

app.use(cors())
app.use(bodyParser.json());
const BUCKET = 'urbanoasis-sensors'

const storage = new Storage()
const bucket = storage.bucket(BUCKET)
const time = datetime.create()._now

const daysInMonth = {
    '1': 31,
    '2': 28,
    '3': 31,
    '4': 30,
    '5': 31,
    '6': 30,
    '7': 31,
    '8': 31,
    '9': 30,
    '10': 31,
    '11': 30,
    '12': 31
}

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
    query('farm').exists(),
    query('rack').exists()
], async (req, res, next) => {
    if (req.headers.authorization !== process.env.AUTH_TOKEN || !validationResult(req).isEmpty()) {
        res.status(401).send()
        return next()
    }
    console.log(req.query)
    if ('fromUtc' in req.query && 'toUtc' in req.query) {
        console.log('getting data')
        const fromUtc = datetime.create(req.query.fromUtc)._now
        const toUtc = datetime.create(req.query.toUtc)._now
        if (fromUtc.toString() === 'Invalid Date' || toUtc.toString() === 'Invalid Date') {
            res.status(400).send('Invalid date format')
            return next()
        }
        
        if (fromUtc.getMonth() === toUtc.getMonth() && fromUtc.getUTCDate() === toUtc.getUTCDate()) {
            var files = []
            var options = {
                prefix: `farm=${req.query.farm}/rack=${req.query.rack}/year=${fromUtc.getFullYear()}/month=${toUtc.getMonth() + 1}/day=${toUtc.getUTCDate()}/`
            }
            var [filesInDay] = await storage.bucket(BUCKET).getFiles(options)
            for (var i = 0; i < filesInDay.length; i++) {
                files.push(filesInDay[i].name)
            }
        } else {
            var files = []
            index = 0
            for (var month = fromUtc.getMonth(); month <= toUtc.getMonth(); month++) {
                if (index === 0) {
                    for (var day = fromUtc.getUTCDate(); day <= Number(daysInMonth[String(month+1)]); day++) {
                        var options = {
                            prefix: `farm=${req.query.farm}/rack=${req.query.rack}/year=${fromUtc.getFullYear()}/month=${month + 1}/day=${day}/`
                        }
                        var [filesInDay] = await storage.bucket(BUCKET).getFiles(options)
                        for (var i = 0; i < filesInDay.length; i++) {
                            files.push(filesInDay[i].name)
                        }
                    }
                } else {
                    for (var day = 1; day <= toUtc.getUTCDate(); day++) {
                        var options = {
                            prefix: `farm=${req.query.farm}/rack=${req.query.rack}/year=${fromUtc.getFullYear()}/month=${month + 1}/day=${day}/`
                        }
                        var [filesInDay] = await storage.bucket(BUCKET).getFiles(options)
                        for (var i = 0; i < filesInDay.length; i++) {
                            files.push(filesInDay[i].name)
                        }
                    }
                }
                
                index += 1
            }
            index = 0
        }
    } else {
        var files = []
        var options = {
            prefix: `farm=${req.query.farm}/rack=${req.query.rack}/`
        }
        var [filesInDay] = await storage.bucket(BUCKET).getFiles(options)
        for (var i = 0; i < filesInDay.length; i++) {
            if (filesInDay[i].name.includes('json')) {
                files.push(filesInDay[i].name)
            }
        }
    }
    
    console.log(files)
    const data = await getData(files)
    console.log('----------')
    console.log(data)
    res.status(200).send(data)
})

module.exports = {
    app
}