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
  if(checkedbooks.length === 0){
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
    res.send('section already exists')
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

     const entry = await BooksModel.update(
       {'section_name':req.params.name},
       {$push:{'entries':req.body}
       } ,{upsert: true}
     )
     console.log(entry)
     console.log(req.body)
     res.send("added entry")

//getting the count
  //   const Sections = await BooksModel.findOne({"section_name":req.params.name})
  //   const count = Sections.entries.length
  //   console.log(count)
  //
  //   const Count = await User.findOneAndUpdate({"sections.name":req.params.name},
  //   {$set:{'sections.count':count}}
  //
  // )
  // await Count.save()
});

router.get('/count/:name', auth, async (req, res) => {
     const Sections = await BooksModel.findOne({"user_id":req.user._id, "section_name":req.params.name})
     console.log(Sections)
     const entry = Sections.entries.length
     console.log(entry)
     console.log(req.user)
     const Count = await User.findOne({"_id":req.user._id})
     user = Count.sections
     console.log(user)
     const updateSection = user.map((section) => {
        var returnValue = {...section}
       if(section.name === req.params.name){
         returnValue.count = entry;
         console.log('ok')
       }

       console.log(section.name)
     })
     console.log(user)
     user = updateSection
     Count.markModified('sections')
     Count.save()

     // {$set:{'sections.count':count}})
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
     var  Entry =a.entry.name
     console.log(Entry)
    if(Entry === req.params.entryName){
      res.send(a)
    }else{
      res.send('entry doesnt exists')
    }
  })

})

router.put("/delete-entry/:name", auth, async (req, res, next) =>{
  console.log(req.user)
  const books = await BooksModel.find(req.user._id);

  const Name = req.body.name;

  if(Name){
    const deleteEntry = await BooksModel.update({'sections.name':req.params.name},
    {$pull:{"sections.entries":{"name":Name}}

    })
    res.send('deleted entry')
    console.log('deleted')
  }else{

    console.log('failed')
  }
})

router.post("/update-entry/:name",auth, async (req, res, next) =>{
  const entry = req.body;
  // console.log(req.user)
  const books = await BooksModel.find({"user_id":req.user._id});
  const secName = req.params.name;
  const entryName = req.body.name;

  // console.log(books)
  // console.log(secName, entryName)
  const section = await BooksModel.findOne({'sections.name':secName})
    console.log(section)
    const entryPath = section.sections.entries
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
    section.sections.entries = updateEntry;
    section.markModified('sections')
    await section.save()
})

module.exports = router;
