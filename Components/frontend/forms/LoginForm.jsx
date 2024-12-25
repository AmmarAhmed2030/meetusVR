"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserInfo } from "@/redux/slices/userSlice";
export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    try {
      const loginResult = await dispatch(loginUser(data)).unwrap();
      toast.dismiss();

      toast.success("Logged in successfully.");
      const token = loginResult.token;
      const userInfoResult = await dispatch(fetchUserInfo(token)).unwrap();
      toast.dismiss();
      toast.success("Your data saved successfully.");
      console.log("Navigating to /dashboard");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      toast.dismiss();

      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="relative w-full">
        <input
          name="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email format",
            },
          })}
          type="email"
          id="email"
          required
          placeholder="Email"
          className="w-full pl-10 pr-4 py-3 border border-[#fb00ff] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 22.1719H7C3.35 22.1719 1.25 20.0719 1.25 16.4219V9.42188C1.25 5.77187 3.35 3.67188 7 3.67188H17C20.65 3.67188 22.75 5.77187 22.75 9.42188V16.4219C22.75 20.0719 20.65 22.1719 17 22.1719ZM7 5.17188C4.14 5.17188 2.75 6.56188 2.75 9.42188V16.4219C2.75 19.2819 4.14 20.6719 7 20.6719H17C19.86 20.6719 21.25 19.2819 21.25 16.4219V9.42188C21.25 6.56188 19.86 5.17188 17 5.17188H7Z"
              fill="#1A1A1E"
            />
            <path
              d="M11.9998 13.7918C11.1598 13.7918 10.3098 13.5318 9.65978 13.0018L6.52978 10.5018C6.20978 10.2418 6.14978 9.77184 6.40978 9.45184C6.66978 9.13184 7.13978 9.07185 7.45978 9.33185L10.5898 11.8318C11.3498 12.4418 12.6398 12.4418 13.3998 11.8318L16.5298 9.33185C16.8498 9.07185 17.3298 9.12184 17.5798 9.45184C17.8398 9.77184 17.7898 10.2518 17.4598 10.5018L14.3298 13.0018C13.6898 13.5318 12.8398 13.7918 11.9998 13.7918Z"
              fill="#1A1A1E"
            />
          </svg>
        </span>
      </div>
      {errors.email && (
        <small className="text-red-600 text-sm">{errors.email.message}</small>
      )}

      <div className="relative w-full">
        <input
          name="password"
          {...register("password", {
            required: "This field is required",
          })}
          type="password"
          required
          placeholder="Password"
          className="w-full pl-10 pr-4 py-3 border border-[#fb00ff] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {" "}
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 11.6719C17.59 11.6719 17.25 11.3319 17.25 10.9219V8.92188C17.25 5.77187 16.36 3.67188 12 3.67188C7.64 3.67188 6.75 5.77187 6.75 8.92188V10.9219C6.75 11.3319 6.41 11.6719 6 11.6719C5.59 11.6719 5.25 11.3319 5.25 10.9219V8.92188C5.25 6.02187 5.95 2.17188 12 2.17188C18.05 2.17188 18.75 6.02187 18.75 8.92188V10.9219C18.75 11.3319 18.41 11.6719 18 11.6719Z"
              fill="#1A1A1E"
            />
            <path
              d="M12 20.1719C10.21 20.1719 8.75 18.7119 8.75 16.9219C8.75 15.1319 10.21 13.6719 12 13.6719C13.79 13.6719 15.25 15.1319 15.25 16.9219C15.25 18.7119 13.79 20.1719 12 20.1719ZM12 15.1719C11.04 15.1719 10.25 15.9619 10.25 16.9219C10.25 17.8819 11.04 18.6719 12 18.6719C12.96 18.6719 13.75 17.8819 13.75 16.9219C13.75 15.9619 12.96 15.1719 12 15.1719Z"
              fill="#1A1A1E"
            />
            <path
              d="M17 23.6719H7C2.59 23.6719 1.25 22.3319 1.25 17.9219V15.9219C1.25 11.5119 2.59 10.1719 7 10.1719H17C21.41 10.1719 22.75 11.5119 22.75 15.9219V17.9219C22.75 22.3319 21.41 23.6719 17 23.6719ZM7 11.6719C3.42 11.6719 2.75 12.3519 2.75 15.9219V17.9219C2.75 21.4919 3.42 22.1719 7 22.1719H17C20.58 22.1719 21.25 21.4919 21.25 17.9219V15.9219C21.25 12.3519 20.58 11.6719 17 11.6719H7Z"
              fill="#1A1A1E"
            />
          </svg>
        </span>
      </div>
      {errors.password && (
        <small className="text-red-600 text-sm">
          {errors.password.message}
        </small>
      )}

      <div className="flex gap-4 items-center">
        <button
          type="submit"
          className={" text-white bg-[#fb00ff] px-4 py-2 rounded-md w-full"}
          disabled={!watch("email") || !watch("password") || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <p className="text-sm  text-[#62626B] font-medium text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-[#fb00ff] hover:underlin"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
