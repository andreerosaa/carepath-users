import { User } from "../models/User";
import {BsPerson} from "react-icons/bs";
import { fetchUserData, fetchUserRepo, getMostStarredRepo } from "../data/FetchData";
import { useQuery } from "react-query";
import RepoCard from "./RepoCard";

type Props = {
  user:User
}

const UserCard = ({user}: Props) => {

  const {status:statUserData, data:userData} = useQuery({queryKey: ['userData', user.login], queryFn: ()=> user.url ? fetchUserData(user.url) : undefined});
  const {status:statUserRepo, data:userRepo} = useQuery({queryKey: ['userRepo', user.login], queryFn: ()=> user.reposUrl ? getMostStarredRepo(user.reposUrl) : undefined});

  if(userData !== undefined ){
    user.url=userData.data.url;
    user.email=userData.data.email;
    user.followers=userData.data.followers;
    user.following=userData.data.following;
    user.name=userData.data.name;
    user.location=userData.data.location;
  }

  if(userRepo !== undefined ){
    console.log(userRepo)
  }

  return (
    <div className="card p-3 mb-5">
      {/* <div className="img-container mb-2">
        <img className="card-img-top" src={user.avatarUrl} alt="user profile"/>
      </div> */}
      <div className="card-body p-2">
        <p className="card-text">{user.name}</p>
        <p className="card-text">{user.email}</p>
        <div className="follower-count">
          <BsPerson size={20}/>
          {statUserData==="loading" ?<p>...</p>:<p>{`${user.followers} Followers`}</p>}
        </div>
        <div className="user-repo">
          <RepoCard repo={userRepo ?? undefined}/>
        </div>
      </div>
    </div>
  )
}

export default UserCard