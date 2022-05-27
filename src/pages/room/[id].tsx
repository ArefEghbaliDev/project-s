import ParticipantControls from "components/shared-components/ParticipantControls";
import LocalParticipantView from "components/shared-components/LocalParticipantView";
import { NextPage } from "next";
import Head from "next/head";
import RemoteParticipantView from "components/shared-components/RemoteParticipantView";
import { useEffect } from "react";
import { useAppDispatch } from "hooks/useReduxHooks";
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
            <LocalParticipantView />
            <RemoteParticipantView />
            <ParticipantControls />
        </div>
    );
};

export default index;
