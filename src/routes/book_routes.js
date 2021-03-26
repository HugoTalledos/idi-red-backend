const express = require("express");
const bookController = require("../controllers/bookController");
const BookValidator = require("../middlewares/bookValidator");
const LendValidator = require("../middlewares/lendValidator");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Crud Books
 *   description: Crud for object books
 * definitions:
 *   Person: 
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         description: Name of the person to whom the book is loaned
 *       cellphone:
 *         type: string
 *         required: true
 *         description: Phone number of the person to whom the book is loaned
 *   Book:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         required: true
 *         description: Title of the book
 *       description:
 *         type: string
 *         required: false
 *         description: Description of the book
 *       cover:
 *          type: object
 *          description: Information about the book cover
 *          required: false
 *          properties:
 *           url:
 *            type: string
 *            required: false
 *            description: Url of the book cover
 *           alt:
 *            type: string
 *            required: false
 *            description: Alternative text for the book cover
 *       author:
 *         type: string
 *         required: true
 *         description: Author of the book
 *       gender:
 *         type: string
 *         required: false
 *         description: Gender of the book
 *       editorial:
 *         type: string
 *         required: false
 *         description: Editorial of the book
 *   Book-Update:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         required: true
 *         description: Title of the book
 *       description:
 *         type: string
 *         required: false
 *         description: Description of the book
 *       cover:
 *          type: object
 *          description: Information about the book cover
 *          required: false
 *          properties:
 *           url:
 *            type: string
 *            required: false
 *            description: Url of the book cover
 *           alt:
 *            type: string
 *            required: false
 *            description: Alternative text for the book cover
 *       author:
 *         type: string
 *         required: true
 *         description: Author of the book
 *       gender:
 *         type: string
 *         required: false
 *         description: Gender of the book
 *       editorial:
 *         type: string
 *         required: false
 *         description: Editorial of the book
 *       deleted:
 *         type: boolean
 *         required: true
 *         description: State of the book
 */

/**
 * @swagger
 * path:
 *  /api/book:
 *    get:
 *      tags: [Crud Books]
 *      summary: Get all books from database
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return all books from database
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/", bookController.getAll);

/**
 * @swagger
 * path:
 *  /api/book/{id}:
 *    get:
 *      tags: [Crud Books]
 *      summary: Get information from a specific book
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return information from a specific book
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/:id", bookController.getById);

/**
 * @swagger
 * path:
 *  /api/book:
 *    post:
 *      tags: [Crud Books]
 *      summary: Create new book
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Book'
 *      responses:
 *        "200":
 *          description: Book has been created succesfully!
 *        "400":
 *          description: Missing field or Unexpected error occurred
 */

router.post("/", BookValidator.validateSchema, bookController.add);

/**
 * @swagger
 * path:
 *  /api/book/{id}:
 *    put:
 *      tags: [Crud Books]
 *      summary: Update information of a book
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Book-Update'
 *      responses:
 *        "200":
 *          description: Book has been updated succesfully!
 *        "400":
 *          description: Missing field or Unexpected error occurred
 */

router.put("/:id", BookValidator.validateSchema, bookController.update);

/**
 * @swagger
 * path:
 *  /api/book/{id}:
 *    delete:
 *      tags: [Crud Books]
 *      summary: Delete information of a book
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Book has been deleted succesfully!
 *        "400":
 *          description: Unexpected error occurred
 */

router.delete("/:id", bookController.delete);

/**
 * @swagger
 * path:
 *  /api/book/lend/{id}:
 *    put:
 *      tags: [Crud Books]
 *      summary: Change the status from isBorrowed to true and add the name and cell phone of the person to whom it was loaned
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Person'
 *      responses:
 *        "200":
 *          description: Book borrowed successfully!
 *        "400":
 *          description: Can not borrow book cause it already is borrowed or missing field
 *        "500":
 *          description: Book not found or Unexpected error
 */

router.put("/lend/:id", LendValidator.validateSchema, bookController.lend);

/**
 * @swagger
 * path:
 *  /api/book/recover/{id}:
 *    put:
 *      tags: [Crud Books]
 *      summary: Retrieve book, that is, it sets the isBorrowed attribute to false indicating that the borrowed book has been returned
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Book recovered successfully
 *        "400":
 *          description: Can not recover book cause it already is recovered
 *        "500":
 *          description: Book not found or Unexpected error
 */

router.put("/recover/:id", bookController.recover);

module.exports = router;
// router.get("*", bookController.notFound);
