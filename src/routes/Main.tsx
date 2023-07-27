import ReposSection from "../components/ReposSection"
import UsersSection from "../components/UsersSection"

type Props = {}

const Main = (props: Props) => {
  return (
    <main>
        <UsersSection/>
        <UsersSection/>
        <ReposSection/>
    </main>
  )
}

export default Main