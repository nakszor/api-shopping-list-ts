import {Request , Response} from "express"
import database from "./database"
import {  IListProducts, IListResponse } from "./interfaces"

export const readAllList = (req: Request, res: Response) =>{
    return res.status(200).json(database)
}

export const createList = ({validatedBody}: Request, res: Response) => {
    const newList: IListResponse = {
        ...validatedBody,
        id: generateId()
     } 
    
    function generateId(): number {
        return database.length ? Math.max(...database.map(item => item.id)) + 1 : 1
    }

    database.push(newList)
    
    return res.status(201).json(newList)
}

export const readOneList = ({findList}:Request, res: Response):Response =>{
    return res.status(200).json(database[findList])
}

export const deleteList = ({findList}: Request, res:Response): Response => {

    database.splice(findList, 1)

    return res.status(204).json()
  
}

export const deleteListItem = (req: Request, res: Response): Response =>{

    const itemName = req.params.item

    const list = database[req.findList].data

    const findItem: number = list.findIndex((listItem) => listItem.name === itemName)
     
    if(findItem === -1){
        return res.status(404).json({message: `Item ${itemName} Not found`})
    }

    list.splice(findItem,1)

    return res.status(204).json()
}

export const editListItem = (req: Request, res: Response) =>{

    const itemName = req.params.item
    
    const list = database[req.findList].data

    const findItem: number = list.findIndex((listItem) => listItem.name === itemName)
     
    if(findItem === -1){
        return res.status(404).json({message: `Item ${itemName} Not found`})
    }

    list.splice(findItem,1)

    const newItem: IListProducts = req.body
    
    list.push(newItem)

    return res.status(201).json(list)
}