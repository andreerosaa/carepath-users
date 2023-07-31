export class User {
    public id:number;
    public login?:string;
    public avatarUrl?:string;
    public url?: string;
    public followersUrl?:string;
    public htmlUrl?:string;
    public reposUrl?:string;
    public email?:string;
    public followers?:number;
    public following?:number;
    public name?:string;
    public location?:string;
    public bio?:string;
    public blog?:string;
    public created?:string;
    public hireable?:boolean;
    public publicGists?:number;
    public publicRepos?:number;

    constructor (id:number,
        login:string,
        avatarUrl:string,
        url:string,
        followersUrl:string,
        htmlUrl:string,
        reposUrl:string,
        email:string,
        followers:number,
        following:number,
        name:string,
        location:string,
        bio:string,
        blog:string,
        created:string,
        hireable:boolean,
        publicGists:number,
        publicRepos:number
        ){
        this.id=id;
        this.login=login;
        this.avatarUrl=avatarUrl;
        this.url=url;
        this.followersUrl=followersUrl;
        this.htmlUrl=htmlUrl;
        this.reposUrl=reposUrl;
        this.email=email;
        this.followers=followers;
        this.following=following;
        this.name=name;
        this.location=location;
        this.bio=bio;
        this.blog=blog;
        this.created=created;
        this.hireable=hireable;
        this.publicGists=publicGists;
        this.publicRepos=publicRepos;
    }
}