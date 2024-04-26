/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		transitionDuration: {
			DEFAULT: "1000ms",
		},
		fontFamily: {
			sans: ["ui-sans-serif", "system-ui"],
			serif: ["ui-serif"],
			mono: ["ui-monospace", "SFMono-Regular"],
		},
		extend: {},
	},
	plugins: [],
};