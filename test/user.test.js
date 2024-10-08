import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "Test",
      password: "pass123",
      name: "Test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Test");
    expect(result.body.data.name).toBe("Test");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
    
    it("should can register user", async () => {
      let result = await supertest(web).post("/api/users").send({
        username: "Test",
        password: "pass123",
        name: "Test",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("Test");
      expect(result.body.data.name).toBe("Test");
      expect(result.body.data.password).toBeUndefined();
      
        result = await supertest(web).post("/api/users").send({
        username: "Test",
        password: "pass123",
        name: "Test",
      });

    logger.info(result.body);
        
      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login user", async () => {
    const result = await supertest(web)
      .post("/api/users/login")
      .send({
      username: "Test",
      password: "pass123",
      });
    
    logger.info(result.body);
    
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("Test");
  })
  

   it("should reject if request is invalid", async () => {
     const result = await supertest(web).post("/api/users/login").send({
       username: "",
       password: "",
     });

     logger.info(result.body);

     expect(result.status).toBe(400);
     expect(result.body.errors).toBeDefined();
   });
  
     it("should reject if password is wrong", async () => {
       const result = await supertest(web).post("/api/users/login").send({
         username: "Test",
         password: "pass321",
       });

       logger.info(result.body);

       expect(result.status).toBe(401);
       expect(result.body.errors).toBeDefined();
     });
  
      it("should reject if username is wrong", async () => {
        const result = await supertest(web).post("/api/users/login").send({
          username: "test12",
          password: "pass123",
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
      });
});


describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "Test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Test");
    expect(result.body.data.name).toBe("Test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "Salah");

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update current user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "Test")
      .send({
        name: "Tofan",
        password: "rahasia",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Test");
    expect(result.body.data.name).toBe("Tofan");
    
    const user = await getTestUser();
    expect(await bcrypt.compare("rahasia", user.password)).toBe(true);
  });

  it("should can update name user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "Test")
      .send({
        name: "Tofan F",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Test");
    expect(result.body.data.name).toBe("Tofan F");
  });

  it("should can update password user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "Test")
      .send({
        password: "rahasia212",
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("Test");
    expect(result.body.data.name).toBe("Test");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasia212", user.password)).toBe(true);
  });

   it("should reject if request is invalid", async () => {
     const result = await supertest(web)
       .patch("/api/users/current")
       .set("Authorization", "salah")
       .send({});

     logger.info(result.body);

     expect(result.status).toBe(401);
     expect(result.body.errors).toBeDefined();
});
});

describe("DELETE /api/users/logout", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can delete current user", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "Test");

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.message).toBe("Logout success");
    const user = await getTestUser();
    expect(user.token).toBe(null);
  });

   it("should reject if token is invalid", async () => {
     const result = await supertest(web)
       .delete("/api/users/logout")
       .set("Authorization", "salah");

     logger.info(result.body);

     expect(result.status).toBe(401);
     expect(result.body.errors).toBeDefined();
   });
});