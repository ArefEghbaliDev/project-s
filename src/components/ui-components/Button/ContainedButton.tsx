import clsx from "clsx";
import { IButton } from "./button.interface";

const ContainedButton = ({ type, onClick, disabled, children, color, className }: IButton) => {
    const baseClass =
        "rounded text-white px-4 py-3 flex items-center justify-center border-none outline:none focus:outline:none transition-all duration-100 ease-out";

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={clsx(baseClass, className, {
                "bg-primary-500 text-white": color === "default",
                "bg-red-500 text-white": color === "danger",
            })}
        >
            {children}
        </button>
    );
};

export default ContainedButton;
