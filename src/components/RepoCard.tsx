import { Repo } from "../models/Repo"
import {MdStars} from "react-icons/md";

type Props = {
  repo?:Repo,
}

const RepoCard = ({repo}: Props) => {
  return (
    <div className="">
      <div className="">
        <p className="">{repo?.name}</p>
        <div className="stargazer-count">
          <MdStars size={20}/>
          <p>{repo?.stargazersCount}</p>
        </div>
        <p className="">{repo?.description}</p>
      </div>
    </div>
  )
}

export default RepoCard