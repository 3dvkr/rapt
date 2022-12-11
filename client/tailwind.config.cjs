/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				dark: {
					primary: "#92f7fc",
					secondary: "#5fd8d4",
					accent: "#fcd34d",
					neutral: "#27222A",
					"base-100": "#F5F5F5",
					info: "#387EE5",
					success: "#239F50",
					warning: "#F1AE55",
					error: "#E77573",
				},
			},
			"winter",
		],
	},
};
