const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")
const { connectDb } = require("./helpers/db")
const { host, port, db, authApiUrl } = require("./configuration")
const app = express()

const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`started API service on port ${port}`)
        console.log(`started API service on host ${host}`)
        console.log(`started API service with database ${db}`)

        const silence = new Post({ name: 'Silence5' });
        console.log(silence.name)
        silence.save()
    })
}

app.get("/test", (req, res) => {
    res.send("API is working correctly")
})

app.get("/data-auth", (req, res) => {
    axios.get(authApiUrl + '/current-user')
        .then(data => {
            res.json({
                testWithAuth: true,
                currentUser: data.data
            })
        })
})

app.get("/posts", (req, res) => {
    Post.find((err, posts) => {
        console.log(posts)
    })

    res.json({
        posts: [{
            "name": "Test 1"
        }, {
            "name": "Test 2"
        }]
    })
})

connectDb()
    .on("error", console.log)
    .on("disconnect", connectDb)
    .once("open", startServer)