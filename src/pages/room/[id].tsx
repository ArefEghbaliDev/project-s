import ParticipantControls from "components/shared-components/ParticipantControls";
import LocalParticipantView from "components/shared-components/LocalParticipantView";
import { NextPage } from "next";
import Head from "next/head";
import RemoteParticipantView from "components/shared-components/RemoteParticipantView";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { getSocketInstance } from "services/websocket/SocketClient";

const index: NextPage = () => {
    const dispatch = useAppDispatch();

    const remoteParticipantState = useAppSelector((state) => state.peer.remoteStreamState);

    useEffect(() => {
        getSocketInstance(dispatch);
    }, []);

    return (
        <div className="bg-purple-900">
            <Head>
                <title>Project S</title>
            </Head>
            <LocalParticipantView />
            {(remoteParticipantState.video || remoteParticipantState.audio) && <RemoteParticipantView />}
            <ParticipantControls />
        </div>
    );
};

export default index;
