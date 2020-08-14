const auth = require("../middleware/auth");
const config = require("config");
const { BooksModel } = require("../models/books.model");
const { User } = require("../models/user.model");
const { SectionModel } = require("../models/sections")
const express = require("express");
const router = express.Router();

router.post("/create-section", auth, async (req, res) => {
  const books = await BooksModel.find({"user_id":req.user._id})
   console.log(req.user)
  const name = req.body.name
  const checkedbooks = books.filter((book)=>{
    return book.section_name === name
  })
  console.log(checkedbooks)
  if(checkedbooks.length === 0 && name !== ""){
    const section = new BooksModel(
     {
       "user_id": req.user._id,
       "section_name": req.body.name
     })
     section.save()
      console.log(section._id)
     res.send('section created')
     console.log('section created')

// adding section to section model
     const Section = await SectionModel.findOneAndUpdate({"user_id":req.user._id},
     {$push:
      {'sections' :{
        'name':req.body.name,
        'section_id':section._id,
        'color':req.body.color,
        'count':0
      }}},{upsert: true}
    )

    console.log(section._id)
    console.log(Section)

  }else{
    res.send('section failed to create')
  }

})

router.get("/get-section/:name", auth, async (req, res) => {
  console.log(req.user)
  const books = await SectionModel.findOne({"user_id":req.user._id})
  console.log(books)
  book = books.sections
  const sections = book.map((section) => {
     console.log(section.name)
    if(section.name === req.params.name){
      res.send(section)
    }else{
      res.send('section doesnt exists')
    }
  })

})

router.get("/get-all-sections", auth, async (req, res) => {
  console.log(req.user)
  const section = await SectionModel.findOne({"user_id":req.user._id})
  console.log(section.sections)
  res.send(section.sections)
})

router.delete("/delete-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  const sectionName = req.body.name
  if(sectionName){
    const deleteSection = await BooksModel.remove({"sections.name":req.body.name});
    res.send('section deleted');
    console.log(deleteSection)
  }else{
    console.log("section couldnt delete");
    res.send('failed to delete!!')
  }

});

router.put("/update-section/:name", auth, async (req, res) => {
  console.log(req.user)
  const updateSection = await BooksModel.update({"sections.name":req.params.name},
  {$set:{'sections.name':req.body.name}
  })
  console.log(updateSection)
})

router.put("/create-entry/:name", auth, async (req, res, next) => {
  console.log(req.user)
   const sections = await BooksModel.find({"user_id":req.user._id});
   console.log(sections)

     const Entry = await BooksModel.update(
       {'section_name':req.params.name},
       {$push:{'entries':req.body}
       } ,{upsert: true}
     )
     console.log(Entry)
     console.log(req.body)
     console.log(sections)
     res.send("added entry")

// getting the count of entries
     const Sections = await BooksModel.findOne({"user_id":req.user._id, "section_name":req.params.name})
     // console.log(Sections)
     const entry = Sections.entries.length
     const i = {"count":entry}
      console.log(i)
     console.log(req.user)

// section to be updates
     const Count = await SectionModel.findOne({"user_id":req.user._id})
       // console.log(Count)
     user = Count.sections
     entryName = req.params.name
     console.log(user)
     const updateSection = user.map((section) => {
       console.log(section.name)
        var returnValue = {...section};
        console.log(section.name, entryName)
       if(section.name === entryName){
         section.count = entry;
         console.log('ok')
          return returnValue
       }
       return returnValue
       console.log(section.name)
     })

     user = updateSection
     Count.markModified('sections')
     await Count.save()
     console.log(user)

})

router.get('/get-all-entry/:name', auth, async (req,res) => {
  const Books = await BooksModel.findOne({'user_id':req.user._id, 'section_name':req.params.name})
  const book = {section_name:Books.section_name,
    entries:Books.entries}
  console.log(book)
  console.log(Books.entries)
  res.send(book)
})

router.get("/get-entry/:name/:entryName", auth, async (req, res) => {
  console.log(req.user)
  const Books = await BooksModel.findOne({"section_name":req.params.name})
  console.log(Books);
  const book = Books.entries
  console.log(book)
  const sections = book.map((a) => {
      var  Entry =a.name
      console.log(Entry, req.params.entryName)
    if(Entry === req.params.entryName){
      
      console.log(a)
      res.send(a)
    }
    else{
      console.log('entry doesnt exists')
    }
  })

})

router.put("/delete-entry/:name/:Ename", auth, async (req, res, next) =>{
  console.log(req.user)
  const books = await BooksModel.find({"user_id":req.user._id});

  const Name = req.params.Ename;

  if(Name){
    const deleteEntry = await BooksModel.update({'sections.name':req.params.name},
    {$pull:{"entries":{"name":Name}}

    })
    res.send('deleted entry')
    console.log('deleted')
  }else{

    console.log('failed')
  }
})

router.post("/update-entry/:name/:Ename",auth, async (req, res, next) =>{
  const entry = req.body;
  // console.log(req.user)
  const books = await BooksModel.find({"user_id":req.user._id});
  const secName = req.params.name;
  const entryName = req.params.Ename;

  // console.log(books)
  // console.log(secName, entryName)
  const section = await BooksModel.findOne({'section_name':secName})
    console.log(section)
    const entryPath = section.entries
    console.log(entryPath, 'before changes--------------------')

    // to find exact entry and modify it
    const updateEntry = entryPath.map((i) => {
      var returnValue = {...i}
      if(i.name === entryName){
        returnValue = {...i, ...entry};
      }
      return returnValue
    })

    //
    console.log(updateEntry, 'after changes ------------------------')
    section.entries = updateEntry;
    section.markModified('sections')
    await section.save()
})

module.exports = router;
