import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded( { extended: true } ));

let allTitles = [];
let allPosts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {titles: allTitles});
});

app.get("/add-a-post", (req, res) => {
    res.render("add-post.ejs");
});

app.get("/posts/:id", (req, res) => {
    res.send(`<h1>${allTitles[req.params.id]}</h1><br><br>${allPosts[req.params.id]}`);
});

app.post("/submit", (req, res) => {
    if (req.body["title"] && req.body["post"]) {
        allTitles.push(req.body["title"]);
        allPosts.push(req.body["post"]);
        res.redirect("/");
    }
    else {
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log("Listening on port: ", port);
});