export class FetchRequest {
    public sort?:string;
    public order?:string;
    public per_page?:number;
    public page?:number;
    public q?:string;
    public since?:string;
    public language?:string;

    constructor (sort?:string, order?:string, per_page?:number, page?:number, q?:string, since?:string, language?:string){
        this.sort=sort;
        this.order=order;
        this.per_page=per_page;
        this.page=page;
        this.q=q;
        this.since=since;
        this.language=language;
    }
}