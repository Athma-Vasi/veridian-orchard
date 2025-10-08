import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#556b2f",
                    secondary: "#8fbc8f",
                    background: "#f0fff0",
                    accent: "#d7a97b",
                    text: "#3b3b3b"
                }
            },
            fontFamily: {
                lora: ["Lora", "serif"],
                worksans: ["Work Sans", 'sans-serif']
            }
        }
    }
}

export default config