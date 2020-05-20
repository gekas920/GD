export interface Field {
    name:string,
    count:number,
    correct:boolean
}

export interface Poll {
    title:string,
    fields:Field[] | Field,
    images:string | string[] | void
}