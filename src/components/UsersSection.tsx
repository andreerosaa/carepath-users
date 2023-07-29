import { User } from "../models/User"
import UserCard from "./UserCard"

type Props = {
    headerTitle:string,
    userList?:Array<User>
}

const UsersSection = ({headerTitle, userList}: Props) => {
    return (
        <section>
            <header>{headerTitle}</header>
            {/* {users.map((user) => {
                <UserCard user={user}/>
            })} */}
        </section>
    )
}

export default UsersSection