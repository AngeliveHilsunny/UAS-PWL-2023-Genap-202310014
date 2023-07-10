const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Place = require('./models/Place');
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const mime = require('mime-types');
const BookingModel = require('./models/Booking');

require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'vjksdnaceailnurylcnjdak';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Middleware untuk mencatat permintaan ke server
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// console.log(process.env.MONGO_URL)

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}

app.get('/test', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json('test ok');
});

app.post('/register', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { username, email, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.post('/upload-by-link', async(req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(__dirname + newName + '/uploads/' + newName);
});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = 'photo' + Date.now() + ext;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('photos', 100), async(req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { filename } = req.files[i];
        uploadedFiles.push(filename);
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
        title,
        address,
        temperature,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            temperature,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });
        res.json(placeDoc);
    });
});


app.get('/user-places', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/place/:id', async(req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            res.status(404).json({ error: 'Place not found' });
        } else {
            res.json(place);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
});

app.put('/places', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
        id,
        title,
        address,
        temperature,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async(err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                temperature,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/places', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json(await Place.find());
});

app.post('/bookings', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const {
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        price,
    } = req.body;
    BookingModel.create({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

app.get('/bookings', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    res.json(await BookingModel.find({ user: userData.id }).populate('place'));
});

// app.get('/search', async(req, res) => {
//     mongoose.connect(process.env.MONGO_URL);
//     const { query, fields } = req.query; // Add 'fields' parameter to the query

//     try {
//         const searchResults = await Place.find({
//             $or: fields.map((field) => ({
//                 [field]: { $regex: query, $options: 'i' },
//             })),
//         });

//         res.json(searchResults);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to perform search' });
//     }
// });

app.listen(4000);