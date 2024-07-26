const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const STORAGE = [];

const CREDENTIALS = {
	"companyName": "MediTrack",
	"clientID": "389839ee-3304-43aa-a575-7b0c3c8dadc0",
	"clientSecret": "AznugjyaaGkUMPCA",
	"ownerName": "Alayna Shaheen",
	"ownerEmail": "alaynashaheen2@gmail.com",
	"rollNo": "21L31A0507"
};

let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTcwMjkwLCJpYXQiOjE3MjE5Njk5OTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjM4OTgzOWVlLTMzMDQtNDNhYS1hNTc1LTdiMGMzYzhkYWRjMCIsInN1YiI6ImFsYXluYXNoYWhlZW4yQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6Ik1lZGlUcmFjayIsImNsaWVudElEIjoiMzg5ODM5ZWUtMzMwNC00M2FhLWE1NzUtN2IwYzNjOGRhZGMwIiwiY2xpZW50U2VjcmV0IjoiQXpudWdqeWFhR2tVTVBDQSIsIm93bmVyTmFtZSI6IkFsYXluYSBTaGFoZWVuIiwib3duZXJFbWFpbCI6ImFsYXluYXNoYWhlZW4yQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxTDMxQTA1MDcifQ.v5dHm7flwdDIVOQlARq2KlbefxxrnspmJAqA6rm7xls";

const API_ENDPOINTS = {
    p: 'http://20.244.56.144/test/primes',
    f: 'http://20.244.56.144/test/fibo',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/rand'
};

const getAccessToken = async () => {
    try {
        const response = await axios.post('http://20.244.56.144/test/auth', {
            companyName: CREDENTIALS.companyName,
            clientID: CREDENTIALS.clientID,
            clientSecret: CREDENTIALS.clientSecret,
            ownerName: CREDENTIALS.ownerName,
            ownerEmail: CREDENTIALS.ownerEmail,
            rollNo: CREDENTIALS.rollNo
        });
        accessToken = response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.message);
    }
};
const fetchNumbers = async (type) => {
    try {
        const response = await axios.get(API_ENDPOINTS[type], {
            headers: { 'Authorization': `Bearer ${accessToken}` },
            timeout: 500
        });
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching ${type} numbers:`, error.message);
        return [];
    }
};
app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }
    const newNum = await fetchNumbers(numberid);
    const uniqueNewNum = [...new Set(newNum)];
    const windowPrevState = [...STORAGE];
    uniqueNewNum.forEach(number => {
        if (STORAGE.length < WINDOW_SIZE) {
            STORAGE.push(number);
        } else {
            STORAGE.shift();
            STORAGE.push(number);
        }
    });
    const windowCurrState = [...STORAGE];
    const avg = (STORAGE.length === 0) ? 0 : STORAGE.reduce((a, b) => a + b, 0) / STORAGE.length;
    res.json({
        windowPrevState,
        windowCurrState,
        numbers: uniqueNewNum,
        avg: avg.toFixed(2)
    });
});
app.listen(PORT, async () => {
    await getAccessToken();
    console.log(`Server is running on http://localhost:${PORT}`);
});
