require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const secretKey = "secretKey";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: `Hey users, this API run on this port ${PORT}`
    })
})

app.get("/login", verifyToken, (req, res)=> {
    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            res.send({
                result: "Invalid Token"
            })
        } else {
            res.json({
                message: "Profile Access Successfully",
                tokenData
            })
        }
    })
}) 

app.post("/signup", (req, res) => {
    const user = {
        id: "1",
        user: "user1",
        email: "user1@gmail.com"
    }
    jwt.sign({user}, secretKey, {expiresIn: '300s'}, (err, token) => {
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req,res)=> {
    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            res.send({
                result: "Invalid Token"
            })
        } else {
            res.json({
                message: "Profile Access Successfully",
                tokenData
            })
        }
    })

})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if ( typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is not valid'
        })
    }
}

const start = () => {
    app.listen(PORT, ()=> {
        console.log(`Hey users, this API run on this port ${PORT}`)
    })
}

start();
