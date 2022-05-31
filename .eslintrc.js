module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    // es6: true,
    browser: true
  },
  globals: {
    Markdown: true
  },
  extends: [
		'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'eslint:recommended'
	],
  rules: {
    // 'prettier/prettier': 'error',
    'no-console': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/ban-types':'off',
		'linebreak-style': 'off',
		'no-empty': 'off',
  }
}

// module.exports ={

//     // 默认情况下，ESLint将在所有父文件夹中寻找配置文件，直到根目录为止  要将ESLint限制为特定项目，请放置"root": true
//     root: true,
//     env: {
//         // 启用浏览器和Node.js环境
//         "browser": true,
//         "node": true
//     },
//     // 要使用JavaScript文件中的注释指定全局变量，请使用以下格式：
//     /* global var1:writable, var2:writable */
//     // "writable"以允许变量被覆盖或"readonly"不允许覆盖
//     globals: {
//         "var1": "writable",
//         "var2": "readonly"
//     },
//     // 注意：启用no-global-assign规则以禁止修改代码中的只读全局变量。
//     // 要临时禁用文件中的规则警告，请使用以下格式的块注释：
//     /* eslint-disable */
//     // alert('foo');
//     /* eslint-enable */

//     rules: {
//         "no-console": 1
//     }

// }
