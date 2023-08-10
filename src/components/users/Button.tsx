import { Link } from "react-router-dom";

type Props = {
    login?:string
}

const Button = (login: Props) => {
  return (
    <Link className='button-container' to={`/${login.login}`}>
        <div className="profile-button">Open Profile</div>
    </Link>
  )
}

export default Button