const request = require("supertest")
const app = require("../app");
const expectCookies = require("supertest/lib/cookies");

describe("User API",()=>{
test("should register a new user", async() =>{
    const email = `test${Date.now()}@gmail.com`;
    const response = await request(app)
    .post('/register')
    .send({
    username: "Abebe",
    email,
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
    expect(response.body.erros).toBeDefined()
})
test("should fail for duplicate email", async()=>{
    const response=await request(app).post('/register').send({
    "username": "Abebe",
    "email": "existing@gmail.com",
    "password": "123456"
    })
    expect(response.status).toBe(409)
   expect(response.body.message).toBe("Email already exists");
})
test("should return 401 if no token is provided",async()=>{
    const response = await request(app).get('/students')
    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe("Access denied. No token provided");
})
})

test("Login user", async()=>{
   const response= await request(app)
    .post('/login')
    .send({
        email: "abe@gmail.com",
        password:"123456"
    })
    expect(response.status).toBe(200)
    expect(response.success).toBe(true)
    expect(response.body.token).toBeDefined();
}) 
