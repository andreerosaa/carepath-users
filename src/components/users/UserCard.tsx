import { User } from "../../models/User";
import {BsPerson} from "react-icons/bs";
import { fetchUserData, fetchUserRepo, getMostStarredRepo } from "../../data/FetchData";
import { useQuery } from "react-query";
import RepoCard from "../repos/RepoCard";
import { useState } from "react";
import Button from "./Button";
import github from '../../assets/GitHub-Mark.png';

type Props = {
  user:User
}

const UserCard = ({user}: Props) => {

  const [hover, setHover] = useState(false);

  const {status:statUserData, data:userData} = useQuery({queryKey: ['userData', user.login], queryFn: ()=> user.url ? fetchUserData(user.url) : undefined});
  const {status:statUserRepo, data:userRepo} = useQuery({queryKey: ['userRepo', user.login], queryFn: ()=> user.reposUrl ? getMostStarredRepo(user.reposUrl) : undefined});

  //fetch extra user data
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

  const img=user.avatarUrl?user.avatarUrl:github;

  const hoverStyles = {background: 'linear-gradient(to bottom, rgba(0,0,0,0) 100%, #ffff 100%)',color:'#ffffff'}

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="card p-3 mb-5"
      style={{backgroundImage:`url(${img})`}}>
      <div className="color-overlay">
          <img className="avatar" src={img} alt="user avatar"/>
          <div className="card-body" style={hover?hoverStyles:undefined}>
            <h3 className="card-name">{user.name ? user.name : user.login? user.login : `name not available`}</h3>
            <p className="card-email">{user.email? user.email: `email not available`}</p>
            <div className="follower-count">
              <BsPerson size={20}/>
              {statUserData==="loading" ?<p>...</p>:
              <p className="followers-num">{user.followers}<span className="followers">{user.followers === 1 ? ' Follower' :' Followers'}</span></p>}
            </div>
            {!hover ?
              <>
                <hr className="line-sep" style={{width:'50%'}}/>
                {userRepo ?
                <RepoCard repo={userRepo ?? undefined}/>
                :
                <div className="no-repos">
                  <h3>User has no public repos</h3>
                </div>
                }
              </>
              :<Button login={user?.login}/> 
            }
          </div>
      </div>
    </div>
  )
}

export default UserCard