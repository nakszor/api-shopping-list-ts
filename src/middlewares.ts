import { NextFunction, Request, Response } from "express";
import database from "./database";
import {  IListProducts } from "./interfaces";

export const validatedBodyMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    const keys = Object.keys(req.body);
    const requiredKeys = ["listName", "data"];
    const requiredData = ["name", "quantity"];
    
    const uniqueKeys = keys.filter((key, index) => keys.indexOf(key) === index);

if (uniqueKeys.length > requiredKeys.length) {
  return res.status(400).json({ message: "The request contains additional properties" });
}

    if (new Set(keys).size > requiredKeys.length) {
        return res.status(400).json({ message: "The request contains additional properties" });
      }
      

    if(typeof req.body.listName !== "string"){
        return res.status(400).json({ message: "listName must be a string!"})
    }

    if(!Array.isArray(req.body.data) || !req.body.data[0]){
        return res.status(400).json({ message: "The field data must be an array and cannot be empty!" });
    }

    const validate = req.body.data.map((elem: IListProducts) => {

        if (typeof elem.name !== "string" || 
            typeof elem.quantity !== "string" ||
            !elem.name || 
            !elem.quantity) {
                
                return false;
        }
        return true;
    });

    if (validate.includes(false)) {
        return res.status(400).json({ message: "Name and quantity are required fields and must strings" });
    }

    const checkData = req.body.data.map((elem: IListProducts) =>{
       const keys = Object.keys(elem)
       
       if(requiredData.length !== keys.length){
        return false
       }
       return true
    })

    if (checkData.includes(false)) {
        return res.status(400).json({ message: "Request contains additional properties!" });
    }

    const {listName, data} = req.body

    req.validatedBody = { listName, data }

    next()
  
}

export const ensureListExists = (req: Request, res: Response, next: NextFunction): Response | void =>{

    const {id} = req.params

    const findList: number = database.findIndex((list) => list.id === Number(id))
   
    if(findList === -1){
        return res.status(404).json({message: `Id ${id} Not found`})
    }
    
      req.findList = findList
      
      next()
}

export const validateItemBody = (req: Request, res: Response, next: NextFunction): Response | void =>{

    const requiredData = ["name", "quantity"];
    const keys = Object.keys(req.body)

    if (!requiredData.every(key => keys.includes(key))) {
        return res.status(400).json({
            "message": "Name and quantity are required fields!"
          });
    }

   const validate = () =>{
        if (typeof req.body.name !== "string" || 
            typeof req.body.quantity !== "string" ||
            !req.body.name || 
            !req.body.quantity) {
                
            return false;
        }
        return true;
    }

    if (!validate) {
        return res.status(400).json({ message: "Name and quantity are required fields and must strings" });
    }

    const validateData = () => {


        if(requiredData.length !== keys.length){
            
            return false
        }
           return true
        }
    
    if (!validateData) {
         return res.status(400).json({ message: "Request contains additional properties!" });
    }

    next()
}