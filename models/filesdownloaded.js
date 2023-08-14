const mongoose = require('mongoose');

const filesDownloadedSchema = new mongoose.Schema({
    filelink: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const FilesDownloaded = mongoose.model('FilesDownloaded', filesDownloadedSchema);

module.exports = FilesDownloaded;
