import { Octokit } from "@octokit/rest";
import { User } from "../models/User";
import { Repo } from "../models/Repo";


// endpoints
const usersEndpoint:string = "search/users";
const popularReposEndpoint:string = "search/repositories";

const octokit = new Octokit({
  auth: process.env.REACT_APP_OCTOKIT_TOKEN
});

//gh api url
const gitHubUrl = (process.env.REACT_APP_GH_API_BASE_URL as string);

export const fetchDataUsers = async (request:any) => {
    try{
      const response = await octokit.request(gitHubUrl+usersEndpoint,request);
      return response;
    }catch(e){
      return(console.log(e));
    }
  }

export const fetchDataAllUsers = async (request:any) => {
  try{
    const fullDataUsers:Array<User>=[];
    let responseUsers = await octokit.request(gitHubUrl+usersEndpoint,request);

    while(responseUsers){
      //if there is response format the data and push it to the result
      let formattedUserResponse = formatUsersResponse(responseUsers.data);
      if(formattedUserResponse){
        fullDataUsers.push(...formattedUserResponse);
      }

      //check for headers link with pages
      if(responseUsers.headers.link){
        const links = parseLinkHeader(responseUsers.headers.link);
        const nextPage = links && links.next;
        if(nextPage){
          try{
            responseUsers = await octokit.request(nextPage);
          } catch(e){
            console.log(e);
          }
        } else {
          break;
        }
      } else {
        break;
      }
    }
    if(request.sort === "followers"){
      var sortedfullDataUsers: any = fullDataUsers.sort((a, b) => {return a.followers - b.followers})
    }
    const slicedData:Array<User> = sortedfullDataUsers.slice(0,2);
    return slicedData;
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

export const fetchDataAllRepos = async (request:any) => {
    try{
      const fullData:Array<Repo>=[];
      let responsePopularRepos = await octokit.request(gitHubUrl+popularReposEndpoint,request);

      while(responsePopularRepos){
        let formattedResponse = formatReposResponse(responsePopularRepos.data);
        if(formattedResponse){
          fullData.push(...formattedResponse);
        }
        if(responsePopularRepos.headers.link){
          const links = parseLinkHeader(responsePopularRepos.headers.link);
          const nextPage = links && links.next;
          if(nextPage){
            try{
              responsePopularRepos = await octokit.request(nextPage);
            } catch(e){
              console.log(e);
            }
          } else {
            break;
          }
        } else {
          break;
        }
      }
      const sortedFullData: any = fullData.sort((a, b) => {
        return b.stargazersCount - a.stargazersCount;
      })
      const slicedData = sortedFullData.slice(0,3);
      return slicedData;
    }catch(e){
      return(console.log(e));
    }
  }

  export const formatUsersResponse = (users:any) => {
    try{
      const usersArr: Array<User> = users.items.map((user:any) => {

        return new User(user.id,user.login, user.avatar_url, user.url, user.followers_url, user.html_url, user.repos_url, `${user.login.toLocaleLowerCase()}@carepath.pt`,0, 0, "", "", "","", "", false, 0, 0)
      })
      const slicedData = usersArr.slice(0,3);
      return slicedData;
    }catch(e){
      return console.log(e)
    }
  }

export const formatReposResponse = (repos:any) => {
    try{
      const reposArr: Array<Repo> = repos.items.map((repo: { id:number;name:string;full_name:string;html_url:string;stargazers_count: number;watchers_count: number;language:string;watchers: number;score:number}) => {

        return new Repo(repo.id, repo.name, repo.full_name, repo.html_url, repo.stargazers_count, repo.watchers_count, repo.language, repo.watchers, repo.score)
      })

      const sortedFullData: any = reposArr.sort((a, b) => {
        return b.stargazersCount - a.stargazersCount;
      })
      const slicedData = sortedFullData.slice(0,4);
      return slicedData;
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

  export const fetchUserRepo = async (url:string, request?:any) => {
    try{
      const reponse = await octokit.request(url, request);
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
      if(repositories && repositories.length>0){
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

  const parseLinkHeader = (linkHeader: any) => {
    if (!linkHeader) {
      return null;
    }
  
    const links:any= {};
  
    const linkParts = linkHeader.split(',');
  
    for (const part of linkParts) {
      const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
      if (match) {
        const url = match[1];
        const rel = match[2];
        links[rel] = url;
      }
    }
  
    return links;
  };
  