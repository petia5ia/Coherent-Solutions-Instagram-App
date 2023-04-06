/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"router\": () => (/* binding */ router)\n/* harmony export */ });\n/* harmony import */ var _styles_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/sass/main.scss */ \"./src/styles/sass/main.scss\");\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _login_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.js */ \"./src/login.js\");\n/* harmony import */ var _logOut__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logOut */ \"./src/logOut.js\");\n/* harmony import */ var _registration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registration.js */ \"./src/registration.js\");\n/* harmony import */ var _saveUserInfo_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./saveUserInfo.js */ \"./src/saveUserInfo.js\");\n/* harmony import */ var _views_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views.js */ \"./src/views.js\");\n\n\n\n\n\n\n\nvar root = document.getElementById('feed');\nvar routes = {\n  '#displayLoginForm': _views_js__WEBPACK_IMPORTED_MODULE_6__.loginView,\n  '#displayRegisterForm': _views_js__WEBPACK_IMPORTED_MODULE_6__.registerView,\n  '#editUser': _views_js__WEBPACK_IMPORTED_MODULE_6__.editUserView,\n  '#users': _views_js__WEBPACK_IMPORTED_MODULE_6__.usersListView,\n  '#user': _views_js__WEBPACK_IMPORTED_MODULE_6__.userProfileView\n};\n\nfunction router() {\n  var url = window.location.hash || '#';\n  var routesArr = url.split('/');\n\n  if (url === '#') {\n    var routeName = _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCurrLoggedInUser() === null ? \"#displayLoginForm\" : \"#users\";\n    window.history.pushState(null, null, routeName);\n    router();\n  } else if (routes[routesArr[0]]) {\n    var layout = routes[routesArr[0]].render(routesArr[1]);\n    root.innerHTML = layout;\n  }\n}\n\nwindow.addEventListener('load', router);\nwindow.addEventListener('hashchange', router);\ndocument.addEventListener('click', function (e) {\n  var deleteBtnIdRegex = /deleteBtn[0-9]+/g;\n\n  if (e.target.id === 'loginBtn') {\n    e.preventDefault();\n    (0,_login_js__WEBPACK_IMPORTED_MODULE_2__.loginUser)();\n  } else if (e.target.id === 'logOutLink') {\n    e.preventDefault();\n    (0,_logOut__WEBPACK_IMPORTED_MODULE_3__.logOut)();\n  } else if (e.target.id === 'registerBtn') {\n    e.preventDefault();\n    (0,_registration_js__WEBPACK_IMPORTED_MODULE_4__.registerUser)();\n  } else if (e.target.id === 'saveBtn') {\n    e.preventDefault();\n    (0,_saveUserInfo_js__WEBPACK_IMPORTED_MODULE_5__.saveUserInfo)();\n  } else if (e.target.id.match(deleteBtnIdRegex)) {\n    e.preventDefault();\n    var arrUsers = _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAllUsers();\n    var index = e.target.parentNode.parentNode.id;\n    var deletedUser = arrUsers[index];\n    arrUsers.splice(index, 1);\n\n    if (deletedUser.email === _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCurrLoggedInUser().email && deletedUser.username === _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCurrLoggedInUser().username && deletedUser.password === _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getCurrLoggedInUser().password) {\n      alert('You deleted the currently logged in user.');\n      (0,_logOut__WEBPACK_IMPORTED_MODULE_3__.logOut)();\n    }\n\n    e.target.parentNode.remove();\n\n    if (arrUsers.length == 0) {\n      _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].removeAllUsers();\n    } else {\n      _services_DataService_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].setUsers(JSON.stringify(arrUsers));\n    }\n\n    router();\n  }\n});\n(0,_logOut__WEBPACK_IMPORTED_MODULE_3__.autoLogOut)();\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/index.js?");

/***/ }),

/***/ "./src/logOut.js":
/*!***********************!*\
  !*** ./src/logOut.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autoLogOut\": () => (/* binding */ autoLogOut),\n/* harmony export */   \"logOut\": () => (/* binding */ logOut)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\n\nfunction logOut() {\n  _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeCurrLoggedInUser();\n  window.history.pushState(null, null, \"#displayLoginForm\");\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.router)();\n}\n\nfunction autoLogOut() {\n  var loggedInUser = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCurrLoggedInUser();\n\n  if (loggedInUser !== null) {\n    var now = new Date(); //Compare the expiry time of the item with the current time\n\n    if (now.getTime() > loggedInUser.expiry) {\n      //If the item is expired, delete the item from storage\n      alert('Your session expired. Please login again.');\n      logOut();\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/logOut.js?");

/***/ }),

/***/ "./src/login.js":
/*!**********************!*\
  !*** ./src/login.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginUser\": () => (/* binding */ loginUser)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n\n\n\nfunction loginUser() {\n  var loginRegForm = document.getElementById('loginRegForm');\n  var isUserFound = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getUserByUserIdAndPass(loginRegForm.username.value, loginRegForm.userpsw.value); //const ttl = 10 * 1000; //Time To Live = 10 seconds\n\n  var ttl = 10 * 60 * 1000; //Time To Live = 10 minutes\n\n  if (isUserFound !== undefined) {\n    isUserFound.expiry = new Date().getTime() + ttl;\n    _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setCurrLoggedInUser(JSON.stringify(isUserFound));\n    alert('You are logged in.');\n    window.history.pushState(null, null, \"#users\");\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.router)();\n  } else {\n    alert('Please enter valid email/username and password.');\n    window.history.pushState(null, null, \"#displayLoginForm\");\n    (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.router)();\n  }\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/login.js?");

/***/ }),

/***/ "./src/registration.js":
/*!*****************************!*\
  !*** ./src/registration.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerUser\": () => (/* binding */ registerUser)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation.js */ \"./src/validation.js\");\n\n\n\n\nfunction registerUser() {\n  var loginRegForm = document.getElementById('loginRegForm');\n  var newUserObj = {\n    'email': loginRegForm.email.value,\n    'username': loginRegForm.username.value,\n    'password': loginRegForm.userpsw.value\n  };\n  var arrUsers = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllUsers();\n  arrUsers.push(newUserObj);\n\n  if ((0,_validation_js__WEBPACK_IMPORTED_MODULE_2__.searchByEmailOrUsername)(loginRegForm.email.value, loginRegForm.username.value) !== undefined) {\n    alert('User with this email or username already exists.');\n  } else if ((0,_validation_js__WEBPACK_IMPORTED_MODULE_2__.validateEmailUsernamePass)(loginRegForm.email.value, loginRegForm.username.value, loginRegForm.userpsw.value)) {\n    _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setUsers(JSON.stringify(arrUsers));\n    alert('Your account has been created');\n  }\n\n  window.history.pushState(null, null, \"#displayLoginForm\");\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.router)();\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/registration.js?");

/***/ }),

/***/ "./src/saveUserInfo.js":
/*!*****************************!*\
  !*** ./src/saveUserInfo.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"saveUserInfo\": () => (/* binding */ saveUserInfo)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation.js */ \"./src/validation.js\");\n\n\n\n\nfunction getGenderRadioValue() {\n  var ele = document.getElementsByName('gender');\n\n  for (var i = 0; i < ele.length; i++) {\n    if (ele[i].checked) {\n      return ele[i].value;\n    }\n  }\n}\n\nfunction saveUserInfo() {\n  var arrUsers = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllUsers();\n  var index = document.getElementById('saveBtn').parentNode.parentNode.id;\n  var editUserForm = document.getElementById(\"\".concat(index));\n  var emailNewValue = editUserForm.email.value;\n  var usernameNewValue = editUserForm.username.value;\n  var userpswNewValue = editUserForm.userpsw.value;\n  var serveySelectEl = document.getElementById('survey');\n  var serveyValue = serveySelectEl.options[serveySelectEl.selectedIndex].value;\n\n  if ((0,_validation_js__WEBPACK_IMPORTED_MODULE_2__.validateEmailUsernamePass)(emailNewValue, usernameNewValue, userpswNewValue)) {\n    var newUserObj = arrUsers[index];\n    newUserObj = {\n      'birthday': document.getElementById('birthdate').value,\n      'email': emailNewValue,\n      'gender': getGenderRadioValue(),\n      'howDiscovered': \"\".concat(serveyValue),\n      'password': userpswNewValue,\n      'username': usernameNewValue\n    };\n    arrUsers[index] = newUserObj;\n    _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setUsers(JSON.stringify(arrUsers));\n    var currLoggedInUser = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCurrLoggedInUser();\n    currLoggedInUser.email = editUserForm.email.value;\n    currLoggedInUser.username = editUserForm.username.value;\n    currLoggedInUser.password = editUserForm.userpsw.value;\n    _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].setCurrLoggedInUser(JSON.stringify(currLoggedInUser));\n  }\n\n  window.history.pushState(null, null, \"#users\");\n  (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.router)();\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/saveUserInfo.js?");

/***/ }),

/***/ "./src/services/DataService.js":
/*!*************************************!*\
  !*** ./src/services/DataService.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//Return array with all users or empty array if there are no registrations\nfunction getAllUsers() {\n  return localStorage.users !== undefined ? JSON.parse(localStorage.users) : [];\n} //Return the currently signed in user or null if there is none\n\n\nfunction getCurrLoggedInUser() {\n  return JSON.parse(localStorage.getItem('currLoggedInUser'));\n}\n/**\r\n * Search for user in the DB by given username\r\n * Return undefined if such user is not found\r\n */\n\n\nfunction getUserByUserId(userId) {\n  var isFound = getAllUsers().find(function (k) {\n    return k.username === userId;\n  });\n  return isFound;\n}\n/**\r\n * Search for user in the DB by given username and password\r\n * Return undefined if such user is not found\r\n */\n\n\nfunction getUserByUserIdAndPass(userId, pass) {\n  var isFound = getAllUsers().find(function (k) {\n    return k.username === userId && k.password === pass;\n  });\n  return isFound;\n}\n\nfunction removeAllUsers() {\n  localStorage.removeItem('users');\n}\n\nfunction removeCurrLoggedInUser() {\n  localStorage.removeItem('currLoggedInUser');\n} //Add the key 'currLoggedInUser' with the given key value to the localStorage or update that key's value if it already exists\n\n\nfunction setCurrLoggedInUser(keyValue) {\n  localStorage.setItem('currLoggedInUser', keyValue);\n} //Add the key 'users' with the given key value to the localStorage or update that key's value if it already exists\n\n\nfunction setUsers(keyValue) {\n  localStorage.setItem('users', keyValue);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getAllUsers: getAllUsers,\n  getCurrLoggedInUser: getCurrLoggedInUser,\n  getUserByUserId: getUserByUserId,\n  getUserByUserIdAndPass: getUserByUserIdAndPass,\n  removeAllUsers: removeAllUsers,\n  removeCurrLoggedInUser: removeCurrLoggedInUser,\n  setCurrLoggedInUser: setCurrLoggedInUser,\n  setUsers: setUsers\n});\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/services/DataService.js?");

/***/ }),

/***/ "./src/templates/EditUserTemplate.js":
/*!*******************************************!*\
  !*** ./src/templates/EditUserTemplate.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"editUserTemplate\": () => (/* binding */ editUserTemplate)\n/* harmony export */ });\nfunction editUserTemplate(props) {\n  var index = document.getElementById('editBtn').parentNode.parentNode.id;\n  return \"\\n        <form action=\\\"\\\" id=\\\"\".concat(index, \"\\\">\\n            <div class=\\\"container\\\">\\n                <label for=\\\"email\\\">Email:</label>\\n                <input type=\\\"text\\\" name=\\\"email\\\" value=\\\"\").concat(props.email, \"\\\">\\n\\n                <label for=\\\"username\\\">Username:</label>\\n                <input type=\\\"text\\\" name=\\\"username\\\" value=\\\"\").concat(props.username, \"\\\">\\n\\n                <label for=\\\"userpsw\\\">Password:</label>\\n                <input type=\\\"text\\\" name=\\\"userpsw\\\" value=\\\"\").concat(props.password, \"\\\">\\n\\n                <form>\\n                    <div>Gender:</div>\\n                    <div>\\n                        <input type=\\\"radio\\\" name=\\\"gender\\\" id=\\\"female\\\" value=\\\"F\\\">\\n                        <label for=\\\"female\\\">Female</label>\\n                    </div>\\n                    <div>\\n                        <input type=\\\"radio\\\" name=\\\"gender\\\" id=\\\"male\\\" value=\\\"M\\\">\\n                        <label for=\\\"male\\\">Male</label>\\n                    </div>\\n                </form>\\n\\n                <div>\\n                    <div>How Did You Hear About Us?</div>\\n                    <select name=\\\"survey\\\" id=\\\"survey\\\">\\n                        <option value=\\\"search engine\\\">Search engine</option>\\n                        <option value=\\\"friend\\\">By friend or colleague</option>\\n                        <option value=\\\"social media\\\">Social media</option>\\n                        <option value=\\\"blog\\\">Blog or publication</option>\\n                        <option value=\\\"other\\\" selected>Other</option>\\n                    </select>\\n                </div>\\n\\n                <label for=\\\"birthdate\\\">Birthdate:</label>\\n                <input type=\\\"date\\\" id=\\\"birthdate\\\" name=\\\"birthdate\\\" value=\\\"2022-01-01\\\" min=\\\"1990-01-01\\\" max=\\\"2022-01-01\\\">\\n\\n                <button type=\\\"submit\\\" name=\\\"savebtn\\\" id=\\\"saveBtn\\\">Save</button>\\n\\n                <button type=\\\"submit\\\" name=\\\"cancelbtn\\\" id=\\\"cancelBtn\\\">\\n                    <a href=\\\"#\\\" id=\\\"cancelBtnLink\\\">Cancel</a>\\n                </button>\\n            </div>\\n        </form>\");\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/templates/EditUserTemplate.js?");

/***/ }),

/***/ "./src/templates/LoginTemplate.js":
/*!****************************************!*\
  !*** ./src/templates/LoginTemplate.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginTemplate\": () => (/* binding */ loginTemplate)\n/* harmony export */ });\nfunction loginTemplate() {\n  return \"\\n        <form id=\\\"loginRegForm\\\">\\n            <div class=\\\"container\\\">\\n                <input type=\\\"text\\\" placeholder=\\\"Enter Username\\\" name=\\\"username\\\" required>\\n                <input type=\\\"password\\\" placeholder=\\\"Enter Password\\\" name=\\\"userpsw\\\" required>\\n\\n                <button type=\\\"submit\\\" name=\\\"loginBtn\\\" id=\\\"loginBtn\\\">Login</button>\\n\\n                <div class=\\\"container\\\" id=\\\"registerContainer\\\">\\n                    <p>You don't have an account? <a href=\\\"#displayRegisterForm\\\" id=\\\"registerLink\\\">Register</a></p>\\n                </div>\\n            </div>\\n        </form>\";\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/templates/LoginTemplate.js?");

/***/ }),

/***/ "./src/templates/RegisterTemplate.js":
/*!*******************************************!*\
  !*** ./src/templates/RegisterTemplate.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"registerTemplate\": () => (/* binding */ registerTemplate)\n/* harmony export */ });\nfunction registerTemplate() {\n  return \"\\n        <form id=\\\"loginRegForm\\\">\\n            <div class=\\\"container\\\">\\n                <input type=\\\"email\\\" placeholder=\\\"Enter Email\\\" name=\\\"email\\\" required>\\n                <input type=\\\"text\\\" placeholder=\\\"Enter Username\\\" name=\\\"username\\\" required>\\n                <input type=\\\"password\\\" placeholder=\\\"Enter Password\\\" name=\\\"userpsw\\\" required>\\n\\n                <button type=\\\"submit\\\" name=\\\"registerBtn\\\" id=\\\"registerBtn\\\">Register</button>\\n\\n                <div class=\\\"container\\\" id=\\\"loginContainer\\\">\\n                    <p>Already have an account? <a href=\\\"#displayLoginForm\\\" id=\\\"loginLink\\\">Sign in</a></p>\\n                </div>\\n            </div>\\n        </form>\";\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/templates/RegisterTemplate.js?");

/***/ }),

/***/ "./src/templates/UserProfileTemplate.js":
/*!**********************************************!*\
  !*** ./src/templates/UserProfileTemplate.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userProfileTemplate\": () => (/* binding */ userProfileTemplate)\n/* harmony export */ });\nfunction userProfileTemplate(props) {\n  return \"\\n        <div class=\\\"container\\\">\\n            <b>Email:</b> \".concat(props.email, \"<br>\\n            <b>Username:</b> \").concat(props.username, \"<br>\\n            <b>Password:</b> \").concat(props.password, \"<br>\\n            \").concat(props.birthday !== undefined ? \"<b>Birthday:</b> \".concat(props.birthday, \"<br>\") : \"\", \"\\n            \").concat(props.gender !== undefined ? \"<b>Gender:</b> \".concat(props.gender, \"<br>\") : \"\", \"\\n\\n            <button type=\\\"submit\\\">\\n                <a href=\\\"#users\\\" id=\\\"backBtnLink\\\">Back</a>\\n            </button>\\n        </div>\");\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/templates/UserProfileTemplate.js?");

/***/ }),

/***/ "./src/templates/UserTemplate.js":
/*!***************************************!*\
  !*** ./src/templates/UserTemplate.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"userTemplate\": () => (/* binding */ userTemplate)\n/* harmony export */ });\nfunction userTemplate(props, currLoggedInUser, i) {\n  return \"\\n        <form action=\\\"\\\" id=\\\"\".concat(i, \"\\\">\\n            <div class=\\\"container\\\">\\n                <div class=\\\"userInfo\\\">\\n                    <b>Email:</b> \").concat(props.email, \"<br>\\n                    <b>Username:</b> \").concat(props.username, \"<br>\\n                    <b>Password:</b> \").concat(props.password, \"<br>\\n                    \").concat(props.birthday !== undefined ? \"<b>Birthday:</b> \".concat(props.birthday, \"<br>\") : \"\", \"\\n                    \").concat(props.gender !== undefined ? \"<b>Gender:</b> \".concat(props.gender, \"<br>\") : \"\", \"\\n                </div>\\n\\n                \").concat(props.email === currLoggedInUser.email ? \"<button type=\\\"submit\\\" name=\\\"editbtn\\\" id=\\\"editBtn\\\">\\n                        <a href=\\\"#editUser\\\" id=\\\"editBtnLink\\\">Edit</a>\\n                    </button>\" : \"\", \"\\n\\n                <button type=\\\"submit\\\" name=\\\"showProfile\\\" id=\\\"showProfileBtn\\\">\\n                    <a href=\\\"#user/\").concat(props.username, \"\\\" id=\\\"showProfileBtnLink\\\">Show profile</a>\\n                </button>\\n\\n                <button type=\\\"submit\\\" name=\\\"deletebtn\\\" id=\\\"deleteBtn\").concat(i, \"\\\">Delete</button>\\n            </div>\\n        </form>\");\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/templates/UserTemplate.js?");

/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"searchByEmailOrUsername\": () => (/* binding */ searchByEmailOrUsername),\n/* harmony export */   \"validateEmail\": () => (/* binding */ validateEmail),\n/* harmony export */   \"validateEmailUsernamePass\": () => (/* binding */ validateEmailUsernamePass)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n\n/**\r\n * Search in the DB if user with the given email or username is already present\r\n * Return undefined if such user is not found\r\n */\n\nfunction searchByEmailOrUsername(email, username) {\n  var isFound = _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllUsers().find(function (k) {\n    return k.email === email || k.username === username;\n  });\n  return isFound;\n}\n/**\r\n * Validate email using regular expression\r\n * https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript\r\n */\n\n\nvar validateEmail = function validateEmail(email) {\n  return String(email).toLowerCase().match(/^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/);\n};\n\nfunction validateEmailUsernamePass(email, username, pass) {\n  var lowerCaseRegex = /[a-z]/g;\n  var upperCaseRegex = /[A-Z]/g;\n  var numbersRegex = /[0-9]/g;\n  var specialCharsRegex = /[!@#\\$%\\^\\&*\\)\\(+=._-]/g;\n  var isValid = false;\n\n  if (!validateEmail(email)) {\n    alert('Please enter a valid email address.');\n  } else if (username.length === 0) {\n    alert('The username cannot be empty.');\n  } else if (pass.length < 8) {\n    alert('The password must be at least 8 characters long.');\n  } else if (!pass.match(lowerCaseRegex)) {\n    alert('The password must contain a lowercase.');\n  } else if (!pass.match(upperCaseRegex)) {\n    alert('The password must contain an uppercase.');\n  } else if (!pass.match(numbersRegex) && !pass.match(specialCharsRegex)) {\n    alert('The password must contain a number or special character.');\n  } else {\n    isValid = true;\n  }\n\n  return isValid;\n}\n\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/validation.js?");

/***/ }),

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"editUserView\": () => (/* binding */ editUserView),\n/* harmony export */   \"loginView\": () => (/* binding */ loginView),\n/* harmony export */   \"registerView\": () => (/* binding */ registerView),\n/* harmony export */   \"userProfileView\": () => (/* binding */ userProfileView),\n/* harmony export */   \"usersListView\": () => (/* binding */ usersListView)\n/* harmony export */ });\n/* harmony import */ var _services_DataService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/DataService.js */ \"./src/services/DataService.js\");\n/* harmony import */ var _templates_EditUserTemplate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/EditUserTemplate.js */ \"./src/templates/EditUserTemplate.js\");\n/* harmony import */ var _templates_LoginTemplate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/LoginTemplate.js */ \"./src/templates/LoginTemplate.js\");\n/* harmony import */ var _templates_RegisterTemplate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/RegisterTemplate.js */ \"./src/templates/RegisterTemplate.js\");\n/* harmony import */ var _templates_UserProfileTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/UserProfileTemplate.js */ \"./src/templates/UserProfileTemplate.js\");\n/* harmony import */ var _templates_UserTemplate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/UserTemplate.js */ \"./src/templates/UserTemplate.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, \"prototype\", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } else if (call !== void 0) { throw new TypeError(\"Derived constructors may only return object or undefined\"); } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\n\n\n\n\nvar BaseView = /*#__PURE__*/function () {\n  function BaseView(DataService) {\n    _classCallCheck(this, BaseView);\n\n    this.DataService = DataService;\n  }\n\n  _createClass(BaseView, [{\n    key: \"render\",\n    value: function render() {\n      return this.template();\n    }\n  }, {\n    key: \"getAllUsersData\",\n    value: function getAllUsersData() {\n      return this.DataService.getAllUsers();\n    }\n  }, {\n    key: \"getCurrLoggedInUserData\",\n    value: function getCurrLoggedInUserData() {\n      return this.DataService.getCurrLoggedInUser();\n    }\n  }]);\n\n  return BaseView;\n}();\n\nvar EditUserView = /*#__PURE__*/function (_BaseView) {\n  _inherits(EditUserView, _BaseView);\n\n  var _super = _createSuper(EditUserView);\n\n  function EditUserView(DataService) {\n    var _this;\n\n    _classCallCheck(this, EditUserView);\n\n    _this = _super.call(this, DataService);\n    _this.template = _templates_EditUserTemplate_js__WEBPACK_IMPORTED_MODULE_1__.editUserTemplate;\n    return _this;\n  }\n\n  _createClass(EditUserView, [{\n    key: \"render\",\n    value: function render() {\n      var data = this.getCurrLoggedInUserData();\n      return this.template(data);\n    }\n  }]);\n\n  return EditUserView;\n}(BaseView);\n\nvar LoginView = /*#__PURE__*/function (_BaseView2) {\n  _inherits(LoginView, _BaseView2);\n\n  var _super2 = _createSuper(LoginView);\n\n  function LoginView(DataService) {\n    var _this2;\n\n    _classCallCheck(this, LoginView);\n\n    _this2 = _super2.call(this, DataService);\n    _this2.template = _templates_LoginTemplate_js__WEBPACK_IMPORTED_MODULE_2__.loginTemplate;\n    return _this2;\n  }\n\n  return _createClass(LoginView);\n}(BaseView);\n\nvar RegisterView = /*#__PURE__*/function (_BaseView3) {\n  _inherits(RegisterView, _BaseView3);\n\n  var _super3 = _createSuper(RegisterView);\n\n  function RegisterView(DataService) {\n    var _this3;\n\n    _classCallCheck(this, RegisterView);\n\n    _this3 = _super3.call(this, DataService);\n    _this3.template = _templates_RegisterTemplate_js__WEBPACK_IMPORTED_MODULE_3__.registerTemplate;\n    return _this3;\n  }\n\n  return _createClass(RegisterView);\n}(BaseView);\n\nvar UserProfileView = /*#__PURE__*/function (_BaseView4) {\n  _inherits(UserProfileView, _BaseView4);\n\n  var _super4 = _createSuper(UserProfileView);\n\n  function UserProfileView(DataService) {\n    var _this4;\n\n    _classCallCheck(this, UserProfileView);\n\n    _this4 = _super4.call(this, DataService);\n    _this4.template = _templates_UserProfileTemplate_js__WEBPACK_IMPORTED_MODULE_4__.userProfileTemplate;\n    return _this4;\n  }\n\n  _createClass(UserProfileView, [{\n    key: \"render\",\n    value: function render(userId) {\n      var userData = this.DataService.getUserByUserId(userId);\n      return this.template(userData);\n    }\n  }]);\n\n  return UserProfileView;\n}(BaseView);\n\nvar UsersListView = /*#__PURE__*/function (_BaseView5) {\n  _inherits(UsersListView, _BaseView5);\n\n  var _super5 = _createSuper(UsersListView);\n\n  function UsersListView(DataService) {\n    var _this5;\n\n    _classCallCheck(this, UsersListView);\n\n    _this5 = _super5.call(this, DataService);\n    _this5.template = _templates_UserTemplate_js__WEBPACK_IMPORTED_MODULE_5__.userTemplate;\n    return _this5;\n  }\n\n  _createClass(UsersListView, [{\n    key: \"render\",\n    value: function render() {\n      var allUsers = this.getAllUsersData();\n      var currLoggedInUser = this.getCurrLoggedInUserData(); //Display logged in user at the top of the page\n\n      var usersListLayout = \"\\n            <div id=\\\"currentlyLoggedInUser\\\">\\n                Logged in as:<br>\\n                \".concat(currLoggedInUser.username, \"<br>\\n                <a href=\\\"#displayLoginForm\\\" id=\\\"logOutLink\\\">Sign out</a>\\n            </div>\"); //Display list with all users\n\n      for (var i = 0; i < allUsers.length; i++) {\n        var user = JSON.parse(JSON.stringify(allUsers[i]));\n        usersListLayout += this.template(user, currLoggedInUser, i);\n      }\n\n      return \"\".concat(usersListLayout);\n    }\n  }]);\n\n  return UsersListView;\n}(BaseView);\n\nvar editUserView = new EditUserView(_services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar loginView = new LoginView(_services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar registerView = new RegisterView(_services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar userProfileView = new UserProfileView(_services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nvar usersListView = new UsersListView(_services_DataService_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/views.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/sass/main.scss":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/sass/main.scss ***!
  \****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* Reset all margins & padding */\\n* {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\nhtml {\\n  height: 100%;\\n  width: 100%;\\n}\\n\\n/* 3 column layout using flexbox */\\nbody {\\n  display: flex;\\n  flex-direction: column;\\n  height: 100%;\\n}\\n\\nheader, footer {\\n  background: #e6e7e7;\\n  font-family: \\\"Shadows Into Light\\\", cursive;\\n  padding: 10px 16px;\\n}\\n\\n/* Sticky behavior of the header*/\\nheader {\\n  position: sticky;\\n  top: 0;\\n}\\n\\n/* Page content */\\n.columns {\\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\\n  display: flex;\\n  flex-grow: 1;\\n  flex-wrap: wrap;\\n}\\n\\n.column {\\n  flex: 33.33%;\\n}\\n\\n#navigation {\\n  background: #cff1f9;\\n}\\n\\n#feed {\\n  background: #f9f4c2;\\n}\\n\\n#news {\\n  background: #fdedf6;\\n}\\n\\nform {\\n  border: 3px solid #ffffff;\\n}\\n\\n/* Full-width inputs */\\ninput[type=text], input[type=password], input[type=email] {\\n  width: 100%;\\n  border: 1px solid #ccc;\\n  box-sizing: border-box;\\n  margin: 8px 0px;\\n  padding: 12px 20px;\\n}\\n\\nbutton, #backBtnLink, #cancelBtnLink, #editBtnLink, #showProfileBtnLink {\\n  background-color: #04AA6D;\\n  border: none;\\n  color: #ffffff;\\n  cursor: pointer;\\n  margin: 8px 0px;\\n  padding: 14px 20px;\\n  text-decoration: none;\\n  width: 100%;\\n}\\n\\n/* Add a hover effect for buttons */\\nbutton:hover {\\n  opacity: 0.8;\\n}\\n\\n/* Add padding to containers */\\n.container {\\n  padding: 16px;\\n}\\n\\n#currentlyLoggedInUser {\\n  text-align: right;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/styles/sass/main.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/sass/main.scss":
/*!***********************************!*\
  !*** ./src/styles/sass/main.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./main.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/sass/main.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./src/styles/sass/main.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://issoft_fe_tc_basic_1104/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;