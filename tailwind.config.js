module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: {
                    600: "#0E131F",
                    500: "#1A1423",
                },
                primary: {
                    500: "#3777FF",
                },
            },
        },
        borderRadius: {
            DEFAULT: "12px",
        },
    },
    plugins: [],
};
