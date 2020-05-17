const auth = require("../middleware/auth");
const { BooksModel } = require("../models/books.model");
const express = require("express");
const router = express.Router();

router.post("/create-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findOne({"user_id":req.params.id})
  if(!sections){
    const section = new BooksModel(
      {

          "user_id": req.params.id,
           sections:[
             {
               "name": 'holiday',
               "meta": {
                 "created": 10-12-2015,
                 "entries": 3,
               },
               "entries":[],
             }
           ]

      }
    )
        await section.save()
        console.log(req.body);
        console.log(section)
  }
  res.send(books)
});

router.get("/delete-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  const deleteSection = BooksModel.update({
    {$pull:'sections'}
  })
  res.send(books)
});

router.get("/create-entry", auth, async (req, res) => {
  console.log(req.user)
  const section = await BooksModel.findOne({"user_id":req.params.id})
  if(section){

    const entry = await BooksModel.update(
      {"sections.name":"holiday"},
      {$push:{ 'sections.$.entries' :{

            overview:{
              title:req.body.title,
              date:req.body.date,
              imageUrl:req.body.imageUrl
            },

          }
      }
    }

    )
    res.send(entry)
    console.log(entry)
  }
  res.send(books)
});

router.get("/delete-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  const deleteEntry = BooksModel.update({
    {$pull:{sections:'entries'}}
  })
  res.send(books)
});

router.get("/update-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  
  res.send(books)
});

module.exports = router;
