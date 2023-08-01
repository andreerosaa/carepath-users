import { Repo } from "../models/Repo"
import RepoGeneralCard from "./RepoGeneralCard"

type Props = {
  headerTitle: string,
  status:string,
  error:any,
  repoList?:Array<Repo>
}

const ReposSection = ({headerTitle, repoList, status}: Props) => {

  const colors = ["#021F59","#437BE3","#2D9ADD","#2FD2D4"];
  let i:number = 0;

  return (
    <section>
      <header>{headerTitle}</header>
      <div className="cards">
      {
        status==="success" && repoList && repoList.length> 0 ?
        repoList.map((repo:Repo) => {
                i++;
                return (
                        <RepoGeneralCard key={repo.name ? repo?.name.trim().toLocaleLowerCase() : ""+"_"+ repo.id.toString()} color={colors[i-1]} repo={repo}/>
                        )
            })
        :
        status==="loading" ?
        <div className='w-100 d-flex text-center justify-content-center'><h2>Loading...</h2></div>
        :
        status==="error" ?
        <div className='w-100 d-flex text-center justify-content-center'><h2>Error loading repos.</h2></div>
        :
        null
      }
      </div>
    </section>
  )
}

export default ReposSection