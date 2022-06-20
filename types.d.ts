declare namespace Express {
    export interface Request {
        user: any;
        token: string
    }
    export interface Response {
        user: any;
    }
  }