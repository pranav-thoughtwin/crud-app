import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailObj {
    name: string;
    email: string;
    password: string;
}

interface DetailsState {
    details: DetailObj[];
    isEditing: boolean;
    editIndex: number | null
    editData: DetailObj | null;
    showToast: boolean;
    toastMessage: string
}

const initialState: DetailsState = {
    details: [
        { name: "Pranav", email: "pranav@thoughtwin.com", password: "hello" },
        { name: "Ram", email: "ram@thoughtwin.com", password: "12356" },
        { name: "Rohan", email: "rohan@thoughtwin.com", password: "kjhsdkjf" }
    ],
    isEditing: false,
    editIndex: null,
    editData: null,
    showToast: false,
    toastMessage: ""
}

const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {
        addDetails: (state, action: PayloadAction<DetailObj>) => {
            state.details.push(action.payload)
        },
        deleteDetail: (state, action: PayloadAction<number>) => {
            state.details.splice(action.payload, 1)
        },
        updateDetails: (state, action: PayloadAction<{ index: number | null, data: DetailObj }>) => {
            if (action.payload.index !== null)
                state.details[action.payload.index] = action.payload.data;
        },
        setisEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        },
        setEditIndex: (state, action: PayloadAction<number>) => {
            state.editIndex = action.payload;
        },
        setEditData: (state, action: PayloadAction<DetailObj>) => {
            state.editData = action.payload
        },
        setShowToast: (state, action: PayloadAction<boolean>) => {
            state.showToast = action.payload
        },
        setToastMessage: (state, action: PayloadAction<string>) => {
            state.toastMessage = action.payload
        }
    }
})

export const { addDetails, deleteDetail, updateDetails, setisEditing, setEditIndex, setEditData, setShowToast, setToastMessage } = detailsSlice.actions;
export default detailsSlice.reducer;