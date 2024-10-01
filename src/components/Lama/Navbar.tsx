import { options } from '@/app/api/auth/[...nextauth]/options'
import { Search, MessageCircle, Bell, CircleUserRound } from 'lucide-react'
import { getServerSession } from 'next-auth/next'

const Navbar = async() => {

    const session = await getServerSession(options)

    return (
        <div className="flex items-center justify-between p-6">

            {/*//* Searchbar  */}
            <div className="hidden md:flex items-center gap-2 text-md rounded-md ring-[1.5px] ring-gray-300 px-2">
                <Search />
                <input
                    type="text"
                    placeholder='Search...'
                    className="w-[250px] p-2 bg-transparent outline-none border-none focus:ring-0"
                />
            </div>


            {/*//* Icons and User  */}
            <div className="flex items-center gap-6 justify-end">

                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <MessageCircle />
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Bell />
                    <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-sm'>
                        1
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className='text-xs leading-3 font-medium'>{session?.user.firstname+" "+session?.user.lastname}</span>
                    <span className='text-[10px] text-gray-500 text-right'>{session?.user.role}</span>
                </div>

                <CircleUserRound height={36} width={36} />
            </div>
        </div>
    )
}
export default Navbar