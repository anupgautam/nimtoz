import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

const Dashboard = async () => {

    const session = await getServerSession(options);
    return (
        <div>Welcome {session?.user.username}</div>
    )
}
export default Dashboard