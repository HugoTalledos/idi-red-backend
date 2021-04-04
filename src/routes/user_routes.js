const express = require("express");
const usersController = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Crud for object Users
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
 *      
 *   User:
 *     type: object
 *     properties:
 *       userName:
 *         type: string
 *         required: true
 *         description: username that registers to IDIred
 *       picture:
 *         type: string
 *         required: false
 *         description: picture of the user
 *       isDeleted:
 *         type: boolean
 *         required: true
 *         description: user status in IDIred
 *       emailUser:
 *         type: string
 *         required: false
 *         description: User email in case of not using google login
 *       password:
 *         type: string
 *         required: false
 *         description: User email in case of not using google login (MD5)
 *       userId:
 *         type: string
 *         required: true
 *         description: user id for google or own idred
 */

/**
 * @swagger
 * path:
 *  /api/users:
 *    get:
 *      tags: [Users]
 *      summary: Get all users from database
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return all users from database
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * path:
 *  /api/users/{userId}:
 *    get:
 *      tags: [Users]
 *      summary: Get information from a specific user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Return information from a specific user
 *        "400":
 *          description: Unexpected error occurred
 */

router.get("/:userId", usersController.getUserById);

/**
 * @swagger
 * path:
 *  /api/users:
 *    post:
 *      tags: [Users]
 *      summary: Create new user
 *      requestBody:
 *        required: true
 *        content:
 *              application/json:
 *                schema:
 *                  $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: User has been created succesfully!
 *        "400":
 *          description: Missing field or Unexpected error occurred
 */

router.post("/", usersController.createUser);

/**
 * @swagger
 * path:
 *  /api/users/{userId}:
 *    put:
 *      tags: [Users]
 *      summary: Update information of a user
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
 *                  $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: User has been updated succesfully!
 *        "400":
 *          description: Missing field or Unexpected error occurred
 */

router.put("/:userId", usersController.updateUser);

/**
 * @swagger
 * path:
 *  /api/users/{userId}:
 *    delete:
 *      tags: [Users]
 *      summary: Delete information of a user
 *      parameters:
 *        - name: userId
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: User has been deleted succesfully!
 *        "400":
 *          description: Unexpected error occurred
 */

router.delete("/:userId", usersController.deleteUser);

module.exports = router;
