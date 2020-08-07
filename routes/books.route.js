const auth = require("../middleware/auth");
const config = require("config");
const { BooksModel } = require("../models/books.model");
const { User } = require("../models/user.model");
const { EntryModel } = require("../models/entry.model")
const express = require("express");
const router = express.Router();

router.post("/create-section", auth, async (req, res) => {
  const books = await BooksModel.find({"user_id":req.user._id})
   console.log(req.user)
  const name = req.body.name
  const checkedbooks = books.filter((book)=>{
    return book.section_name === name
  })
  // console.log(checkedbooks)
  if(checkedbooks.length === 0){
    const section = new BooksModel(
     {
       "user_id": req.user._id,
       "section_name": req.body.name
     })
    // const section_id = (section._id).str

      section.save()
      console.log(section._id)
     res.send('section created')
     console.log('section created')

// adding section id, name and count of entries to user
     const user = await User.findOneAndUpdate({"_id":req.user._id},
     {$push:
      {'sections' :{
        'name':req.body.name,
        'section_id':section._id,
        'count':0
      }}
    })
    user.markModified('user')
    console.log(section._id)
    await user.save()
    console.log(user)

  }else{
    res.send('section already exists')
  }

})

router.get("/get-section/:name", auth, async (req, res) => {
  console.log(req.user)
  const books = await EntryModel.findOne({"section_name":req.params.name})
  console.log(books)
  res.send(books)
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
   const sections = await BooksModel.find({"user_id":req.user._id, "section_name":req.params.name});
   console.log(sections)
   const checkedSections = sections.filter((section)=>{
     return section.entries.name === req.body.name
   })
   // console.log(checkedbooks)
   if(checkedSections.length === 0){
     const entry = await BooksModel.update(
       {'section_name':req.params.name},
       {$push:{'entries':req.body}
       } ,{upsert: true}
     )
     console.log(entry)
     console.log(req.body)
     res.send("added entry")
  }
  else{
    res.send('entry already exists')
  }
//getting the count
    const Sections = await BooksModel.findOne({"section_name":req.params.name})
    const count = Sections.entries.length
    console.log(count)

    const Count = await User.findOneAndUpdate({"sections.name":req.params.name},
    {$set:{'sections.count':count}}

  )
  await Count.save()
});

router.get("/get-entry/:name", auth, async (req, res) => {
  console.log(req.user)
  const entry = await EntryModel.findOne({"entries.entry.name":req.params.name})
  res.send(entry.entries)
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
