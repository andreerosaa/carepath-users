import ReposSection from "../components/ReposSection";
import UsersSection from "../components/UsersSection";
import { useQuery } from "react-query";
import { fetchDataAllUsers, fetchDataRepos, fetchDataUsers, formatReposResponse, formatUsersResponse } from "../data/FetchData";
import { FetchRequest } from "../models/FetchRequest";
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../context/SearchContext';
import { User } from "../models/User";
import { Repo } from "../models/Repo";

const Main = () => {

  const {search, setSearch} = useContext(SearchContext);
  const {searchInput, setSearchInput} = useContext(SearchContext);
  const [dataRefetched, setDataRefetched] = useState(0);

  const queryString = encodeURIComponent(search);

  const popularUsersRequest = new FetchRequest("followers","desc",search!==""?4:100,1, search!==""? queryString : "created:>2023-07-01", undefined);
  const activeUsersRequest = new FetchRequest("public_repos","desc",search!==""?4:100,1, search!==""? queryString : "created:>2023-07-01", undefined);
  const popularReposRequest = new FetchRequest("stars","desc",search!==""?4:100,undefined, search!==""? queryString : "created:>2023-07-20", undefined);

  const {status:statPopUser, error: errorPopUser,data:popularUsers, refetch:refetchPopU} = useQuery('popularUsers', ()=>fetchDataUsers(popularUsersRequest));
  const {status:statActUser, error: errorActUser,data:activeUsers, refetch:refetchActU} = useQuery('activeUsers', ()=>fetchDataUsers(activeUsersRequest));
  const {status:statPopRepo, error: errorPopRepo,data:popularRepos, refetch:refetchPopR} = useQuery('popularRepos', ()=>fetchDataRepos(popularReposRequest));

  //to fetch all data, that is, run through all response pages
  // const {status:statPopUser, error: errorPopUser, data:popularUsers} = useQuery('popularUsers', ()=>fetchDataAllUsers(popularUsersRequest));
  // const {status:statActUser, error: errorActUser,data:activeUsers} = useQuery('activeUsers', ()=>fetchDataAllUsers(activeUsersRequest));
  // const {status:statPopRepo, error: errorPopRepo,data:popularRepos} = useQuery('popularRepos', ()=>fetchDataAllRepos(popularReposRequest));

  const {data:popularUsersArr, refetch:refetchPopUArr} = useQuery({enabled:!!popularUsers?.data, queryKey:'popularUsersArr', queryFn:()=>formatUsersResponse(popularUsers?.data ?? [])});
  const {data:activeUsersArr, refetch:refetchActUArr} = useQuery({enabled:!!activeUsers?.data, queryKey:'activeUsersArr', queryFn:()=>formatUsersResponse(activeUsers?.data ?? [])});
  const {data:popularReposArr, refetch:refetchPopRArr} = useQuery({enabled:!!popularRepos?.data, queryKey:'popularReposArr', queryFn:()=>formatReposResponse(popularRepos?.data ?? [])});


  useEffect(() => {
    console.log('refetching');
    // Refetch data and update the state variable
    refetchPopU().then(() => setDataRefetched((prev) => prev + 1));
    refetchActU().then(() => setDataRefetched((prev) => prev + 1));
    refetchPopR().then(() => setDataRefetched((prev) => prev + 1));
    refetchPopUArr().then(() => setDataRefetched((prev) => prev + 1));
    refetchActUArr().then(() => setDataRefetched((prev) => prev + 1));
    refetchPopRArr().then(() => setDataRefetched((prev) => prev + 1));
  }, [search]);

  return (
    <main className="main">
        <UsersSection headerTitle="Trending Users" status={statPopUser} error={errorPopUser} userList={popularUsersArr ?? []}/>
        <UsersSection headerTitle="Most Active Users" status={statActUser} error={errorActUser} userList={activeUsersArr ?? []}/>
        <ReposSection headerTitle="Top Repositories" status={statPopRepo} error={errorPopRepo} repoList={popularReposArr ?? []}/>
    </main>
  )
}

export default Main