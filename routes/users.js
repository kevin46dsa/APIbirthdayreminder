const express = require('express');
const router = express.Router();
const data = require('../data/data'); 




router.get('/checkbirthday', async (req,res) =>{
    let UserID = req.userId;
    try{
        let birthdayData = await data.checkbirthday(UserID);
        console.log(birthdayData);
       if (birthdayData) {
			res.status(200).send({ data: birthdayData });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

});



module.exports = router;


