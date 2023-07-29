export class FetchRequest {
    public sort?:string;
    public order?:string;
    public per_page?:number;
    public page?:number;

    constructor (sort:string, order:string, per_page:number, page:number){
        this.sort=sort;
        this.order=order;
        this.per_page=per_page;
        this.page=page;
    }
}