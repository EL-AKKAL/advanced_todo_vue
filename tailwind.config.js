/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: {
          extend: {
               colors: {
                    bgColor: "#F4F7FF",
               },
          },
     },
     plugins: [require("@tailwindcss/forms")],
};
