const https = require('https');

async function GetRequest(url,key) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                Authorization: `${key}`
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
}

async function PostRequest(url, data, key) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${key}`
            }
        };
        const req = https.request(url, options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
                console.log(responseData);
            });
            res.on('end', () => {
                resolve(responseData);
            });
        });
        req.on('error', (error) => {
            console.error(error);
        });
        req.write(JSON.stringify(data));
        req.end();
  });
}  

module.exports = {
    GetRequest,
    PostRequest
}