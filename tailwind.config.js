module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        main: 'var(--main-color)',
        primary: 'var(--primary-color)',
        ground: 'var(--ground-color)',
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

