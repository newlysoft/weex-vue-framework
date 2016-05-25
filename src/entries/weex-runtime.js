/* @flow */

import Vue from 'core/index'
import { createPatchFunction } from 'core/vdom/patch'
import * as nodeOps from 'weex/runtime/node-ops'
import platformDirectives from 'weex/runtime/directives/index'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'weex/runtime/modules/index'
import { query, isUnknownElement, isReservedTag } from 'weex/util'

// install platform specific utils
Vue.config.isUnknownElement = isUnknownElement
Vue.config.isReservedTag = isReservedTag

// install platform runtime directives
Vue.options.directives = platformDirectives

// install platform patch function
const modules = baseModules.concat(platformModules)
const patch = createPatchFunction({ nodeOps, modules })
Vue.prototype.__patch__ = config._isServer ? noop : patch.patch
Vue.prototype.__stream_patch__ = config._isServer ? noop : patch.streamPatch
Vue.prototype.__tree_patch__ = config._isServer ? noop : patch.treePatch

// wrap mount
Vue.prototype.$mount = function (el) {
  this.$el = el && query(el, this.$instanceId)
  this._mount()
}

export default Vue