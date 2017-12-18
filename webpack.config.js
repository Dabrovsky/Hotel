const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const options = {
    sourceMap: true,
    ident: 'postcss',
    plugins: () => {
        return [
            require('autoprefixer')({
                browsers: [
                    'ie >= 8',
                    'last 3 version'
                ]
            })
        ]
    }
}

module.exports = {
    entry: ['./src/sass/style.scss'],
    //devtool: 'source-map',
    output: {
        filename: './src/css/style.css'
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001
    },
    watch: true,
    module: {
        loaders: [
            {
        	      test: /\.s?css$/,
        	      use: ExtractTextPlugin.extract({
        		        fallback: 'style-loader',
        		        use: [
        		            { loader: 'css-loader?minimize=true?importLoaders=1' },
        		            { loader: 'postcss-loader', options: options  },
                        { loader: 'sass-loader' }
        		        ]
                })
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: '../img/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'src/css/style.css', disable: false, allChunks: true }),
    ]
}
