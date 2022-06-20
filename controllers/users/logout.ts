import { Request, Response } from "express"

export default async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        console.log("Logout Error ======>", error.message, error.stack);
		return res.status(400).send({
			status: false,
			data:{},
			message: "Failed to logout, please try again in a few minutes",
			errors: [],
		});
        
    }
}