(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/post.js"],{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fpost&absolutePagePath=%2FUsers%2Fziq%2FDocuments%2FProjects%2Fglints%2Frestaurant%2Fpages%2Fpost.js!./":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fpost&absolutePagePath=%2FUsers%2Fziq%2FDocuments%2FProjects%2Fglints%2Frestaurant%2Fpages%2Fpost.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/post", function() {
      var page = __webpack_require__(/*! ./pages/post.js */ "./pages/post.js")
      if(true) {
        module.hot.accept(/*! ./pages/post.js */ "./pages/post.js", function() {
          if(!next.router.components["/post"]) return
          var updatedPage = __webpack_require__(/*! ./pages/post.js */ "./pages/post.js")
          next.router.update("/post", updatedPage.default || updatedPage)
        })
      }
      return { page: page.default || page }
    }]);
  

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_829b10deddf10e1653a8 ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_829b10deddf10e1653a8 */ "dll-reference dll_829b10deddf10e1653a8"))("./node_modules/react/index.js");

/***/ }),

/***/ "./pages/post.js":
/*!***********************!*\
  !*** ./pages/post.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function Post(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "my ", props.id);
}

Post.getInitialProps = function (context) {
  var id = context.query.id;
  return {
    id: id
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Post);

/***/ }),

/***/ 1:
/*!**************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2Fpost&absolutePagePath=%2FUsers%2Fziq%2FDocuments%2FProjects%2Fglints%2Frestaurant%2Fpages%2Fpost.js ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2Fpost&absolutePagePath=%2FUsers%2Fziq%2FDocuments%2FProjects%2Fglints%2Frestaurant%2Fpages%2Fpost.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2Fpost&absolutePagePath=%2FUsers%2Fziq%2FDocuments%2FProjects%2Fglints%2Frestaurant%2Fpages%2Fpost.js!./");


/***/ }),

/***/ "dll-reference dll_829b10deddf10e1653a8":
/*!*******************************************!*\
  !*** external "dll_829b10deddf10e1653a8" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_829b10deddf10e1653a8;

/***/ })

},[[1,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=post.js.map