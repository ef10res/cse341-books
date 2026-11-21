import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const db = getDb();
    const books = await db.collection('books').find().toArray();
    return books;
}

const getBookById = async (bookId) => {
    const db = getDb();
    const book = await db.collection('books').findOne({ id: bookId });
    return book;
}

const createBook = async (book) => {
    const db = getDb();
    const result = await db.collection('books').insertOne(book);
    return result;
}

const updateBook = async (bookId, updatedBook) => {
    const db = getDb();
    const result = await db.collection('books').updateOne({ id: bookId }, { $set: updatedBook });
    return result;
}

const deleteBook = async (bookId) => {
    const db = getDb();
    const result = await db.collection('books').deleteOne({ id: bookId });
    return result;
}

const authorExists = async (authorId) => {
    const db = getDb();
    const author = await db.collection('authors').findOne({ id: authorId });
    return author !== null;
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook, authorExists };