import what-pm from '../index'

test('defines init() & create()', () => {
	expect(typeof what-pm.init).toBe('function')
	expect(typeof what-pm.create).toBe('function')
})
