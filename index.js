const express = require('express')
const path = require('path')
const fs = require('fs')
const port = 8000
const status = require('express-status-monitor')

const app = express()

// For checking the memory consumption status of express server
app.use(status())

// A problem in code for a huge file let's say 400MB file and we've sent data normally like we send simple response
app.get('/', (req, res) => {
    /**
     * This way, express will consume a lot of Memory Usage which is not efficient way to send data to client.
     * 
     * Solution: Use 'Streams'
     * Using streams, we can break that huge context/data into small chunks and send to client accordingly wihout utilising own memory and waiting until that contex/data is completely read and ready to send
    */
    // fs.readFile('./sample.txt', (err, data) => {
    //     res.end(data)
    // })

    /**
     * Implementing Streams
     */

    // Creating a reading stream with utf-8 as it's a text file
    // This will tell the browser not to close as our data will be coming in chunks and there will be a haeder added as 'Transfer-Encoding' with value as 'chunked'
    const stream = fs.createReadStream('./sample.txt', 'utf-8');

    stream.on('data', (chunk) => res.write(chunk))
    stream.on('end', () => res.end())
})

app.listen(port, () => {
    console.log("Server listening to port: ", port);
})