import logoSymbol from "../assets/icon-white.png";
import { Link } from "react-router-dom"

type Props = {}

const Logo = (props: Props) => {
  return (
    <Link className="logotype" to={`/`}>
        <img src={logoSymbol} alt="logosymbol" className="logosymbol"/>
        <div className="wordmark">UPHILL</div>
    </Link>
  )
}

export default Logo