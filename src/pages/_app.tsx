import type { AppProps } from "next/app";

import "styles/tailwind.scss";
import "styles/main.scss";

import { Provider } from "react-redux";
import { store } from "services/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
