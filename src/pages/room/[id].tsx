import ParticipantControls from "components/shared-components/ParticipantControls";
import LocalParticipantView from "components/shared-components/LocalParticipantView";
import { NextPage } from "next";
import Head from "next/head";
import RemoteParticipantView from "components/shared-components/RemoteParticipantView";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useReduxHooks";
import { getSocketInstance } from "services/websocket/SocketClient";
import StartMatching from "components/shared-components/StartMatching";
import clsx from "clsx";

const index: NextPage = () => {
    const dispatch = useAppDispatch();

    const peerState = useAppSelector((state) => state.peer);

    useEffect(() => {
        getSocketInstance(dispatch);
    }, []);

    return (
        <div className="bg-dark-500 w-screen h-screen">
            <Head>
                <title>Project S</title>
            </Head>
            <div className="w-screen h-screen grid grid-cols-2 px-5 items-center gap-5">
                <LocalParticipantView />
                {peerState.remoteStreamState.video || peerState.remoteStreamState.audio ? <RemoteParticipantView /> : <StartMatching />}
            </div>
            <ParticipantControls />
        </div>
    );
};

export default index;
