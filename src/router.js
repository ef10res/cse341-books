
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

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
 *                   author:
 *                     type: string
 *                     example: Maya Rivera
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
 *                 author:
 *                   type: string
 *                   example: Maya Rivera
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

export default router;
