const auth = require("../middleware/auth");
const config = require("config");
const { BooksModel } = require("../models/books.model");
const express = require("express");
const router = express.Router();

router.post("/create-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.find({"name":req.body.name})
    const section = new BooksModel(
        {
          "user_id": req.user._id,
          "sections": req.body
        }
      )
      res.send('created section')
      await section.save();
      console.log(section);
      console.log(req.body);
    }
)

router.delete("/delete-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  try {

     const deleteSection = await BooksModel.remove({"sections.name":req.body.name})
  } catch (err){
    res.json({message : err});
    console.log("section doesnt exists");
  }


  res.send(books)
  // console.log('deleted')
});

router.post("/create-entry/:name", auth, async (req, res) => {
  console.log(req.user)
  // const section = await BooksModel.findOne({"user_id":req.user._id});


    const entry = await BooksModel.update(
      {"secions.name":req.param.name},
      {$push:{  'sections.$.entries':{
                  "overview":{
                    "title":req.body.title,
                    "date":req.body.date,
                    "imageUrl":req.body.imageUrl
                  },
                }
              }
      },{upsert: true}
    )
    res.send(entry)
    console.log(entry)

  res.send(section)
});

module.exports = router;
