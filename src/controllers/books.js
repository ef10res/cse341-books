import { getAllBooks, getBookById, createBook, updateBook, deleteBook, authorExists } from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error({ message: 'Error fetching books', error });
        return res.status(500).json({ message: 'internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const book = await getBookById(requestedId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    } catch (error) {
        console.error({ message: 'GET /books/:id failed', error });
        return res.status(500).json({ message: 'internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    const newBook = req.body;
    try {
        const { id, authorId, title, publicationDate} = newBook ?? {};
        if (!id || !authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const authorExistsResult = await authorExists(authorId);
        if (!authorExistsResult) {
            return res.status(400).json({ message: 'Author does not exist' });
        }
        const result = await createBook(newBook);
        return res.status(201).json(result);
    } catch (error) {
        console.error({ message: 'POST /books failed', error });
        return res.status(500).json({ message: 'internal server error' });
    }
};

const updateBookHandler = async (req, res) => {
    const requestedId = req.params.id;
    const updatedBook = req.body;
    try {
        const { authorId, title, publicationDate } = updatedBook ?? {};
        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const authorExistsResult = await authorExists(authorId);
        if (!authorExistsResult) {
            return res.status(400).json({ message: 'Author does not exist' });
        }
        const result = await updateBook(requestedId, updatedBook);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error({ message: 'PUT /books/:id failed', error });
        return res.status(500).json({ message: 'internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    const requestedId = req.params.id;
    try {
        const result = await deleteBook(requestedId);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(204).json(result);
    } catch (error) {
        console.error({ message: 'DELETE /books/:id failed', error });
        return res.status(500).json({ message: 'internal server error' });
    }
};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };