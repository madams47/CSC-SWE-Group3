const express = require('express');
const app = express();
const hostname = '18.205.236.145'; // Your server ip address
const port = 3000;

const version = '1.0.0.0'
const groupName = 'CSC-SWE-Group3';

app.get('/', (req, res) => {
    // set response content    
        res.send(`<html>
                    <body>
                        <h1 style="color:blue;text-align: center;margin-top: 100px;"> Dear ${groupName}, here's a random photo to help ease the pain of web development...</h1>
                        <div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%)">
                            <img src="https://picsum.photos/400/400?random=1">
                        </div>
                    </body>
                   </html>`);
 
  console.log(`[Version ${version}]: New request => http://${hostname}:${port}`+req.url);

})

app.get('/api', (req, res) => {
    console.log("HELLO")

}) 

app.listen(port, () => {
    console.log(`[Version ${version}]: Server running at http://${hostname}:${port}/`);
})
