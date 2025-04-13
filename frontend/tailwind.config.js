export default{

    theme: {
        extend:{
        colors:{
            primary: '#0f766e', // teal-700
            secondary: '#e0f2f1', // teal-50
            accent: '#14b8a6', // teal-500
        },
        gridTemplateColumns: {
            'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
    },
},
    plugins: [tailwindcss(),react()],
}