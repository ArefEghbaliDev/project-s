import { AnyAction, configureStore, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";

import peer from "./slices/peer";

export const store = configureStore({
    reducer: {
        peer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, null | undefined, AnyAction> & Dispatch<AnyAction>;
