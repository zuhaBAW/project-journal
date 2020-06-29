router.post("/create-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findOne({"user_id":req.params.id})
  if(!books.sections){
    const section = new BooksModel(
      {

          "user_id": req.params.id,
           "sections": req.body
         }
    )
    await section.save()
    console.log(req.body);
    console.log(section)
  }
  else{
    console.log('section exists');

  }
  res.send(books)
  await books.save()
});

router.post("/delete-section", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  const deleteSection = BooksModel.update({"user_id":req.user._id},
    {$pull:'sections'}
  )
  res.send(books)
});

router.post("/create-entry", auth, async (req, res) => {
  console.log(req.user)
  const section = await BooksModel.findOne({"user_id":req.user._id});
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
  res.send(section)
});

router.get("/delete-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);
  const deleteEntry = BooksModel.update({},
    {$pull:{sections:'entries'}}
  )
  res.send(books)
});

router.get("/update-entry", auth, async (req, res) => {
  console.log(req.user)
  const books = await BooksModel.findById(req.user._id);

  res.send(books)
});
