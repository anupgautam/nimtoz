import { Ellipsis } from 'lucide-react'

const items = [
    { id: 1, count: '1,234', type: 'item' },
    { id: 2, count: '567', type: 'item' },
    { id: 3, count: '1,234', type: 'item' },
    { id: 4, count: '567', type: 'item' },
];

const UserCard = ({ type }: { type: string }) => {
    return (
        <>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`rounded-2xl p-4 flex-1 min-w-[130px] ${index % 2 === 0 ? 'bg-red-500' : 'bg-red-200'
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                            2024/25
                        </span>
                        <Ellipsis />
                    </div>
                    <h1
                        className={`text-2xl font-semibold my-4 ${index % 2 === 0 ? 'text-white' : 'text-black'
                            }`}
                    >
                        {item.count}
                    </h1>
                    <h2 className={`capitalize text-sm font-medium ${index % 2 === 0 ? 'text-gray-100' : 'text-gray-500'
                        } `}>

                        {item.type}s
                    </h2>
                </div>
            ))}
        </>
    );
};

export default UserCard;