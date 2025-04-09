import { RequestHandler } from "express";
import Product from "../models/Product";

export const getProducts: RequestHandler = async (_request, response) => {
    const products = await Product.findAll({
        order: [["id", "DESC"]],
    });

    response.json({
        data: products,
    });
};

export const createProduct: RequestHandler = async (request, response) => {
    // const product = new Product(request.body);
    // const data = await product.save();

    // response.json({
    //     data,
    // });

    // await check("name")
    //     .trim()
    //     .isString()
    //     .withMessage("Nombre Inválido")
    //     .notEmpty()
    //     .withMessage("Nombre Requerido")
    //     .custom((value) => value.length < 100)
    //     .withMessage("Nombre Demasiado Largo")
    //     .run(request);

    // await check("price")
    //     .isNumeric()
    //     .withMessage("Precio Inválido")
    //     .notEmpty()
    //     .withMessage("Precio Requerido")
    //     .custom((value) => value > 0)
    //     .withMessage("Precio debe ser Mayor a 0")
    //     .run(request);

    // const errors = validationResult(request);

    // if (!errors.isEmpty()) {
    //     response.status(400).json({
    //         errors: errors.array(),
    //     });
    //     return;
    // }

    const product = await Product.create(request.body);

    response.status(201).json({
        data: product,
    });
};

export const getProduct: RequestHandler = async (request, response) => {
    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
        response.status(404).json({
            msg: `Producto con id ${id} no encontrado`,
        });
        return;
    }

    response.json({
        data: product,
    });
};

export const updateProduct: RequestHandler = async (request, response) => {
    const { id } = request.params;

    const product = await Product.findByPk(id);

    if (!product) {
        response.status(404).json({
            msg: `Producto con id ${id} no encontrado`,
        });
        return;
    }

    // await product.update(request.body);

    product.name = request.body.name;
    product.price = request.body.price;
    product.availability = request.body.availability;
    await product.save();

    response.json({
        data: product,
    });
};

export const updateAvailability: RequestHandler = async (request, response) => {
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
        response.status(404).json({
            msg: `Producto con id ${id} no encontrado`,
        });
        return;
    }

    product.availability = !product.dataValues.availability;
    await product.save();

    response.json({
        data: product,
    });
};

export const deleteProduct: RequestHandler = async (request, response) => {
    const { id } = request.params;
    const product = await Product.findByPk(id);

    if (!product) {
        response.status(404).json({
            msg: `Producto con id ${id} no encontrado`,
        });
        return;
    }

    await product.destroy();

    response.json({
        msg: `Producto con id ${id} eliminado`,
    });
};
