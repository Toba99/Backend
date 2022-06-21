import { Request, Response } from "express" 
import addChat from "./addChat"
import getChat from "./getChat"

export default {
    addChat: async (req: Request, res: Response) => await addChat(req, res),
    getChat: async (req: Request, res: Response) => await getChat(req, res),
}
