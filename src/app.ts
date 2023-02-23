import  express, { Application} from "express";
import   {  createList, deleteList, deleteListItem, editListItem, readAllList, readOneList } from "./logic";
import { ensureListExists, validatedBodyMiddleware, validateItemBody } from "./middlewares";
 
 const app: Application = express();

 app.use(express.json());

 app.get('/purchaseList', readAllList)
 app.post('/purchaseList', validatedBodyMiddleware, createList)
 app.get('/purchaseList/:id', ensureListExists, readOneList)
 app.delete('/purchaseList/:id',ensureListExists, deleteList)
 app.delete('/purchaseList/:id/:item',ensureListExists, deleteListItem)
 app.patch('/purchaseList/:id/:item' ,ensureListExists, validateItemBody, editListItem)
 
 const PORT: number = 3000;
 const runningMsg: string = `Server on http://localhost:${PORT}`;
 app.listen(PORT, () => console.log(runningMsg));