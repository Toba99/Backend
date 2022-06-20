require("dotenv").config();
import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import User from "../models/User"


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // checking if auth header contains token
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "no authorization header found",
            });
        }

        // getting authorization header

        const bearerHeader = req.headers.authorization;
        // splitting bearer

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        const publicKey = fs.readFileSync(path.join(__dirname, "../julia.pub.key"));
        const verify = jwt.verify(bearerToken, publicKey);
        // check if user exist
        const jwtPayload = <any>verify
        const user = await User.query()
            .findOne({
                id: jwtPayload.id,
            });

        if (!user) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Unauthorized",
            });
        }

        req.token = bearerToken;
		req.user = user;
        next()
    } catch (error: any) {
        console.log("JWT MIDDLEWARE ERROR =====>", error.message);
        return res.status(401).send({
            status: false,
            data: {},
            message: "Unauthorized",
        });
    }

}