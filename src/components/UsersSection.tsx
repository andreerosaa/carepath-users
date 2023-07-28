import UserCard from "./UserCard"

type Props = {
    headerTitle:string,
    users:[]
}

const UsersSection = ({headerTitle, users}: Props) => {
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