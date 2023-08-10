import logoSymbol from "../../assets/icon-white.png";
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link className="logotype" to={`/`}>
        <img src={logoSymbol} alt="logosymbol" className="logosymbol"/>
        <div className="wordmark">CAREPATH</div>
    </Link>
  )
}

export default Logo