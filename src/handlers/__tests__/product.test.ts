import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(0);
    });

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Producto 2 - Test",
            price: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(0);
    });

    it("should validate that the price is a number and greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Producto 2 - Test",
            price: "Hola",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(0);
    });

    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Producto 1 - Test",
            price: 100,
        });

        // expect(response.status).toBe(201);
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/products", () => {
    it("should check if /api/products url exists", async () => {
        const response = await request(server).get("/api/products");

        expect(response.status).not.toBe(404);
    });

    it("should get a JSOM response with all products", async () => {
        const response = await request(server).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("GET /api/products/:id", () => {
    it("Should return a 404 response for a non-existing product", async () => {
        const productId = 2000;

        const response = await request(server).get(
            `/api/products/${productId}`
        );

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe(
            `Producto con id ${productId} no encontrado`
        );
    });

    it("Should check a valid Id in the URL", async () => {
        const response = await request(server).get(
            "/api/products/not-valid-id"
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Id Inválido");
    });

    it("Get a JSON response for a single product", async () => {
        const response = await request(server).get("/api/products/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
});

describe("PUT /api/products/:id", () => {
    it("Should check a valid Id in the URL", async () => {
        const response = await request(server)
            .put("/api/products/not-valid-id")
            .send({
                name: "Monitor curvo 24 pulgadas",
                availability: true,
                price: 100,
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Id Inválido");
    });

    it("Should display validation error messages when updating a product", async () => {
        const response = await request(server).put("/api/products/1").send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
        expect(response.body.errors).not.toHaveLength(0);
    });

    it("Should validate that the price is greater than 0", async () => {
        const response = await request(server).put("/api/products/1").send({
            name: "Monitor curvo 24 pulgadas",
            availability: true,
            price: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
        expect(response.body.errors).not.toHaveLength(0);
    });

    it("Should ruturn a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({
                name: "Monitor curvo 24 pulgadas",
                availability: true,
                price: 300,
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe(
            `Producto con id ${productId} no encontrado`
        );

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("Should update an existing product with valid data", async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: "Monitor curvo 24 pulgadas",
            availability: true,
            price: 300,
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty("errors");
    });
});

describe("PATCH /api/products/:id", () => {
    it("Should return a 404 response for a non-existing product", async () => {
        const productId = 2000;
        const response = await request(server)
            .patch(`/api/products/${productId}`)
            .send({
                name: "Monitor curvo 24 pulgadas",
                availability: true,
                price: 100,
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe(`Producto con id ${productId} no encontrado`);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty("data");
    });

    it("Should update an existing product with valid data", async () => {
        const response = await request(server)
            .patch(`/api/products/1`)
            .send({
                availability: true
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty("msg");
    });
})

describe("DELETE /api/products/:id", () => {
    it("should check a valid ID", async () => {
        const response = await request(server).delete(
            "/api/products/not-valid-id"
        );

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe("Id Inválido");
    });

    it("Should ruturn a 404 response for a non-existent product", async () => {
        const productId = 2000;
        const response = await request(server).delete(
            `/api/products/${productId}`
        );

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe(
            `Producto con id ${productId} no encontrado`
        );

        expect(response.status).not.toBe(200);
    });

    it("Should delete an existing product", async () => {
        const response = await request(server).delete(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("msg");
        expect(response.body.msg).toBe(`Producto con id 1 eliminado`);

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(400);
    });
});
