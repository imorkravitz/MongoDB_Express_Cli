const bcryptjs = require('bcryptjs');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017/'
const dataBaseName = 'mydb';
const jsData = require('../client/jsonData.json');
const jsScheduler = require('../client/scheduler.json');

var db;

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        console.log("can't connect to db");
    } else {
        console.log("connection")
    }
    db = client.db(dataBaseName)


    let flag = 0;
    let flag1 = 0
    db.collection('screens').insertMany(jsData, (err, data) => {
        if (err) {
            flag = 1;

            db.collection('screens').drop();
            console.log('upload data...')
        } else {
            console.log('insert data to MongoDB 1')
        }

        if (flag) {
            db.collection('screens').insertMany(jsData, (err, data) => {
                if (err) {
                    console.error('error to upload data')
                } else {
                    console.log('insert data to MongoDB 2')
                }
            })
        }
    })

    db.collection('scheduler').drop();
    console.log('scheduler deleted')
    db.collection('scheduler').insertMany(jsScheduler, (err, data) => {
        if (err) {
            console.error('error to upload scheduler')
        } else {
            console.log('insert scheduler to MongoDB 2')

        }
    })
});


module.exports = {
    main: function (req, res) {

        db.collection('screens').find().toArray(function (err, data) {
            if (err) {
                console.log('Error')
            } else if (data != null)
                console.log(data)
            res.send(data);
        });
    },
    Scheduler: function (req, res) {
        db.collection('scheduler').find().toArray(function (err, data) {
            if (err) {
                console.log('Error')
            } else if (data != null)
                console.log(data)
            res.send(data);
        });
    },

    getUserById: async (id) => {
        const user = await db.collection('admins').findOne({
            _id: mongodb.ObjectId(id)
        });
        console.log('get user by id', user);
        return user;
    },

    // This is store all the clients that are connected the website into MongoDB
    addUsers: function (screenNum) {

        db.collection('activeUsers').insertOne({
            screen: screenNum
        })

        db.collection('historyUsers').find({
            screen: screenNum
        }).toArray((err, data) => {
            if (data[0]) {
                console.log("this user is already exist!")
            } else {
                db.collection('historyUsers').insertOne({
                    screen: screenNum
                }, (err, data) => {
                    if (err) {
                        console.log("can't save to db");
                    }
                    console.log(`the user ` + screenNum + ` saved in history`)
                })
            }
        })
    },
    deleteUsers: function (screenNum) {

        db.collection('activeUsers').deleteMany({
            screen: screenNum
        })
    },
    signup: (req, res) => {
        console.log(req.body)
        const {
            username,
            password: plainTextPassword
        } = req.body;
        if (!username || typeof username !== 'string') {
            return res.json({
                status: 'error',
                error: 'Invalid username'
            })
        }
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({
                status: 'error',
                error: 'Invalid password'
            })
        }
        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Password too small. Should be at least 6 characters'
            })
        }

        bcryptjs.hash(plainTextPassword, 10, (error, hash) => {
            if (error) {
                return res.status(500).json({
                    error
                })
            }
            db.collection('admins').find({
                username: username
            }).toArray((err, data) => {
                if (data[0]) {
                    res.json({
                        message: 'User already exist!'
                    })
                } else {
                    db.collection('admins').insertOne({
                        username: username,
                        password: hash
                    })
                    res.json({
                        message: 'Admin created!'
                    })
                }
            })
        });
    },
    login: (req, res) => {
        const {
            username,
            password
        } = req.body;

        db.collection('admins').find({
            username: username
        }).toArray(async (error, user) => {
            console.log(password, user[0].password)
            if (error) {
                console.log('error')
            }
            if (!user) {
                return res.json({
                    status: 'error',
                    error: 'Invalid username/password'
                })
            }
            if (user == null) {
                return res.status(400).send('Cannot find user')
            }
            try {
                if (await bcryptjs.compare(password, user[0].password)) {
                    res.cookie('token', user[0]._id)
                    res.json({
                        status: 'ok'
                    })
                } else {
                    res.json({
                        error: 'Username or Password are incorrect!'
                    })
                }
            } catch (error) {
                res.status(500).send();
            }

        })

    },
    history: function (req, res) {
        db.collection('historyUsers').find().toArray((function (err, data) {
            if (err) {
                console.log('Error')
            } else if (data != null)
                console.log(data)
            res.send(data);
        }))
    },
    currentConnected: function (req, res) {
        db.collection('activeUsers').find().toArray(function (err, data) {
            if (err) {
                console.log('Error')
            } else if (data != null)
                console.log(data)
            res.send(data);
        })
    },
    pushScheduler: (req, res) => {
        const {
            ID,
            Adv
        } = req.body;

        var temp = parseInt(ID)

        var Advertising = [];
        var Tempo = [];
        var i = 0;
        var j = 0;
        for (i; i < Adv.length; i++) {

            if (Adv[i] != "Non") {
                Advertising[j] = i;
                Tempo[j] = Adv[i];
                j++;
            }
        }
        var i = 1;
        console.log(Advertising)
        console.log(Tempo)

        db.collection('scheduler').findOneAndReplace(
            { id: temp }, { advertising: Advertising, tempo: Tempo },
            { returnNewDocument: true }).then(() => res.json({ status: "ok" }))
    },
    insert: function (req, res, next) {
        var movie = {
            name: req.body.name,
            texts: req.body.texts,
            images: req.body.images
        };
        db.collection('screens').insertOne(movie, function (err, result) {
            if (err) {
                console.log('Error')
                res.json({
                    status: 'error'
                })
            } else {
                console.log('Item inserted')
                res.json({
                    status: 'ok'
                })
            }

        })
    },
    deleteAdvById: function (req, res, next) {
        const { id } = req.body;

        console.log(req.body)
        console.log(id);

        db.collection('screens').deleteOne({
            _id: id
        }).then((result) => {
            console.log('the Adv (' + id + ') deleted')
            res.json({
                status: 'ok'
            })

        }).catch((error) => {
            console.log(error)
            res.json({
                status: 'error'
            })
        })


    },

    upDateAdv: function (req, res, next) {
        const { Id,
            Title,
            Text,
            Image } = req.body;

        console.log(req.body)
        console.log(Id +'\n'+ Title+'\n' +'\n'+ Text+'\n'+ Image);

        db.collection('screens').findOneAndReplace(
            { _id: Id },
            {
                name: Title,
                texts: Text,
                images: Image
            },
            { returnNewDocument: true }).then(() => res.json({ status: "ok" }))


    }

}