process.send.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
const shoppingItems = require("../fakeDb");

let cupcake = {name: "cupcake", price: 5}

beforeEach(() => {
    shoppingItems.push(cupcake)
});

afterEach(() => {
    shoppingItems.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async() => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [cupcake]})
    })
})

describe("POST /items", () => {
    test("Create an item", async() => {
        const res = await request(app).post("/items").send({ name: "Pickles", price: 10.25})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: {name: "Pickles", price: 10.25}})
    })
})

describe("GET /items/:name", () => {
    test("Get a specific item", async() => {
        const res = await request(app).get(`/items/${cupcake.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({foundItem: {name: "cupcake", price: 5}})
    })
    test("Responds with 404 for invalid item", async() => {
        const res = await request(app).get(`/items/grapes`);
        expect(res.statusCode).toBe(404);
    })
})

describe("PATCH /items/:name", () => {
    test("Updating an item's values", async() => {
        const res = await request(app).patch(`/items/${cupcake.name}`).send({name: "cupcake baby", price: 5})
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "cupcake baby", price: 5 } })
    })
    test("Responds with 404 for invalid item", async() => {
        const res = await request(app).patch("/items/piggles").send({ name: "cupcake baby", price: 5} )
        expect(res.statusCode).toBe(404);
    })
})

describe("DELETE /items/:name", () => {
    test("Deleting an item", async() => {
        const res = await request(app).delete(`/items/${cupcake.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" })
    })
    test("Responds with 404 for deleting invalid item", async() => {
        const res = await request(app).delete("/items/piggles")
        expect(res.statusCode).toBe(404);
    })
})
