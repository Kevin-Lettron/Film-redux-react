interface ButtonPropsI {
    type?: "button" | "submit" | "reset";
    text?: string;
}

export default function Button({ type, text }: ButtonPropsI) {
    return (
        <button
            type={type || "button"}
            className="px-4 py-2 bg-gray-9 hover:bg-gray-8 color-white rounded"
        >
            {text || "button"}
        </button>
    );
}
