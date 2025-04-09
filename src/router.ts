import { Router } from "express";
import { body, param } from "express-validator";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateAvailability,
    updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router: Router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: "Product 1"
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);


/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Product 1"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses: 
 *              201:
 *                  description: Product Created Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid Input Data
 */

router.post(
    "/",
    body("name")
        .trim()
        .isString()
        .withMessage("Nombre Inválido")
        .notEmpty()
        .withMessage("Nombre Requerido")
        .custom((value) => value.length < 100)
        .withMessage("Nombre Demasiado Largo"),
    body("price")
        .isNumeric()
        .withMessage("Precio Inválido")
        .notEmpty()
        .withMessage("Precio Requerido")
        .custom((value) => value > 0)
        .withMessage("Precio debe ser Mayor a 0"),
    handleInputErrors,
    createProduct
);


/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product bused on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not Found
 *              400:
 *                  description: Bad Request - Invalid ID
 */

router.get(
    "/:id",
    param("id").isInt().withMessage("Id Inválido"),
    handleInputErrors,
    getProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Update a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Product 1"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Product Updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid Id or Invalid Input Data
 *              404:
 *                  description: Product Not Found
 * 
 */

router.put(
    "/:id",
    param("id").isInt().withMessage("Id Inválido"),
    body("name")
        .trim()
        .isString()
        .withMessage("Nombre Inválido")
        .notEmpty()
        .withMessage("Nombre Requerido")
        .custom((value) => value.length < 100)
        .withMessage("Nombre Demasiado Largo"),
    body("price")
        .isNumeric()
        .withMessage("Precio Inválido")
        .notEmpty()
        .withMessage("Precio Requerido")
        .custom((value) => value > 0)
        .withMessage("Precio debe ser Mayor a 0"),
    body("availability").isBoolean().withMessage("Disponibilidad Inválida"),
    handleInputErrors,
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to retrieve
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Product Updated Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid Id
 *              404:
 *                  description: Product Not Found
 */

router.patch(
    "/:id",
    param("id").isInt().withMessage("Id Inválido"),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Delete a product by given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *              - in: path
 *                name: id
 *                description: The ID of the product to delete
 *                required: true
 *                schema:
 *                    type: integer
 *          responses:
 *              200:
 *                  description: Product Deleted Successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  msg:
 *                                      type: string
 *                                      example: "Producto con id {id} eliminado"
 *              400:
 *                  description: Bad Request - Invalid Id
 *              404:
 *                  description: Product Not Found
 */

router.delete(
    "/:id",
    param("id").isInt().withMessage("Id Inválido"),
    handleInputErrors,
    deleteProduct
);

export default router;
