import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: Options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        tags: [
            {
                name: "Products",
                description: "API operations related to products",
            },
        ],
        info: {
            title: "REST API with Express and Typescript",
            version: "1.0.0",
            description: "API documentation for products management",
            contact: {
                name: "Diego Meneses",
                url: "https://github.com/DiegoMP06",
            },
        },
    },
    apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url(https://scontent.fpbc4-1.fna.fbcdn.net/v/t39.30808-6/463377535_122105973854562411_8331706941312976073_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=YcHzoPkfqa8Q7kNvwEkSZhI&_nc_oc=Adlvk2XLvTOqnxMzCur7SEaAsYw-mqDnDwsubgG76LdkqbOGyd1CJc_xOZDUa13e1edOTdPVtXJgk9NSy_x85ArV&_nc_zt=23&_nc_ht=scontent.fpbc4-1.fna&_nc_gid=oLxp7uaP_RX2jJl1BmUfFA&oh=00_AYFGuzI9lP4Zx9efE1GKKofxbDr_-awMVIwa_ZnIZi8H9w&oe=67F4FC83);
            height: 70px;
            width: 70px;
            display: block;
            flex: none;
            border-radius: 50%;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: "Documentacion REST API Express y Typescript",
}

export default swaggerSpec;

export { swaggerUIOptions };