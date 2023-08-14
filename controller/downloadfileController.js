const AWS = require("aws-sdk");
const S3Services = require("../services/S3services");
const Expense = require("../models/expense");
const User = require("../models/user");
const FilesDownload = require("../models/filesdownloaded");

exports.download = async (req, res) => {
    try {
      const expenses = await Expense.find({ userId: req.user.id });
      const strinfiyExpenses = JSON.stringify(expenses);
      const userId = req.user.id;
      const filename = `expenses${userId}/${new Date()}.txt`;
      const fileUrl = await S3Services.uploadToS3(strinfiyExpenses, filename);
      const filesDownload = new FilesDownload({
        filelink: fileUrl,
        userId,
      });
      await filesDownload.save();
      res.status(200).json({ fileUrl, success: true });
    } catch (err) {
      res.status(500).json({ fileUrl: "" });
    }
  };

exports.downloadLinks = async (req, res) => {
    try {
      const url = await FilesDownload.find({ userId: req.user._id });
      res.status(200).json({ success: "true", url });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: "false", error: err });
    }
};
  

// module.exports = {
//     download,
//     downloadLinks
// };
