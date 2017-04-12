export const CssModuleTestHelperMixin = {
	install (Vue, options) {
		Vue.mixin({
			created () {
				this.$style = {}
			}
		})
	}
}