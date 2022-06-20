import { Request, Response } from "express" 
import avatar_base_64 from "./avatar_base_64"
import logout from "./logout"

export default {
    avatar_base_64: async (req: Request, res: Response) => await avatar_base_64(req, res),
    logout: async (req: Request, res: Response) => await logout(req, res),
}