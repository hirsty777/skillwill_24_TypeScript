export interface IgetTodo{
    _created?: number,
    _data_type?: string,
    _is_deleted?: boolean,
    _modified?: number,
    _self_link?: string,
    _user?: number,
    _uuid?: string,
    dueDate: string,
    firstName: string,
    isCompleted: boolean,
    name: string
}

export interface IpostTodo{
  name:string,
  firstName:string,
  dueDate:string,
  isCompleted:boolean,
  _uuid?:string
}

export interface IinitialState {
  todoList:IgetTodo[],
  getloader:boolean,
  postloader:boolean,
  putloader:boolean,
  deleteloader:boolean,
  error:boolean,
  colorMode:boolean,
  lightMode:{
      background:{},
      textColor:{}
  },
  darkMode:{
      background:{},
      textColor:{}
  }
}
