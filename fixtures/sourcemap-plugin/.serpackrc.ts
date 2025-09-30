export default <import('serpack').Options>{
  compilerOptions: {
    type: process.argv.includes('--script') ? 'script' : 'module',
    plugins: [
      {
        name: 'test',
        onCompile(context) {
          context.s.prepend('"a";');
        },
      },
    ],
  },
};
