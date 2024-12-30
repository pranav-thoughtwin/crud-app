'use client'
import { useDispatch, useSelector } from "react-redux"
import CustomButton from "./CustomButton"
import { RootState } from "../redux/store"
import { deleteDetail, setEditData, setEditIndex, setisEditing, setShowToast, setToastMessage } from "../redux/slices/detailsSlice"
import { useRouter } from "next/navigation";
import { DataGrid } from '@mui/x-data-grid';


export default function CustomTable() {
    const dispatch = useDispatch();
    const router = useRouter();
    const data = useSelector((state: RootState) => state.details.details)
    const details = useSelector((state: RootState) => state.details.details);


    const handleDelete = (index: number) => {
        dispatch(deleteDetail(index));
        dispatch(setShowToast(true));
        dispatch(setToastMessage("Record deleted"));
    }

    const handleEdit = (index: number) => {
        const data = details.filter((detail, idx) => idx === index);
        dispatch(setEditIndex(index));
        dispatch(setEditData(data[0]));
        router.push("/inputForm")
    }

    return (
        <div>
            <div className="mx-auto w-fit mt-16">
                <div className="text-2xl mx-auto w-fit">User data</div>
                <table className="text-left">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="text-gray-500">Name</th>
                            <th className="text-gray-500">Email</th>
                            <th className="text-gray-500">Password</th>
                            <th className="text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((detail, index) => {
                            return (
                                <tr key={index}>
                                    <td className="pr-12 border-b">
                                        {detail.name}
                                    </td>
                                    <td className="pr-12 border-b">
                                        {detail.email}
                                    </td>
                                    <td className="pr-12 border-b">
                                        {detail.password}
                                    </td>
                                    <td className="pr-12 border-b flex">
                                        <CustomButton name={"Edit"} onClick={() => { handleEdit(index); dispatch(setisEditing(true)) }} />
                                        <CustomButton name="Delete" onClick={() => handleDelete(index)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <CustomButton className="-mx-1" name={"Add data"} onClick={() => router.push("/inputForm")} />
                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                /> */}
            </div>
        </div>
    )
}