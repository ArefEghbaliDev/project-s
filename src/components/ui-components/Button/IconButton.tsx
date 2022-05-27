import clsx from "clsx";
import { IButton } from "./button.interface";

const IconButton = ({ children, disabled, onClick, type, className, color }: IButton) => {
    const baseClass =
        "rounded text-white p-3 flex items-center justify-center border-none outline:none focus:outline:none transition-all duration-100 ease-out";

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(baseClass, className, {
                "bg-white text-black": color === "default",
                "bg-red-500 text-white": color === "danger",
            })}
        >
            {children}
        </button>
    );
};

export default IconButton;
