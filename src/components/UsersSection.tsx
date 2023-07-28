import UserCard from "./UserCard"

type Props = {
    headerTitle:string
}

const UsersSection = ({headerTitle}: Props) => {
    return (
        <section>
            <header>{headerTitle}</header>
            {users.map((user) => {
                <UserCard user={user}/>
            })}
        </section>
    )
}

export default UsersSection