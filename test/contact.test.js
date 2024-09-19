import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { getTestContact, createTestUser, createManyTestContact, createTestContact, removeAllTestContact, removeTestUser,  } from "./test-util.js";
describe("POST /api/contacts", function () {

    beforeEach(async () => {
      await createTestUser();  
    })

    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it("should can create contact", async () => {
        const result = await supertest(web)
          .post("/api/contacts")
          .set("Authorization", "Test")
          .send({
            first_name: "Test1",
            last_name: "Test2",
            email: "Test@email.com",
            phone: "087363633727",
          });        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("Test1");
        expect(result.body.data.last_name).toBe("Test2");
        expect(result.body.data.email).toBe("Test@email.com");
        expect(result.body.data.phone).toBe("087363633727");
    });
})


describe("GET /api/contacts/:contactId", function () { 
     beforeEach(async () => {
         await createTestUser();
         await createTestContact();
     });

     afterEach(async () => {
       await removeAllTestContact();
       await removeTestUser();
     });
    
    it("should can get contacts", async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
          .get("/api/contacts/" + testContact.id)
          .set("Authorization", "Test");
        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

     it("should return 404 if contact not found", async () => {
       const testContact = await getTestContact();
       const result = await supertest(web)
         .get("/api/contacts/" + (testContact.id + 1))
         .set("Authorization", "Test");

       expect(result.status).toBe(404);
     });
})


describe("PUT /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "Test")
      .send({
        first_name: "Tofan",
        last_name: "Fajar",
        email: "Tofan@email.com",
        phone: "089899898989",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Tofan");
    expect(result.body.data.last_name).toBe("Fajar");
    expect(result.body.data.email).toBe("Tofan@email.com");
    expect(result.body.data.phone).toBe("089899898989");
  });
})


describe("DELETE /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBe(null);
  });

  it("should reject if contact not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "Test");
    expect(result.status).toBe(404);
  });
})


describe("GET /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);

  })

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ page: 2 })
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ name: "Test 1" })
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ email: "Test1" })
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ phone: "081234567891" })
      .set("Authorization", "Test");
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

})