import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { getTestContact, createTestUser, createTestContact, removeAllTestContact, removeTestUser,  } from "./test-util.js";
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
        
        logger.info(result.body);
        
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
        
        logger.info(result.body);
        
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

       logger.info(result.body);

       expect(result.status).toBe(404);
     });
})