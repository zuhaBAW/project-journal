const auth = require("./middleware/auth");
const config = require("config");
const { BooksModel } = require("./models/books.model");
const express = require("express");
const router = express.Router();

const section =  BooksModel.find({'sections.name':'holiday'})
const entryname = BooksModel.find({'sections.entries[name]':'hills'})
console.log(section)
console.log(entryname)
// updateEntry = section.entries.map(i => {
//   if(i.name === entryname){
//     i = {...i, ...entry}
//   }
// })
// section('entries')
// console.log(section)
// await section.save()
//
//
// []

  //
  // const updateEntry = await BooksModel.updateOne({'sections[entries].name':req.params.entryName},
  // {$set:{'sections.entries':{
  //   "name":req.body.name || section.entries[]name]],
  //   "overview":{
  //     "title":req.body.title || section.entries[overview].title,
  //     "date":req.body.date || section.entries[overview].date
  //   }}}
  // }, {upsert: true})


  // return{...i}})
  // pos.find(i => i.name === entryName).entry
//
// update
// //   const pos = entryPath.map(i) => {
// //      if(i.name === entryName)
// //      {
// //        console.log('true')
// //        const updated = {...i, ...entry}
// //        return i;
// //        res.send(updated)
// //       section.markModified(entryPath)
// //       section.save()
// //
// //        console.log(i)
// //
// //      }
// //      else
// //      {
// //        console.log('no')
// //      }
// //      console.log(i.name, entryName)
// //    })
// .

const sections = await SectionModel.findOneAndUpdate({"user_id":req.user._id},
{$push:
{'sections':{'req.body.name':{
  "section_id":section._id,
  "section_name":req.body.name
  }}}
})

//
// user = {
//   n: '',
//   sections: ['qwe', '123qsd']
// }
//
// boos.find({id: ['qwe', '123qsd', ]})

// //creating new and getting its id
// user a => section asd
// sction = new model({asdasd})
// result = await section.save()
// result.id/ _id
//
// // pushing that id to users section array
// U = user.find => Name
// U.section = updatessec
// U.save()
