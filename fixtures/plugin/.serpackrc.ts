export default <import('serpack').Options>{
  compilerOptions: {
    type: process.argv.includes('--script') ? 'script' : 'module',
    plugins: [
      {
        name: 'test',
        onSetup(compilerOptions) {
          console.log('On Setup - ', JSON.stringify(compilerOptions));
          compilerOptions.banner = '/*onSetup*/console.log("\\n----------\\n");';
        },
        onLoad(context) {
          console.log('On Load - ', context.filename.resolved);
        },
        onCompile(context) {
          console.log('On Compile - ', context.filename.resolved);
          console.log(`Compiled: "${context.s.toString()}"`);
          console.log(
            context.s.prepend(
              `console.log("inserted - ${context.filename.original.replace(
                /\\/g,
                '\\\\'
              )}");`
            )
          );
          console.log(`Compiled: "${context.s.toString()}"`);
        },
      },
    ],
  },
};
