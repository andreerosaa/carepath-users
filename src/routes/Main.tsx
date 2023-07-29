import ReposSection from "../components/ReposSection";
import UsersSection from "../components/UsersSection";
import { useQuery } from "react-query";
import { fetchDataRepos, fetchDataUsers, formatReposResponse, formatUsersResponse } from "../data/FetchData";
import { FetchRequest } from "../models/FetchRequest";

const Main = () => {

  const popularUsersRequest = new FetchRequest("followers","desc",3,1);
  const activeUsersRequest = new FetchRequest("public_repos","desc",3,1);
  const popularReposRequest = new FetchRequest("stars","desc",4,1);

  const {status:statPopUser, error: errorPopUser, data:popularUsers} = useQuery('popularUsers', ()=>fetchDataUsers(popularUsersRequest));
  const {status:statActUser, error: errorActUser,data:activeUsers} = useQuery('activeUsers', ()=>fetchDataUsers(activeUsersRequest));
  const {status:statPopRepo, error: errorPopRepo,data:popularRepos} = useQuery('popularRepos', ()=>fetchDataRepos(popularReposRequest));

  const {data:popularUsersArr} = useQuery({enabled:!!popularUsers?.data, queryKey:'popularUsersArr', queryFn:()=>formatUsersResponse(popularUsers?.data ?? [])});
  const {data:activeUsersArr} = useQuery({enabled:!!activeUsers?.data, queryKey:'activeUsersArr', queryFn:()=>formatUsersResponse(activeUsers?.data ?? [])});
  const {data:popularReposArr} = useQuery({enabled:!!popularRepos?.data, queryKey:'popularReposArr', queryFn:()=>formatReposResponse(popularRepos?.data ?? [])});

  return (
    <main className="main">
        <UsersSection headerTitle="Trending Users" status={statPopUser} error={errorPopUser} userList={popularUsersArr ?? []}/>
        <UsersSection headerTitle="Most Active Users" status={statActUser} error={errorActUser} userList={activeUsersArr ?? []}/>
        <ReposSection headerTitle="Top Repositories" status={statPopRepo} error={errorPopRepo} repoList={popularReposArr ?? []}/>
    </main>
  )
}

export default Main