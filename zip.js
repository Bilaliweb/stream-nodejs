const express = require('express')
const path = require('path')
const fs = require('fs')
const zlib = require('zlib')
const port = 8000
const status = require('express-status-monitor')

const app = express()

// For checking the memory consumption status of express server
app.use(status())

/**
 * The question is we want to create a zip file by reading the content of specific file which is of 400MB how it can be done ?
 * 1st way:
 * First server will read the file, then create a zip file in memory and then write on disk
 * Read 400MB file -> 400Mb ZIP file in memory -> 400MB write
 * Now at this point, 800MB is coming into memory which is not good at all.
 * 
 * 2nd way:
 * If we stream read part ?
 * Stream Read 400MB -> 400Mb ZIP file in memory -> 400MB write
 * Now still 400MB zip file is consuming 400MB memory.
 * 
 * Here is the solution for creating zip without consuming memory:
 * 1. Create a read stream
 * 2. A zipper will create a zip file
 * 3. Write that content in specific file
 * 
 */

fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip')))


app.listen(port, () => {
    console.log("Server listening to port: ", port);
})