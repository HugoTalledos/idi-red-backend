const express = require("express");
const documentController = require("../controllers/documentController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 * definitions:
 *   Document: 
 *     type: object
 *     properties:
 *       documentType: 
 *         type: string
 *         required: true
 *         description: type of document registered due to loss
 *       city:
 *         type: string
 *         required: true
 *         description: City where the document was found
 *       ownerName: 
 *         type: string
 *         required: true
 *         description: Name of the document owner
 */

/**
 * @swagger
 * path:
 *  /api/documents/{userId}:
 *    post:
 *      tags: [Documents]
 *      summary: Register of a document information in a specific user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Document'
 *      responses:
 *        "200":
 *          description: Docuemnt has been registred succesfully in a user!
 *        "400":
 *          description: Unexpected error occurred
 */

 router.post("/:userId", documentController.registerDocument);

 /**
 * @swagger
 * path:
 *  /api/documents/searchDocument/{documentNum}:
 *    get:
 *      tags: [Documents]
 *      summary: Get a specific document from its number
 *      parameters:
 *        - name: documentNum
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return document information!
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/searchDocument/:documentNum", documentController.getDocumentByDocumentNum);

/**
 * @swagger
 * path:
 *  /api/documents:
 *    get:
 *      tags: [Documents]
 *      summary: Get all documents from database
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return all documents from database
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/", documentController.getAllDocuments);

/**
 * @swagger
 * path:
 *  /api/documents/{userId}:
 *    get:
 *      tags: [Documents]
 *      summary: Get documents from a specific user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return documents from a specific user
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/:userId", documentController.getDocumentsByUserId);

/**
 * @swagger
 * path:
 *  /api/documents/{userId}/{documentId}:
 *    put:
 *      tags: [Documents]
 *      summary: Update information of a specific document
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *        - name: documentId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Document'
 *      responses:
 *        "200":
 *          description: Document has been updated succesfully!
 *        "400":
 *          description: Document with id ${documentId} does not exist or user with id ${userId} does not exist
 *        "500":
 *          description: Unexpected error occurred
 */

router.put("/:userId/:documentId", documentController.updateDocument);

/**
 * @swagger
 * path:
 *  /api/documents/{userId}/{documentId}:
 *    delete:
 *      tags: [Documents]
 *      summary: Delete document of a a specific user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *        - name: documentId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: User has been deleted succesfully!
 *        "400":
 *          description: Document with id ${documentId} does not exist or user with id ${userId} does not exist
 *        "500":
 *          description: Unexpected error occurred
 */

router.delete("/:userId/:documentId", documentController.deleteDocument);

module.exports = router;
