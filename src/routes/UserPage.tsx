import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchUserData, getMostStarredRepo } from "../data/FetchData";
import { User } from "../models/User";

const UserPage = () => {
  const gitHubUrl = (process.env.REACT_APP_GH_API_BASE_URL as string);
  
  const {userId} = useParams();

  const {status:statUserData, data:userData} = useQuery({queryKey: ['userData', userId], queryFn: ()=> userId ? fetchUserData(`${gitHubUrl}users/${userId}`) : undefined});
  const {status:statUserRepo, data:userRepo} = useQuery({queryKey: ['userRepo', userId], queryFn: ()=> userId ? getMostStarredRepo(`${gitHubUrl}users/${userId}/repos`) : undefined});

  if(userData !== undefined) {
    var user = new User(
      userData.data.id,
      userData.data.login,
      userData.data.avatar_url,
      userData.data.url,
      userData.data.followers_url,
      userData.data.html_url,
      userData.data.repos_url,
      userData.data.email,
      userData.data.followers,
      userData.data.following,
      userData.data.name,
      userData.data.location,
      userData.data.bio,
      userData.data.blog,
      userData.data.created,
      userData.data.hireable,
      userData.data.publicGists,
      userData.data.publicRepos
      )
  }

  return (
    <main>
      <section>
        <header></header>
      </section>
    </main>
  )
}

export default UserPage