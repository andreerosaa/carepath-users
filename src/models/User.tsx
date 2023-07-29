export class User {
    public id:number;
    public login?:string;
    public avatarUrl?:string;
    public followersUrl?:string;
    public htmlUrl?:string;
    public reposUrl?:string;
    public email?:string;

    constructor (id:number,login:string,avatarUrl:string,followersUrl:string,htmlUrl:string,reposUrl:string,email:string){
        this.id=id;
        this.login=login;
        this.avatarUrl=avatarUrl;
        this.followersUrl=followersUrl;
        this.htmlUrl=htmlUrl;
        this.reposUrl=reposUrl;
        this.email=email;
    }
}