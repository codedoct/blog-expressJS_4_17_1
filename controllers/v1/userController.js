const app = require('express').Router();
const errorHandler = require('~/services/error');
const User = require('~/db/models/user');
const userTransform = require('~/transformers/user-transform');
const authentication = require('~/services/authentication');
const { deleteFile, validateImageUpload, configFile } = require('~/services/file');
const validator = require('~/validators/user');

app.get('/profile', authentication.auth, async (req,res) => {
    try {
        const user = await User.findOneById(req.user._id);
        const result = userTransform.showUser(user);
        res.json({ status: "OK", result });
    } catch (err) {
        errorHandler.UnHandler(res, err);
    }
});

app.put('/profile', authentication.auth, validateImageUpload(configFile.image.size, configFile.image.folder), async (req,res) => {
    let filePath = null;
    if (req.file) {
        filePath = `${configFile.image.folder}/${req.file.filename}`;
    }
    try {
        // validate image
        if (req.error) {
            throw req.error;
        }

        const validate = validator.editProfile.validate(req.body);
        if (validate.error) throw validate.error;

        const userOld = await User.findOneById(req.user._id);
        if (userOld.profile) {
            deleteFile(userOld.profile); // delete old file
        }

        const userNew = await User.updateUserNew(req.user._id, {...req.body, profile: filePath});
        const result = userTransform.showUser(userNew);
        res.json({ status: "OK", result });
    } catch (err) {
        if (filePath) {
            deleteFile(filePath);
        }
        errorHandler.UnHandler(res, err);
    }
});

module.exports = app;
