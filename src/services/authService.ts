import jwt from "jsonwebtoken"
import { findUserByEmail } from "../models/userModel"
import { JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { verifyPassword } from "../utils/password";

export async function login(email: string, password: string) {
    const user = await findUserByEmail(email)

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: user.id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});
    return { token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email } };
}