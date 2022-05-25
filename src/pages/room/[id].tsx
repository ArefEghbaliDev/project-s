import ParticipantControls from "components/shared-components/ParticipantControls";
import ParticipantView from "components/shared-components/ParticipantView";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { getSocketInstance } from "services/websocket/SocketClient";

const index: NextPage = () => {
    useEffect(() => {
        // getSocketInstance();
    }, []);

    return (
        <div className="bg-purple-900">
            <Head>
                <title>Project S</title>
            </Head>
            <ParticipantView />
            <ParticipantControls />
        </div>
    );
};

export default index;
