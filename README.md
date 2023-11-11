# Vite File Rename Plugin

Post-build plugin for Vite to rename files.

## Install

```bash
npm i -D vite-plugin-file-rename
```

## Usage

```js
// vite.config.mts
import { defineConfig } from 'vite'
import { fileRename } from 'vite-plugin-file-rename'

export default defineConfig({
  plugins: [
    fileRename({
      fileMap: {
        'index.html': 'index.php',
        'index.css': 'index.min.css',
        'index.js': 'index.min.js',
        '.json': '.jsonp',
      },
    }),
  ],
})
```

## Options

### `fileMap`

Type: `Record<string, string>`
Default: `{}`
Required: `true`

A map of files to rename. The key is the original file name, and the value is the new file name.

### `keepOriginal`

Type: `boolean`
Default: `false`
Required: `false`

Whether to keep the original file. If `true`, the original file will be kept and a new file will be created with the new name. If `false`, the original file will be deleted and a new file will be created with the new name.

### `useRegex`

Type: `boolean`
Default: `false`
Required: `false`

Whether to use regex to match the file name. If `true`, the key in `fileMap` will be treated as a regex string. If `false`, the key in `fileMap` will be treated as a normal string.
