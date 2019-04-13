(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["register-register-module"],{

/***/ "./src/app/register/register-page/register.component.css":
/*!***************************************************************!*\
  !*** ./src/app/register/register-page/register.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.medium-list{\n  margin: auto;\n  width: auto;\n  padding:10px\n}\n\n.list-viewer-wrapper {\n  border: 1px solid rgba(0, 0, 0, .03);\n  box-shadow: 0 2px 2px rgba(0, 0, 0, .24), 0 0 2px rgba(0, 0, 0, .12);\n  margin: 20px;\n}\n\n.list-header-title {\n  color: rgba(0, 0, 0, .54);\n  background: rgba(0, 0, 0, .03);\n  padding: 8px 20px;\n  font-weight: bold;\n}\n\n.form-container {\n  display: flex;\n  flex-direction: column; \n  padding: 20px;\n  \n}\n\n.form-button {\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto;  \n  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXItcGFnZS9yZWdpc3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1g7QUFDRjs7QUFFQTtFQUNFLG9DQUFvQztFQUNwQyxvRUFBb0U7RUFDcEUsWUFBWTtBQUNkOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLDhCQUE4QjtFQUM5QixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixhQUFhOztBQUVmOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtFQUNqQixrQkFBa0I7O0FBRXBCIiwiZmlsZSI6InNyYy9hcHAvcmVnaXN0ZXIvcmVnaXN0ZXItcGFnZS9yZWdpc3Rlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ubWVkaXVtLWxpc3R7XG4gIG1hcmdpbjogYXV0bztcbiAgd2lkdGg6IGF1dG87XG4gIHBhZGRpbmc6MTBweFxufVxuXG4ubGlzdC12aWV3ZXItd3JhcHBlciB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgLjAzKTtcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IHJnYmEoMCwgMCwgMCwgLjI0KSwgMCAwIDJweCByZ2JhKDAsIDAsIDAsIC4xMik7XG4gIG1hcmdpbjogMjBweDtcbn1cblxuLmxpc3QtaGVhZGVyLXRpdGxlIHtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjU0KTtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAuMDMpO1xuICBwYWRkaW5nOiA4cHggMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5mb3JtLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFxuICBwYWRkaW5nOiAyMHB4O1xuICBcbn1cblxuLmZvcm0tYnV0dG9uIHtcbiAgd2lkdGg6IDkwJTtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bzsgIFxuICBcbn0iXX0= */"

/***/ }),

/***/ "./src/app/register/register-page/register.component.html":
/*!****************************************************************!*\
  !*** ./src/app/register/register-page/register.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class = \"medium-list\">\n  <div class=\"list-viewer-wrapper\">\n    <div class=\"list-header-title\">Register</div>\n      <!-- Error that will display if the entire form is not valid -->\n    <div *ngIf=\"form.errors\" class = \"alert alert-danger\">\n        User or Password is invalid!\n    </div>\n    \n    <form [formGroup] = \"form\" (ngSubmit) = \"onSubmit()\">\n\n      <!-- Username Field -->\n      <div class=\"form-container\">\n        <mat-form-field>\n\n            <!-- Associate key from ts file: username -->\n            <input \n                formControlName = \"username\"\n                matInput\n                id=\"username\" \n                type=\"email\" \n                class=\"form-control\"\n                placeholder=\"Hunter Email...\">\n        </mat-form-field>\n        <div *ngIf=\"username.touched && username.invalid\" \n              class=\"alert alert-danger\">\n              <mat-error *ngIf=\"username.errors.required\">Email is <strong>Required!</strong></mat-error>\n        </div>\n      </div>\n      \n      <!-- Password Field -->\n      <div class=\"form-container\">\n          <mat-form-field>\n  \n              <!-- Associate key from ts file: username -->\n              <input \n                  formControlName = \"password\"\n                  matInput\n                  id=\"password\" \n                  type=\"text\" \n                  class=\"form-control\"\n                  placeholder=\"Password...\">\n          </mat-form-field>\n          <div *ngIf=\"password.touched && password.invalid\" \n                class=\"alert alert-danger\">\n                <mat-error *ngIf=\"password.errors.required\">Password <strong>Required!</strong></mat-error>\n          </div>\n      </div>\n\n      <!-- Confirm Password Field -->\n      <div class=\"form-container\">\n          <mat-form-field>\n  \n              <!-- Associate key from ts file: username -->\n              <input \n                  formControlName = \"password2\"\n                  matInput\n                  id=\"password2\" \n                  type=\"text\" \n                  class=\"form-control\"\n                  placeholder=\"Confirm Password...\">\n          </mat-form-field>\n          <div *ngIf=\"password2.touched && password2.invalid\" \n                class=\"alert alert-danger\">\n                <mat-error *ngIf=\"password2.errors.required\">Password <strong>Required!</strong></mat-error>\n          </div>\n      </div>\n\n        <div class=\"form-container\">\n            <button class=\"form-button\" mat-raised-button color = \"primary\" type=\"submit\" [disabled] = \"!form.valid\">Register</button>\n            <br>\n            <button class=\"form-button\"  mat-raised-button color = \"primary\" routerLink=\"/login\">Login</button>\n        </div>      \n\n    </form>\n\n  </div>\n</div>\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/register/register-page/register.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/register/register-page/register.component.ts ***!
  \**************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _shared_dbAccess_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/dbAccess/user.service */ "./src/app/shared/dbAccess/user.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_models_register_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/models/register.model */ "./src/app/shared/models/register.model.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





//Needed to implement Reactive Forms

var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, router, formBuilder) {
        this.userService = userService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.user = new _shared_models_register_model__WEBPACK_IMPORTED_MODULE_4__["RegisterModel"]();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.form = this.formBuilder.group({
            username: [this.user.username, [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required
                ]],
            password: [this.user.password, [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(6)
                ]],
            password2: [this.user.password2, [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].minLength(6)
                ]]
        });
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.user = Object.assign({}, this.form.value);
        if (this.user.password != this.user.password2) {
            alert("Password did not matche!");
        }
        else {
            this.userService.registerUser(this.user.username, this.user.password)
                .subscribe(function (data) {
                console.log(data);
                //storing json object to localStorage
                localStorage.setItem('accessToken', data.token);
                if (data.success) {
                    _this.router.navigate(['/home']);
                    console.log(_this.user.username + " registered");
                }
                else {
                    alert(data.error);
                    _this.router.navigate(['/register']);
                }
                ;
            });
        }
    };
    Object.defineProperty(RegisterComponent.prototype, "username", {
        get: function () {
            return this.form.get('username');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "password", {
        get: function () {
            return this.form.get('password');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "password2", {
        get: function () {
            return this.form.get('password2');
        },
        enumerable: true,
        configurable: true
    });
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register-page/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register-page/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_dbAccess_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/register/register-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/register/register-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: RegisterRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterRoutingModule", function() { return RegisterRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _register_page_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register-page/register.component */ "./src/app/register/register-page/register.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var routes = [
    {
        path: '',
        component: _register_page_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"]
    }
];
var RegisterRoutingModule = /** @class */ (function () {
    function RegisterRoutingModule() {
    }
    RegisterRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], RegisterRoutingModule);
    return RegisterRoutingModule;
}());



/***/ }),

/***/ "./src/app/register/register.module.ts":
/*!*********************************************!*\
  !*** ./src/app/register/register.module.ts ***!
  \*********************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _register_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register-routing.module */ "./src/app/register/register-routing.module.ts");
/* harmony import */ var _register_page_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register-page/register.component */ "./src/app/register/register-page/register.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");






//Material Components





var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_register_page_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _register_routing_module__WEBPACK_IMPORTED_MODULE_3__["RegisterRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                //Angular Material
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTabsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"]
            ]
        })
    ], RegisterModule);
    return RegisterModule;
}());



/***/ }),

/***/ "./src/app/shared/models/register.model.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/models/register.model.ts ***!
  \*************************************************/
/*! exports provided: RegisterModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModel", function() { return RegisterModel; });
var RegisterModel = /** @class */ (function () {
    function RegisterModel() {
        this.username = '';
        this.password = '';
        this.password2 = '';
    }
    return RegisterModel;
}());



/***/ })

}]);
//# sourceMappingURL=register-register-module.js.map