import Logo from "./Logo"
import Search from "./Search"

type Props = {}

const Nav = (props: Props) => {
  return (
    <nav className="navbar">
        <Logo/>
        <Search/>
    </nav>
  )
}

export default Nav