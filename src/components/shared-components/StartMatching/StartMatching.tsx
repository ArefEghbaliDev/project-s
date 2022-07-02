import ContainedButton from "components/ui-components/Button/ContainedButton";
import React from "react";

const StartMatching = () => {
    return (
        <div className="rounded bg-white shadow-lg p-5">
            <h3 className="text-xl font-bold">Start Matching</h3>
            <p>Before you start:</p>
            <ContainedButton type="button" color="default">
                Start Matching
            </ContainedButton>
        </div>
    );
};

export default StartMatching;
