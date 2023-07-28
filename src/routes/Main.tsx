import { useEffect, useState } from "react";
import ReposSection from "../components/ReposSection";
import UsersSection from "../components/UsersSection";
import { Octokit } from "octokit";

type Props = {}

const Main = (props: Props) => {

  const [popularUsers, setPopularUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [popularRepos, setPopularRepos] = useState([]);

  const usersEndpoint:string = "users?q=created:2023-06-01..2023-06-30";
  const popularReposEndpoint:string = "search/repositories?q=created:2022-07-28..2023-07-28";

  const popularUsersRequest = {
    sort:"followers",
    order:"desc",
    per_page:5,
    page:1
  }
  const activeUsersRequest = {
    sort:"public_repos",
    order:"desc",
    per_page:5,
    page:1
  }
  const popularReposRequest = {
    sort:"stars",
    order:"desc",
    per_page:5,
    page:1
  }

  const octokit = new Octokit({
    auth: process.env.REACT_APP_OCTOKIT_TOKEN
  });

  //user reactQuery para ir buscar os users, meter endpoint nos props
  const gitHubUrl:string = (process.env.REACT_APP_GH_API_BASE_URL as string);

  const fetchData = async () => {
    try{
      const responsePopularUsers = await octokit.request(gitHubUrl+usersEndpoint,popularUsersRequest);
      const responseActiveUsers = await octokit.request(gitHubUrl+usersEndpoint,activeUsersRequest);
      const responsePopularRepos = await octokit.request(gitHubUrl+popularReposEndpoint,popularReposRequest);
      console.log(responsePopularUsers.data);
      console.log(responseActiveUsers.data);
      console.log(responsePopularRepos.data);
      setPopularUsers(responsePopularUsers.data);
      setActiveUsers(responseActiveUsers.data);
      setPopularRepos(responsePopularRepos.data);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <main className="main">
        <UsersSection headerTitle="Trending Users" users={popularUsers}/>
        <UsersSection headerTitle="Most Active Users" users={activeUsers}/>
        <ReposSection repos={popularRepos}/>
    </main>
  )
}

export default Main