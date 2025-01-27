console.log(process.argv.includes('--script') ? 'script' : 'module');

export default <import('serpack').Options>{
  compilerOptions: {
    type: process.argv.includes('--script') ? 'script' : 'module',
  },
};
