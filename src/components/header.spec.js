import Vue from 'vue'
import { CssModuleTestHelperMixin } from '../utils/test-helper.js'
import { mount } from 'avoriaz'
import Header from './header.vue'

// shims $style so that jest-preprocessor doesn't need to compile styles
Vue.use(CssModuleTestHelperMixin)

test('test header', () => {
	let vm = mount(Header)
})