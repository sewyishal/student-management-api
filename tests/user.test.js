const request = require("supertest")
const app = require("../app");

describe("User API",()=>{
    let token
    let email
    beforeAll(async()=>{
        email = `test${Date.now()}@gmail.com`;
  const registerResponse = await request(app)
    .post("/register")
    .send({
        username: "Abebe",
        email,
        password: "123456"
    });

expect(registerResponse.status).toBe(201);
     const loginResponse = await request(app)
            .post("/login")
            .send({
                email,
                password: "123456"
            });

        token = loginResponse.body.token;
    })
test("should register a new user", async() =>{
    const newEmail = `test${Date.now()}@gmail.com`;
    const response = await request(app)
    .post('/register')
    .send({
    username: "Abebe",
    email: newEmail,
    password: "123456"
})
expect(response.status).toBe(201)
expect(response.body.success).toBe(true)
expect(response.body.user_id).toBeDefined()
})
test("should fail if email is missing", async() =>{
    const response= await request(app)
            .post('/register')
            .send({
                username:"Abebe",
                password:"123456"
            })
    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.errors).toBeDefined()
})
test("should fail for duplicate email", async()=>{
    const response=await request(app).post('/register').send({
    username: "Abebe",
    email,
    password: "123456"
    })
    expect(response.status).toBe(409)
   expect(response.body.message).toBe("Email already exists");
})
test("should return 401 if no token is provided",async()=>{
    const response = await request(app).get('/students')
    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe("Access denied. No token provided.");
})
test("should check if the user sent a token",async()=>{
    const response =await request(app).get('/students').set('Authorization',`Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
})
})
const connection = require("../config/db");

afterAll(async () => {
    await connection.promise().end();
});

