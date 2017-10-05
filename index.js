const path = require('path');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file">
            <br><br>
            <input type="submit" value="UPLOAD">
        </form>
    `);
});

app.post('/upload', (req, res) => {
    const { file } = req.files;
    const uploadTo = `uploads/${file.name}`;
    file.mv(uploadTo, (err) => {
        res.send(`File uploaded to <a href="${uploadTo}">here</a>`)
    });
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
});

