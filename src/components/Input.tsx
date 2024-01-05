interface InputPropsI {
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
}

export default function Input({ type, name, value, placeholder }: InputPropsI) {
    return (
        <input
            type={type || "text"}
            name={name || ""}
            defaultValue={value || ""}
            placeholder={placeholder || ""}
            className="px-4 py-2 w-full border border-gray-3 rounded"
        />
    );
}
