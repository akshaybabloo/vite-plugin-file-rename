import { Plugin, ResolvedConfig } from "vite"

interface FileMap {
	[key: string]: string
}

interface Config {
	// Delete the files after renaming.
	// @default false
	keepOriginal?: boolean

	// The file map
	// @default {}
	fileMap: FileMap

	// Use regex to match the file name
	// @default false
	useRegex?: boolean
}

const defaultConfig: Config = {
	fileMap: {},
	keepOriginal: false,
	useRegex: false,
}

export function fileRename({ keepOriginal = false, fileMap = {}, useRegex = false }: Config = defaultConfig): Plugin {
	let config: ResolvedConfig
	return {
		name: "vite:filerename",
		enforce: "post",
		configResolved(resolvedConfig) {
			config = resolvedConfig
		},
		generateBundle(_, bundle) {
			for (const [name, asset] of Object.entries(bundle)) {
				for (const [key, value] of Object.entries(fileMap)) {
					let shouldRename = false
					if (useRegex) {
						const pattern = new RegExp(key)
						shouldRename = pattern.test(name)
					} else {
						shouldRename = name.includes(key)
					}

					if (shouldRename) {
						const newName = useRegex ? name.replace(new RegExp(key), value) : name.replace(key, value)
						config.logger.info(`Renaming ${name} to ${newName}`)
						bundle[newName] = {
							...asset,
							fileName: newName,
						}
						if (!keepOriginal) {
							delete bundle[name]
						}
					}
				}
			}
		},
	}
}
