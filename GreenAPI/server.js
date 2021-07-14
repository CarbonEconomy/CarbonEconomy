const app = require('./handler')

app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "Hello from root!",
    });
});

app.get("/hello", (req, res, next) => {
    return res.status(200).json({
      message: "Hello from path!",
    });
});

app.listen(3000, (err) => {
    if (err) throw err
    console.log('Server running in http://127.0.0.1:3000')
})