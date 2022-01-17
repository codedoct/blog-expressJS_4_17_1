const app = require('express').Router()
const errorHandler = require('~/services/error')
const authentication = require('~/services/authentication')
const { deleteFile, validatePdfUpload, configFile } = require('~/services/file');
const fs = require('fs');
const shell = require('shelljs');

app.post('/compress-pdf', authentication.auth, validatePdfUpload(configFile.compressPdf.size, configFile.compressPdf.folder), async (req,res) => {
    try {
        // validate image
        if (req.error) {
            throw req.error;
        }
        if (!req.file) {
            return errorHandler.BadRequest(res, 'File not found');
        }

        let compress = 72; // opt
        if (req.body.compress === 'min') {
            compress = 100;
        } else if (req.body.compress === 'max') {
            compress = 50;
        }

        const dir = 'public/media/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }
        shell.exec(`utils/compressPdf.sh ${req.file.path} ${dir}${req.file.filename} ${compress}`);

        const result = fs.readFileSync(`${dir}${req.file.filename}`).toString('base64');
        deleteFile(req.file.filename);
        deleteFile(`${configFile.compressPdf.folder}/${req.file.filename}`);

        res.json({ status: 'OK', result });
    } catch (err) {
        if (req.file) {
            deleteFile(`${configFile.compressPdf.folder}/${req.file.filename}`);
        }
        errorHandler.UnHandler(res, err);
    }
});

module.exports = app
