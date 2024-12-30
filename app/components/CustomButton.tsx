interface CustomButtonProps {
    name: string
    onClick: (e?:any)=>void
    className?: string
}
export default function CustomButton({name, onClick, className}: CustomButtonProps){
    return (
        <div className={className}>
            <button onClick={onClick} className={`border m-1 border-2 px-2 rounded-lg bg-gray-200`}>{name}</button>
        </div>
    )
}