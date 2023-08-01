import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { fetchUserData, fetchUserRepo } from "../data/FetchData";
import { User } from "../models/User";
import { useEffect, useState } from "react";
import RepoGeneralCard from "../components/RepoGeneralCard";
import { BsPerson, BsPersonFillCheck } from "react-icons/bs";
import { GoRepo } from "react-icons/go";
import { IoReturnDownBackOutline } from "react-icons/io5";
import github from '../assets/GitHub-Mark.png';
import { FetchRequest } from "../models/FetchRequest";
import { Repo } from "../models/Repo";

type Props = {}

const UserPage = (props:Props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [userState, setUserState] = useState<User|null>(null);
  const [reposState, setReposState] = useState<Array<Repo|null>>([null]);

  const gitHubUrl = (process.env.REACT_APP_GH_API_BASE_URL as string);
  const topReposRequest = new FetchRequest("stars", "desc");
  
  const {userId} = useParams();

  const {status:statUserData, data:userData} = useQuery({queryKey: ['userData', userId], queryFn: ()=> userId ? fetchUserData(`${gitHubUrl}users/${userId}`) : undefined});
  const {status:statUserRepo, data:userRepos} = useQuery({queryKey: ['userRepos', userId], queryFn: ()=> userId ? fetchUserRepo(`${gitHubUrl}users/${userId}/repos`, topReposRequest) : undefined});

  useEffect(() => {
     const userObj = new User(
      userData?.data.id,
      userData?.data.login,
      userData?.data.avatar_url,
      userData?.data.url,
      userData?.data.followers_url,
      userData?.data.html_url,
      userData?.data.repos_url,
      userData?.data.email,
      userData?.data.followers,
      userData?.data.following,
      userData?.data.name,
      userData?.data.location,
      userData?.data.bio,
      userData?.data.blog,
      userData?.data.created,
      userData?.data.hireable,
      userData?.data.public_gists,
      userData?.data.public_repos
    )
    setUserState(userObj);
    setIsLoading(false);
    },[userData]);

    useEffect(() => {
      const repos: any = userRepos?userRepos.sort((a, b) => {
        return b.stargazersCount - a.stargazersCount;
      }):null;
      if(repos){
        console.log(repos)
        setReposState(repos.slice(0,3));
        setIsLoadingRepos(false);
      }
    },[userRepos]);

    const img=userState?.avatarUrl ? userState?.avatarUrl:github;

    return (
      <main className="main up">
          <Link to={'/'}><div>Go back<IoReturnDownBackOutline/></div></Link>
          {isLoading ? (<p>Loading...</p>): (
            <section className="user-page">
            <div className="card-user-page">
              <div className="card-body-user-page">
                <img className="avatar-user-page" src={img} alt="user avatar"/>
                <header>{userState?.name}</header>
                <h3 className="card-name">{`username: ${userState?.login}`}</h3>
                <p className="card-email">{userState?.email ? userState?.email: `email not available`}</p>
                <div className="nums">
                  <div className="follower-count">
                    <BsPerson size={20}/>
                    {statUserData==="loading" ?<p>...</p>:
                    <p className="followers-num">{userState?.followers}<span className="followers">&nbsp;Followers</span></p>}
                  </div>
                  <div className="follower-count">
                    <BsPersonFillCheck size={20}/>
                    {statUserData==="loading" ?<p>...</p>:
                    <p className="followers-num">{userState?.following}<span className="followers">&nbsp;Following</span></p>}
                  </div>
                  <div className="follower-count">
                    <GoRepo size={20}/>
                    {statUserData==="loading" ?<p>...</p>:
                    <p className="followers-num">{userState?.publicRepos ? userState?.publicRepos : 0}<span className="followers">&nbsp;Public Repos</span></p>}
                  </div>
                </div>
                <a href={userState?.htmlUrl} target="_blank">Go to profile.</a>
                <a href={userState?.blog} target="_blank">Personal blog</a>
                <hr className="line-sep" style={{width:'50%'}}/>
                <p className="card-email">{userState?.bio ? userState?.bio : `Bio not available.`}</p>
              </div>
            </div>
            <div className="up-repos">
              <header>Top 3 repos</header>
              <div className="cards">
                { isLoadingRepos ? (<p>Loading repos...</p>): (
                  reposState?
                  (
                    reposState.map((topRepo) => {
                      return <RepoGeneralCard repo={topRepo ?? undefined}/>
                    })
                  ):(
                    null
                  )
                )
                }
              </div>
            </div>
            </section>
            )
          }
      </main>
    )
}

export default UserPage