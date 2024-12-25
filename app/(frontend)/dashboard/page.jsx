"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/slices/userSlice";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  console.log(token, user);
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <div className=" flex flex-col items-center justify-center py-10">
      <h1>Welcome, {user?.name}</h1>
      <p>Your ID: {user?.id}</p>

      <button
        onClick={handleLogout}
        className="mt-4 p-2 px-4 bg-[#fb00ff] text-white rounded"
      >
        Log out
      </button>
    </div>
  );
}
