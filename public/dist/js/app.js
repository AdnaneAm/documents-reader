/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app.config */ \"./src/app.config.json\");\nvar _app_config__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! @/app.config */ \"./src/app.config.json\", 1);\n\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"app\",\n  page: {\n    // All subcomponent titles will be injected into this template.\n    titleTemplate: function titleTemplate(title) {\n      title = typeof title === \"function\" ? title(this.$store) : title;\n      return title ? \"\".concat(title, \" | \").concat(_app_config__WEBPACK_IMPORTED_MODULE_1__.title) : _app_config__WEBPACK_IMPORTED_MODULE_1__.title;\n    }\n  },\n  created: function created() {\n    this.$store.dispatch('auth/setLoggedInUser');\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"56c8f83a-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"56c8f83a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"app\" } }, [_c(\"router-view\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2256c8f83a-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/assets/scss/app.scss":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!./node_modules/postcss-loader/src??ref--8-oneOf-3-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-3-3!./src/assets/scss/app.scss ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_56c8f83a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"56c8f83a-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"56c8f83a-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_56c8f83a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_56c8f83a_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/app.config.json":
/*!*****************************!*\
  !*** ./src/app.config.json ***!
  \*****************************/
/*! exports provided: title, description, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"title\\\":\\\"Documents readers | Scan your documents in the easiest way possible\\\",\\\"description\\\":\\\"Documents reader is a platform where you can upload documents and extract their contents in a snap! Developped by KARIM LAARICH\\\"}\");\n\n//# sourceURL=webpack:///./src/app.config.json?");

/***/ }),

/***/ "./src/assets/fonts/dripicons-v2.eot":
/*!*******************************************!*\
  !*** ./src/assets/fonts/dripicons-v2.eot ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/dripicons-v2.7e12564e.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/dripicons-v2.eot?");

/***/ }),

/***/ "./src/assets/fonts/dripicons-v2.svg":
/*!*******************************************!*\
  !*** ./src/assets/fonts/dripicons-v2.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/dripicons-v2.83598443.svg\";\n\n//# sourceURL=webpack:///./src/assets/fonts/dripicons-v2.svg?");

/***/ }),

/***/ "./src/assets/fonts/dripicons-v2.ttf":
/*!*******************************************!*\
  !*** ./src/assets/fonts/dripicons-v2.ttf ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/dripicons-v2.cf09c981.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/dripicons-v2.ttf?");

/***/ }),

/***/ "./src/assets/fonts/dripicons-v2.woff":
/*!********************************************!*\
  !*** ./src/assets/fonts/dripicons-v2.woff ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/dripicons-v2.11fc83ae.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/dripicons-v2.woff?");

/***/ }),

/***/ "./src/assets/fonts/fa-brands-400.eot":
/*!********************************************!*\
  !*** ./src/assets/fonts/fa-brands-400.eot ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-brands-400.c1868c95.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-brands-400.eot?");

/***/ }),

/***/ "./src/assets/fonts/fa-brands-400.svg":
/*!********************************************!*\
  !*** ./src/assets/fonts/fa-brands-400.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/fa-brands-400.0cb5a5c0.svg\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-brands-400.svg?");

/***/ }),

/***/ "./src/assets/fonts/fa-brands-400.ttf":
/*!********************************************!*\
  !*** ./src/assets/fonts/fa-brands-400.ttf ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-brands-400.13685372.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-brands-400.ttf?");

/***/ }),

/***/ "./src/assets/fonts/fa-brands-400.woff":
/*!*********************************************!*\
  !*** ./src/assets/fonts/fa-brands-400.woff ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-brands-400.ec3cfdde.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-brands-400.woff?");

/***/ }),

/***/ "./src/assets/fonts/fa-brands-400.woff2":
/*!**********************************************!*\
  !*** ./src/assets/fonts/fa-brands-400.woff2 ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-brands-400.a06da7f0.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-brands-400.woff2?");

/***/ }),

/***/ "./src/assets/fonts/fa-regular-400.eot":
/*!*********************************************!*\
  !*** ./src/assets/fonts/fa-regular-400.eot ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-regular-400.261d666b.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-regular-400.eot?");

/***/ }),

/***/ "./src/assets/fonts/fa-regular-400.svg":
/*!*********************************************!*\
  !*** ./src/assets/fonts/fa-regular-400.svg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/fa-regular-400.89ffa3ab.svg\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-regular-400.svg?");

/***/ }),

/***/ "./src/assets/fonts/fa-regular-400.ttf":
/*!*********************************************!*\
  !*** ./src/assets/fonts/fa-regular-400.ttf ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-regular-400.db78b935.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-regular-400.ttf?");

/***/ }),

/***/ "./src/assets/fonts/fa-regular-400.woff":
/*!**********************************************!*\
  !*** ./src/assets/fonts/fa-regular-400.woff ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-regular-400.f89ea91e.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-regular-400.woff?");

/***/ }),

/***/ "./src/assets/fonts/fa-regular-400.woff2":
/*!***********************************************!*\
  !*** ./src/assets/fonts/fa-regular-400.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-regular-400.c20b5b73.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-regular-400.woff2?");

/***/ }),

/***/ "./src/assets/fonts/fa-solid-900.eot":
/*!*******************************************!*\
  !*** ./src/assets/fonts/fa-solid-900.eot ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-solid-900.a0369ea5.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-solid-900.eot?");

/***/ }),

/***/ "./src/assets/fonts/fa-solid-900.svg":
/*!*******************************************!*\
  !*** ./src/assets/fonts/fa-solid-900.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/fa-solid-900.ec763292.svg\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-solid-900.svg?");

/***/ }),

/***/ "./src/assets/fonts/fa-solid-900.ttf":
/*!*******************************************!*\
  !*** ./src/assets/fonts/fa-solid-900.ttf ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-solid-900.1ab236ed.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-solid-900.ttf?");

/***/ }),

/***/ "./src/assets/fonts/fa-solid-900.woff":
/*!********************************************!*\
  !*** ./src/assets/fonts/fa-solid-900.woff ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-solid-900.bea989e8.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-solid-900.woff?");

/***/ }),

/***/ "./src/assets/fonts/fa-solid-900.woff2":
/*!*********************************************!*\
  !*** ./src/assets/fonts/fa-solid-900.woff2 ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/fa-solid-900.b15db15f.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/fa-solid-900.woff2?");

/***/ }),

/***/ "./src/assets/fonts/inter-bold.woff2?v=3.13":
/*!**************************************************!*\
  !*** ./src/assets/fonts/inter-bold.woff2?v=3.13 ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-bold.aed27700.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-bold.woff2?");

/***/ }),

/***/ "./src/assets/fonts/inter-light.woff2?v=3.13":
/*!***************************************************!*\
  !*** ./src/assets/fonts/inter-light.woff2?v=3.13 ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-light.5baca21a.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-light.woff2?");

/***/ }),

/***/ "./src/assets/fonts/inter-light.woff?v=3.13":
/*!**************************************************!*\
  !*** ./src/assets/fonts/inter-light.woff?v=3.13 ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-light.b9920de0.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-light.woff?");

/***/ }),

/***/ "./src/assets/fonts/inter-medium.woff2?v=3.13":
/*!****************************************************!*\
  !*** ./src/assets/fonts/inter-medium.woff2?v=3.13 ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-medium.f6cf0a0b.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-medium.woff2?");

/***/ }),

/***/ "./src/assets/fonts/inter-medium.woff?v=3.13":
/*!***************************************************!*\
  !*** ./src/assets/fonts/inter-medium.woff?v=3.13 ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-medium.7a8cc724.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-medium.woff?");

/***/ }),

/***/ "./src/assets/fonts/inter-regular.woff2?v=3.13":
/*!*****************************************************!*\
  !*** ./src/assets/fonts/inter-regular.woff2?v=3.13 ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-regular.4dd66a11.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-regular.woff2?");

/***/ }),

/***/ "./src/assets/fonts/inter-regular.woff?v=3.13":
/*!****************************************************!*\
  !*** ./src/assets/fonts/inter-regular.woff?v=3.13 ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/inter-regular.7c539936.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/inter-regular.woff?");

/***/ }),

/***/ "./src/assets/fonts/materialdesignicons-webfont.eot":
/*!**********************************************************!*\
  !*** ./src/assets/fonts/materialdesignicons-webfont.eot ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/materialdesignicons-webfont.a1a0ed86.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/materialdesignicons-webfont.eot?");

/***/ }),

/***/ "./src/assets/fonts/materialdesignicons-webfont.eot?v=5.0.45":
/*!*******************************************************************!*\
  !*** ./src/assets/fonts/materialdesignicons-webfont.eot?v=5.0.45 ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/materialdesignicons-webfont.a1a0ed86.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/materialdesignicons-webfont.eot?");

/***/ }),

/***/ "./src/assets/fonts/materialdesignicons-webfont.ttf?v=5.0.45":
/*!*******************************************************************!*\
  !*** ./src/assets/fonts/materialdesignicons-webfont.ttf?v=5.0.45 ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/materialdesignicons-webfont.fe1545ef.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/materialdesignicons-webfont.ttf?");

/***/ }),

/***/ "./src/assets/fonts/materialdesignicons-webfont.woff2?v=5.0.45":
/*!*********************************************************************!*\
  !*** ./src/assets/fonts/materialdesignicons-webfont.woff2?v=5.0.45 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/materialdesignicons-webfont.7fb0e378.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/materialdesignicons-webfont.woff2?");

/***/ }),

/***/ "./src/assets/fonts/materialdesignicons-webfont.woff?v=5.0.45":
/*!********************************************************************!*\
  !*** ./src/assets/fonts/materialdesignicons-webfont.woff?v=5.0.45 ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/materialdesignicons-webfont.63d2a595.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/materialdesignicons-webfont.woff?");

/***/ }),

/***/ "./src/assets/fonts/remixicon.eot?t=1587359857360":
/*!********************************************************!*\
  !*** ./src/assets/fonts/remixicon.eot?t=1587359857360 ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/remixicon.dc0fb3e9.eot\";\n\n//# sourceURL=webpack:///./src/assets/fonts/remixicon.eot?");

/***/ }),

/***/ "./src/assets/fonts/remixicon.svg?t=1587359857360":
/*!********************************************************!*\
  !*** ./src/assets/fonts/remixicon.svg?t=1587359857360 ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/remixicon.f3686cbd.svg\";\n\n//# sourceURL=webpack:///./src/assets/fonts/remixicon.svg?");

/***/ }),

/***/ "./src/assets/fonts/remixicon.ttf?t=1587359857360":
/*!********************************************************!*\
  !*** ./src/assets/fonts/remixicon.ttf?t=1587359857360 ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/remixicon.37364e27.ttf\";\n\n//# sourceURL=webpack:///./src/assets/fonts/remixicon.ttf?");

/***/ }),

/***/ "./src/assets/fonts/remixicon.woff2?t=1587359857360":
/*!**********************************************************!*\
  !*** ./src/assets/fonts/remixicon.woff2?t=1587359857360 ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/remixicon.5ab3a2a4.woff2\";\n\n//# sourceURL=webpack:///./src/assets/fonts/remixicon.woff2?");

/***/ }),

/***/ "./src/assets/fonts/remixicon.woff?t=1587359857360":
/*!*********************************************************!*\
  !*** ./src/assets/fonts/remixicon.woff?t=1587359857360 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"fonts/remixicon.7eafaf2d.woff\";\n\n//# sourceURL=webpack:///./src/assets/fonts/remixicon.woff?");

/***/ }),

/***/ "./src/assets/images/authentication-bg.jpg":
/*!*************************************************!*\
  !*** ./src/assets/images/authentication-bg.jpg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"img/authentication-bg.d3694463.jpg\";\n\n//# sourceURL=webpack:///./src/assets/images/authentication-bg.jpg?");

/***/ }),

/***/ "./src/assets/scss/app.scss":
/*!**********************************!*\
  !*** ./src/assets/scss/app.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-3-1!../../../node_modules/postcss-loader/src??ref--8-oneOf-3-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-3-3!./app.scss */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/assets/scss/app.scss\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"6b030aed\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/assets/scss/app.scss?");

/***/ }),

/***/ "./src/i18n.js":
/*!*********************!*\
  !*** ./src/i18n.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.match.js */ \"./node_modules/core-js/modules/es.string.match.js\");\n/* harmony import */ var core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-i18n */ \"./node_modules/vue-i18n/dist/vue-i18n.esm.js\");\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n\nfunction loadLocaleMessages() {\n  var locales = __webpack_require__(\"./src/locales sync recursive [A-Za-z0-9-_,\\\\s]+\\\\.json$/\");\n\n  var messages = {};\n  locales.keys().forEach(function (key) {\n    var matched = key.match(/([A-Za-z0-9-_]+)\\./i);\n\n    if (matched && matched.length > 1) {\n      var locale = matched[1];\n      messages[locale] = locales(key);\n    }\n  });\n  return messages;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vue_i18n__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  locale: \"fr\" || false,\n  fallbackLocale: \"en\" || false,\n  messages: loadLocaleMessages()\n}));\n\n//# sourceURL=webpack:///./src/i18n.js?");

/***/ }),

/***/ "./src/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/":
/*!****************************************************!*\
  !*** ./src/locales sync [A-Za-z0-9-_,\s]+\.json$/ ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./en.json\": \"./src/locales/en.json\",\n\t\"./fr.json\": \"./src/locales/fr.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/locales sync recursive [A-Za-z0-9-_,\\\\s]+\\\\.json$/\";\n\n//# sourceURL=webpack:///./src/locales_sync_%5BA-Za-z0-9-_,\\s%5D+\\.json$/?");

/***/ }),

/***/ "./src/locales/en.json":
/*!*****************************!*\
  !*** ./src/locales/en.json ***!
  \*****************************/
/*! exports provided: navbar, menuitems, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"navbar\\\":{\\\"search\\\":{\\\"text\\\":\\\"Search...\\\"},\\\"dropdown\\\":{\\\"megamenu\\\":{\\\"text\\\":\\\"Mega Menu\\\",\\\"uicontent\\\":{\\\"title\\\":\\\"UI Components\\\",\\\"list\\\":{\\\"lightbox\\\":\\\"Lightbox\\\",\\\"rangeslider\\\":\\\"Range Slider\\\",\\\"sweetalert\\\":\\\"Sweet Alert\\\",\\\"rating\\\":\\\"Rating\\\",\\\"forms\\\":\\\"Forms\\\",\\\"tables\\\":\\\"Tables\\\",\\\"charts\\\":\\\"Charts\\\"}},\\\"application\\\":{\\\"title\\\":\\\"Applications\\\",\\\"list\\\":{\\\"ecommerce\\\":\\\"Ecommece\\\",\\\"calendar\\\":\\\"Calendar\\\",\\\"email\\\":\\\"Email\\\",\\\"projects\\\":\\\"Projects\\\",\\\"tasks\\\":\\\"Tasks\\\",\\\"contacts\\\":\\\"Contacts\\\"}},\\\"extrapages\\\":{\\\"title\\\":\\\"Extra Pages\\\",\\\"list\\\":{\\\"lightsidebar\\\":\\\"Light Sidebar\\\",\\\"compactsidebar\\\":\\\"Compact Sidebar\\\",\\\"horizontallayout\\\":\\\"Horizontal Layout\\\",\\\"maintenance\\\":\\\"Maintenance\\\",\\\"comingsoon\\\":\\\"Coming Soon\\\",\\\"timeline\\\":\\\"Timeline\\\",\\\"faqs\\\":\\\"FAQs\\\"}}},\\\"site\\\":{\\\"list\\\":{\\\"github\\\":\\\"GitHub\\\",\\\"bitbucket\\\":\\\"Bitbucket\\\",\\\"dribbble\\\":\\\"Dribbble\\\",\\\"dropbox\\\":\\\"Dropbox\\\",\\\"mailchimp\\\":\\\"Mail Chimp\\\",\\\"slack\\\":\\\"Slack\\\"}},\\\"notification\\\":{\\\"text\\\":\\\"Notifications\\\",\\\"subtext\\\":\\\"View All\\\",\\\"order\\\":{\\\"title\\\":\\\"Your order is placed\\\",\\\"text\\\":\\\"If several languages coalesce the grammar\\\",\\\"time\\\":\\\"3 min ago\\\"},\\\"james\\\":{\\\"title\\\":\\\"James Lemire\\\",\\\"text\\\":\\\"It will seem like simplified English.\\\",\\\"time\\\":\\\"1 hours ago\\\"},\\\"item\\\":{\\\"title\\\":\\\"Your item is shipped\\\",\\\"text\\\":\\\"If several languages coalesce the grammar\\\",\\\"time\\\":\\\"3 min ago\\\"},\\\"salena\\\":{\\\"title\\\":\\\"Salena Layfield\\\",\\\"text\\\":\\\"As a skeptical Cambridge friend of mine occidental.\\\",\\\"time\\\":\\\"1 hours ago\\\"},\\\"button\\\":\\\"Load More..\\\"},\\\"kevin\\\":{\\\"text\\\":\\\"Kevin\\\",\\\"list\\\":{\\\"profile\\\":\\\"Profile\\\",\\\"mywallet\\\":\\\"My Wallet\\\",\\\"settings\\\":\\\"Settings\\\",\\\"lockscreen\\\":\\\"Lock screen\\\",\\\"logout\\\":\\\"Logout\\\"}}}},\\\"menuitems\\\":{\\\"menu\\\":{\\\"text\\\":\\\"Menu\\\"},\\\"dashboard\\\":{\\\"text\\\":\\\"Dashboard\\\",\\\"badge\\\":\\\"3\\\"},\\\"layouts\\\":{\\\"text\\\":\\\"Layouts\\\",\\\"list\\\":{\\\"horizontal\\\":\\\"Horizontal\\\",\\\"lightsidebar\\\":\\\"Light Sidebar\\\",\\\"compactsidebar\\\":\\\"Compact Sidebar\\\",\\\"iconsidebar\\\":\\\"Icons Sidebar\\\",\\\"boxed\\\":\\\"Boxed Layout\\\",\\\"vertical\\\":\\\"Vertical\\\",\\\"lighttopbar\\\":\\\"Light Topbar\\\"}},\\\"apps\\\":{\\\"text\\\":\\\"Apps\\\"},\\\"calendar\\\":{\\\"text\\\":\\\"Calendar\\\"},\\\"chat\\\":{\\\"text\\\":\\\"Chat\\\",\\\"badge\\\":\\\"New\\\"},\\\"ecommerce\\\":{\\\"text\\\":\\\"Ecommerce\\\",\\\"list\\\":{\\\"products\\\":\\\"Products\\\",\\\"productdetail\\\":\\\"Product Detail\\\",\\\"orders\\\":\\\"Orders\\\",\\\"customers\\\":\\\"Customers\\\",\\\"cart\\\":\\\"Cart\\\",\\\"checkout\\\":\\\"Checkout\\\",\\\"shops\\\":\\\"Shops\\\",\\\"addproduct\\\":\\\"Add Product\\\"}},\\\"email\\\":{\\\"text\\\":\\\"Email\\\",\\\"list\\\":{\\\"inbox\\\":\\\"Inbox\\\",\\\"reademail\\\":\\\"Read Email\\\"}},\\\"kanban\\\":{\\\"text\\\":\\\"Kanban Board\\\"},\\\"pages\\\":{\\\"text\\\":\\\"Pages\\\"},\\\"authentication\\\":{\\\"text\\\":\\\"Authentication\\\",\\\"list\\\":{\\\"login\\\":\\\"Login\\\",\\\"register\\\":\\\"Register\\\",\\\"recoverpwd\\\":\\\"Recover Password\\\",\\\"lockscreen\\\":\\\"Lock screen\\\"}},\\\"utility\\\":{\\\"text\\\":\\\"Utility\\\",\\\"list\\\":{\\\"starter\\\":\\\"Starter Page\\\",\\\"maintenance\\\":\\\"Maintenance\\\",\\\"comingsoon\\\":\\\"Coming Soon\\\",\\\"timeline\\\":\\\"Timeline\\\",\\\"faqs\\\":\\\"FAQs\\\",\\\"pricing\\\":\\\"Pricing\\\",\\\"error404\\\":\\\"Error 404\\\",\\\"error500\\\":\\\"Error 500\\\"}},\\\"components\\\":{\\\"text\\\":\\\"Components\\\"},\\\"uielements\\\":{\\\"text\\\":\\\"UI Elements\\\",\\\"list\\\":{\\\"alerts\\\":\\\"Alerts\\\",\\\"buttons\\\":\\\"Buttons\\\",\\\"cards\\\":\\\"Cards\\\",\\\"carousel\\\":\\\"Carousel\\\",\\\"dropdowns\\\":\\\"Dropdowns\\\",\\\"grid\\\":\\\"Grid\\\",\\\"images\\\":\\\"Images\\\",\\\"modals\\\":\\\"Modals\\\",\\\"rangeslider\\\":\\\"Range Slider\\\",\\\"progressbar\\\":\\\"Progress Bars\\\",\\\"sweetalert\\\":\\\"Sweet Alert\\\",\\\"tabs\\\":\\\"Tabs & Accordions\\\",\\\"typography\\\":\\\"Typography\\\",\\\"video\\\":\\\"Video\\\",\\\"general\\\":\\\"General\\\",\\\"lightbox\\\":\\\"Lightbox\\\",\\\"sessiontimeout\\\":\\\"Session Timeout\\\",\\\"rating\\\":\\\"Rating\\\",\\\"notifications\\\":\\\"Notifications\\\"}},\\\"forms\\\":{\\\"text\\\":\\\"Forms\\\",\\\"badge\\\":\\\"8\\\",\\\"list\\\":{\\\"elements\\\":\\\"Form Elements\\\",\\\"validation\\\":\\\"Form Validation\\\",\\\"advanced\\\":\\\"Form Advanced\\\",\\\"editor\\\":\\\"Form Editor\\\",\\\"fileupload\\\":\\\"Form File Upload\\\",\\\"wizard\\\":\\\"Form Wizard\\\",\\\"mask\\\":\\\"Form Mask\\\"}},\\\"tables\\\":{\\\"text\\\":\\\"Tables\\\",\\\"list\\\":{\\\"basic\\\":\\\"Basic Tables\\\",\\\"advanced\\\":\\\"Advanced Table\\\"}},\\\"charts\\\":{\\\"text\\\":\\\"Charts\\\",\\\"list\\\":{\\\"apex\\\":\\\"Apex Chart\\\",\\\"chartjs\\\":\\\"Chartjs Chart\\\",\\\"chartist\\\":\\\"Chartist Chart\\\",\\\"echart\\\":\\\"E Chart\\\"}},\\\"icons\\\":{\\\"text\\\":\\\"Icons\\\",\\\"list\\\":{\\\"remix\\\":\\\"Remix Icons\\\",\\\"materialdesign\\\":\\\"Material Design\\\",\\\"dripicons\\\":\\\"Dripicons\\\",\\\"fontawesome\\\":\\\"Font Awesome 5\\\"}},\\\"maps\\\":{\\\"text\\\":\\\"Maps\\\",\\\"list\\\":{\\\"googlemap\\\":\\\"Google Maps\\\",\\\"leaflet\\\":\\\"Leaflet Maps\\\"}},\\\"multilevel\\\":{\\\"text\\\":\\\"Multi Level\\\",\\\"list\\\":{\\\"level1\\\":{\\\"1\\\":\\\"Level 1.1\\\",\\\"2\\\":\\\"Level 1.2\\\",\\\"level2\\\":{\\\"1\\\":\\\"Level 2.1\\\",\\\"2\\\":\\\"Level 2.2\\\"}}}}}}\");\n\n//# sourceURL=webpack:///./src/locales/en.json?");

/***/ }),

/***/ "./src/locales/fr.json":
/*!*****************************!*\
  !*** ./src/locales/fr.json ***!
  \*****************************/
/*! exports provided: navbar, menuitems, pages, tables, forms, stats, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"navbar\\\":{\\\"search\\\":{\\\"text\\\":\\\"Chercher...\\\"},\\\"dropdown\\\":{\\\"megamenu\\\":{\\\"text\\\":\\\"Mega Menu\\\",\\\"uicontent\\\":{\\\"title\\\":\\\"Composants de l'interface utilisateur\\\",\\\"list\\\":{\\\"lightbox\\\":\\\"Boite à lumière\\\",\\\"rangeslider\\\":\\\"Curseur de plage\\\",\\\"sweetalert\\\":\\\"Sweet Alert\\\",\\\"rating\\\":\\\"Évaluation\\\",\\\"forms\\\":\\\"Formes\\\",\\\"tables\\\":\\\"les tables\\\",\\\"charts\\\":\\\"Graphiques\\\"}},\\\"application\\\":{\\\"title\\\":\\\"Applications\\\",\\\"list\\\":{\\\"ecommerce\\\":\\\"Commerce électronique\\\",\\\"calendar\\\":\\\"Calendrier\\\",\\\"email\\\":\\\"Email\\\",\\\"projects\\\":\\\"Projets\\\",\\\"tasks\\\":\\\"Tâches\\\",\\\"contacts\\\":\\\"Contacts\\\"}},\\\"extrapages\\\":{\\\"title\\\":\\\"Pages supplémentaires\\\",\\\"list\\\":{\\\"lightsidebar\\\":\\\"Barre latérale légère\\\",\\\"compactsidebar\\\":\\\"Barre latérale compacte\\\",\\\"horizontallayout\\\":\\\"Disposition horizontale\\\",\\\"maintenance\\\":\\\"Entretien\\\",\\\"comingsoon\\\":\\\"Bientôt disponible\\\",\\\"timeline\\\":\\\"Chronologie\\\",\\\"faqs\\\":\\\"FAQ\\\"}}},\\\"site\\\":{\\\"list\\\":{\\\"github\\\":\\\"GitHub\\\",\\\"bitbucket\\\":\\\"Bitbucket\\\",\\\"dribbble\\\":\\\"Dribble\\\",\\\"dropbox\\\":\\\"Dropbox\\\",\\\"mailchimp\\\":\\\"Mail Chimp\\\",\\\"slack\\\":\\\"Molle\\\"}},\\\"notification\\\":{\\\"text\\\":\\\"Notifications\\\",\\\"subtext\\\":\\\"Voir tout\\\",\\\"order\\\":{\\\"title\\\":\\\"Votre commande est passée\\\",\\\"text\\\":\\\"Si plusieurs langues fusionnent la grammaire\\\",\\\"time\\\":\\\"Il y a 3 minutes\\\"},\\\"james\\\":{\\\"title\\\":\\\"James Lemire\\\",\\\"text\\\":\\\"It will seem like simplified English.\\\",\\\"time\\\":\\\"Il y a 1 heure\\\"},\\\"item\\\":{\\\"title\\\":\\\"Votre article est expédié\\\",\\\"text\\\":\\\"Si plusieurs langues fusionnent la grammaire\\\",\\\"time\\\":\\\"Il y a 3 minutes\\\"},\\\"salena\\\":{\\\"title\\\":\\\"Salena Layfield\\\",\\\"text\\\":\\\"As a skeptical Cambridge friend of mine occidental.\\\",\\\"time\\\":\\\"Il y a 1 heure\\\"},\\\"button\\\":\\\"Charger plus..\\\"},\\\"kevin\\\":{\\\"text\\\":\\\"Kevin\\\",\\\"list\\\":{\\\"profile\\\":\\\"Profil\\\",\\\"mywallet\\\":\\\"Mon portefeuille\\\",\\\"settings\\\":\\\"Réglages\\\",\\\"lockscreen\\\":\\\"Écran verrouillé\\\",\\\"logout\\\":\\\"Se déconnecter\\\"}}}},\\\"menuitems\\\":{\\\"menu\\\":{\\\"text\\\":\\\"Menu\\\"},\\\"dashboard\\\":{\\\"text\\\":\\\"Tableaux de bord\\\",\\\"badge\\\":\\\"3\\\"},\\\"documents\\\":{\\\"text\\\":\\\"Documents\\\",\\\"list\\\":\\\"Liste des documents\\\",\\\"create\\\":\\\"Ajouter un document\\\"},\\\"users\\\":{\\\"text\\\":\\\"Utilisateurs\\\",\\\"list\\\":\\\"Liste des utilisateurs\\\",\\\"create\\\":\\\"Ajouter un utilisateur\\\"},\\\"layouts\\\":{\\\"text\\\":\\\"Disposition\\\",\\\"list\\\":{\\\"horizontal\\\":\\\"Horizontale\\\",\\\"lightsidebar\\\":\\\"Barre latérale légère\\\",\\\"compactsidebar\\\":\\\"Barre latérale compacte\\\",\\\"iconsidebar\\\":\\\"Barre latérale des icônes\\\",\\\"boxed\\\":\\\"Disposition en boîte\\\",\\\"vertical\\\":\\\"Verticale\\\",\\\"lighttopbar\\\":\\\"Barre supérieure légère\\\"}}},\\\"pages\\\":{\\\"documents\\\":{\\\"title\\\":\\\"Documents\\\"},\\\"showdocument\\\":{\\\"title\\\":\\\"Lecture du document\\\",\\\"description\\\":\\\"Entrain d'extraire le contenu du document ...\\\",\\\"placeholder\\\":\\\"Le contenu du document sera injecté automatiquement\\\",\\\"download\\\":\\\"Télécharger le contenu\\\",\\\"radioplaceholder\\\":\\\"Veuillez choisir l'extension pour le fichier téléchargé\\\"},\\\"adddocument\\\":{\\\"title\\\":\\\"Ajouter un document\\\",\\\"description\\\":\\\"Pour ajouter un nouveau document veuillez remplir les champs ci-dessous\\\",\\\"button\\\":\\\"Créer le document\\\"},\\\"editdocument\\\":{\\\"title\\\":\\\"Modifier un document\\\"},\\\"login\\\":{\\\"title\\\":\\\"Se connecter\\\",\\\"description\\\":\\\"Pour se connceter, Veuillez entrer votre cordonnées et appuyer sur Connexion\\\",\\\"registermessage\\\":\\\"Vous n'avez pas crée un compte ? \\\"},\\\"users\\\":{\\\"title\\\":\\\"Utilisateurs\\\"},\\\"adduser\\\":{\\\"title\\\":\\\"Ajouter un utilisateur\\\",\\\"description\\\":\\\"Pour ajouter un nouveau utilisateur veuillez remplir les champs ci-dessous\\\",\\\"button\\\":\\\"Créer l'utilisateur\\\"},\\\"edituser\\\":{\\\"title\\\":\\\"Modifier un utilisateur\\\",\\\"description\\\":\\\"Pour modifier les informations de l'utilisateur veuillez remplir les champs ci-dessous\\\"}},\\\"tables\\\":{\\\"documents\\\":{\\\"name\\\":\\\"Nom\\\",\\\"title\\\":\\\"Documents\\\",\\\"type\\\":\\\"Type\\\",\\\"status\\\":\\\"Statut\\\",\\\"language\\\":\\\"Language\\\",\\\"date\\\":\\\"Ajouté le\\\",\\\"extract\\\":\\\"Extraire le contenu\\\",\\\"showdocuments\\\":\\\"Afficher les documents\\\",\\\"show\\\":\\\"Afficher\\\",\\\"edit\\\":\\\"Modifier\\\",\\\"delete\\\":\\\"Supprimer\\\"},\\\"users\\\":{\\\"title\\\":\\\"Utilisateurs\\\",\\\"name\\\":\\\"Nom et prénom\\\",\\\"email\\\":\\\"Email\\\",\\\"role\\\":\\\"Role\\\",\\\"created\\\":\\\"Enregistré le\\\"}},\\\"forms\\\":{\\\"documents\\\":{\\\"type\\\":\\\"Type de document\\\",\\\"typeOptions\\\":{\\\"invoice\\\":\\\"Facture\\\",\\\"bankstatement\\\":\\\"Relevé bancaire\\\",\\\"workcertificate\\\":\\\"Attestation de travail\\\",\\\"other\\\":\\\"Autres\\\"},\\\"status\\\":\\\"Statut\\\",\\\"statusOptions\\\":{\\\"pending\\\":\\\"En attente\\\",\\\"approved\\\":\\\"Apprové\\\",\\\"declined\\\":\\\"Refusé\\\"},\\\"document\\\":\\\"Document\\\",\\\"documentPlaceholder\\\":\\\"Veuillez choisir un document\\\",\\\"language\\\":\\\"Language\\\",\\\"languageOptions\\\":{\\\"eng\\\":\\\"Anglais\\\",\\\"fra\\\":\\\"Français\\\"}},\\\"login\\\":{\\\"email\\\":{\\\"text\\\":\\\"Email\\\",\\\"placeholder\\\":\\\"Veuillez entrer votre email\\\"},\\\"password\\\":{\\\"text\\\":\\\"Mot de passe\\\",\\\"placeholder\\\":\\\"Veuillez entrer votre mot de passe\\\"},\\\"button\\\":\\\"Connexion\\\"},\\\"users\\\":{\\\"name\\\":\\\"Nom et prénom\\\",\\\"email\\\":\\\"Email\\\",\\\"password\\\":\\\"Mot de passe\\\",\\\"role\\\":\\\"Role\\\",\\\"roleOptions\\\":{\\\"user\\\":\\\"Utilisateur\\\",\\\"admin\\\":\\\"Administrateur\\\"}}},\\\"stats\\\":{\\\"documents\\\":{\\\"total\\\":\\\"Nombre total\\\",\\\"pending\\\":\\\"En attente\\\",\\\"rejected\\\":\\\"Refusés\\\",\\\"approved\\\":\\\"Approuvés\\\",\\\"previous\\\":\\\"A la précédente fois\\\"}}}\");\n\n//# sourceURL=webpack:///./src/locales/fr.json?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap-vue */ \"./node_modules/bootstrap-vue/esm/index.js\");\n/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-apexcharts */ \"./node_modules/vue-apexcharts/dist/vue-apexcharts.js\");\n/* harmony import */ var vue_apexcharts__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vue_apexcharts__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuelidate */ \"./node_modules/vuelidate/lib/index.js\");\n/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var vue_sweetalert2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-sweetalert2 */ \"./node_modules/vue-sweetalert2/dist/index.js\");\n/* harmony import */ var v_mask__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! v-mask */ \"./node_modules/v-mask/dist/v-mask.esm.js\");\n/* harmony import */ var vue2_google_maps__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue2-google-maps */ \"./node_modules/vue2-google-maps/dist/main.js\");\n/* harmony import */ var vue2_google_maps__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vue2_google_maps__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var vue_youtube__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-youtube */ \"./node_modules/vue-youtube/dist/vue-youtube.js\");\n/* harmony import */ var vue_youtube__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(vue_youtube__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var v_click_outside__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! v-click-outside */ \"./node_modules/v-click-outside/dist/v-click-outside.umd.js\");\n/* harmony import */ var v_click_outside__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(v_click_outside__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _state_store__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @/state/store */ \"./src/state/store.js\");\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./i18n */ \"./src/i18n.js\");\n/* harmony import */ var _assets_scss_app_scss__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @/assets/scss/app.scss */ \"./src/assets/scss/app.scss\");\n/* harmony import */ var _assets_scss_app_scss__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_app_scss__WEBPACK_IMPORTED_MODULE_17__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue_youtube__WEBPACK_IMPORTED_MODULE_12___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(bootstrap_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(v_click_outside__WEBPACK_IMPORTED_MODULE_13___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vuelidate__WEBPACK_IMPORTED_MODULE_8___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue_sweetalert2__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(v_mask__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(__webpack_require__(/*! vue-chartist */ \"./node_modules/vue-chartist/index.js\"));\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue2_google_maps__WEBPACK_IMPORTED_MODULE_11__, {\n  load: {\n    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',\n    libraries: 'places'\n  },\n  installComponents: true\n});\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].component('apexchart', vue_apexcharts__WEBPACK_IMPORTED_MODULE_7___default.a);\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  store: _state_store__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  i18n: _i18n__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var vue_meta__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-meta */ \"./node_modules/vue-meta/dist/vue-meta.esm.js\");\n/* harmony import */ var _state_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/state/store */ \"./src/state/store.js\");\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./routes */ \"./src/router/routes.js\");\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_6__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_6__[\"default\"].use(vue_meta__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n  // The component option name that vue-meta looks for meta info on.\n  keyName: 'page'\n});\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n  routes: _routes__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  // Use the HTML5 history API (i.e. normal-looking routes)\n  // instead of routes with hashes (e.g. example.com/#/about).\n  // This may require some server configuration in production:\n  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations\n  mode: 'history',\n  // Simulate native-like scroll behavior when navigating to a new\n  // route and using back/forward buttons.\n  scrollBehavior: function scrollBehavior(to, from, savedPosition) {\n    if (savedPosition) {\n      return savedPosition;\n    } else {\n      return {\n        x: 0,\n        y: 0\n      };\n    }\n  }\n}); // Before each route evaluates...\n\nrouter.beforeEach(function (routeTo, routeFrom, next) {\n  // Check if auth is required on this route\n  // (including nested routes).\n  var authRequired = routeTo.matched.some(function (route) {\n    return route.meta.authRequired;\n  });\n  var adminRequired = routeTo.matched.some(function (route) {\n    return route.meta.adminRequired;\n  }); // If auth isn't required for the route, just continue.\n\n  if (!authRequired && !adminRequired) return next(); // If auth is required and the user is logged in...\n\n  if (_state_store__WEBPACK_IMPORTED_MODULE_9__[\"default\"].getters['auth/loggedIn']) {\n    if (!adminRequired) {\n      // Validate the local user token...\n      return _state_store__WEBPACK_IMPORTED_MODULE_9__[\"default\"].dispatch('auth/validate').then(function (validUser) {\n        // Then continue if the token still represents a valid user,\n        // otherwise redirect to login.\n        validUser ? next() : redirectToLogin();\n      });\n    } else {\n      return _state_store__WEBPACK_IMPORTED_MODULE_9__[\"default\"].dispatch('auth/validate').then(function (_ref) {\n        var user = _ref.user;\n        // Then continue if the token still represents a valid user,\n        // otherwise redirect to login.\n        user.role == 'admin' ? next() : redirectToForbiddenPage();\n      });\n    }\n  } // If auth is required and the user is NOT currently logged in,\n  // redirect to login.\n\n\n  redirectToLogin(); // eslint-disable-next-line no-unused-vars\n  // eslint-disable-next-line no-inner-declarations\n\n  function redirectToLogin() {\n    // Pass the original route to the login component\n    next({\n      name: 'login',\n      query: {\n        redirectFrom: routeTo.fullPath\n      }\n    });\n  }\n\n  function redirectToForbiddenPage() {\n    next({\n      name: 'forbidden',\n      query: {\n        redirectFrom: routeTo.fullPath\n      }\n    });\n  }\n});\nrouter.beforeResolve( /*#__PURE__*/function () {\n  var _ref2 = Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(routeTo, routeFrom, next) {\n    var _iterator, _step, _loop;\n\n    return regeneratorRuntime.wrap(function _callee$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _context2.prev = 0;\n            // For each matched route...\n            _iterator = Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(routeTo.matched);\n            _context2.prev = 2;\n            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop() {\n              var route;\n              return regeneratorRuntime.wrap(function _loop$(_context) {\n                while (1) {\n                  switch (_context.prev = _context.next) {\n                    case 0:\n                      route = _step.value;\n                      _context.next = 3;\n                      return new Promise(function (resolve, reject) {\n                        // If a `beforeResolve` hook is defined, call it with\n                        // the same arguments as the `beforeEnter` hook.\n                        if (route.meta && route.meta.beforeResolve) {\n                          route.meta.beforeResolve(routeTo, routeFrom, function () {\n                            // If the user chose to redirect...\n                            if (arguments.length) {\n                              // If redirecting to the same route we're coming from...\n                              // Complete the redirect.\n                              next.apply(void 0, arguments);\n                              reject(new Error('Redirected'));\n                            } else {\n                              resolve();\n                            }\n                          });\n                        } else {\n                          // Otherwise, continue resolving the route.\n                          resolve();\n                        }\n                      });\n\n                    case 3:\n                    case \"end\":\n                      return _context.stop();\n                  }\n                }\n              }, _loop);\n            });\n\n            _iterator.s();\n\n          case 5:\n            if ((_step = _iterator.n()).done) {\n              _context2.next = 9;\n              break;\n            }\n\n            return _context2.delegateYield(_loop(), \"t0\", 7);\n\n          case 7:\n            _context2.next = 5;\n            break;\n\n          case 9:\n            _context2.next = 14;\n            break;\n\n          case 11:\n            _context2.prev = 11;\n            _context2.t1 = _context2[\"catch\"](2);\n\n            _iterator.e(_context2.t1);\n\n          case 14:\n            _context2.prev = 14;\n\n            _iterator.f();\n\n            return _context2.finish(14);\n\n          case 17:\n            _context2.next = 22;\n            break;\n\n          case 19:\n            _context2.prev = 19;\n            _context2.t2 = _context2[\"catch\"](0);\n            return _context2.abrupt(\"return\");\n\n          case 22:\n            // If we reach this point, continue resolving the route.\n            next();\n\n          case 23:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee, null, [[0, 19], [2, 11, 14, 17]]);\n  }));\n\n  return function (_x, _x2, _x3) {\n    return _ref2.apply(this, arguments);\n  };\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _state_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/state/store */ \"./src/state/store.js\");\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([{\n  path: '/login',\n  name: 'login',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! ../views/pages/account/login */ \"./src/views/pages/account/login.vue\"));\n  },\n  meta: {\n    beforeResolve: function beforeResolve(routeTo, routeFrom, next) {\n      // If the user is already logged in\n      if (_state_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getters['auth/loggedIn']) {\n        // Redirect to the home page instead\n        next({\n          name: 'home'\n        });\n      } else {\n        // Continue to the login page\n        next();\n      }\n    }\n  }\n}, {\n  path: '/register',\n  name: 'register',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! ../views/pages/account/register */ \"./src/views/pages/account/register.vue\"));\n  },\n  meta: {\n    beforeResolve: function beforeResolve(routeTo, routeFrom, next) {\n      // If the user is already logged in\n      if (_state_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getters['auth/loggedIn']) {\n        // Redirect to the home page instead\n        next({\n          name: 'home'\n        });\n      } else {\n        // Continue to the login page\n        next();\n      }\n    }\n  }\n}, {\n  path: '/forgot-password',\n  name: 'Forgot-password',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, /*! ../views/pages/account/forgot-password */ \"./src/views/pages/account/forgot-password.vue\"));\n  },\n  meta: {\n    beforeResolve: function beforeResolve(routeTo, routeFrom, next) {\n      // If the user is already logged in\n      if (_state_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].getters['auth/loggedIn']) {\n        // Redirect to the home page instead\n        next({\n          name: 'home'\n        });\n      } else {\n        // Continue to the login page\n        next();\n      }\n    }\n  }\n}, {\n  path: '/logout',\n  name: 'logout',\n  meta: {\n    authRequired: true,\n    beforeResolve: function beforeResolve(routeTo, routeFrom, next) {\n      _state_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"].dispatch('auth/logOut');\n      var authRequiredOnPreviousRoute = routeFrom.matched.some(function (route) {\n        return route.push('/login');\n      }); // Navigate back to previous page, or home as a fallback\n\n      next(authRequiredOnPreviousRoute ? {\n        name: 'home'\n      } : Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, routeFrom));\n    }\n  }\n}, {\n  path: '/',\n  name: 'home',\n  meta: {\n    authRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/index */ \"./src/views/pages/dashboard/index.vue\"));\n  }\n}, {\n  path: '/documents/',\n  name: 'documents',\n  meta: {\n    authRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/documents/index */ \"./src/views/pages/dashboard/documents/index.vue\"));\n  }\n}, {\n  path: '/documents/create',\n  name: 'create-document',\n  meta: {\n    authRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/documents/create */ \"./src/views/pages/dashboard/documents/create.vue\"));\n  }\n}, {\n  path: '/documents/:id',\n  name: 'document',\n  meta: {\n    authRequired: true\n  },\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 15).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/documents/show */ \"./src/views/pages/dashboard/documents/show.vue\"));\n  }\n}, {\n  path: '/documents/:id/edit',\n  name: 'edit-document',\n  meta: {\n    authRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/documents/edit */ \"./src/views/pages/dashboard/documents/edit.vue\"));\n  }\n}, {\n  path: '/users/',\n  name: 'users',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/users/index */ \"./src/views/pages/dashboard/users/index.vue\"));\n  }\n}, {\n  path: '/users/create',\n  name: 'create-user',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/users/create */ \"./src/views/pages/dashboard/users/create.vue\"));\n  }\n}, {\n  path: '/users/:id',\n  name: 'user',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/users/show */ \"./src/views/pages/dashboard/users/show.vue\"));\n  }\n}, {\n  path: '/users/:id/edit',\n  name: 'edit-user',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/users/edit */ \"./src/views/pages/dashboard/users/edit.vue\"));\n  }\n}, {\n  path: '/users/:id/documents',\n  name: 'user-documents',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/userdocuments/index */ \"./src/views/pages/dashboard/userdocuments/index.vue\"));\n  }\n}, {\n  path: '/users/:userID/documents/:documentID',\n  name: 'read-user-document',\n  meta: {\n    adminRequired: true\n  },\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! ../views/pages/dashboard/userdocuments/show */ \"./src/views/pages/dashboard/userdocuments/show.vue\"));\n  }\n}]);\n\n//# sourceURL=webpack:///./src/router/routes.js?");

/***/ }),

/***/ "./src/state/helpers/authHeader.js":
/*!*****************************************!*\
  !*** ./src/state/helpers/authHeader.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return authHeader; });\nfunction authHeader() {\n  var token = JSON.parse(localStorage.getItem('auth-token'));\n\n  if (token) {\n    return {\n      'Authorization': \"bearer \".concat(token)\n    };\n  } else {\n    return {};\n  }\n}\n\n//# sourceURL=webpack:///./src/state/helpers/authHeader.js?");

/***/ }),

/***/ "./src/state/modules sync recursive ^((?!index|\\.unit\\.).)*\\.js$":
/*!*************************************************************!*\
  !*** ./src/state/modules sync ^((?!index|\.unit\.).)*\.js$ ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./auth.js\": \"./src/state/modules/auth.js\",\n\t\"./documents.js\": \"./src/state/modules/documents.js\",\n\t\"./layout.js\": \"./src/state/modules/layout.js\",\n\t\"./notification.js\": \"./src/state/modules/notification.js\",\n\t\"./users.js\": \"./src/state/modules/users.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/state/modules sync recursive ^((?!index|\\\\.unit\\\\.).)*\\\\.js$\";\n\n//# sourceURL=webpack:///index%7C\\.unit\\.).)*\\.js$?./src/state/modules_sync_^((?");

/***/ }),

/***/ "./src/state/modules/auth.js":
/*!***********************************!*\
  !*** ./src/state/modules/auth.js ***!
  \***********************************/
/*! exports provided: state, mutations, getters, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar state = {\n  currentUser: localStorage.getItem('authUser')\n};\nvar mutations = {\n  SET_CURRENT_USER: function SET_CURRENT_USER(state, newValue) {\n    state.currentUser = newValue;\n    saveState('auth.currentUser', newValue);\n  }\n};\nvar getters = {\n  // Whether the user is currently logged in.\n  loggedIn: function loggedIn(state) {\n    return !!state.currentUser;\n  },\n  getLoggedInUser: function getLoggedInUser(state) {\n    return state.currentUser;\n  }\n};\nvar actions = {\n  // This is automatically run in `src/state/store.js` when the app\n  // starts, along with any other actions named `init` in other modules.\n  // eslint-disable-next-line no-unused-vars\n  init: function init(_ref) {\n    var dispatch = _ref.dispatch;\n    dispatch('validate');\n  },\n  // Logs in the current user.\n  logIn: function logIn(_ref2, user) {\n    var commit = _ref2.commit;\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"http://localhost:3000/\" + 'auth/login', user).then(function (response) {\n      var user = response.data;\n      localStorage.setItem('auth-token', JSON.stringify(user.tokens.access.token));\n      localStorage.setItem('refresh-token', JSON.stringify(user.tokens.refresh.token));\n      commit('SET_CURRENT_USER', user);\n      return user;\n    });\n  },\n  // Logs out the current user.\n  logOut: function logOut(_ref3) {\n    var commit = _ref3.commit;\n    commit('SET_CURRENT_USER', null);\n    localStorage.removeItem('auth-token');\n    localStorage.removeItem('refresh-token');\n    localStorage.removeItem('auth.currentUser');\n  },\n  // register the user\n  register: function register(_ref4, user) {\n    var commit = _ref4.commit;\n    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(\"http://localhost:3000/\" + 'auth/register', user).then(function (response) {\n      var user = response.data;\n      localStorage.setItem('auth-token', JSON.stringify(user.tokens.access.token));\n      localStorage.setItem('refresh-token', JSON.stringify(user.tokens.refresh.token));\n      commit('SET_CURRENT_USER', user);\n      return user;\n    });\n  },\n  // Validates the current user's token and refreshes it\n  // with new data from the API.\n  // eslint-disable-next-line no-unused-vars\n  validate: function validate(_ref5) {\n    var commit = _ref5.commit,\n        state = _ref5.state;\n    if (!state.currentUser) return Promise.resolve(null);\n    var user = state.currentUser;\n    commit('SET_CURRENT_USER', user);\n    return user;\n  },\n  setLoggedInUser: function setLoggedInUser(_ref6) {\n    var commit = _ref6.commit;\n    var user = localStorage.getItem('auth.currentUser');\n    commit('SET_CURRENT_USER', JSON.parse(user));\n  }\n}; // ===\n// Private helpers\n// ===\n\nfunction saveState(key, state) {\n  window.localStorage.setItem(key, JSON.stringify(state));\n}\n\n//# sourceURL=webpack:///./src/state/modules/auth.js?");

/***/ }),

/***/ "./src/state/modules/documents.js":
/*!****************************************!*\
  !*** ./src/state/modules/documents.js ***!
  \****************************************/
/*! exports provided: state, getters, mutations, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ \"./node_modules/core-js/modules/es.array.find-index.js\");\n/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _helpers_authHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/authHeader */ \"./src/state/helpers/authHeader.js\");\n\n\n\n\n\n\nvar state = {\n  documents: []\n};\nvar getters = {\n  documents: function documents(state) {\n    return state.documents;\n  },\n  document: function document(state) {\n    return function (id) {\n      return state.documents.filter(function (document) {\n        return document.id == id;\n      })[0];\n    };\n  },\n  documentsCount: function documentsCount(state) {\n    return function (status) {\n      if (status == 'all') return state.documents.length;\n      return state.documents.filter(function (document) {\n        return document.status == status;\n      }).length;\n    };\n  }\n};\nvar mutations = {\n  setDocuments: function setDocuments(state, payload) {\n    state.documents = payload;\n  },\n  pushDocument: function pushDocument(state, payload) {\n    state.documents.push(payload);\n  },\n  setDocument: function setDocument(state, payload) {\n    var index = state.documents.findIndex(function (document) {\n      return document.id == payload.id;\n    });\n    state.documents[index] = payload;\n  },\n  deleteDocument: function deleteDocument(state, id) {\n    state.documents = state.documents.filter(function (document) {\n      return document.id != id;\n    });\n  }\n};\nvar actions = {\n  getDocuments: function getDocuments(_ref) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              commit = _ref.commit;\n              console.log(\"getting docuemnts ...\");\n              _context.next = 4;\n              return axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(\"http://localhost:3000/\" + 'documents/', {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()\n              }).then(function (res) {\n                commit('setDocuments', res.data);\n              });\n\n            case 4:\n              return _context.abrupt(\"return\", _context.sent);\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  },\n  deleteDocumentByID: function deleteDocumentByID(_ref2, id) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              commit = _ref2.commit;\n              _context2.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete(\"http://localhost:3000/\" + \"documents/\".concat(id), {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()\n              }).then(function () {\n                commit('deleteDocument', id);\n              });\n\n            case 3:\n              return _context2.abrupt(\"return\", _context2.sent);\n\n            case 4:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }))();\n  },\n  createDocument: function createDocument(_ref3, payload) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n      var commit, document;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              commit = _ref3.commit;\n              document = new FormData();\n              document.append(\"document\", payload.document);\n              document.append(\"type\", payload.type);\n              document.append(\"language\", payload.language);\n              _context3.next = 7;\n              return axios__WEBPACK_IMPORTED_MODULE_4___default.a.post(\"http://localhost:3000/\" + \"documents/\", document, {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()\n              }).then(function () {\n                commit('pushDocument', document);\n              });\n\n            case 7:\n              return _context3.abrupt(\"return\", _context3.sent);\n\n            case 8:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }))();\n  },\n  setDocument: function setDocument(_ref4, _ref5) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {\n      var commit, type, id, payload;\n      return regeneratorRuntime.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              commit = _ref4.commit;\n              type = _ref5.type, id = _ref5.id;\n              payload = {\n                type: type\n              };\n              console.log(\"new type : \", payload.type);\n              _context4.next = 6;\n              return axios__WEBPACK_IMPORTED_MODULE_4___default.a.patch(\"http://localhost:3000/\" + \"documents/\".concat(id), payload, {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_5__[\"default\"])()\n              }).then(function () {\n                commit('setDocument', document);\n              });\n\n            case 6:\n              return _context4.abrupt(\"return\", _context4.sent);\n\n            case 7:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4);\n    }))();\n  }\n};\n\n//# sourceURL=webpack:///./src/state/modules/documents.js?");

/***/ }),

/***/ "./src/state/modules/index.js":
/*!************************************!*\
  !*** ./src/state/modules/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.string.split.js */ \"./node_modules/core-js/modules/es.string.split.js\");\n/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/camelCase */ \"./node_modules/lodash/camelCase.js\");\n/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n// Register each file as a corresponding Vuex module. Module nesting\n// will mirror [sub-]directory hierarchy and modules are namespaced\n// as the camelCase equivalent of their file name.\n\nvar modulesCache = {};\nvar storeData = {\n  modules: {}\n};\n\n(function updateModules() {\n  // Allow us to dynamically require all Vuex module files.\n  // https://webpack.js.org/guides/dependency-management/#require-context\n  var requireModule = __webpack_require__(\"./src/state/modules sync recursive ^((?!index|\\\\.unit\\\\.).)*\\\\.js$\"); // For every Vuex module...\n\n\n  requireModule.keys().forEach(function (fileName) {\n    var moduleDefinition = requireModule(fileName); // Skip the module during hot reload if it refers to the\n    // same module definition as the one we have cached.\n\n    if (modulesCache[fileName] === moduleDefinition) return; // Update the module cache, for efficient hot reloading.\n\n    modulesCache[fileName] = moduleDefinition; // Get the module path as an array.\n\n    var modulePath = fileName // Remove the \"./\" from the beginning.\n    .replace(/^\\.\\//, '') // Remove the file extension from the end.\n    .replace(/\\.\\w+$/, '') // Split nested modules into an array path.\n    .split(/\\//) // camelCase all module namespaces and names.\n    .map(lodash_camelCase__WEBPACK_IMPORTED_MODULE_8___default.a); // Get the modules object for the current path.\n\n    var _getNamespace = getNamespace(storeData, modulePath),\n        modules = _getNamespace.modules; // Add the module to our modules object.\n\n\n    modules[modulePath.pop()] = Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      // Modules are namespaced by default.\n      namespaced: true\n    }, moduleDefinition);\n  }); // If the environment supports hot reloading...\n\n  if (false) {}\n})(); // Recursively get the namespace of a Vuex module, even if nested.\n\n\nfunction getNamespace(subtree, path) {\n  if (path.length === 1) return subtree;\n  var namespace = path.shift();\n  subtree.modules[namespace] = Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    modules: {},\n    namespaced: true\n  }, subtree.modules[namespace]);\n  return getNamespace(subtree.modules[namespace], path);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storeData.modules);\n\n//# sourceURL=webpack:///./src/state/modules/index.js?");

/***/ }),

/***/ "./src/state/modules/layout.js":
/*!*************************************!*\
  !*** ./src/state/modules/layout.js ***!
  \*************************************/
/*! exports provided: state, getters, mutations, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\nvar state = {\n  layoutType: 'vertical',\n  layoutWidth: 'fluid',\n  leftSidebarType: 'dark',\n  topbar: 'dark',\n  loader: false\n};\nvar getters = {};\nvar mutations = {\n  CHANGE_LAYOUT: function CHANGE_LAYOUT(state, layoutType) {\n    state.layoutType = layoutType;\n  },\n  CHANGE_LAYOUT_WIDTH: function CHANGE_LAYOUT_WIDTH(state, layoutWidth) {\n    state.layoutWidth = layoutWidth;\n  },\n  CHANGE_LEFT_SIDEBAR_TYPE: function CHANGE_LEFT_SIDEBAR_TYPE(state, leftSidebarType) {\n    state.leftSidebarType = leftSidebarType;\n  },\n  CHANGE_TOPBAR: function CHANGE_TOPBAR(state, topbar) {\n    state.topbar = topbar;\n  },\n  LOADER: function LOADER(state, loader) {\n    state.loader = loader;\n  }\n};\nvar actions = {\n  changeLayoutType: function changeLayoutType(_ref, _ref2) {\n    var commit = _ref.commit;\n    var layoutType = _ref2.layoutType;\n    commit('CHANGE_LAYOUT', layoutType);\n  },\n  changeLayoutWidth: function changeLayoutWidth(_ref3, _ref4) {\n    var commit = _ref3.commit;\n    var layoutWidth = _ref4.layoutWidth;\n    commit('CHANGE_LAYOUT_WIDTH', layoutWidth);\n  },\n  changeLeftSidebarType: function changeLeftSidebarType(_ref5, _ref6) {\n    var commit = _ref5.commit;\n    var leftSidebarType = _ref6.leftSidebarType;\n    commit('CHANGE_LEFT_SIDEBAR_TYPE', leftSidebarType);\n  },\n  changeTopbar: function changeTopbar(_ref7, _ref8) {\n    var commit = _ref7.commit;\n    var topbar = _ref8.topbar;\n    commit('CHANGE_TOPBAR', topbar);\n  },\n  changeLoaderValue: function changeLoaderValue(_ref9, _ref10) {\n    var commit = _ref9.commit;\n    var loader = _ref10.loader;\n    commit('LOADER', loader);\n  }\n};\n\n//# sourceURL=webpack:///./src/state/modules/layout.js?");

/***/ }),

/***/ "./src/state/modules/notification.js":
/*!*******************************************!*\
  !*** ./src/state/modules/notification.js ***!
  \*******************************************/
/*! exports provided: state, mutations, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\nvar state = {\n  type: null,\n  message: null\n};\nvar mutations = {\n  success: function success(state, message) {\n    state.type = 'success';\n    state.message = message;\n  },\n  error: function error(state, message) {\n    state.type = 'danger';\n    state.message = message;\n  },\n  clear: function clear(state) {\n    state.type = null;\n    state.message = null;\n  }\n};\nvar actions = {\n  success: function success(_ref, message) {\n    var commit = _ref.commit;\n    commit('success', message);\n  },\n  error: function error(_ref2, message) {\n    var commit = _ref2.commit;\n    commit('error', message);\n  },\n  clear: function clear(_ref3) {\n    var commit = _ref3.commit;\n    commit('clear');\n  }\n};\n\n//# sourceURL=webpack:///./src/state/modules/notification.js?");

/***/ }),

/***/ "./src/state/modules/users.js":
/*!************************************!*\
  !*** ./src/state/modules/users.js ***!
  \************************************/
/*! exports provided: state, getters, mutations, actions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getters\", function() { return getters; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"mutations\", function() { return mutations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"actions\", function() { return actions; });\n/* harmony import */ var _Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.find-index.js */ \"./node_modules/core-js/modules/es.array.find-index.js\");\n/* harmony import */ var core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../helpers/authHeader */ \"./src/state/helpers/authHeader.js\");\n\n\n\n\n\n\n\n\n\n\nvar state = {\n  users: []\n};\nvar getters = {\n  users: function users(state) {\n    return state.users;\n  },\n  user: function user(state) {\n    return function (id) {\n      return state.users.filter(function (user) {\n        return user.id == id;\n      })[0];\n    };\n  },\n  userDocuments: function userDocuments(state) {\n    return function (id) {\n      return state.users.filter(function (user) {\n        return user.id == id;\n      })[0].documents;\n    };\n  }\n};\nvar mutations = {\n  setUsers: function setUsers(state, payload) {\n    state.users = payload;\n  },\n  pushUser: function pushUser(state, payload) {\n    state.users.push(payload);\n  },\n  setUser: function setUser(state, payload) {\n    var index = state.users.findIndex(function (user) {\n      return user.id == payload.id;\n    });\n    state.users[index] = payload;\n  },\n  deleteUser: function deleteUser(state, id) {\n    state.users = state.users.filter(function (user) {\n      return user.id != id;\n    });\n  },\n  setUserDocuments: function setUserDocuments(state, payload) {\n    state.users.forEach(function (user) {\n      if (user.id == payload.id) {\n        user.documents = payload.documents;\n      }\n    });\n  },\n  deleteUserDocument: function deleteUserDocument(state, payload) {\n    state.users.forEach(function (user) {\n      if (user.id == payload.id) {\n        user.documents = user.documents.filter(function (doc) {\n          return doc.id != payload.documentID;\n        });\n      }\n    });\n  },\n  updateUserDocument: function updateUserDocument(state, payload) {\n    state.users = state.users.map(function (user) {\n      if (user.id == payload.id) {\n        var index = user.documents.findIndex(function (doc) {\n          return doc.id == payload.documentID;\n        });\n        user.documents[index] = payload.newdoc;\n      }\n\n      return user;\n    });\n  }\n};\nvar actions = {\n  getUsers: function getUsers(_ref) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              commit = _ref.commit;\n              _context.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(\"http://localhost:3000/\" + 'users/', {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function (res) {\n                commit('setUsers', res.data.results);\n              });\n\n            case 3:\n              return _context.abrupt(\"return\", _context.sent);\n\n            case 4:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }))();\n  },\n  deleteUserByID: function deleteUserByID(_ref2, id) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              commit = _ref2.commit;\n              _context2.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.delete(\"http://localhost:3000/\" + \"users/\".concat(id), {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function () {\n                commit('deleteUser', id);\n              });\n\n            case 3:\n              return _context2.abrupt(\"return\", _context2.sent);\n\n            case 4:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }))();\n  },\n  createUser: function createUser(_ref3, user) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              commit = _ref3.commit;\n              _context3.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(\"http://localhost:3000/\" + \"users/\", user, {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function () {\n                commit('pushUser', user);\n              });\n\n            case 3:\n              return _context3.abrupt(\"return\", _context3.sent);\n\n            case 4:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }))();\n  },\n  setUser: function setUser(_ref4, user) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee4$(_context4) {\n        while (1) {\n          switch (_context4.prev = _context4.next) {\n            case 0:\n              commit = _ref4.commit;\n              console.log(\"new type : \", user);\n              _context4.next = 4;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.patch(\"http://localhost:3000/\" + \"users/\".concat(user.id), user, {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function () {\n                commit('setUser', user);\n              });\n\n            case 4:\n              return _context4.abrupt(\"return\", _context4.sent);\n\n            case 5:\n            case \"end\":\n              return _context4.stop();\n          }\n        }\n      }, _callee4);\n    }))();\n  },\n  getUserDocuments: function getUserDocuments(_ref5, userID) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee5$(_context5) {\n        while (1) {\n          switch (_context5.prev = _context5.next) {\n            case 0:\n              commit = _ref5.commit;\n              _context5.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(\"http://localhost:3000/\" + \"users/\".concat(userID, \"/documents\"), {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function (res) {\n                commit('setUserDocuments', {\n                  id: userID,\n                  documents: res.data\n                });\n              });\n\n            case 3:\n              return _context5.abrupt(\"return\", _context5.sent);\n\n            case 4:\n            case \"end\":\n              return _context5.stop();\n          }\n        }\n      }, _callee5);\n    }))();\n  },\n  deleteUserDocument: function deleteUserDocument(_ref6, payload) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee6$(_context6) {\n        while (1) {\n          switch (_context6.prev = _context6.next) {\n            case 0:\n              commit = _ref6.commit;\n              console.log(\"pyload\", payload);\n              _context6.next = 4;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.delete(\"http://localhost:3000/\" + \"users/\".concat(payload.userID, \"/documents/\").concat(payload.documentID), {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function () {\n                commit('deleteUserDocument', {\n                  id: payload.userID,\n                  documentID: payload.documentID\n                });\n              });\n\n            case 4:\n              return _context6.abrupt(\"return\", _context6.sent);\n\n            case 5:\n            case \"end\":\n              return _context6.stop();\n          }\n        }\n      }, _callee6);\n    }))();\n  },\n  updateUserDocument: function updateUserDocument(_ref7, payload) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {\n      var commit;\n      return regeneratorRuntime.wrap(function _callee7$(_context7) {\n        while (1) {\n          switch (_context7.prev = _context7.next) {\n            case 0:\n              commit = _ref7.commit;\n              _context7.next = 3;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.patch(\"http://localhost:3000/\" + \"users/\".concat(payload.userID, \"/documents/\").concat(payload.documentID), {\n                status: payload.status\n              }, {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function (res) {\n                commit('updateUserDocument', {\n                  id: payload.userID,\n                  documentID: payload.documentID,\n                  newdoc: res.data\n                });\n              });\n\n            case 3:\n              return _context7.abrupt(\"return\", _context7.sent);\n\n            case 4:\n            case \"end\":\n              return _context7.stop();\n          }\n        }\n      }, _callee7);\n    }))();\n  },\n  readUserDocument: function readUserDocument(context, payload) {\n    return Object(_Users_macbook_Desktop_My_Space_Freelance_2021_documents_reader_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {\n      return regeneratorRuntime.wrap(function _callee8$(_context8) {\n        while (1) {\n          switch (_context8.prev = _context8.next) {\n            case 0:\n              _context8.next = 2;\n              return axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(\"http://localhost:3000/\" + \"users/\".concat(payload.userID, \"/documents/\").concat(payload.documentID, \"/read\"), {\n                headers: Object(_helpers_authHeader__WEBPACK_IMPORTED_MODULE_9__[\"default\"])()\n              }).then(function (res) {\n                return Promise.resolve(res.data);\n              });\n\n            case 2:\n              return _context8.abrupt(\"return\", _context8.sent);\n\n            case 3:\n            case \"end\":\n              return _context8.stop();\n          }\n        }\n      }, _callee8);\n    }))();\n  }\n};\n\n//# sourceURL=webpack:///./src/state/modules/users.js?");

/***/ }),

/***/ "./src/state/store.js":
/*!****************************!*\
  !*** ./src/state/store.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules */ \"./src/state/modules/index.js\");\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  modules: _modules__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  // Enable strict mode in development to get a warning\n  // when mutating state outside of a mutation.\n  // https://vuex.vuejs.org/guide/strict.html\n  strict: \"development\" !== 'production'\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./src/state/store.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });