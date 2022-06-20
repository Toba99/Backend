import nodeMail from "../../../configs/nodeMail";

export default async ({token, to}: {token: string; to: string})=>{
    try {
        const message = `Julia Security code is : ${token}`;

       await nodeMail({to, subject:"opt", message})
    } catch (error) {
        
    }
}