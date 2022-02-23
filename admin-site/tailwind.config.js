module.exports = {
    content: ["./src/components/**/*.js", "./pages/**/*.js"],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require("tailwindcss"),
        require("precss"),
        require("autoprefixer"),
        require("@tailwindcss/forms"),
    ],
};
