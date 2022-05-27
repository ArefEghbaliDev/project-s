import IconButton from "components/ui-components/Button/IconButton";

import { FiCamera, FiMic, FiRefreshCcw, FiSettings, FiX } from "react-icons/fi";

const ParticipantControls = () => {
    return (
        <div className="absolute left-0 bottom-0 w-full p-5 flex items-center justify-center">
            <div className="rounded py-3 px-5 flex items-center bg-black mr-3">
                <p className="text-white font-medium text-lg">00:00</p>
            </div>
            <IconButton type="button" className="mr-3" color="default">
                <FiRefreshCcw size={24} />
            </IconButton>
            <IconButton type="button" className="mr-3" color="default">
                <FiSettings size={24} />
            </IconButton>
            <IconButton type="button" color="danger">
                <FiX size={24} />
            </IconButton>
        </div>
    );
};

export default ParticipantControls;
