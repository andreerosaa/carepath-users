import ReposSection from "../components/ReposSection"
import UsersSection from "../components/UsersSection"

type Props = {}

const Main = (props: Props) => {
  return (
    <main>
        <UsersSection headerTitle="Trending Users"/>
        <UsersSection headerTitle="Most Active Users"/>
        <ReposSection/>
    </main>
  )
}

export default Main