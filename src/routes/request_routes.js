const express = require("express");
const requestController = require("../controllers/requestController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Requests
 * definitions:
 *   Request: 
 *     type: object
 *     properties:
 *       requestType: 
 *         type: string
 *         required: true
 *         description: type of request ([i]nbound - [o]utbound)
 *       applicantName:
 *         type: string
 *         required: true
 *         description: Applicant's name for document
 *       applicantId:
 *         type: string
 *         required: true
 *         description: User's ID requesting the document
 */

/**
 * @swagger
 * path:
 *  /api/requests/{userId}/:
 *    post:
 *      tags: [Requests]
 *      summary: Register of a request information on a specific document
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
 *                  $ref: '#/definitions/Request'
 *      responses:
 *        "200":
 *          description: Request has been registred succesfully in a user!
 *        "400":
 *          description: Unexpected error occurred
 */

 router.post("/:userId", requestController.registerRequest);

/**
 * @swagger
 * path:
 *  /api/requests/{userId}/{requestType}:
 *    get:
 *      tags: [Requests]
 *      summary: Get all requests filtered by [i]nbound, [o]utbound or all if not specified
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *        - name: requestType
 *          required: false
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return array with request for a specific user.
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/:userId/:requestType", requestController.getAllRequests);

/**
 * @swagger
 * path:
 *  /api/requests/{userId}/{requestId}:
 *    put:
 *      tags: [Requests]
 *      summary: Update information of a specific request
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *        - name: requestId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/Request'
 *      responses:
 *        "200":
 *          description: Request has been updated succesfully!
 *        "400":
 *          description: Request with id ${requestId} does not exist or user with id ${userId} does not exist
 *        "500":
 *          description: Unexpected error occurred
 */

router.put("/:userId/:requestId", requestController.updateRequest);

/**
 * @swagger
 * path:
 *  /api/requests/{userId}/{requestId}:
 *    delete:
 *      tags: [Requests]
 *      summary: Delete request of a specific user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *        - name: requestId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Request has been deleted succesfully!
 *        "400":
 *          description: Request with id ${requestId} does not exist or user with id ${userId} does not exist
 *        "500":
 *          description: Unexpected error occurred
 */

router.delete("/:userId/:requestId", requestController.deleteRequest);

module.exports = router;
