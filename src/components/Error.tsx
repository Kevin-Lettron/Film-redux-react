import { Dispatch, SetStateAction } from "react";

interface ErrorPropsI {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
}

export default function Error({ message, setMessage }: ErrorPropsI) {
    return (
        message && (
            <div className="p-4 flex gap-2 bg-red-4 color-white rounded">
                <p>{message}</p>
                <button
                    className="w-6 h-6 ml-auto flex-none"
                    onClick={() => setMessage("")}
                >
                    <svg viewBox="0 0 24 24" fill="white">
                        <path d="M17.016 15.609l-3.609-3.609 3.609-3.609-1.406-1.406-3.609 3.609-3.609-3.609-1.406 1.406 3.609 3.609-3.609 3.609 1.406 1.406 3.609-3.609 3.609 3.609zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z"></path>
                    </svg>
                </button>
            </div>
        )
    );
}
