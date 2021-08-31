import { Request, Response, NextFunction } from "express";
import EErrors from "../common/EErrors";


const { NotAuthorizedUser } = EErrors;
const isAdmin = true;

const checkAdmin = (req: Request, res: Response, next : NextFunction) => {
   if(isAdmin){
      next();
   }else{
       res.status(401).send({
           error: NotAuthorizedUser,
           message: "User doesn't have permission to access to the requested resource..."
       })
   }
};

export default checkAdmin
