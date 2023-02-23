interface IList {
    listName: string,
    data: Array<IListProducts>,
  }
export interface IListProducts{
    name: string,
    quantity: string
  }
interface IListResponse extends IList{
  id: number
}
  export type IListRequiredKeys = "listName" | "data"
  export type IListRequiredData = "name" | "quantity"
  export { IList, IListResponse };