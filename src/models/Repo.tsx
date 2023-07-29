export class Repo {
    public id:number;
    public name?:string;
    public fullName?:string;
    public htmlUrl?:string;
    public stargazersCount?: number;
    public watchersCount?: number;
    public language?:string;
    public watchers?: number;
    public score?:number;

    constructor (id:number,name:string,fullName:string,htmlUrl:string,stargazersCount:number,watchersCount:number,language:string,watchers:number,score:number){
        this.id=id;
        this.name=name;
        this.fullName=fullName;
        this.htmlUrl=htmlUrl;
        this.stargazersCount=stargazersCount;
        this.watchersCount=watchersCount;
        this.language=language;
        this.watchers=watchers;
        this.score=score;
    }
}