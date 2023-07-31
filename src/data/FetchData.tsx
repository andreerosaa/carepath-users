import { Octokit } from "octokit";
import { User } from "../models/User";
import { Repo } from "../models/Repo";

const usersEndpoint:string = "users?q=created:2023-06-01..2023-06-30";
const popularReposEndpoint:string = "search/repositories?q=created:2022-07-28..2023-07-28";

const octokit = new Octokit({
  auth: process.env.REACT_APP_OCTOKIT_TOKEN
});

const gitHubUrl = (process.env.REACT_APP_GH_API_BASE_URL as string);

export const fetchDataUsers = async (request:any) => {
    try{
      const response = await octokit.request(gitHubUrl+usersEndpoint,request);
      return response;
    }catch(e){
      return(console.log(e));
    }
  }

export const fetchDataRepos = async (request:any) => {
    try{
      const responsePopularRepos = await octokit.request(gitHubUrl+popularReposEndpoint,request);
      return responsePopularRepos;
    }catch(e){
      return(console.log(e));
    }
  }

export const formatUsersResponse = (users:any) => {
    try{
      const usersArr: Array<User> = users.map((user: { id: number; login: string; avatar_url: string; url: string; followers_url: string; html_url: string; repos_url: string; email: string}) => {
        return new User(user.id,user.login, user.avatar_url, user.url, user.followers_url, user.html_url, user.repos_url, `${user.login.toLocaleLowerCase()}@uphill.pt`,0, 0, "", "", "","", "", false, 0, 0)
      })
      return usersArr;
    }catch(e){
      return console.log(e)
    }
  }
export const formatReposResponse = (repos:any) => {
    try{
      const reposArr: Array<Repo> = repos.items.map((repo: { id:number;name:string;full_name:string;html_url:string;stargazers_count: number;watchers_count: number;language:string;watchers: number;score:number}) => {
        return new Repo(repo.id, repo.name, repo.full_name, repo.html_url, repo.stargazers_count, repo.watchers_count, repo.language, repo.watchers, repo.score)
      })
      return reposArr;
    }catch(e){
      return console.log(e);
    }
  }

  export const fetchUserData = async (url:string) => {
    try{
      const userData = await octokit.request(url);
      return userData;
    }catch(e){
      return(console.log(e));
    }
  }

  export const fetchUserRepo = async (url:string) => {
    try{
      const reponse = await octokit.request(url);
      const userRepoArr: Array<Repo> = reponse.data.map((repo: { id:number;name:string;full_name:string;html_url:string;stargazers_count: number;watchers_count: number;language:string;watchers: number;score:number}) => {
        return new Repo(repo.id, repo.name, repo.full_name, repo.html_url, repo.stargazers_count, repo.watchers_count, repo.language, repo.watchers, repo.score)
      })
      return userRepoArr;
    }catch(e){
      return(console.log(e));
    }
  }

  export const getMostStarredRepo = async (userReposUrl: string): Promise<Repo | null> => {
    try {
      const repositories = await fetchUserRepo(userReposUrl);
      // Find the repository with the most stars
      if(repositories){
        const mostStarredRepo:Repo = repositories.reduce(
          (pV: Repo, cV: Repo): Repo => {
              return pV.stargazersCount > cV.stargazersCount ? pV : cV;
          });
        return mostStarredRepo;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  