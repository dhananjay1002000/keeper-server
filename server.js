import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'; 

const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin:1234@cluster0.utkfs.mongodb.net/" ,{
  useNewUrlParser:true, 
  useUnifiedTopology:true
 }
);

const notesSchema = mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model("Note" ,  notesSchema);



app.get('/', async (req , res)=>{
     const note =  await Note.find({});
     res.send(note);
});
app.delete('/del/:id' , async (req , res)=>{
  const id = req.params.id;
  // const extracted_id = id.slice(1,id.length);
  // console.log(extracted_id);
  console.log(id);
  try{
   await Note.findByIdAndRemove(id);
  }
  catch(err){
    console.error("An error occured:" , err);
  }
  
})
app.post('/post' , async (req , res)=>{
  try{
    const data = req.body;
    const note = new Note(data);
    await note.save();
    console.log(data);
    res.send("Saved successfully");
  }
  catch(err){
    console.error("An error occured: " , err);
  }
})
app.put('/put/:id' , async (req , res)=>{
    try{
      const uid = req.params.id;
      const data = req.body;
      await Note.findByIdAndUpdate(uid , {
        title: data.title,
        content: data.content
      })
      res.send("Data updated successfully");
    }
    catch(err){
      console.error("An error occurred: "  , err);
    }
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});