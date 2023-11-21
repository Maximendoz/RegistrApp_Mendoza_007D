export interface Users{
    id:number;
    nombre: string;
    apellido: string;
    useremail: string;
    password: string;
    jornada:string;
    role: string;
    anno: number;
    semestre: string;
    asignatura: string;
    isactive: boolean;
}
//post
export interface User{
    nombre: string;
    apellido: string;
    useremail: string;
    password: string;
    jornada:string;
    role: string;
    anno: number;
    semestre: string;
    asignatura: string;
    isactive: boolean;
}

//post
export interface IPalabra{
    palabra: string;
    useremail: string;
    anno: number;
    semestre: string;
    asignatura: string;
}

//get, put, delete
export interface IPalabras{
    id: number;
    useremail: string;
    palabra: string;
    anno: number;
    semestre: string;
    asignatura: string;
}