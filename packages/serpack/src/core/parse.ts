import { Node } from 'estree-walker';

export function importToRequire(node: Node): Node {
  if (node.type === 'ImportDeclaration') {
    const { specifiers, source } = node;

    // `import 'a';`
    if (specifiers.length === 0) {
      return {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          optional: false,
          callee: {
            type: 'Identifier',
            name: 'require',
          },
          arguments: [source],
        },
      };
    }

    // `import a from 'a';` or `import * as a from 'a';`
    if (specifiers.length === 1) {
      const specifier = specifiers[0];
      const { name } = specifier.local;

      if (
        specifier.type === 'ImportDefaultSpecifier' ||
        specifier.type === 'ImportNamespaceSpecifier'
      ) {
        return {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name,
              },
              init: {
                type: 'CallExpression',
                optional: false,
                callee: {
                  type: 'Identifier',
                  name: 'require',
                },
                arguments: [source],
              },
            },
          ],
        };
      }
    }

    // `import { x, y } from 'a';` or `import a, { x, y } from 'a';`
    if (specifiers.length > 1) {
      const defaultSpecifier = specifiers.find(
        (s) => s.type === 'ImportDefaultSpecifier'
      );
      const namedSpecifiers = specifiers.filter((s) => s.type === 'ImportSpecifier');

      const declarations = [];

      // Handle default import
      if (defaultSpecifier) {
        const { name } = defaultSpecifier.local;
        declarations.push({
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name,
          },
          init: {
            type: 'CallExpression',
            optional: false,
            callee: {
              type: 'Identifier',
              name: 'require',
            },

            arguments: [source],
          },
        });
      }

      // named imports - `import { x, y } from 'a';`
      for (const specifier of namedSpecifiers) {
        const { name } = specifier.local;
        const importedName =
          specifier.imported && specifier.imported.type === 'Identifier'
            ? specifier.imported.name
            : '';

        declarations.push({
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name,
          },
          init: {
            type: 'MemberExpression',
            object: {
              type: 'CallExpression',
              optional: false,
              callee: {
                type: 'Identifier',
                name: 'require',
              },
              arguments: [source],
            },
            property: {
              type: 'Identifier',
              name: importedName,
            },
            computed: false,
          },
        });
      }

      return {
        type: 'VariableDeclaration',
        kind: 'const',
        declarations,
      };
    }
  }

  return node;
}
