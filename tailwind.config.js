export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Clash Display", "Space Grotesk", "sans-serif"],
                body: ["Space Grotesk", "sans-serif"],
                mono: ["Space Mono", "monospace"],
            },
            colors: {
                bg: "var(--bg)",
                "surface-1": "var(--surface-1)",
                "surface-2": "var(--surface-2)",
                text: "var(--text)",
                muted: "var(--muted)",
                border: "var(--border)",
                "accent-cyan": "var(--accent-cyan)",
                "accent-lime": "var(--accent-lime)",
            },
            boxShadow: {
                glow: "0 0 0 1px rgba(40,240,224,0.20), 0 18px 40px rgba(40,240,224,0.20)",
            },
        },
    },
    plugins: [],
};
