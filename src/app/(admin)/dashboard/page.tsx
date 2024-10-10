import Announcements from "@/components/Lama/Announcements";
import CountChart from "@/components/Lama/CountChart";
import FinanceChart from "@/components/Lama/FinanceChart";
import MostBookedEvents from "@/components/Lama/MostBookedEvents";
import UserCard from "@/components/Lama/UserCard";

const Dashboard = async () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">

                    <div className="w-full lg:w-2/3 h-[450px]">
                        <CountChart />
                    </div>
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <MostBookedEvents />
                    </div>
                </div>
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>

            </div>
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};
export default Dashboard