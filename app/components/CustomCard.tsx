// 'use client'
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { addDetails, setEditData, setisEditing, setShowToast, setToastMessage, updateDetails } from "../redux/slices/detailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DetailObj {
    name: string,
    email: string,
    password: string
}

interface ErrorsObj {
    nameError?: string
    emailError?: string
    passwordError?: string
}

export default function CustomCard() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<ErrorsObj>({});

    const editIndex = useSelector((state: RootState) => state.details.editIndex);
    const editData = useSelector((state: RootState) => state.details.editData);
    const isEditing = useSelector((state: RootState) => state.details.isEditing);

    useEffect(() => {
        if (editData) {
            setName(editData?.name);
            setEmail(editData?.email);
            setPassword(editData?.password);
        }
    }, [editData])

    const resetEditData = () => {
        dispatch(setEditData({
            name: "",
            email: "",
            password: ""
        }))
    }

    const handleSubmit = (data: DetailObj) => {
        dispatch(addDetails(data));
        dispatch(setToastMessage("Data submitted"))
        dispatch(setShowToast(true));
        router.push("/");
    }

    const handleSave = (data: DetailObj) => {
        dispatch(updateDetails({ index: editIndex, data }))
        resetEditData();
        dispatch(setisEditing(false));
        dispatch(setToastMessage("Data updated"))
        dispatch(setShowToast(true));
        router.push("/");
    }

    const handleCancel = () => {
        dispatch(setisEditing(false));
        resetEditData();
    }

    const reset = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    const validate = (): boolean => {
        const newErrors: ErrorsObj = {};
        const validName = /^\S*$/.test(name);
        if(!validName){
            newErrors.nameError = "Please enter valid name";
        }
        if (!name) {
            newErrors.nameError = "Please enter name";
        }
        const validEmail = /\S+@\S+\.\S+/.test(email);
        if(!validEmail){
            newErrors.emailError = "Please enter vaild email"
        }
        if (!email) {
            newErrors.emailError = "Please enter email"
        }
        if (!password) {
            newErrors.passwordError = "Please enter password"
        }
        setErrors(newErrors);
        if (!name || !email || !password || !validEmail || !validName) {
            return false;
        }
        reset();
        return true;
    }

    const handleNameChange = (e: any) => {
        setName(e.target.value);
        setErrors(prevError => ({ ...prevError, nameError: "" }))
    }
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        setErrors(prevError => ({ ...prevError, emailError: "" }))
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        setErrors(prevError => ({ ...prevError, passwordError: "" }))
    }
    return (
        <div>
            <div className="w-fit mx-auto">
                <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="w-fit mx-auto text-xl mb-2">Enter details</div>
                    <div>
                        <CustomInput onChange={(e: any) => handleNameChange(e)} type={"text"} name={"name"} labelName={"Enter name"} defaultValue={name} error={errors.nameError} />
                        <CustomInput onChange={(e: any) => handleEmailChange(e)} type={"email"} name={"email"} labelName={"Enter email"} defaultValue={email} error={errors.emailError} />
                        <CustomInput onChange={(e: any) => handlePasswordChange(e)} type={"password"} name={"password"} labelName={"Enter password"} defaultValue={password} error={errors.passwordError} />

                        <div>
                            {isEditing ?
                                <div className="flex space-x-2">
                                    <CustomButton name={"Save"} onClick={() => {
                                        if (validate()) {
                                            handleSave({
                                                name: name,
                                                email: email,
                                                password: password
                                            })
                                        }
                                    }} />
                                    <CustomButton name={"Cancel"} onClick={() => handleCancel()} />
                                </div> :
                                <>
                                    <CustomButton name={"Submit"} onClick={
                                        () => {
                                            if (validate()) {
                                                handleSubmit({
                                                    name: name,
                                                    email: email,
                                                    password: password
                                                })
                                            }
                                        }} />
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div onClick={handleCancel}><Link href="/">Go back to home page</Link></div>
            </div>
        </div>
    )
}