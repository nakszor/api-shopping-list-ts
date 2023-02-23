import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      validatedBody: {
        listName: any,
        data: any 
      },
      findList: number
    }
  }
}