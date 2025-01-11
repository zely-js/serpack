import { Node } from 'estree-walker';
// import { generate } from 'escodegen';
import { importToRequire } from '../src/core/parse';

describe('importToRequire', () => {
  it('should convert default import to require', () => {
    const node: Node = {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          local: { type: 'Identifier', name: 'a' },
        },
      ],
      source: { type: 'Literal', value: 'a' },
    };

    const result = importToRequire(node);

    expect(result).toEqual({
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'a' },
          init: {
            type: 'CallExpression',
            optional: false,
            callee: { type: 'Identifier', name: 'require' },
            arguments: [{ type: 'Literal', value: 'a' }],
          },
        },
      ],
    });
  });

  it('should convert namespace import to require', () => {
    const node: Node = {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportNamespaceSpecifier',
          local: { type: 'Identifier', name: 'ns' },
        },
      ],
      source: { type: 'Literal', value: 'a' },
    };

    const result = importToRequire(node);

    expect(result).toEqual({
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'ns' },
          init: {
            type: 'CallExpression',
            optional: false,
            callee: { type: 'Identifier', name: 'require' },
            arguments: [{ type: 'Literal', value: 'a' }],
          },
        },
      ],
    });
  });

  it('should convert named imports to require with property access', () => {
    const node: Node = {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportSpecifier',
          local: { type: 'Identifier', name: 'x' },
          imported: { type: 'Identifier', name: 'x' },
        },
        {
          type: 'ImportSpecifier',
          local: { type: 'Identifier', name: 'y' },
          imported: { type: 'Identifier', name: 'y' },
        },
      ],
      source: { type: 'Literal', value: 'a' },
    };

    const result = importToRequire(node);

    expect(result).toEqual({
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'x' },
          init: {
            type: 'MemberExpression',
            object: {
              type: 'CallExpression',
              optional: false,
              callee: { type: 'Identifier', name: 'require' },
              arguments: [{ type: 'Literal', value: 'a' }],
            },
            property: { type: 'Identifier', name: 'x' },
            computed: false,
          },
        },
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'y' },
          init: {
            type: 'MemberExpression',
            object: {
              type: 'CallExpression',
              optional: false,
              callee: { type: 'Identifier', name: 'require' },
              arguments: [{ type: 'Literal', value: 'a' }],
            },
            property: { type: 'Identifier', name: 'y' },
            computed: false,
          },
        },
      ],
    });
  });

  it('should convert side-effect import to require call', () => {
    const node: Node = {
      type: 'ImportDeclaration',
      specifiers: [],
      source: { type: 'Literal', value: 'a' },
    };

    const result = importToRequire(node);

    expect(result).toEqual({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        optional: false,
        callee: { type: 'Identifier', name: 'require' },
        arguments: [{ type: 'Literal', value: 'a' }],
      },
    });
  });

  it('should return unsupported cases', () => {
    const node: any = { type: 'hellohello' };

    const result = importToRequire(node);

    expect(result).toEqual(node);
  });

  it('should transform default and named imports together', () => {
    const node: Node = {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          local: { type: 'Identifier', name: 'a' },
        },
        {
          type: 'ImportSpecifier',
          local: { type: 'Identifier', name: 'b' },
          imported: { type: 'Identifier', name: 'b' },
        },
      ],
      source: { type: 'Literal', value: 'module' },
    };

    // console.log(generate(node));

    const result = importToRequire(node);

    // console.log(generate(result));

    expect(result).toEqual({
      type: 'VariableDeclaration',
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'a' },
          init: {
            type: 'CallExpression',
            optional: false,
            callee: { type: 'Identifier', name: 'require' },
            arguments: [{ type: 'Literal', value: 'module' }],
          },
        },
        {
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: 'b' },
          init: {
            type: 'MemberExpression',
            object: {
              type: 'CallExpression',
              optional: false,
              callee: { type: 'Identifier', name: 'require' },
              arguments: [{ type: 'Literal', value: 'module' }],
            },
            property: { type: 'Identifier', name: 'b' },
            computed: false,
          },
        },
      ],
    });
  });
});
