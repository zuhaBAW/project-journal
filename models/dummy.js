Books
array.filter()

i = books[];
const secName = books[].sections.name;
console.log(secName)
// books.map(i =>{
//   console.log(i.sections.name, name)
//   if(i.sections.name !== name){
    // res.send("section exists")

  // if(){
    const section = new BooksModel(
    {
      "user_id": req.user._id,
      "sections": req.body
    }
  )
  // })
section.save()

console.log(section);

len = section[0].sections.entries.length;
console.log(len)
console.log(section[0].sections.name)
k = len

const entryLength = section[0].sections.entries.length
const count = await BooksModel.update(
  {'sections.name':req.params.name},
  {set:{'sections.count' : entryLength}}
)
console.log(entryLength)

// new update
const len = section[0].sections.entries.length;
for(a=0; a <= len; a++){

  // console.log(a)
  if(section[0].sections.entries[a].name === entryName){
    console.log(a)
    // const updateEntry = BooksModel.update({'sections.entries[a].name':entryName},
    // {$push:{'sections.entries':{
    //   "name":req.body.name || section.entries[a].name,
    //   "overview":{
    //       "title":req.body.title || section.entries[a].overview.title,
    //       "date":req.body.date || section.entries[a].overview.date
    //     }
    //   }}
    // })


Page
-------------------         secids, name, entries
Section list
  s1
  s2
  s3

  sections
    a1,
    a2

  sections
    a1:{id: a1, name: qer, noe: 12},
    a2:{},
    a3:{}
-------------------
uu
  e1
  e2
  e3




--------------------
