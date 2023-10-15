//creating own errors..

export const errorHandler= (statusCode,message)=>{
    //using js error constructor...
    const error= new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;

}
//