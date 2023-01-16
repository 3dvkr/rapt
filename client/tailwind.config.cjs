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
	extend: {
		animation: {
		  text: 'text 5s ease infinite',
		  motion: 'motion 1000ms ease-out forwards',
		  "motion-far": 'motion-far 2000ms ease-out forwards 1000ms',
		},
		keyframes: {
		  text: {
			'0%': {
			  'background-size': '200% 200%',
			  'background-position': 'left center',
			},
			'100%': {
			  'background-size': '200% 200%',
			  'background-position': 'right center',
			},
		  },
		  motion: {
			'0%': {
				opacity: '0%',
			  transform: 'translateY(-0.5rem)',
			},
			'100%': {
				opacity: '100%',
			  transform: 'translateY(0rem)',
			},
		  },
		  "motion-far": {
			'0%': {
				opacity: '0%',
			  transform: 'translateY(-1rem)',
			},
			'100%': {
				opacity: '100%',
			  transform: 'translateY(0rem)',
			},
		  },
		},
	  },
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
