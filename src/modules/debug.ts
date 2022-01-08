import Log from './log'

const Debug = (obj: Function | Object, name: string = 'none') => {
	if (typeof obj === 'function') {
		const timeStart = new Date()
		const returnFromObj = obj()
		const timeEnd = new Date()
		Log(name + ' ' + returnFromObj + ' ' + (timeEnd.getTime() - timeStart.getTime()) + 'ms', 'd')
		return
	}

	Log(name + ' ' + obj.constructor.name + ' ' + (obj === null || obj === undefined), 'd')
}

export default Debug
