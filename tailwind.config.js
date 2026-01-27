module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        main: 'var(--main-color)',
        error: 'var(--error-color)',
        ground: 'var(--ground-color)',
        primary: 'var(--primary-color)',
        neutral: 'var(--neutral-color)',
        'custom-white': 'var(--white-color)',
      },
      animation: {
        'spin-fast': 'spin 0.4s linear infinite',
      },
    },
  },
  plugins: [],
}

