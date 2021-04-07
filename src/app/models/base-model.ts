export class BaseModel {
    public identity: number;

    constructor(model:any){
        if(model){
            Object.assign(this, model);
        }    
    }
}