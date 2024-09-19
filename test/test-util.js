import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";
export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "Test",
        },
    });
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "Test",
            name: "Test",
            password: await bcrypt.hash("pass123", 10),
            token: "Test"
        },
    });
}

export const getTestUser = async () => {
    return await prismaClient.user.findUnique({
        where: {
            username: "Test",
        },
    });
}


export const removeAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "Test",
        },
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "Test",
            first_name: "Test",
            last_name: "Test",
            email: "Test@email.com",
            phone: "08123456789",
        },
    });
}

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "Test",
        first_name: `Test ${i}`, // Gunakan backticks untuk interpolasi string
        last_name: `Test ${i}`, // Gunakan backticks untuk interpolasi string
        email: `Test${i}@email.com`, // Gunakan backticks untuk interpolasi string
        phone: `08123456789${i}`, // Gunakan backticks untuk interpolasi string
      },
    });
  }
};

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "Test",
        },
    });
}