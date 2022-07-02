import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUpdateRemoteState = {
    type: "video" | "audio";
    state: boolean;
};

type TMatchingState = "idle" | "matching" | "matched" | "failed";

interface IPeerInitialState {
    peerConnectionStatus: "idle" | "created";
    remoteStreamState: {
        video: boolean;
        audio: boolean;
    };
    matchingState: TMatchingState;
}

const initialState: IPeerInitialState = {
    peerConnectionStatus: "idle",
    remoteStreamState: {
        video: false,
        audio: false,
    },
    matchingState: "idle",
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
        updateMatchingState: (state, action: PayloadAction<TMatchingState>) => {
            state.matchingState = action.payload;
        },
    },
});

export default peerSlice.reducer;

export const { updatePeerConnectionStatus, updateIsRemoteStreamReceived, updateMatchingState } = peerSlice.actions;
