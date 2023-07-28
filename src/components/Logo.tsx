import logoSymbol from "../assets/icon-white.png";

type Props = {}

const Logo = (props: Props) => {
  return (
    <div className="logotype">
        <img src={logoSymbol} alt="logosymbol" className="logosymbol"/>
        <div className="wordmark">UPHILL</div>
    </div>
  )
}

export default Logo