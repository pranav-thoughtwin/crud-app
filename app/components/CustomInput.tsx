import { useState } from "react"

interface CustomInputProps {
    type: string
    name: string
    labelName: string
    defaultValue: string
    error?: string
    onChange: (e: any) => void
}

export default function CustomInput({ type, onChange, name, labelName, defaultValue, error }: CustomInputProps) {

    const [show, setShow] = useState(false);
    return (
        <div className="mb-2">
            <div>{labelName}</div>
            <input
                type={type != "password" ? type : show ? "text" : "password"}
                name={name}
                className="border border-2"
                value={defaultValue}
                onChange={onChange}
            />
            {type === "password" &&
                <button className="text-sm ml-1" onClick={() => setShow(!show)}>
                    {show ? "Hide" : "Show"}
                </button>
            }
            {<span className="text-red-900 block text-xs">{error && error}</span>}
        </div>
    );
};