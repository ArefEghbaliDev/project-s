import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUpdateRemoteState = {
    type: "video" | "audio";
    state: boolean;
};

interface IPeerInitialState {
    peerConnectionStatus: "idle" | "created";
    remoteStreamState: {
        video: boolean;
        audio: boolean;
    };
}

const initialState: IPeerInitialState = {
    peerConnectionStatus: "idle",
    remoteStreamState: {
        video: false,
        audio: false,
    },
};

const peerSlice = createSlice({
    name: "peer",
    initialState,
    reducers: {
        updatePeerConnectionStatus: (state, action: PayloadAction<"idle" | "created">) => {
            state.peerConnectionStatus = action.payload;
        },
        updateIsRemoteStreamReceived: (state, action: PayloadAction<TUpdateRemoteState>) => {
            state.remoteStreamState[action.payload.type] = action.payload.state;
        },
    },
});

export default peerSlice.reducer;

export const { updatePeerConnectionStatus, updateIsRemoteStreamReceived } = peerSlice.actions;
