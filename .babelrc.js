module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
  env: {
    es: {
      presets: [
        "@babel/preset-react",
        ["@babel/preset-env", { modules: false }],
      ],
    },
    cjs: {
      presets: ["@babel/preset-react", ["@babel/preset-env", {}]],
    },
  },
};
