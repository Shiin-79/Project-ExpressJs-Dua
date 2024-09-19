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