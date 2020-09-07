const shallowCloneObject = obj => ({...obj})
const shallowCloneArray = arr => [...arr]


function deepCloneArray(arr){
	const clonedArray = {...arr}

	arr.forEach(index => {
		switch (typeof index) {
			case 'object':
				return Array.isArray(index) ? deepCloneArray(index) : deepCloneObject(index)
			default:
				break
		}
	})

	return clonedArray
}

function deepCloneObject(obj){
	const clonedObject = {...obj}
	const keys = Object.keys(obj)

	keys.forEach(key => {
		switch (typeof obj[key]) {
			case 'object':
				return Array.isArray(obj[key]) ? deepCloneArray(clonedObject[key]) : deepCloneObject(clonedObject[key])
			default:
				break
		}
	})

	return clonedObject
}
