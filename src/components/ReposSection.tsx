import { Repo } from "../models/Repo"
import RepoCard from "./RepoCard"

type Props = {
  headerTitle: string,
  status:string,
  error:any,
  repoList?:Array<Repo>
}

const ReposSection = ({headerTitle, repoList, status}: Props) => {
  return (
    <section>
      <header>{headerTitle}</header>
      {
        status==="success" && repoList && repoList.length> 0 ?
        repoList.map((repo:Repo) => {
                return (
                        <RepoCard key={headerTitle.split(" ").join("").trim().toLocaleLowerCase()+"_"+ repo.id.toString()} repo={repo}/>
                    )
            })
        :
        status==="loading" ?
        <div className='w-100 d-flex text-center justify-content-center'><h2>Loading...</h2></div>
        :
        status==="error" ?
        <div className='w-100 d-flex text-center justify-content-center'><h2>Error loading repos.</h2></div>
        :
        <div className='w-100 d-flex text-center justify-content-center'><h2>Something went wrong.</h2></div>
      }
    </section>
  )
}

export default ReposSection