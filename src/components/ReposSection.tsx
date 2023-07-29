import { Repo } from "../models/Repo"

type Props = {
  headerTitle: string,
  repoList?:Array<Repo>
}

const ReposSection = ({headerTitle, repoList}: Props) => {
  return (
    <section>
      <header>{headerTitle}</header>
    </section>
  )
}

export default ReposSection