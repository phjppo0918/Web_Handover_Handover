const path = require('path');

const { BusinessError, ForbiddenError, NotFoundError } = require('../services/errors/BusinessError');

const jwt = require('jsonwebtoken');
const SECRET_KEY = "MY_SECRET_KEY";

module.exports = {

    // GET /file/:file_name
    read: async (req, res) => {
        try {
            const fileName = req.params.file_name;

            res.sendFile(path.join(__dirname, '../files', fileName));
        } catch(err) {
            res.status(err.status || 500).send(err.message);
        }
    },

    // POST /file/upload
    create: async (req, res) => {
        try {
            let files = req.files.map(data => {
                return {
                    originalName: data.originalname,
                    fileName: data.filename
                };
            });

            res.status(201).json(files);
        } catch(err) {
            res.status(err.status || 500).send(err.message);
        }
    },

};
