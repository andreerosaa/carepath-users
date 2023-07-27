import Search from "./Search"

type Props = {}

const Nav = (props: Props) => {
  return (
    <nav className="navbar">
        <div className="logotype">
            <img src="logo.png"/>
            <div className="wordmark">UPHILL</div>
        </div>
        <Search/>
    </nav>
  )
}

export default Nav