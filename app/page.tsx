'use client'
import CustomTable from "./components/CustomTable";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setShowToast } from "./redux/slices/detailsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const showToast = useSelector((state: RootState) => state.details.showToast);
  const toastMessage = useSelector((state: RootState) => state.details.toastMessage);
  useEffect(() => {
    if (showToast) {
      toast(toastMessage);
      dispatch(setShowToast(false));
    }
  }, [showToast])

  return (

    <div >
      <ToastContainer theme="light" />
      <div className="mt-8">
        <CustomTable />
      </div>
    </div>
  );
}