export default <import('serpack').Options>{
  compilerOptions: {
    banner: 'const __log=(...args)=>console.log("message: " + args.join(\'\'));',
    modifier: {
      caller(node) {
        const wrapCallExpression = {
          type: 'CallExpression',
          callee: { type: 'Identifier', name: '__log' },
          arguments: [node],
        };

        return wrapCallExpression as any;
      },
    },
  },
};
