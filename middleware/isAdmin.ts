require("dotenv").config();
import { Request, Response, NextFunction } from "express"
import User from "../models/User"


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

   
        const user = await User.query()
            .findOne({
                id: req.user.id,
            });

        if (!user) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Unauthorized",
            });
        }

        if (user.isadmin === 0) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Unauthorized",
            });
        }

        next()
    } catch (error: any) {
        console.log("ADMIN MIDDLEWARE ERROR =====>", error.message);
        return res.status(401).send({
            status: false,
            data: {},
            message: "Unauthorized",
        });
    }

}