const express = require("express")
const axios = require("axios")
const { connectDb } = require("./helpers/db")
const { host, port, db, apiUrl } = require("./configuration")
const app = express()

const startServer = () => {
    app.listen(port, () => {
        console.log(`started Auth service on port ${port}`)
        console.log(`started Auth service on host ${host}`)
        console.log(`started Auth service with database ${db}`)
    })
}

app.get("/test", (req, res) => {
    res.send("Auth service is working correctly")
})

app.get("/current-user", (req, res) => {
    res.json({
        id: "1234",
        email: "test@test.dev"
    })
})

app.get("/current-user-posts", (req, res) => {
    axios.get(apiUrl + '/posts')
        .then(data => {
            console.log(data.data)
            res.json({
                id: "1234",
                email: "test@test.dev",
                withAPiData: true,
                posts: data.data.posts
            })
        })
})

connectDb()
    .on("error", console.log)
    .on("disconnect", connectDb)
    .once("open", startServer)