const express = require('express');
const router = express.Router();
var sizeOf = require('buffer-image-size');
const sharp = require('sharp');

router.get('/', function(req, res, next) {
  res.render("index",{title : "Size Reducer"});
});
router.post("/upload",async (req , res)=> {
	if(!req.files) {
		return res.send({data : "" , error : "No file uploaded"});
	}
	try {
		const file = req.files.file;
		// console.log(file);
		const data = await sharp(file.data).jpeg({ quality: 80 }).toBuffer();
		const src = `data:${file.mimetype};base64,${Buffer.from(data).toString('base64')}`
		return res.json({src : src , size : data.length});
	}
	catch(err) {
		// console.log(err);
		return res.json({error : "Something Went Wrong",data : ""});
	}
});

module.exports = router;
