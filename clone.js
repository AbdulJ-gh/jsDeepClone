const shallowCloneObject = obj => ({...obj})
const shallowCloneArray = arr => [...arr]


function deepCloneArray(arr){
	const clonedArray = {...arr}

	arr.forEach(index => {
		switch (typeof index) {
			case 'object':
				if (Array.isArray(index)) {
					return deepCloneArray(index)
				} else {
					return deepCloneObject(index)
				}
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
				if (Array.isArray(obj[key])) {
					return deepCloneArray(clonedObject[key])
				} else {
					return deepCloneObject(clonedObject[key])
				}
			default:
				break
		}
	})

	return clonedObject
}
