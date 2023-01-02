import { join } from 'node:path'
import { pathExists, pathExistsSync } from 'path-exists'
import { loadYamlFile, loadYamlFileSync } from 'load-yaml-file'

export interface NameAndVersion {
	name: string
	version?: string
}

async function whichPM(pkgPath: string): Promise<NameAndVersion | null> {
	const modulesPath = join(pkgPath, 'node_modules')
	const exists = await pathExists(join(modulesPath, '.yarn-integrity'))
	if (exists) return { name: 'yarn' }

	try {
		const modules: any = await loadYamlFile(join(modulesPath, '.modules.yaml'))
		return toNameAndVersion(modules.packageManager)
	} catch (err: any) {
		if (err.code !== 'ENOENT') throw err
	}

	const modulesExists = await pathExists(modulesPath)
	return modulesExists ? { name: 'npm' } : null
}

function whichPMSync(pkgPath: string): NameAndVersion | null {
	const modulesPath = join(pkgPath, 'node_modules')
	const exists = pathExistsSync(join(modulesPath, '.yarn-integrity'))
	if (exists) return { name: 'yarn' }

	try {
		const modules: any = loadYamlFileSync(join(modulesPath, '.modules.yaml'))
		return toNameAndVersion(modules.packageManager)
	} catch (err: any) {
		if (err.code !== 'ENOENT') throw err
	}

	const modulesExists = pathExistsSync(modulesPath)
	return modulesExists ? { name: 'npm' } : null
}

function toNameAndVersion(pkgSpec: string): NameAndVersion {
	if (pkgSpec[0] === '@') {
		const woPrefix = pkgSpec.substr(1)
		const parts = woPrefix.split('@')
		return {
			name: `@${parts[0]}`,
			version: parts[1]
		}
	}
	const parts = pkgSpec.split('@')
	return {
		name: parts[0],
		version: parts[1]
	}
}

export { whichPMSync, whichPM, whichPM as default }
