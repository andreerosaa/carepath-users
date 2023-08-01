import ReposSection from "../components/ReposSection";
import UsersSection from "../components/UsersSection";
import { useQuery } from "react-query";
import { fetchDataAllUsers, fetchDataRepos, fetchDataUsers, formatReposResponse, formatUsersResponse } from "../data/FetchData";
import { FetchRequest } from "../models/FetchRequest";
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';

const Main = () => {

  const {search, setSearch} = useContext(SearchContext);

  if(search !== ""){
    console.log('here')
    let searchUsersPopRequest = new FetchRequest("followers","desc",100,1,search, undefined);
    let searchUsersActRequest = new FetchRequest("public_repos","desc",100,1, search, undefined);
    let searchReposPopRequest = new FetchRequest("stars","desc",100,undefined, search, undefined);

    let searchUsersPop = fetchDataUsers(searchUsersPopRequest);
    let searchUsersAct = fetchDataUsers(searchUsersActRequest);
    let searchReposPop = fetchDataRepos(searchReposPopRequest);

    var searchUsersPopArr = formatUsersResponse(searchUsersPop ?? []);
    var searchUsersActArr = formatUsersResponse(searchUsersAct ?? []);
    var searchReposPopArr = formatReposResponse(searchReposPop ?? []);

    setSearch("");
  }

  const popularUsersRequest = new FetchRequest("followers","desc",100,1,"created:>2023-07-01", undefined);
  const activeUsersRequest = new FetchRequest("public_repos","desc",100,1, "created:>2023-07-01", undefined);
  const popularReposRequest = new FetchRequest("stars","desc",100,undefined, "created:>2023-07-20", undefined);

  const {status:statPopUser, error: errorPopUser, data:popularUsers} = useQuery('popularUsers', ()=>fetchDataUsers(popularUsersRequest));
  const {status:statActUser, error: errorActUser,data:activeUsers} = useQuery('activeUsers', ()=>fetchDataUsers(activeUsersRequest));
  const {status:statPopRepo, error: errorPopRepo,data:popularRepos} = useQuery('popularRepos', ()=>fetchDataRepos(popularReposRequest));

  // const {status:statPopUser, error: errorPopUser, data:popularUsers} = useQuery('popularUsers', ()=>fetchDataAllUsers(popularUsersRequest));
  // const {status:statActUser, error: errorActUser,data:activeUsers} = useQuery('activeUsers', ()=>fetchDataAllUsers(activeUsersRequest));
  // const {status:statPopRepo, error: errorPopRepo,data:popularRepos} = useQuery('popularRepos', ()=>fetchDataAllRepos(popularReposRequest));

  const {data:popularUsersArr} = useQuery({enabled:!!popularUsers?.data, queryKey:'popularUsersArr', queryFn:()=>formatUsersResponse(popularUsers?.data ?? [])});
  const {data:activeUsersArr} = useQuery({enabled:!!activeUsers?.data, queryKey:'activeUsersArr', queryFn:()=>formatUsersResponse(activeUsers?.data ?? [])});
  const {data:popularReposArr} = useQuery({enabled:!!popularRepos?.data, queryKey:'popularReposArr', queryFn:()=>formatReposResponse(popularRepos?.data ?? [])});

  return (
    <main className="main">
        <UsersSection headerTitle="Trending Users" status={statPopUser} error={errorPopUser} userList={searchUsersPopArr ?? popularUsersArr ?? []}/>
        <UsersSection headerTitle="Most Active Users" status={statActUser} error={errorActUser} userList={searchUsersActArr ?? activeUsersArr ?? []}/>
        <ReposSection headerTitle="Top Repositories" status={statPopRepo} error={errorPopRepo} repoList={searchReposPopArr ?? popularReposArr ?? []}/>
    </main>
  )
}

export default Main