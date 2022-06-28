import { Request, Response } from "express" 
import usersChat from "./usersChat"
import users from "./users"

export default {
    usersChat: async (req: Request, res: Response) => await usersChat(req, res),
    users: async (req: Request, res: Response) => await users(req, res),
}