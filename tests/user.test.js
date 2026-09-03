const request = require("supertest")
const app = require("../app")

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
expect(response.success).toBe(true)
expect(response.body.user_id).toBeDefined()
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
