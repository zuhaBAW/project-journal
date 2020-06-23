const auth = require("../middleware/auth");
const config = require("config");
const { SampleModel } = require("../models/sample.model");
const express = require("express");
const router = express.Router();

router.post('/add', async (req, res) =>{
  const error = "name already exists"
  const sample = await SampleModel.findOne({"name":req.body.name})
  if(!sample){
    const name = new SampleModel({
      'name':req.body.name
    })
    await name.save()
    res.send('okay')
    console.log('working!');
  }else{
    res.send(error)
  }

})

module.exports = router;
