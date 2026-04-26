const Book=require('./book.model');

const postBook =async(req,res)=>{
  try {
   const newBook=await Book({...req.body});
   await newBook.save();   
   res.status(200).send({message:"Book posted.", book:newBook}) 

  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({message:"Error posting book"})  
  }
}

const getAllBooks= async(req,res)=>{
  try{
     const books=await Book.find().sort({createdAt:-1});
     res.status(200).send(books)

  } catch(error){
    console.error("Error displaying books", error);
    res.status(500).send({message:"Error fetching books"})
  }
}

const getSingleBook= async(req,res)=>{
   try{
     const {id}=req.params;
     const book=await Book.findById(id);
     if(!book){
      res.status(404).send({message:"Book not found"})  
     }
     res.status(200).send(book)

  } catch(error){
    console.error("Error displaying book", error);
    res.status(500).send({message:"Error fetching book"})
  }
}

const updateBook=async(req,res)=>{
  try{
    const {id}=req.params;
    const updatedBook= await Book.findByIdAndUpdate(id, req.body, {new:true});
    if(!updatedBook){
      res.status(404).send({message:"Book not found"}) 
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook
    })

  } catch(error){
    console.error("Error updating book", error);
    res.status(500).send({message:"Error updating the book"})
  }
}

const deleteABook= async(req,res)=>{
  try{
    const {id}=req.params;
    const deletedBook= await Book.findByIdAndDelete(id)

  } catch(error){
    console.error("Error deleting book", error);
    res.status(500).send({message:"Error deleting the book"})
  }
}

module.exports= {
  postBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteABook,
}