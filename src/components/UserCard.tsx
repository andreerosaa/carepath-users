import { User } from "../models/User";
import {BsPerson} from "react-icons/bs";
import { fetchUserData, fetchUserRepo, getMostStarredRepo } from "../data/FetchData";
import { useQuery } from "react-query";
import RepoCard from "./RepoCard";
import { useState } from "react";
import Button from "./Button";

type Props = {
  user:User
}

const UserCard = ({user}: Props) => {

  const [hover, setHover] = useState(false);

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
  
  const handleMouseOver = () => {
    setHover(true);
  }
  const handleMouseOut = () => {
    setHover(false);
  }

  const hoverStyles = {background: 'linear-gradient(to bottom, rgba(0,0,0,0) 100%, #ffff 100%)',color:'#ffffff'}

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="card p-3 mb-5"
      style={{backgroundImage:`url(${user.avatarUrl})`}}>
      <div className="color-overlay">
          <img className="avatar" src={user.avatarUrl} alt="user avatar"/>
          <div className="card-body" style={hover?hoverStyles:undefined}>
            <h3 className="card-name">{user.name}</h3>
            <p className="card-email">{user.email? user.email: `email not available`}</p>
            <div className="follower-count">
              <BsPerson size={20}/>
              {statUserData==="loading" ?<p>...</p>:
              <p className="followers-num">{user.followers}<span className="followers">&nbsp;Followers</span></p>}
            </div>
            {!hover ?
              <>
                <hr className="line-sep" style={{width:'50%'}}/>
                <RepoCard repo={userRepo ?? undefined}/>
              </>
              :<Button login={user?.login}/> 
            }
          </div>
      </div>
    </div>
  )
}

export default UserCard