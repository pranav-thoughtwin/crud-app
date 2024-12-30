'use client'
import CustomTable from "./components/CustomTable";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const showToast = useSelector((state: RootState) => state.details.showToast);
  const toastMessage = useSelector((state: RootState) => state.details.toastMessage);
  useEffect(() => {
    { showToast && toast(toastMessage); }
  }, [showToast])
  const router = useRouter();
  const handleClick = () => {
    console.log("clicked")
    router.push("/inputForm")
  }

  return (

    <div >
      <ToastContainer theme="light" />
      <div className="mt-8">
        <CustomTable />
      </div>
      <button onClick={handleClick}>Test button</button>

    </div>
  );
}