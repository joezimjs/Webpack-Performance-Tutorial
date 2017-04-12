export default function (componentName) {
	return function (resolve) {
		import(`../components/${componentName}.vue`).then(resolve)
	}
}