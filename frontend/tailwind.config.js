export default{

    theme: {
        extend:{
        colors:{
            'primary':"#111111",
        },
        gridTemplateColumns: {
            'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
        },
    },
},
    plugins: [tailwindcss(),react()],
}