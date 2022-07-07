const path = require("path");

// untuk deklarasi nama plugin wajib diawali dengan huruf kecil
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // disini kita bisa menentukan mode kita. webpack sendiri memiliki 3 mode yaitu development, production, dan none. setiap mode memiliki properti yang bisa digunakan dan tidak digunakan
  mode: "development",

  // entry adalah file yang pertama kali akan di analisa oleh webpack, dengan menggunakan multiple entry kita bisa memanfaatkan yang namanya code splitting
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },

  // output adalah tujuan folder untuk menyimpan bundle kita
  output: {
    // tujuan
    path: path.resolve(__dirname, "dist"),

    // nama file hasil dari bundle
    filename: "[name][contenthash].js",

    // akan menghapus bundle yang sebelumnya jika ada perubahan di kode kita
    clean: true,
  },

  // source maps berguna untuk memudahkan kita dalam melakukan debugging aplikasi baik di development atau di production
  devtool: "source-map",

  // ketika kita bekerja di developement
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), // mengambil bundle
    },
    compress: true, // compress gzip
    port: 3000, // aplikasi akan berjalan di port ini
    hot: true, // mengaktifkan hot reload
    open: true, // aplikasi akan otomatis di buka di browser ketika menjalankan npm run dev
    historyApiFallback: true, // ini akan mengizinkan respone halam 404
  },

  // disini kita bisa melakukan deklarasi jika kita ingin atau mempunyai file selain berekstensi .js
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // disini kita harus mendaftarkan semua third module / plugins yang kita gunakan
  plugins: [
    new htmlWebpackPlugin({
      title: "Belajar Webpack Dasar",
      filename: "index.html",
      template: "src/template.html",
    }),
    new webpackBundleAnalyzer(),
  ],
};
