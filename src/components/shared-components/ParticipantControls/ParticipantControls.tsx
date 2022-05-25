import IconButton from "components/ui-components/Button/IconButton";

import { FiCamera, FiMic, FiX } from "react-icons/fi";

const ParticipantControls = () => {
    return (
        <div className="absolute left-0 bottom-0 w-full p-5 flex items-center justify-center">
            <IconButton type="button">
                <FiMic size={24} />
            </IconButton>
            <IconButton type="button" className="mx-5">
                <FiCamera size={24} />
            </IconButton>
            <IconButton type="button">
                <FiX size={24} />
            </IconButton>
        </div>
    );
};

export default ParticipantControls;
