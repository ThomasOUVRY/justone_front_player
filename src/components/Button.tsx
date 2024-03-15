export type ButtonProps = {
    children: string
    onClick: () => void
}

const Button = ({onClick, children}: ButtonProps) => {
    return <button onClick={onClick}
        className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        {children}
    </button>
}

export default Button;
