import ParticipantControls from "components/shared-components/ParticipantControls";
import ParticipantView from "components/shared-components/ParticipantView";
import { useAppDispatch } from "hooks/useReduxHooks";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { getSocketInstance } from "services/websocket/SocketClient";

const index: NextPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getSocketInstance(dispatch);
    }, []);

    return (
        <div className="bg-purple-900">
            <Head>
                <title>Project S</title>
            </Head>
            <ParticipantView isLocal={true} />
            <ParticipantView isLocal={false} />
            <ParticipantControls />
        </div>
    );
};

export default index;
