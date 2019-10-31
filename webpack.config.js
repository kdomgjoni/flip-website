
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = {
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
							options: { minimize: false }
						}
				]
			},
			{
		      test: /\.m?js$/,
		      exclude: /(node_modules|bower_components)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['@babel/preset-env']
		        }
		      }
		    },
		    {
		        test: /\.(sa|sc|c)ss$/,
		        use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            
		          },
		          // Creates `style` nodes from JS strings
		          /*'style-loader',*/
		          // Translates CSS into CommonJS
		          'css-loader',
		          // Compiles Sass to CSS
		          'sass-loader',
		          'postcss-loader',
		        ],
		    },
		    {
		      test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
		      exclude: /node_modules/,
		      loader: 'url-loader',
		      options: {
		      	outputPath: '../dist/fonts/',
		        publicPath: 'fonts/',
		        name: '[name].[ext]',
		        limit: 1000
		      }
		    },
		    {
			  test: /\.(gif|png|jpe?g|svg)$/i,
			  use: [
			    	{
			  		loader: 'file-loader',
			  		options: {
			  			name: "[name].[ext]",
				      	outputPath: './images/',
				      	publicPath: 'images/',
			  		}
			  	},
			    {
			      loader: 'image-webpack-loader',
			      options: {
			        mozjpeg: {
			          progressive: true,
			          quality: 65
			        },
			        // optipng.enabled: false will disable optipng
			        optipng: {
			          enabled: false,
			        },
			        pngquant: {
			          quality: [0.65, 0.90],
			          speed: 4
			        },
			        gifsicle: {
			          interlaced: false,
			        },
			        // the webp option will enable WEBP
			        webp: {
			          quality: 75
			        }
			      }
			    },
			  ],
			}
		   
		]
	},
	plugins: [
		new HtmlWebPackPlugin(
		{
			template: './src/index.html',
			filename: './index.html'
		}),
		new HtmlWebPackPlugin(
		{
			template: './src/singlepost.html',
			filename: './singlepost.html'
		}),
		new webpack.ProvidePlugin({
	        $: 'jquery',
	        jQuery: 'jquery',
	        'window.jQuery': 'jquery'
	    }),
		new MiniCssExtractPlugin({
	      // Options similar to the same options in webpackOptions.output
	      // all options are optional
	      filename: './css/[name].css'
	    }),
	    new CleanWebpackPlugin(),
	]
}
