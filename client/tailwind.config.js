/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "blue": "#2B5DDF",
                "darkBlue": "#15285A",
                "white": "#F2F3F6",
                "lightGray": "#BABAC5",
                "veryLightGray": "#DDDDE8",
                "gray": "#9D9DAA",
                "lightBlueGray": "#E3E6F5",
                "veryWhite": "#ffff",
                "yellow": "#F1D01F"
            },
            fontWeight: {
                thin: '100',
                hairline: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                'extra-bold': '800',
                black: '900',
            }
        },
        fontFamily: {
            abc: ["Lexend", "sans-serif"]
        }
    },
    plugins: [],
}