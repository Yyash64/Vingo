import React from "react";
import { useSelector } from "react-redux";
import UserDashBoard from "../components/UserDashBoard";
import OwnerDashBoard from "../components/OwnderDashBoard";
import DeliveryBoyDashBoard from "../components/DeliveryBoyDashBoard";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
      {userData?.role ===  "user" && <UserDashBoard />}
      {userData?.role === "owner" && <OwnerDashBoard />}
      {userData?.role === "deliveryboy" && <DeliveryBoyDashBoard />}
    </div>
  );
}

export default Home;
