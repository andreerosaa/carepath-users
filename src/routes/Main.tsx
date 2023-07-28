import { useEffect } from "react";
import ReposSection from "../components/ReposSection";
import UsersSection from "../components/UsersSection";
import axios from "axios";

type Props = {}

const Main = (props: Props) => {

  //user reactQuery para ir buscar os users, meter endpoint nos props
  const gitHubUrl:string = (process.env.REACT_APP_GH_API_BASE_URL as string);
  console.log(gitHubUrl);

  const fetchUsers = async () => {
    try{
      const response = await axios.get(gitHubUrl);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  

  return (
    <main className="main">
        <UsersSection headerTitle="Trending Users"/>
        <UsersSection headerTitle="Most Active Users"/>
        <ReposSection/>
    </main>
  )
}

export default Main