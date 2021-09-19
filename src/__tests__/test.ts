const app = require("../app").default
const supertest = require("supertest")
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"


let mongoServer: MongoMemoryServer

beforeAll(async() => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected Successfully.')
  })
})

afterAll(async() => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
})

let token: string

////////////////////////// Test cases for all registered users ///////////////////////////////////////////////////
describe("Test for all registered Users endpoint", () => {

  test("Throw error for an unsuccessful creation of a new user and it successfully redirects the user", async() => {
    const sampleData = {
      name:"Sunday",
      email: "sunday@gmail.com",
      password: "123456783",
      repeat_password:"123456738"
    }
    await supertest(app)
    .post("/signup")
    .send(sampleData)
    .set("Accept", "application/json")
    .expect(302)

  })

  test("Successfully creates a new user and it successfully redirects the user", async() => {
    const sampleData = {
      name:"Monday",
      email: "monday@gmail.com",
      password: "123456783",
      repeat_password:"123456783"
    }
    await supertest(app)
    .post("/signup")
    .send(sampleData)
    .set("Accept", "application/json")
    .expect(302)
  })

  test("Throws error for an unregistered user trying to log in and it successfully redirects the user", async() => {
    const sampleData = {
      email: "edostate@gmail.com",
      password: "111111111"
    }
    await supertest(app)
    .post("/login")
    .send(sampleData)
    .set("Accept", "application/json")
    .expect(302)
  })

  test("Successfully logs in a registered user and it successfully redirects the user", async() => {
    const sampleData = {
      email: "monday@gmail.com",
      password: "123456783"
    }
    await supertest(app)
    .post("/login")
    .send(sampleData)
    .set("Accept", "application/json")
    .expect(302)
    .expect((res: any) => {
      token = res.body.token
    })
  })

  test("Throw error for an unsuccessful log in of a registered user and it successfully redirects the user", async() => {
    const sampleData = {
      email: "sunday@gmail.com",
      password: "123456738"
    }
    await supertest(app)
    .post("/login")
    .send(sampleData)
    .set("Accept", "application/json")
    .expect(302)
  })

  test("Test for signup route", async() => {
    await supertest(app)
    .get("/")
    .set("Accept", "application/json")
    .set("Cookie",`jwt=${token}`)
    .expect(200)
  })

  test("Test for login route", async() => {
    await supertest(app)
    .get("/login")
    .set("Accept", "application/json")
    .set("Cookie",`jwt=${token}`)
    .expect(200)
  })
})

