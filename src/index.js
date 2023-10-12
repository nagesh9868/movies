const express = require('express');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');
require('./config');
const multer = require('multer')
app.use(cors())
const secretKey = "Jai_shree_Ram";
app.use(express.json())
const users = require('./users');
const debbardcan = require('./debbardcan')
const mongodb = require('mongodb')

const fileName = ''
const registrationno = 0
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "assets");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + ".jpg")
        }
    })
}).single("file")

app.post('/file/uploads', upload, (req, res) => {
    if (req.file.filename.length > 1) {
        this.fileName = req.file.filename
        console.log(req.body);
        res.json({ message: 'Files uploaded successfully!! please click on update button before leaving' })
    } else {
        res.send({
            message: 'File is not uploaded correcly'
        })
    }
})

app.post('/user/register', async (req, res) => {
    const register = await users.find({ email: req.body.email })
    if (register < 1) {
        const user = new users(req.body)
        const result = await user.save()
        res.send(result)
    } else {
        res.send({
            message: "The Email ID is already exist! Please register with different mail ID"
        })
    }
})

app.post('/debbard/candidate', async (req, res) => {
    const candidate = await debbardcan.find({ name: req.body.name })
    if (candidate < 1) {
        const debbardCandidate = await new debbardcan({ ...req.body, 'filename': this.fileName })
        const result = await debbardCandidate.save()
        this.fileName = await debbardCandidate && ''
        res.send({
            message: "Debbard Candidate details has been Saved"
        })
    } else {
        res.send({
            candidate,
            message: "The Candidate Name is already exist"
        })
    }
})


// app.post('/debbard', async (req, res) => {
//     console.log(req.body.registrationno);
//     try {
//         const candidate = await debbardcan.find({ _id: req.body.registrationno })
//         if (Array.isArray(candidate) && candidate.length >= 1) {
//             res.send(candidate)
//         } else {
//             res.json({
//                 message: "This Registration ID is not valid! Please enter the correct Registration ID"
//             })
//         }
        // console.log(candidate.length);
        // if (candidate < 1) {
        //     this.registrationno = req.params.registrationno
        //     res.json({
        //         message: "This Registration ID is not valid! Please enter the correct Registration ID"
        //     })
        // } else {
        //     res.send(candidate)
        // }
//     } catch (error) {
//         res.send(error.message)
//     }
// })

app.post('/debbard', async (req, res) => {
    this.fileName = ''
    const candidate = await debbardcan.find({_id:req.body.registrationno})
    if (candidate < 1) {
        this.registrationno = req.params.registrationno
        res.json({
            message: "This Registration ID is not valid! Please enter the correct Registration ID"
        })
    } else {
        res.send(candidate)
    }
})

app.put('/debbard/candidate/:_id', async (req, res) => {
    const candidate = await debbardcan.find({ _id: req.params._id })
    if (candidate) {
        const debbardCandidate = await debbardcan.updateOne(
            req.params,
            {
                $set: { ...req.body, filename: this.fileName }
            }
        )
        res.send({
            message: `The form has been updated successfully`
        })
    } else {
        res.send({
            candidate,
            message: "This has not been updated, please check with Admin"
        })
    }
})

app.post('/user/login', async (req, res) => {
    let user = await users.find({ email: req.body.email, password: req.body.password })
    if (user.length > 0) {
        jwt.sign({ user }, secretKey, { expiresIn: '3000s' }, (err, token) => {
            res.json({
                token,
                name: user[0].name,
                email: user[0].email
            });
        })
    } else {
        res.json({
            message: "You are Not Authorized user, please register first"
        })
    }
})

app.post('/home' || '/debbard' || '/debbard/candidate', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.json({ error: "Invalid Token" })
        } else {
            res.json({
                message: "Home Page Accessed",
                name: authData.user[0].name,
                email: authData.user[0].email
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token
        next()
    } else (
        res.send({
            message: "Token is not Valid"
        })
    )

}


app.listen(3000, () => {
    console.log('API is running on the 3000 port');
})