const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для генерации HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Плагин для извлечения CSS в отдельные файлы



module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
    },
    mode: 'development',
    optimization: {
        usedExports: true,
    },
    entry: './src/index.js', // Файл с исходным кодом
    output: {
        filename: 'bundle.js', // Скомпилированный файл
        path: path.resolve(__dirname, 'dist'), // Выходная директория
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },
    mode: 'development', // Режим разработки
    module: {
        rules: [
            {
                test: /\.js$/, // Обработка файлов JS
                exclude: /node_modules/, // Исключение папки node_modules
                use: {
                    loader: 'babel-loader', // Использование Babel для транспиляции
                    options: {
                        presets: ['@babel/preset-env'], // Пресет для ES6+ 
                    },
                },
            },
            {
                test: /\.css$/, // Обработка файлов CSS
                use: [
                    MiniCssExtractPlugin.loader, // Извлечение CSS в отдельные файлы
                    'css-loader', // Загрузчик CSS
                ],
            },
            {
                test: /\.scss$/, // Обработка файлов SCSS
                use: [
                    MiniCssExtractPlugin.loader, // Извлечение CSS в отдельные файлы
                    'css-loader', // Загрузчик CSS
                    'sass-loader', // Загрузчик SASS/SCSS
                ],
            },
            {
                test: /\.(jpeg|png|webp|gif|svg|jpg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/, // Обработка HTML файлов
                loader: 'html-loader', // Загрузчик HTML
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ // Генерация HTML файла
            template: path.resolve(__dirname, "src", "index.html"), // Шаблон для HTML
            filename: 'index.html', // Имя выходного HTML файла
        }),
        new MiniCssExtractPlugin({ // Конфигурация плагина минификации CSS
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};