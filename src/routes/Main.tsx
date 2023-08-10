import ReposSection from "../components/repos/ReposSection";
import UsersSection from "../components/users/UsersSection";
import { useQuery } from "react-query";
import { fetchDataAllUsers, fetchDataRepos, fetchDataUsers, formatReposResponse, formatUsersResponse } from "../data/FetchData";
import { FetchRequest } from "../models/FetchRequest";
import { useContext, useEffect } from 'react';
import { SearchContext } from '../context/SearchContext';

const Main = () => {

  //state
  const {setSearchEnabled, search, setSearch} = useContext(SearchContext);

  //get query from search state
  const queryString = encodeURIComponent(search);

  //build the requests
  const popularUsersRequest = new FetchRequest("followers","desc",search!==""?4:100,1, search!==""? queryString : "created:>2023-07-01", undefined);
  const activeUsersRequest = new FetchRequest("repositories","desc",search!==""?4:100,1, search!==""? queryString : "created:>2023-07-01", undefined);
  const popularReposRequest = new FetchRequest("stars","desc",search!==""?4:100,undefined, search!==""? queryString : "created:>2023-07-20", undefined);

  //fetch data
  const {status:statPopUser, error: errorPopUser,data:popularUsers, refetch:refetchPopU} = useQuery('popularUsers', ()=>fetchDataUsers(popularUsersRequest));
  const {status:statActUser, error: errorActUser,data:activeUsers, refetch:refetchActU} = useQuery('activeUsers', () =>fetchDataUsers(activeUsersRequest));
  const {status:statPopRepo, error: errorPopRepo,data:popularRepos, refetch:refetchPopR} = useQuery('popularRepos', ()=>fetchDataRepos(popularReposRequest));

  //to fetch all data, that is, run through all response pages
  // const {status:statPopUser, error: errorPopUser, data:popularUsers} = useQuery('popularUsers', ()=>fetchDataAllUsers(popularUsersRequest));
  // const {status:statActUser, error: errorActUser,data:activeUsers} = useQuery('activeUsers', ()=>fetchDataAllUsers(activeUsersRequest));
  // const {status:statPopRepo, error: errorPopRepo,data:popularRepos} = useQuery('popularRepos', ()=>fetchDataAllRepos(popularReposRequest));

  //format all the fetched data
  const {data:popularUsersArr, refetch:refetchPopUArr} = useQuery({enabled:!!popularUsers?.data, queryKey:'popularUsersArr', queryFn:()=>formatUsersResponse(popularUsers?.data ?? [])});
  const {data:activeUsersArr, refetch:refetchActUArr} = useQuery({enabled:!!activeUsers?.data, queryKey:'activeUsersArr', queryFn:()=>formatUsersResponse(activeUsers?.data ?? [])});
  const {data:popularReposArr, refetch:refetchPopRArr} = useQuery({enabled:!!popularRepos?.data, queryKey:'popularReposArr', queryFn:()=>formatReposResponse(popularRepos?.data ?? [])});


  //Refetch data if search is set
  const Refetch = async () => {
    //refetch queries with the new search query
    try{
      await refetchPopU();
      await refetchActU();
      await refetchPopR();
      await refetchPopUArr();
      await refetchActUArr();
      await refetchPopRArr();      
      //enable search after refetching
      setSearchEnabled(true);
      setSearch("");
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(search !== ""){
      // Refetch data and update the state variable
      Refetch();
    }
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