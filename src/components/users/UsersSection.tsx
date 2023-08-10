import { User } from "../../models/User"
import UserCard from "./UserCard"

type Props = {
    headerTitle:string,
    status:string,
    error: unknown,
    userList?:Array<User>
}

const UsersSection = ({headerTitle, userList, status, error}: Props) => {
    return (
        <section>
            <header>{headerTitle}</header>
            <div className="cards">
            {
                status==="success" && userList && userList.length> 0 ?
                    userList.map((user:User) => {
                        return (
                                <UserCard key={headerTitle.split(" ").join("").trim().toLocaleLowerCase()+"_"+ user.id.toString()} user={user}/>
                            )
                    })
                :
                status==="loading" ?
                <div className='w-100 d-flex text-center justify-content-center'><h2>Loading...</h2></div>
                :
                status==="error" ?
                <div className='w-100 d-flex text-center justify-content-center'><h2>Error loading users: {JSON.stringify(error)}</h2></div>
                :
                null 
            }
            </div>
        </section>
    )
}

export default UsersSection