import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPeerInitialState {
    peerConnectionStatus: "idle" | "created";
    isRemoteStreamReceived: boolean;
}

const initialState: IPeerInitialState = {
    peerConnectionStatus: "idle",
    isRemoteStreamReceived: false,
};

const peerSlice = createSlice({
    name: "peer",
    initialState,
    reducers: {
        updatePeerConnectionStatus: (state, action: PayloadAction<"idle" | "created">) => {
            state.peerConnectionStatus = action.payload;
        },
        updateIsRemoteStreamReceived: (state, action: PayloadAction<boolean>) => {
            state.isRemoteStreamReceived = action.payload;
        },
    },
});

export default peerSlice.reducer;

export const { updatePeerConnectionStatus, updateIsRemoteStreamReceived } = peerSlice.actions;
