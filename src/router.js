import express from 'express';
import { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from './controllers/books.js';
import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve all books from the MongoDB books collection.
 *     tags:
 *       - Books
 *     responses:
 *       '200':
 *         description: Successfully retrieved all books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6af4fd9c148b06f62dbda89e
 *                   id:
 *                     type: string
 *                     example: b1
 *                   authorId:
 *                     type: string
 *                     example: a1
 *                   title:
 *                     type: string
 *                     example: Patterns of Light
 *                   publicationDate:
 *                     type: string
 *                     format: date
 *                     example: '2021-08-17'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               id:
 *                 type: string
 *                 example: b4
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Example Book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: '2026-01-15'
 *     responses:
 *       '201':
 *         description: Book created successfully
 *       '400':
 *         description: Missing or invalid fields, duplicate ID, or nonexistent author
 *       '500':
 *         description: Internal server error
 */
router.post('/books', createBookHandler);


/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     description: Update an existing book using its custom ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom ID of the book to update.
 *         schema:
 *           type: string
 *           example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - publicationDate
 *             properties:
 *               authorId:
 *                 type: string
 *                 example: a1
 *               title:
 *                 type: string
 *                 example: Updated Book Title
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: '2026-01-15'
 *           example:
 *             authorId: a1
 *             title: Updated Book Title
 *             publicationDate: '2026-01-15'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '400':
 *         description: Missing or invalid fields, or author does not exist
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.put('/books/:id', updateBookHandler);


/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Delete an existing book using its custom ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom ID of the book to delete.
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       '204':
 *         description: Book deleted successfully. No response body.
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/books/:id', deleteBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a single book using its custom ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The custom ID of the book.
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the requested book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6af4fd9c148b06f62dbda89e
 *                 id:
 *                   type: string
 *                   example: b1
 *                 authorId:
 *                   type: string
 *                   example: a1
 *                 title:
 *                   type: string
 *                   example: Patterns of Light
 *                 publicationDate:
 *                   type: string
 *                   format: date
 *                   example: '2021-08-17'
 *       '404':
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: A single author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Missing required author fields or author ID already exists
 *       500:
 *         description: Unable to create author
 */
router.post('/authors', createAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Missing required author fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */
router.put('/authors/:id', updateAuthor);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted because they still have books
 *       500:
 *         description: Unable to delete author
 */
router.delete('/authors/:id', deleteAuthor);

export default router;
