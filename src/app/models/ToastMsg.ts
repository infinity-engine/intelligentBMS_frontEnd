export interface ToastMsg{
    msg:string,
    type?:'warning'|'alert'|'notification',
    timeOut?:number,
    color?:string
}