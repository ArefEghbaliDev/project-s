import clsx from "clsx";
import { IButton } from "./button.interface";

const IconButton = ({ children, disabled, onClick, type, className }: IButton) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                "rounded bg-red-500 text-white p-3 flex items-center justify-center border-none outline:none focus:outline:none transition-all duration-100 ease-out hover:bg-red-600",
                className
            )}
        >
            {children}
        </button>
    );
};

export default IconButton;
