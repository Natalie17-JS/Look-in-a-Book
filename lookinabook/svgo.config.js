
module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Сохраняем viewBox (иначе может сломаться адаптивность)
          removeViewBox: false,
        },
      },
    },
  ],
};
