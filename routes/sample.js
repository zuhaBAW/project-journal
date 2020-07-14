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

router.post('/1', auth, async (req, res) => {
  // const sample = await SampleModel.findById(req.user._id);
  const post = new SampleModel({
    'user_id':req.user._id,
    'name':req.body.name,
    'age':req.body.age
  })
  await post.save()
  res.send(req.user)
  // res.send(post)
  console.log(req.user, post)
})

module.exports = router;
