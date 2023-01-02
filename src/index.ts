import { isAbsolute, join } from 'node:path'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'
import { findWorkspaceDir } from '@pnpm/find-workspace-dir'
import { findUp, findUpSync } from 'find-up'
import { pathExists, pathExistsSync } from 'path-exists'
import { whichPM, whichPMSync } from './whichPM'

export interface WhatPMResult {
	name: string
	version: string
	isWorkspace: boolean
}

const cwd = process.cwd()

async function whatPM(pkgPath: string): Promise<WhatPMResult | null> {
	if (typeof pkgPath !== 'string') {
		throw new TypeError(`pkgPath should be a string, got ${typeof pkgPath}`)
	}
	// covert to absolute path
	if (!isAbsolute(pkgPath)) pkgPath = join(cwd, pkgPath)
	console.info(100, findYarnWorkspaceRoot(pkgPath), await findWorkspaceDir(pkgPath))
	if (await pathExists(join(pkgPath, 'package-lock.json'))) {
		return {
			name: 'npm',
			version: '>=5',
			isWorkspace: false
		}
	}
	if (await pathExists(join(pkgPath, 'yarn.lock'))) {
		return {
			name: 'yarn',
			version: '*',
			isWorkspace: false
		}
	}
	if (await pathExists(join(pkgPath, 'pnpm-lock.yaml'))) {
		return {
			name: 'pnpm',
			version: '>=3',
			isWorkspace: false
		}
	}
	if (await pathExists(join(pkgPath, 'shrinkwrap.yaml'))) {
		return {
			name: 'pnpm',
			version: '1 || 2',
			isWorkspace: false
		}
	}
	if (await findUp('pnpm-lock.yaml', { cwd: pkgPath })) {
		return {
			name: 'pnpm',
			version: '>=3',
			isWorkspace: false
		}
	}
	try {
		if (typeof findYarnWorkspaceRoot(pkgPath) === 'string') {
			return {
				name: 'yarn',
				version: '*',
				isWorkspace: false
			}
		}
	} catch (err) {}
	const pm = await whichPM(pkgPath)
	return (
		pm && {
			name: pm.name,
			version: pm.version || '*',
			isWorkspace: false
		}
	)
}

function whatPMSync(pkgPath: string): WhatPMResult | null {
	if (typeof pkgPath !== 'string') {
		throw new TypeError(`pkgPath should be a string, got ${typeof pkgPath}`)
	}
	// covert to absolute path
	if (!isAbsolute(pkgPath)) pkgPath = join(cwd, pkgPath)
	if (pathExistsSync(join(pkgPath, 'package-lock.json'))) {
		return {
			name: 'npm',
			version: '>=5',
			isWorkspace: false
		}
	}
	if (pathExistsSync(join(pkgPath, 'yarn.lock'))) {
		return {
			name: 'yarn',
			version: '*',
			isWorkspace: false
		}
	}
	if (pathExistsSync(join(pkgPath, 'pnpm-lock.yaml'))) {
		return {
			name: 'pnpm',
			version: '>=3',
			isWorkspace: false
		}
	}
	if (pathExistsSync(join(pkgPath, 'shrinkwrap.yaml'))) {
		return {
			name: 'pnpm',
			version: '1 || 2',
			isWorkspace: false
		}
	}
	if (findUpSync('pnpm-lock.yaml', { cwd: pkgPath })) {
		return {
			name: 'pnpm',
			version: '>=3',
			isWorkspace: false
		}
	}
	try {
		if (typeof findYarnWorkspaceRoot(pkgPath) === 'string') {
			return {
				name: 'yarn',
				version: '*',
				isWorkspace: false
			}
		}
	} catch (err) {}
	const pm = whichPMSync(pkgPath)
	return (
		pm && {
			name: pm.name,
			version: pm.version || '*',
			isWorkspace: false
		}
	)
}

export { whatPMSync, whatPM, whatPM as default }
