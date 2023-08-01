import { Repo } from "../models/Repo"
import {MdStars} from "react-icons/md";

type Props = {
  repo?:Repo,
}

const RepoCard = ({repo}: Props) => {
  return (
      <a href={repo?.htmlUrl} target="_blank" className="repo-container repo-link">
        <div className="repo-in-cont">
          <div className="repo-header">
            <p className="repo-name">{repo?.name}</p>
            <div className="stargazer-count">
              <MdStars size={20}/>
              <p>{repo?.stargazersCount}</p>
            </div>
          </div>
          <p className="repo-description">{repo?.description ? repo.description : `Description not available.`}</p>
        </div>
      </a>
  )
}

export default RepoCard