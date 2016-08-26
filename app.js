const port = 4002 || process.env.PORT
const spdy = require('spdy')
const express = require('express')
const path = require('path')
const fs = require('fs')
const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
}
const app = express()

const img = fs.readFileSync('./doge_wat.png')

app.get('/', (req, res) => {
    res.push('/doge_wat.png', {
        request: {
            accept: '*/*'
        },
        response: {
            'content-type': 'image/jpeg'
        }
    }).on('error', (err) => console.error(err))
        .end(img)

    res.end(`<html>
                <body>
                    <img src="/doge_wat.png"/>
                </body>
           </html>`)
})


spdy.createServer(options, app)
    .listen(port, (err) => {
        if (err) {
            return console.error(err)
        }
        console.log(`Listening on port: ${port} `)
    })