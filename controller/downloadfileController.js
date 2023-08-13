const AWS = require("aws-sdk");
const S3Services = require("../services/S3services");
const Expense = require("../models/expense");
const User = require("../models/user");
const FilesDownload = require("../models/filesdownloaded");

async function download(req, res) {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        const strinfiyExpenses = JSON.stringify(expenses);
        const userId = req.user.id;
        const filename = `expenses${userId}/${new Date()}.txt`;
        const fileUrl = await S3Services.uploadToS3(strinfiyExpenses, filename);
        await FilesDownload.create({
            filelink: fileUrl,
            userId,
        });
        res.status(200).json({ fileUrl, success: true });
    } catch (err) {
        res.status(500).json({ fileUrl: "", success: false });
    }
}

async function downloadLinks(req, res) {
    try {
        const links = await FilesDownload.find({ userId: req.user.id });
        res.status(200).json({ success: true, links });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err });
    }
}

module.exports = {
    download,
    downloadLinks
};
