import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly',
      },
    },
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'],
        },
      ],
      'vue/no-setup-props-destructure': 'off',
      'no-undef': 'error',
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  prettier,
])
