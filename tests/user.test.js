const request = require("supertest")
const app = require("../app")

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
