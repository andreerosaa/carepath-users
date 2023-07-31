import { Repo } from "../models/Repo"
import {MdStars} from "react-icons/md";

type Props = {
  repo?:Repo,
  color?:string,
}

const RepoGeneralCard = ({repo, color}: Props) => {
  return (
    <div className="repo-gen-container" style={{backgroundColor:color}}>
      <div className="repo-gen-in-cont">
        <h3 className="repo-gen-name">{repo?.fullName}</h3>
        <div className="stargazer-gen-count">
          <MdStars size={18}/>
          <p className="start-count">{repo?.stargazersCount}</p>
        </div>
        <p className="repo-gen-description">{repo?.description ? repo.description : `Description not available.`}</p>
      </div>
    </div>
  )
}

export default RepoGeneralCard