#!/usr/bin/env ts-node

import { createRequire } from 'node:module'
// import { spawnSync } from 'node:child_process'
// import { join } from 'node:path'
import { program } from 'commander'
import chalk from 'chalk'
import getGitRevParse from '@gitmars/core/lib/git/getGitRevParse'
// import { version } from '../package.json' assert { type: 'json' }
import { whatPM } from '.'

const require = createRequire(import.meta.url)
const { yellow } = chalk
const { version } = require('../package.json')

export interface WhatPMOption {
	update?: boolean
}

program.version(
	'\n' +
		'+-+-+-+-+-+-+-+\n' +
		'|w|h|a|t|-|p|m|\n' +
		'+-+-+-+-+-+-+-+\n' +
		'\n' +
		`v${version}, powered by saqqdy\n`,
	'-v, --version',
	'View what-pm version number'
)

program
	.name('what-pm')
	.usage('[path] [options]')
	.description('Check for outdated, incorrect, and unused dependencies.')
	.argument(
		'[path]',
		'Where to check. Defaults to current directory. Use -g for checking global modules.'
	)
	// .option('-g, --global', 'Look at global modules.')
	// .option('--debug', 'Debug output. Throw in a gist when creating issues on github.')
	.action(async (path?: string, options?: WhatPMOption) => {
		const { root } = getGitRevParse()
		if (!path) path = root

		const pm = await whatPM(path)
		console.log(pm)
	})

// 自定义帮助
program.on('--help', function () {
	console.info('\nExamples')
	console.info('  what-pm', "# See what can be updated, what isn't being used.")
	console.info('  what-pm ../foo', '# Check another path.')
	console.info(
		'  what-pm -gu',
		'# Update globally installed modules by picking which ones to upgrade.'
	)
})

// 映射不存在的指令
program.on('command:*', function (types: string[], opts: string[]) {
	const cmd = ['check', 'ck']
	if (!cmd.includes(types[0])) {
		console.info(yellow(`what-pm does not provide the command "what-pm ${types[0]}"`))
	}
})

program.parse(process.argv)
