const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date
    },
    genre: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    },
    assignedTo: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    availability: {
        type: Boolean,
        default: true
    }
})

BookSchema.post('save', async function (book) {
    try {
        const Author = mongoose.model("Author");
        let author = await Author.findOne({ name: book.author });
        if (!author) {
            author = new Author({ name: book.author, books: book._id })
            await author.save();
        } else {
            await Author.findOneAndUpdate({ name: book.author }, { $addToSet: { books: book._id } }, { new: true })
        }
        console.log("Book is added to author", book);
    } catch (err) {
        console.error("Error here", err.message)
    }
})


const Book = mongoose.model('Book', BookSchema);

module.exports = Book;