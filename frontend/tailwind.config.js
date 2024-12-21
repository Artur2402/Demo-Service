/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				spin: 'spin 1s linear infinite',
			},
		},
	},
	plugins: [],
}
