import { hash, compare } from "bcryptjs";

export async function hashString(string){
    const hashedString = await hash(string, 12);
    return hashedString;
}

export async function verifyPassword(password, hashedPassword){
    const isValid = await compare(password, hashedPassword);
    return isValid;
}
