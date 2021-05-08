export const shallowCloneObject = obj => ({...obj})
export const shallowCloneArray = arr => [...arr]
const primitiveTypes = ['number', 'bigint', 'string', 'symbol', 'boolean', 'undefined']

export function deepClonePrimitive(value) {
	switch (typeof value) {
		case 'number':
			return Number(value)
		case 'bigint':
			return BigInt(value)
		case 'string':
			return String(value)
		case 'symbol':
			return Symbol(value)
		case 'boolean':
			return Boolean(value)
		case 'undefined':
			return undefined
		default:
			throw Error(`${value} of type ${typeof value} is not a primitive`)
	}
}


export function deepCloneArray(arr){
	const clonedArray = []

	arr.forEach((item, index) => {
		if (item === null) {
			return clonedArray[index] =  null
		}

		const type = typeof item

		if (primitiveTypes.includes(type)) {
			return clonedArray[index] = deepClonePrimitive(item)
		}

		if (type === 'function') {
			return clonedArray[index] = item
		}

		if (type === 'object') {
			return clonedArray[index] = Array.isArray(item) ? deepCloneArray(item) : deepCloneObject(item)
		}

		throw Error(`Exception, could not deep clone array item of type '${type}'' at index position '${index}''`)
	})
	return clonedArray
}

export function deepCloneObject(obj){
	const clonedObject = {}
	const keys = Object.keys(obj)

	keys.forEach(key => {
		if (obj[key] === null) {
			return clonedObject[key] = null
		}

		const type = typeof obj[key]

		if (primitiveTypes.includes(type)) {
			return clonedObject[key] = deepClonePrimitive(obj[key])
		}

		if (type === 'function') {
			return clonedObject[key] = obj[key]
		}

		if (type === 'object') {
			return clonedObject[key] = Array.isArray(obj[key]) ? deepCloneArray(obj[key]) : deepCloneObject(obj[key])
		}

		throw Error(`Exception, could not deep clone object property '${obj[key]}' of type '${type}'`)
	})
	return clonedObject
}
