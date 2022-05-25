import ParticipantView from "components/shared-components/ParticipantView";
import { NextPage } from "next";
import Head from "next/head";

const index: NextPage = () => {
    return (
        <div className="bg-purple-900">
            <Head>
                <title>Project S</title>
            </Head>
            <ParticipantView />
        </div>
    );
};

export default index;
