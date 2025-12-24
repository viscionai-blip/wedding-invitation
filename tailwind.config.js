/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: "#f2e8d5",     // Antique Paper
                burgundy: "#4a0404",  // Deep Wine
                flamenco: "#cf2424",  // Vibrant Red
                gold: "#d4af37",      // Classic Gold
                charcoal: "#1a1a1a",  // Nearly Black
                emerald: "#4a0404",   // Mapped for compatibility
                sage: "#4a0404",      // Mapped for compatibility
            },
            fontFamily: {
                script: ["'Great Vibes'", "cursive"],
                sans: ["'Montserrat'", "sans-serif"],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
