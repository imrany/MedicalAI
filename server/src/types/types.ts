export interface MailDetails{
    from:any,
    to:string
    subject:string,
    text:string
}
export interface Req{
    body:{
        id:string,
        username:string,
        email:string,
        password:string,
    },
    params:{
        email:string,
        id:string
    }
}