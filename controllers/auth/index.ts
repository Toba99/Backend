import { Request, Response } from "express" 
import login from "./login"
import postForgot from "./postForgot"
import preForgot from "./preForgot"
import register from "./register"

export default {
    login: async (req: Request, res: Response) => await login(req, res),
    postForgot: async (req: Request, res: Response) => await postForgot(req, res),
    preForgot: async (req: Request, res: Response) => await preForgot(req, res),
    register: async (req: Request, res: Response) => await register(req, res),
}
