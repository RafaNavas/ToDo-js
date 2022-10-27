const HtmlWebpackPlugin = require('html-webpack-plugin') // Importación del plugin.
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin')
const copyPlugin = require('copy-webpack-plugin')

module.exports = { // Este modulo es sobre lo que se va a exportar
    mode: 'development', // Indica el modo en el que se va a usar y tiene sus caracteristicas.
                         // Habilita nombres útiles para módulos y fragmentos.
    output: {
        clean: true // Limpia la carpeta dist. Elimina todo antes de cargar la compilacion.
    },

    module: {
        rules: [
            // Cuando corremos el build debemos apuntar a todos los archivos .html para trasladarlos al dist
            {
                test: /\.html$/, // Busca todos los .html. Evaluar que un string haga match con una exprecion regular.
                loader: 'html-loader', // -->Llamar al html-loader.
                options: {
                    sources: false // Evita que hale cualquier enlace que esté dentro de los archivos html.
                }
            },
            {
                test:   /\.css$/, // Esta es una regla para los .css
                exclude: /style.css$/,
                use:    [ 'style-loader', 'css-loader' ] // activa los paquetes.
            },
            {
                test:   /style.css$/,
                use:    [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test:   /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({ // Crea los html en dist
            title: 'Mi webpack App', // Pone el <title> del <head>.
            //filename: 'index.html', // Da nombre al archivo base del bundle.
            template: './src/index.html' // Da la plantilla para el archivo base del bundle.
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // Asigna el nombre al css generado y agrega un nuevo hash cada vez.
            ignoreOrder: false, // Para ignorar el orden en que busca los css.
        }),
        new copyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ],
}