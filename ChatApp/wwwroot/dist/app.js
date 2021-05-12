/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@microsoft/signalr/dist/esm/AbortController.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/AbortController.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortController": () => (/* binding */ AbortController)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Rough polyfill of https://developer.mozilla.org/en-US/docs/Web/API/AbortController
// We don't actually ever use the API being polyfilled, we always use the polyfill because
// it's a very new API right now.
// Not exported from index.
/** @private */
var AbortController = /** @class */ (function () {
    function AbortController() {
        this.isAborted = false;
        this.onabort = null;
    }
    AbortController.prototype.abort = function () {
        if (!this.isAborted) {
            this.isAborted = true;
            if (this.onabort) {
                this.onabort();
            }
        }
    };
    Object.defineProperty(AbortController.prototype, "signal", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbortController.prototype, "aborted", {
        get: function () {
            return this.isAborted;
        },
        enumerable: true,
        configurable: true
    });
    return AbortController;
}());

//# sourceMappingURL=AbortController.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultHttpClient": () => (/* binding */ DefaultHttpClient)
/* harmony export */ });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@microsoft/signalr/dist/esm/Errors.js");
/* harmony import */ var _FetchHttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FetchHttpClient */ "./node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@microsoft/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
/* harmony import */ var _XhrHttpClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./XhrHttpClient */ "./node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/** Default implementation of {@link @microsoft/signalr.HttpClient}. */
var DefaultHttpClient = /** @class */ (function (_super) {
    __extends(DefaultHttpClient, _super);
    /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
    function DefaultHttpClient(logger) {
        var _this = _super.call(this) || this;
        if (typeof fetch !== "undefined" || _Utils__WEBPACK_IMPORTED_MODULE_3__.Platform.isNode) {
            _this.httpClient = new _FetchHttpClient__WEBPACK_IMPORTED_MODULE_1__.FetchHttpClient(logger);
        }
        else if (typeof XMLHttpRequest !== "undefined") {
            _this.httpClient = new _XhrHttpClient__WEBPACK_IMPORTED_MODULE_4__.XhrHttpClient(logger);
        }
        else {
            throw new Error("No usable HttpClient found.");
        }
        return _this;
    }
    /** @inheritDoc */
    DefaultHttpClient.prototype.send = function (request) {
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return this.httpClient.send(request);
    };
    DefaultHttpClient.prototype.getCookieString = function (url) {
        return this.httpClient.getCookieString(url);
    };
    return DefaultHttpClient;
}(_HttpClient__WEBPACK_IMPORTED_MODULE_2__.HttpClient));

//# sourceMappingURL=DefaultHttpClient.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/DefaultReconnectPolicy.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/DefaultReconnectPolicy.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultReconnectPolicy": () => (/* binding */ DefaultReconnectPolicy)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// 0, 2, 10, 30 second delays before reconnect attempts.
var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS = [0, 2000, 10000, 30000, null];
/** @private */
var DefaultReconnectPolicy = /** @class */ (function () {
    function DefaultReconnectPolicy(retryDelays) {
        this.retryDelays = retryDelays !== undefined ? retryDelays.concat([null]) : DEFAULT_RETRY_DELAYS_IN_MILLISECONDS;
    }
    DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds = function (retryContext) {
        return this.retryDelays[retryContext.previousRetryCount];
    };
    return DefaultReconnectPolicy;
}());

//# sourceMappingURL=DefaultReconnectPolicy.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/Errors.js":
/*!************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/Errors.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpError": () => (/* binding */ HttpError),
/* harmony export */   "TimeoutError": () => (/* binding */ TimeoutError),
/* harmony export */   "AbortError": () => (/* binding */ AbortError)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** Error thrown when an HTTP request fails. */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
     *
     * @param {string} errorMessage A descriptive error message.
     * @param {number} statusCode The HTTP status code represented by this error.
     */
    function HttpError(errorMessage, statusCode) {
        var _newTarget = this.constructor;
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        _this.statusCode = statusCode;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return HttpError;
}(Error));

/** Error thrown when a timeout elapses. */
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function TimeoutError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "A timeout occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return TimeoutError;
}(Error));

/** Error thrown when an action is aborted. */
var AbortError = /** @class */ (function (_super) {
    __extends(AbortError, _super);
    /** Constructs a new instance of {@link AbortError}.
     *
     * @param {string} errorMessage A descriptive error message.
     */
    function AbortError(errorMessage) {
        var _newTarget = this.constructor;
        if (errorMessage === void 0) { errorMessage = "An abort occurred."; }
        var _this = this;
        var trueProto = _newTarget.prototype;
        _this = _super.call(this, errorMessage) || this;
        // Workaround issue in Typescript compiler
        // https://github.com/Microsoft/TypeScript/issues/13965#issuecomment-278570200
        _this.__proto__ = trueProto;
        return _this;
    }
    return AbortError;
}(Error));

//# sourceMappingURL=Errors.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/FetchHttpClient.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FetchHttpClient": () => (/* binding */ FetchHttpClient)
/* harmony export */ });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@microsoft/signalr/dist/esm/Errors.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@microsoft/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FetchHttpClient = /** @class */ (function (_super) {
    __extends(FetchHttpClient, _super);
    function FetchHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        if (typeof fetch === "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc =  true ? require : 0;
            // Cookies aren't automatically handled in Node so we need to add a CookieJar to preserve cookies across requests
            _this.jar = new (requireFunc("tough-cookie")).CookieJar();
            _this.fetchType = requireFunc("node-fetch");
            // node-fetch doesn't have a nice API for getting and setting cookies
            // fetch-cookie will wrap a fetch implementation with a default CookieJar or a provided one
            _this.fetchType = requireFunc("fetch-cookie")(_this.fetchType, _this.jar);
            // Node needs EventListener methods on AbortController which our custom polyfill doesn't provide
            _this.abortControllerType = requireFunc("abort-controller");
        }
        else {
            _this.fetchType = fetch.bind(self);
            _this.abortControllerType = AbortController;
        }
        return _this;
    }
    /** @inheritDoc */
    FetchHttpClient.prototype.send = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var abortController, error, timeoutId, msTimeout, response, e_1, content, payload;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check that abort was not signaled before calling send
                        if (request.abortSignal && request.abortSignal.aborted) {
                            throw new _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError();
                        }
                        if (!request.method) {
                            throw new Error("No method defined.");
                        }
                        if (!request.url) {
                            throw new Error("No url defined.");
                        }
                        abortController = new this.abortControllerType();
                        // Hook our abortSignal into the abort controller
                        if (request.abortSignal) {
                            request.abortSignal.onabort = function () {
                                abortController.abort();
                                error = new _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError();
                            };
                        }
                        timeoutId = null;
                        if (request.timeout) {
                            msTimeout = request.timeout;
                            timeoutId = setTimeout(function () {
                                abortController.abort();
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "Timeout from HTTP request.");
                                error = new _Errors__WEBPACK_IMPORTED_MODULE_0__.TimeoutError();
                            }, msTimeout);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.fetchType(request.url, {
                                body: request.content,
                                cache: "no-cache",
                                credentials: request.withCredentials === true ? "include" : "same-origin",
                                headers: __assign({ "Content-Type": "text/plain;charset=UTF-8", "X-Requested-With": "XMLHttpRequest" }, request.headers),
                                method: request.method,
                                mode: "cors",
                                redirect: "manual",
                                signal: abortController.signal,
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        if (error) {
                            throw error;
                        }
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "Error from HTTP request. " + e_1 + ".");
                        throw e_1;
                    case 4:
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        if (request.abortSignal) {
                            request.abortSignal.onabort = null;
                        }
                        return [7 /*endfinally*/];
                    case 5:
                        if (!response.ok) {
                            throw new _Errors__WEBPACK_IMPORTED_MODULE_0__.HttpError(response.statusText, response.status);
                        }
                        content = deserializeContent(response, request.responseType);
                        return [4 /*yield*/, content];
                    case 6:
                        payload = _a.sent();
                        return [2 /*return*/, new _HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpResponse(response.status, response.statusText, payload)];
                }
            });
        });
    };
    FetchHttpClient.prototype.getCookieString = function (url) {
        var cookies = "";
        if (_Utils__WEBPACK_IMPORTED_MODULE_3__.Platform.isNode && this.jar) {
            // @ts-ignore: unused variable
            this.jar.getCookies(url, function (e, c) { return cookies = c.join("; "); });
        }
        return cookies;
    };
    return FetchHttpClient;
}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpClient));

function deserializeContent(response, responseType) {
    var content;
    switch (responseType) {
        case "arraybuffer":
            content = response.arrayBuffer();
            break;
        case "text":
            content = response.text();
            break;
        case "blob":
        case "document":
        case "json":
            throw new Error(responseType + " is not supported.");
        default:
            content = response.text();
            break;
    }
    return content;
}
//# sourceMappingURL=FetchHttpClient.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandshakeProtocol": () => (/* binding */ HandshakeProtocol)
/* harmony export */ });
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextMessageFormat */ "./node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/** @private */
var HandshakeProtocol = /** @class */ (function () {
    function HandshakeProtocol() {
    }
    // Handshake request is always JSON
    HandshakeProtocol.prototype.writeHandshakeRequest = function (handshakeRequest) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__.TextMessageFormat.write(JSON.stringify(handshakeRequest));
    };
    HandshakeProtocol.prototype.parseHandshakeResponse = function (data) {
        var responseMessage;
        var messageData;
        var remainingData;
        if ((0,_Utils__WEBPACK_IMPORTED_MODULE_1__.isArrayBuffer)(data) || (typeof Buffer !== "undefined" && data instanceof Buffer)) {
            // Format is binary but still need to read JSON text from handshake response
            var binaryData = new Uint8Array(data);
            var separatorIndex = binaryData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__.TextMessageFormat.RecordSeparatorCode);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = String.fromCharCode.apply(null, binaryData.slice(0, responseLength));
            remainingData = (binaryData.byteLength > responseLength) ? binaryData.slice(responseLength).buffer : null;
        }
        else {
            var textData = data;
            var separatorIndex = textData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__.TextMessageFormat.RecordSeparator);
            if (separatorIndex === -1) {
                throw new Error("Message is incomplete.");
            }
            // content before separator is handshake response
            // optional content after is additional messages
            var responseLength = separatorIndex + 1;
            messageData = textData.substring(0, responseLength);
            remainingData = (textData.length > responseLength) ? textData.substring(responseLength) : null;
        }
        // At this point we should have just the single handshake message
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__.TextMessageFormat.parse(messageData);
        var response = JSON.parse(messages[0]);
        if (response.type) {
            throw new Error("Expected a handshake response from the server.");
        }
        responseMessage = response;
        // multiple messages could have arrived with handshake
        // return additional data to be parsed as usual, or null if all parsed
        return [remainingData, responseMessage];
    };
    return HandshakeProtocol;
}());

//# sourceMappingURL=HandshakeProtocol.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/HttpClient.js":
/*!****************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/HttpClient.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpResponse": () => (/* binding */ HttpResponse),
/* harmony export */   "HttpClient": () => (/* binding */ HttpClient)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/** Represents an HTTP response. */
var HttpResponse = /** @class */ (function () {
    function HttpResponse(statusCode, statusText, content) {
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.content = content;
    }
    return HttpResponse;
}());

/** Abstraction over an HTTP client.
 *
 * This class provides an abstraction over an HTTP client so that a different implementation can be provided on different platforms.
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url, options) {
        return this.send(__assign({}, options, { method: "GET", url: url }));
    };
    HttpClient.prototype.post = function (url, options) {
        return this.send(__assign({}, options, { method: "POST", url: url }));
    };
    HttpClient.prototype.delete = function (url, options) {
        return this.send(__assign({}, options, { method: "DELETE", url: url }));
    };
    /** Gets all cookies that apply to the specified URL.
     *
     * @param url The URL that the cookies are valid for.
     * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
     */
    // @ts-ignore
    HttpClient.prototype.getCookieString = function (url) {
        return "";
    };
    return HttpClient;
}());

//# sourceMappingURL=HttpClient.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/HttpConnection.js":
/*!********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/HttpConnection.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpConnection": () => (/* binding */ HttpConnection),
/* harmony export */   "TransportSendQueue": () => (/* binding */ TransportSendQueue)
/* harmony export */ });
/* harmony import */ var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultHttpClient */ "./node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LongPollingTransport */ "./node_modules/@microsoft/signalr/dist/esm/LongPollingTransport.js");
/* harmony import */ var _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ServerSentEventsTransport */ "./node_modules/@microsoft/signalr/dist/esm/ServerSentEventsTransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
/* harmony import */ var _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WebSocketTransport */ "./node_modules/@microsoft/signalr/dist/esm/WebSocketTransport.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var MAX_REDIRECTS = 100;
/** @private */
var HttpConnection = /** @class */ (function () {
    function HttpConnection(url, options) {
        if (options === void 0) { options = {}; }
        this.stopPromiseResolver = function () { };
        this.features = {};
        this.negotiateVersion = 1;
        _Utils__WEBPACK_IMPORTED_MODULE_5__.Arg.isRequired(url, "url");
        this.logger = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.createLogger)(options.logger);
        this.baseUrl = this.resolveUrl(url);
        options = options || {};
        options.logMessageContent = options.logMessageContent === undefined ? false : options.logMessageContent;
        if (typeof options.withCredentials === "boolean" || options.withCredentials === undefined) {
            options.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
        }
        else {
            throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
        }
        var webSocketModule = null;
        var eventSourceModule = null;
        if (_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isNode && "function" !== "undefined") {
            // In order to ignore the dynamic require in webpack builds we need to do this magic
            // @ts-ignore: TS doesn't know about these names
            var requireFunc =  true ? require : 0;
            webSocketModule = requireFunc("ws");
            eventSourceModule = requireFunc("eventsource");
        }
        if (!_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isNode && typeof WebSocket !== "undefined" && !options.WebSocket) {
            options.WebSocket = WebSocket;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isNode && !options.WebSocket) {
            if (webSocketModule) {
                options.WebSocket = webSocketModule;
            }
        }
        if (!_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isNode && typeof EventSource !== "undefined" && !options.EventSource) {
            options.EventSource = EventSource;
        }
        else if (_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isNode && !options.EventSource) {
            if (typeof eventSourceModule !== "undefined") {
                options.EventSource = eventSourceModule;
            }
        }
        this.httpClient = options.httpClient || new _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__.DefaultHttpClient(this.logger);
        this.connectionState = "Disconnected" /* Disconnected */;
        this.connectionStarted = false;
        this.options = options;
        this.onreceive = null;
        this.onclose = null;
    }
    HttpConnection.prototype.start = function (transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var message, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transferFormat = transferFormat || _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat.Binary;
                        _Utils__WEBPACK_IMPORTED_MODULE_5__.Arg.isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat, "transferFormat");
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Starting connection with transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat[transferFormat] + "'.");
                        if (this.connectionState !== "Disconnected" /* Disconnected */) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = "Connecting" /* Connecting */;
                        this.startInternalPromise = this.startInternal(transferFormat);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 1:
                        _a.sent();
                        if (!(this.connectionState === "Disconnecting" /* Disconnecting */)) return [3 /*break*/, 3];
                        message = "Failed to start the HttpConnection before stop() was called.";
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, message);
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        // We cannot await stopPromise inside startInternal since stopInternal awaits the startInternalPromise.
                        _a.sent();
                        return [2 /*return*/, Promise.reject(new Error(message))];
                    case 3:
                        if (this.connectionState !== "Connected" /* Connected */) {
                            message = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        _a.label = 4;
                    case 4:
                        this.connectionStarted = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.send = function (data) {
        if (this.connectionState !== "Connected" /* Connected */) {
            return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."));
        }
        if (!this.sendQueue) {
            this.sendQueue = new TransportSendQueue(this.transport);
        }
        // Transport will not be null if state is connected
        return this.sendQueue.send(data);
    };
    HttpConnection.prototype.stop = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState === "Disconnected" /* Disconnected */) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnected state.");
                            return [2 /*return*/, Promise.resolve()];
                        }
                        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
                            return [2 /*return*/, this.stopPromise];
                        }
                        this.connectionState = "Disconnecting" /* Disconnecting */;
                        this.stopPromise = new Promise(function (resolve) {
                            // Don't complete stop() until stopConnection() completes.
                            _this.stopPromiseResolver = resolve;
                        });
                        // stopInternal should never throw so just observe it.
                        return [4 /*yield*/, this.stopInternal(error)];
                    case 1:
                        // stopInternal should never throw so just observe it.
                        _a.sent();
                        return [4 /*yield*/, this.stopPromise];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.stopInternal = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Set error as soon as possible otherwise there is a race between
                        // the transport closing and providing an error and the error from a close message
                        // We would prefer the close message error.
                        this.stopError = error;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternalPromise];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!this.transport) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.transport.stop()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "HttpConnection.transport.stop() threw error '" + e_2 + "'.");
                        this.stopConnection();
                        return [3 /*break*/, 8];
                    case 8:
                        this.transport = undefined;
                        return [3 /*break*/, 10];
                    case 9:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.startInternal = function (transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var url, negotiateResponse, redirects, _loop_1, this_1, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.baseUrl;
                        this.accessTokenFactory = this.options.accessTokenFactory;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        if (!this.options.skipNegotiation) return [3 /*break*/, 5];
                        if (!(this.options.transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.WebSockets)) return [3 /*break*/, 3];
                        // No need to add a connection ID in this case
                        this.transport = this.constructTransport(_ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.WebSockets);
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        return [4 /*yield*/, this.startTransport(url, transferFormat)];
                    case 2:
                        // We should just call connect directly in this case.
                        // No fallback or negotiate in this case.
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        negotiateResponse = null;
                        redirects = 0;
                        _loop_1 = function () {
                            var accessToken_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.getNegotiationResponse(url)];
                                    case 1:
                                        negotiateResponse = _a.sent();
                                        // the user tries to stop the connection when it is being started
                                        if (this_1.connectionState === "Disconnecting" /* Disconnecting */ || this_1.connectionState === "Disconnected" /* Disconnected */) {
                                            throw new Error("The connection was stopped during negotiation.");
                                        }
                                        if (negotiateResponse.error) {
                                            throw new Error(negotiateResponse.error);
                                        }
                                        if (negotiateResponse.ProtocolVersion) {
                                            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
                                        }
                                        if (negotiateResponse.url) {
                                            url = negotiateResponse.url;
                                        }
                                        if (negotiateResponse.accessToken) {
                                            accessToken_1 = negotiateResponse.accessToken;
                                            this_1.accessTokenFactory = function () { return accessToken_1; };
                                        }
                                        redirects++;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 6;
                    case 6: return [5 /*yield**/, _loop_1()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (negotiateResponse.url && redirects < MAX_REDIRECTS) return [3 /*break*/, 6];
                        _a.label = 9;
                    case 9:
                        if (redirects === MAX_REDIRECTS && negotiateResponse.url) {
                            throw new Error("Negotiate redirection limit exceeded.");
                        }
                        return [4 /*yield*/, this.createTransport(url, this.options.transport, negotiateResponse, transferFormat)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (this.transport instanceof _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__.LongPollingTransport) {
                            this.features.inherentKeepAlive = true;
                        }
                        if (this.connectionState === "Connecting" /* Connecting */) {
                            // Ensure the connection transitions to the connected state prior to completing this.startInternalPromise.
                            // start() will handle the case when stop was called and startInternal exits still in the disconnecting state.
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "The HttpConnection connected successfully.");
                            this.connectionState = "Connected" /* Connected */;
                        }
                        return [3 /*break*/, 13];
                    case 12:
                        e_3 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "Failed to start the connection: " + e_3);
                        this.connectionState = "Disconnected" /* Disconnected */;
                        this.transport = undefined;
                        // if start fails, any active calls to stop assume that start will complete the stop promise
                        this.stopPromiseResolver();
                        return [2 /*return*/, Promise.reject(e_3)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.getNegotiationResponse = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, token, _a, name, value, negotiateUrl, response, negotiateResponse, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {};
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _b.sent();
                        if (token) {
                            headers["Authorization"] = "Bearer " + token;
                        }
                        _b.label = 2;
                    case 2:
                        _a = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.getUserAgentHeader)(), name = _a[0], value = _a[1];
                        headers[name] = value;
                        negotiateUrl = this.resolveNegotiateUrl(url);
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Sending negotiation request: " + negotiateUrl + ".");
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.httpClient.post(negotiateUrl, {
                                content: "",
                                headers: __assign({}, headers, this.options.headers),
                                withCredentials: this.options.withCredentials,
                            })];
                    case 4:
                        response = _b.sent();
                        if (response.statusCode !== 200) {
                            return [2 /*return*/, Promise.reject(new Error("Unexpected status code returned from negotiate '" + response.statusCode + "'"))];
                        }
                        negotiateResponse = JSON.parse(response.content);
                        if (!negotiateResponse.negotiateVersion || negotiateResponse.negotiateVersion < 1) {
                            // Negotiate version 0 doesn't use connectionToken
                            // So we set it equal to connectionId so all our logic can use connectionToken without being aware of the negotiate version
                            negotiateResponse.connectionToken = negotiateResponse.connectionId;
                        }
                        return [2 /*return*/, negotiateResponse];
                    case 5:
                        e_4 = _b.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "Failed to complete negotiation with the server: " + e_4);
                        return [2 /*return*/, Promise.reject(e_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpConnection.prototype.createConnectUrl = function (url, connectionToken) {
        if (!connectionToken) {
            return url;
        }
        return url + (url.indexOf("?") === -1 ? "?" : "&") + ("id=" + connectionToken);
    };
    HttpConnection.prototype.createTransport = function (url, requestedTransport, negotiateResponse, requestedTransferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var connectUrl, transportExceptions, transports, negotiate, _i, transports_1, endpoint, transportOrError, ex_1, ex_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectUrl = this.createConnectUrl(url, negotiateResponse.connectionToken);
                        if (!this.isITransport(requestedTransport)) return [3 /*break*/, 2];
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly.");
                        this.transport = requestedTransport;
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 1:
                        _a.sent();
                        this.connectionId = negotiateResponse.connectionId;
                        return [2 /*return*/];
                    case 2:
                        transportExceptions = [];
                        transports = negotiateResponse.availableTransports || [];
                        negotiate = negotiateResponse;
                        _i = 0, transports_1 = transports;
                        _a.label = 3;
                    case 3:
                        if (!(_i < transports_1.length)) return [3 /*break*/, 13];
                        endpoint = transports_1[_i];
                        transportOrError = this.resolveTransportOrError(endpoint, requestedTransport, requestedTransferFormat);
                        if (!(transportOrError instanceof Error)) return [3 /*break*/, 4];
                        // Store the error and continue, we don't want to cause a re-negotiate in these cases
                        transportExceptions.push(endpoint.transport + " failed: " + transportOrError);
                        return [3 /*break*/, 12];
                    case 4:
                        if (!this.isITransport(transportOrError)) return [3 /*break*/, 12];
                        this.transport = transportOrError;
                        if (!!negotiate) return [3 /*break*/, 9];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.getNegotiationResponse(url)];
                    case 6:
                        negotiate = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        ex_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(ex_1)];
                    case 8:
                        connectUrl = this.createConnectUrl(url, negotiate.connectionToken);
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.startTransport(connectUrl, requestedTransferFormat)];
                    case 10:
                        _a.sent();
                        this.connectionId = negotiate.connectionId;
                        return [2 /*return*/];
                    case 11:
                        ex_2 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "Failed to start the transport '" + endpoint.transport + "': " + ex_2);
                        negotiate = undefined;
                        transportExceptions.push(endpoint.transport + " failed: " + ex_2);
                        if (this.connectionState !== "Connecting" /* Connecting */) {
                            message = "Failed to select transport before stop() was called.";
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, message);
                            return [2 /*return*/, Promise.reject(new Error(message))];
                        }
                        return [3 /*break*/, 12];
                    case 12:
                        _i++;
                        return [3 /*break*/, 3];
                    case 13:
                        if (transportExceptions.length > 0) {
                            return [2 /*return*/, Promise.reject(new Error("Unable to connect to the server with any of the available transports. " + transportExceptions.join(" ")))];
                        }
                        return [2 /*return*/, Promise.reject(new Error("None of the transports supported by the client are supported by the server."))];
                }
            });
        });
    };
    HttpConnection.prototype.constructTransport = function (transport) {
        switch (transport) {
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.WebSockets:
                if (!this.options.WebSocket) {
                    throw new Error("'WebSocket' is not supported in your environment.");
                }
                return new _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__.WebSocketTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.WebSocket, this.options.headers || {});
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.ServerSentEvents:
                if (!this.options.EventSource) {
                    throw new Error("'EventSource' is not supported in your environment.");
                }
                return new _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__.ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.EventSource, this.options.withCredentials, this.options.headers || {});
            case _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.LongPolling:
                return new _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__.LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || false, this.options.withCredentials, this.options.headers || {});
            default:
                throw new Error("Unknown transport: " + transport + ".");
        }
    };
    HttpConnection.prototype.startTransport = function (url, transferFormat) {
        var _this = this;
        this.transport.onreceive = this.onreceive;
        this.transport.onclose = function (e) { return _this.stopConnection(e); };
        return this.transport.connect(url, transferFormat);
    };
    HttpConnection.prototype.resolveTransportOrError = function (endpoint, requestedTransport, requestedTransferFormat) {
        var transport = _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[endpoint.transport];
        if (transport === null || transport === undefined) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
            return new Error("Skipping transport '" + endpoint.transport + "' because it is not supported by this client.");
        }
        else {
            if (transportMatches(requestedTransport, transport)) {
                var transferFormats = endpoint.transferFormats.map(function (s) { return _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat[s]; });
                if (transferFormats.indexOf(requestedTransferFormat) >= 0) {
                    if ((transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.WebSockets && !this.options.WebSocket) ||
                        (transport === _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType.ServerSentEvents && !this.options.EventSource)) {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' because it is not supported in your environment.'");
                        return new Error("'" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' is not supported in your environment.");
                    }
                    else {
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Selecting transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "'.");
                        try {
                            return this.constructTransport(transport);
                        }
                        catch (ex) {
                            return ex;
                        }
                    }
                }
                else {
                    this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' because it does not support the requested transfer format '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat[requestedTransferFormat] + "'.");
                    return new Error("'" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' does not support " + _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat[requestedTransferFormat] + ".");
                }
            }
            else {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Skipping transport '" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' because it was disabled by the client.");
                return new Error("'" + _ITransport__WEBPACK_IMPORTED_MODULE_2__.HttpTransportType[transport] + "' is disabled by the client.");
            }
        }
    };
    HttpConnection.prototype.isITransport = function (transport) {
        return transport && typeof (transport) === "object" && "connect" in transport;
    };
    HttpConnection.prototype.stopConnection = function (error) {
        var _this = this;
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "HttpConnection.stopConnection(" + error + ") called while in state " + this.connectionState + ".");
        this.transport = undefined;
        // If we have a stopError, it takes precedence over the error from the transport
        error = this.stopError || error;
        this.stopError = undefined;
        if (this.connectionState === "Disconnected" /* Disconnected */) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Debug, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is already in the disconnected state.");
            return;
        }
        if (this.connectionState === "Connecting" /* Connecting */) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Warning, "Call to HttpConnection.stopConnection(" + error + ") was ignored because the connection is still in the connecting state.");
            throw new Error("HttpConnection.stopConnection(" + error + ") was called while the connection is still in the connecting state.");
        }
        if (this.connectionState === "Disconnecting" /* Disconnecting */) {
            // A call to stop() induced this call to stopConnection and needs to be completed.
            // Any stop() awaiters will be scheduled to continue after the onclose callback fires.
            this.stopPromiseResolver();
        }
        if (error) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "Connection disconnected with error '" + error + "'.");
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Information, "Connection disconnected.");
        }
        if (this.sendQueue) {
            this.sendQueue.stop().catch(function (e) {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "TransportSendQueue.stop() threw error '" + e + "'.");
            });
            this.sendQueue = undefined;
        }
        this.connectionId = undefined;
        this.connectionState = "Disconnected" /* Disconnected */;
        if (this.connectionStarted) {
            this.connectionStarted = false;
            try {
                if (this.onclose) {
                    this.onclose(error);
                }
            }
            catch (e) {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Error, "HttpConnection.onclose(" + error + ") threw error '" + e + "'.");
            }
        }
    };
    HttpConnection.prototype.resolveUrl = function (url) {
        // startsWith is not supported in IE
        if (url.lastIndexOf("https://", 0) === 0 || url.lastIndexOf("http://", 0) === 0) {
            return url;
        }
        if (!_Utils__WEBPACK_IMPORTED_MODULE_5__.Platform.isBrowser || !window.document) {
            throw new Error("Cannot resolve '" + url + "'.");
        }
        // Setting the url to the href propery of an anchor tag handles normalization
        // for us. There are 3 main cases.
        // 1. Relative path normalization e.g "b" -> "http://localhost:5000/a/b"
        // 2. Absolute path normalization e.g "/a/b" -> "http://localhost:5000/a/b"
        // 3. Networkpath reference normalization e.g "//localhost:5000/a/b" -> "http://localhost:5000/a/b"
        var aTag = window.document.createElement("a");
        aTag.href = url;
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Information, "Normalizing '" + url + "' to '" + aTag.href + "'.");
        return aTag.href;
    };
    HttpConnection.prototype.resolveNegotiateUrl = function (url) {
        var index = url.indexOf("?");
        var negotiateUrl = url.substring(0, index === -1 ? url.length : index);
        if (negotiateUrl[negotiateUrl.length - 1] !== "/") {
            negotiateUrl += "/";
        }
        negotiateUrl += "negotiate";
        negotiateUrl += index === -1 ? "" : url.substring(index);
        if (negotiateUrl.indexOf("negotiateVersion") === -1) {
            negotiateUrl += index === -1 ? "?" : "&";
            negotiateUrl += "negotiateVersion=" + this.negotiateVersion;
        }
        return negotiateUrl;
    };
    return HttpConnection;
}());

function transportMatches(requestedTransport, actualTransport) {
    return !requestedTransport || ((actualTransport & requestedTransport) !== 0);
}
/** @private */
var TransportSendQueue = /** @class */ (function () {
    function TransportSendQueue(transport) {
        this.transport = transport;
        this.buffer = [];
        this.executing = true;
        this.sendBufferedData = new PromiseSource();
        this.transportResult = new PromiseSource();
        this.sendLoopPromise = this.sendLoop();
    }
    TransportSendQueue.prototype.send = function (data) {
        this.bufferData(data);
        if (!this.transportResult) {
            this.transportResult = new PromiseSource();
        }
        return this.transportResult.promise;
    };
    TransportSendQueue.prototype.stop = function () {
        this.executing = false;
        this.sendBufferedData.resolve();
        return this.sendLoopPromise;
    };
    TransportSendQueue.prototype.bufferData = function (data) {
        if (this.buffer.length && typeof (this.buffer[0]) !== typeof (data)) {
            throw new Error("Expected data to be of type " + typeof (this.buffer) + " but was of type " + typeof (data));
        }
        this.buffer.push(data);
        this.sendBufferedData.resolve();
    };
    TransportSendQueue.prototype.sendLoop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transportResult, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (false) {}
                        return [4 /*yield*/, this.sendBufferedData.promise];
                    case 1:
                        _a.sent();
                        if (!this.executing) {
                            if (this.transportResult) {
                                this.transportResult.reject("Connection stopped.");
                            }
                            return [3 /*break*/, 6];
                        }
                        this.sendBufferedData = new PromiseSource();
                        transportResult = this.transportResult;
                        this.transportResult = undefined;
                        data = typeof (this.buffer[0]) === "string" ?
                            this.buffer.join("") :
                            TransportSendQueue.concatBuffers(this.buffer);
                        this.buffer.length = 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.transport.send(data)];
                    case 3:
                        _a.sent();
                        transportResult.resolve();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        transportResult.reject(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 0];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TransportSendQueue.concatBuffers = function (arrayBuffers) {
        var totalLength = arrayBuffers.map(function (b) { return b.byteLength; }).reduce(function (a, b) { return a + b; });
        var result = new Uint8Array(totalLength);
        var offset = 0;
        for (var _i = 0, arrayBuffers_1 = arrayBuffers; _i < arrayBuffers_1.length; _i++) {
            var item = arrayBuffers_1[_i];
            result.set(new Uint8Array(item), offset);
            offset += item.byteLength;
        }
        return result.buffer;
    };
    return TransportSendQueue;
}());

var PromiseSource = /** @class */ (function () {
    function PromiseSource() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            var _a;
            return _a = [resolve, reject], _this.resolver = _a[0], _this.rejecter = _a[1], _a;
        });
    }
    PromiseSource.prototype.resolve = function () {
        this.resolver();
    };
    PromiseSource.prototype.reject = function (reason) {
        this.rejecter(reason);
    };
    return PromiseSource;
}());
//# sourceMappingURL=HttpConnection.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/HubConnection.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/HubConnection.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HubConnectionState": () => (/* binding */ HubConnectionState),
/* harmony export */   "HubConnection": () => (/* binding */ HubConnection)
/* harmony export */ });
/* harmony import */ var _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HandshakeProtocol */ "./node_modules/@microsoft/signalr/dist/esm/HandshakeProtocol.js");
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subject */ "./node_modules/@microsoft/signalr/dist/esm/Subject.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var DEFAULT_TIMEOUT_IN_MS = 30 * 1000;
var DEFAULT_PING_INTERVAL_IN_MS = 15 * 1000;
/** Describes the current state of the {@link HubConnection} to the server. */
var HubConnectionState;
(function (HubConnectionState) {
    /** The hub connection is disconnected. */
    HubConnectionState["Disconnected"] = "Disconnected";
    /** The hub connection is connecting. */
    HubConnectionState["Connecting"] = "Connecting";
    /** The hub connection is connected. */
    HubConnectionState["Connected"] = "Connected";
    /** The hub connection is disconnecting. */
    HubConnectionState["Disconnecting"] = "Disconnecting";
    /** The hub connection is reconnecting. */
    HubConnectionState["Reconnecting"] = "Reconnecting";
})(HubConnectionState || (HubConnectionState = {}));
/** Represents a connection to a SignalR Hub. */
var HubConnection = /** @class */ (function () {
    function HubConnection(connection, logger, protocol, reconnectPolicy) {
        var _this = this;
        this.nextKeepAlive = 0;
        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isRequired(connection, "connection");
        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isRequired(logger, "logger");
        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isRequired(protocol, "protocol");
        this.serverTimeoutInMilliseconds = DEFAULT_TIMEOUT_IN_MS;
        this.keepAliveIntervalInMilliseconds = DEFAULT_PING_INTERVAL_IN_MS;
        this.logger = logger;
        this.protocol = protocol;
        this.connection = connection;
        this.reconnectPolicy = reconnectPolicy;
        this.handshakeProtocol = new _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__.HandshakeProtocol();
        this.connection.onreceive = function (data) { return _this.processIncomingData(data); };
        this.connection.onclose = function (error) { return _this.connectionClosed(error); };
        this.callbacks = {};
        this.methods = {};
        this.closedCallbacks = [];
        this.reconnectingCallbacks = [];
        this.reconnectedCallbacks = [];
        this.invocationId = 0;
        this.receivedHandshakeResponse = false;
        this.connectionState = HubConnectionState.Disconnected;
        this.connectionStarted = false;
        this.cachedPingMessage = this.protocol.writeMessage({ type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Ping });
    }
    /** @internal */
    // Using a public static factory method means we can have a private constructor and an _internal_
    // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
    // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
    // public parameter-less constructor.
    HubConnection.create = function (connection, logger, protocol, reconnectPolicy) {
        return new HubConnection(connection, logger, protocol, reconnectPolicy);
    };
    Object.defineProperty(HubConnection.prototype, "state", {
        /** Indicates the state of the {@link HubConnection} to the server. */
        get: function () {
            return this.connectionState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "connectionId", {
        /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
         *  in the disconnected state or if the negotiation step was skipped.
         */
        get: function () {
            return this.connection ? (this.connection.connectionId || null) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HubConnection.prototype, "baseUrl", {
        /** Indicates the url of the {@link HubConnection} to the server. */
        get: function () {
            return this.connection.baseUrl || "";
        },
        /**
         * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
         * Reconnecting states.
         * @param {string} url The url to connect to.
         */
        set: function (url) {
            if (this.connectionState !== HubConnectionState.Disconnected && this.connectionState !== HubConnectionState.Reconnecting) {
                throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
            }
            if (!url) {
                throw new Error("The HubConnection url must be a valid url.");
            }
            this.connection.baseUrl = url;
        },
        enumerable: true,
        configurable: true
    });
    /** Starts the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
     */
    HubConnection.prototype.start = function () {
        this.startPromise = this.startWithStateTransitions();
        return this.startPromise;
    };
    HubConnection.prototype.startWithStateTransitions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.connectionState !== HubConnectionState.Disconnected) {
                            return [2 /*return*/, Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."))];
                        }
                        this.connectionState = HubConnectionState.Connecting;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Starting HubConnection.");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.startInternal()];
                    case 2:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.connectionStarted = true;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "HubConnection connected successfully.");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.connectionState = HubConnectionState.Disconnected;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "HubConnection failed to start successfully because of error '" + e_1 + "'.");
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.startInternal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handshakePromise, handshakeRequest, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.stopDuringStartError = undefined;
                        this.receivedHandshakeResponse = false;
                        handshakePromise = new Promise(function (resolve, reject) {
                            _this.handshakeResolver = resolve;
                            _this.handshakeRejecter = reject;
                        });
                        return [4 /*yield*/, this.connection.start(this.protocol.transferFormat)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        handshakeRequest = {
                            protocol: this.protocol.name,
                            version: this.protocol.version,
                        };
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Sending handshake request.");
                        return [4 /*yield*/, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];
                    case 3:
                        _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Using HubProtocol '" + this.protocol.name + "'.");
                        // defensively cleanup timeout in case we receive a message from the server before we finish start
                        this.cleanupTimeout();
                        this.resetTimeoutPeriod();
                        this.resetKeepAliveInterval();
                        return [4 /*yield*/, handshakePromise];
                    case 4:
                        _a.sent();
                        // It's important to check the stopDuringStartError instead of just relying on the handshakePromise
                        // being rejected on close, because this continuation can run after both the handshake completed successfully
                        // and the connection was closed.
                        if (this.stopDuringStartError) {
                            // It's important to throw instead of returning a rejected promise, because we don't want to allow any state
                            // transitions to occur between now and the calling code observing the exceptions. Returning a rejected promise
                            // will cause the calling continuation to get scheduled to run later.
                            throw this.stopDuringStartError;
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        e_2 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Hub handshake failed with error '" + e_2 + "' during start(). Stopping HubConnection.");
                        this.cleanupTimeout();
                        this.cleanupPingTimer();
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        return [4 /*yield*/, this.connection.stop(e_2)];
                    case 6:
                        // HttpConnection.stop() should not complete until after the onclose callback is invoked.
                        // This will transition the HubConnection to the disconnected state before HttpConnection.stop() completes.
                        _a.sent();
                        throw e_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /** Stops the connection.
     *
     * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
     */
    HubConnection.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startPromise, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startPromise = this.startPromise;
                        this.stopPromise = this.stopInternal();
                        return [4 /*yield*/, this.stopPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        // Awaiting undefined continues immediately
                        return [4 /*yield*/, startPromise];
                    case 3:
                        // Awaiting undefined continues immediately
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.stopInternal = function (error) {
        if (this.connectionState === HubConnectionState.Disconnected) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Call to HubConnection.stop(" + error + ") ignored because it is already in the disconnected state.");
            return Promise.resolve();
        }
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Call to HttpConnection.stop(" + error + ") ignored because the connection is already in the disconnecting state.");
            return this.stopPromise;
        }
        this.connectionState = HubConnectionState.Disconnecting;
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Stopping HubConnection.");
        if (this.reconnectDelayHandle) {
            // We're in a reconnect delay which means the underlying connection is currently already stopped.
            // Just clear the handle to stop the reconnect loop (which no one is waiting on thankfully) and
            // fire the onclose callbacks.
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Connection stopped during reconnect delay. Done reconnecting.");
            clearTimeout(this.reconnectDelayHandle);
            this.reconnectDelayHandle = undefined;
            this.completeClose();
            return Promise.resolve();
        }
        this.cleanupTimeout();
        this.cleanupPingTimer();
        this.stopDuringStartError = error || new Error("The connection was stopped before the hub handshake could complete.");
        // HttpConnection.stop() should not complete until after either HttpConnection.start() fails
        // or the onclose callback is invoked. The onclose callback will transition the HubConnection
        // to the disconnected state if need be before HttpConnection.stop() completes.
        return this.connection.stop(error);
    };
    /** Invokes a streaming hub method on the server using the specified name and arguments.
     *
     * @typeparam T The type of the items returned by the server.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
     */
    HubConnection.prototype.stream = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createStreamInvocation(methodName, args, streamIds);
        var promiseQueue;
        var subject = new _Subject__WEBPACK_IMPORTED_MODULE_3__.Subject();
        subject.cancelCallback = function () {
            var cancelInvocation = _this.createCancelInvocation(invocationDescriptor.invocationId);
            delete _this.callbacks[invocationDescriptor.invocationId];
            return promiseQueue.then(function () {
                return _this.sendWithProtocol(cancelInvocation);
            });
        };
        this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
            if (error) {
                subject.error(error);
                return;
            }
            else if (invocationEvent) {
                // invocationEvent will not be null when an error is not passed to the callback
                if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion) {
                    if (invocationEvent.error) {
                        subject.error(new Error(invocationEvent.error));
                    }
                    else {
                        subject.complete();
                    }
                }
                else {
                    subject.next((invocationEvent.item));
                }
            }
        };
        promiseQueue = this.sendWithProtocol(invocationDescriptor)
            .catch(function (e) {
            subject.error(e);
            delete _this.callbacks[invocationDescriptor.invocationId];
        });
        this.launchStreams(streams, promiseQueue);
        return subject;
    };
    HubConnection.prototype.sendMessage = function (message) {
        this.resetKeepAliveInterval();
        return this.connection.send(message);
    };
    /**
     * Sends a js object to the server.
     * @param message The js object to serialize and send.
     */
    HubConnection.prototype.sendWithProtocol = function (message) {
        return this.sendMessage(this.protocol.writeMessage(message));
    };
    /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
     *
     * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
     * be processing the invocation.
     *
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
     */
    HubConnection.prototype.send = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var sendPromise = this.sendWithProtocol(this.createInvocation(methodName, args, true, streamIds));
        this.launchStreams(streams, sendPromise);
        return sendPromise;
    };
    /** Invokes a hub method on the server using the specified name and arguments.
     *
     * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
     * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
     * resolving the Promise.
     *
     * @typeparam T The expected return type.
     * @param {string} methodName The name of the server method to invoke.
     * @param {any[]} args The arguments used to invoke the server method.
     * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
     */
    HubConnection.prototype.invoke = function (methodName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this.replaceStreamingParams(args), streams = _a[0], streamIds = _a[1];
        var invocationDescriptor = this.createInvocation(methodName, args, false, streamIds);
        var p = new Promise(function (resolve, reject) {
            // invocationId will always have a value for a non-blocking invocation
            _this.callbacks[invocationDescriptor.invocationId] = function (invocationEvent, error) {
                if (error) {
                    reject(error);
                    return;
                }
                else if (invocationEvent) {
                    // invocationEvent will not be null when an error is not passed to the callback
                    if (invocationEvent.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion) {
                        if (invocationEvent.error) {
                            reject(new Error(invocationEvent.error));
                        }
                        else {
                            resolve(invocationEvent.result);
                        }
                    }
                    else {
                        reject(new Error("Unexpected message type: " + invocationEvent.type));
                    }
                }
            };
            var promiseQueue = _this.sendWithProtocol(invocationDescriptor)
                .catch(function (e) {
                reject(e);
                // invocationId will always have a value for a non-blocking invocation
                delete _this.callbacks[invocationDescriptor.invocationId];
            });
            _this.launchStreams(streams, promiseQueue);
        });
        return p;
    };
    /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
     *
     * @param {string} methodName The name of the hub method to define.
     * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
     */
    HubConnection.prototype.on = function (methodName, newMethod) {
        if (!methodName || !newMethod) {
            return;
        }
        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }
        // Preventing adding the same handler multiple times.
        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }
        this.methods[methodName].push(newMethod);
    };
    HubConnection.prototype.off = function (methodName, method) {
        if (!methodName) {
            return;
        }
        methodName = methodName.toLowerCase();
        var handlers = this.methods[methodName];
        if (!handlers) {
            return;
        }
        if (method) {
            var removeIdx = handlers.indexOf(method);
            if (removeIdx !== -1) {
                handlers.splice(removeIdx, 1);
                if (handlers.length === 0) {
                    delete this.methods[methodName];
                }
            }
        }
        else {
            delete this.methods[methodName];
        }
    };
    /** Registers a handler that will be invoked when the connection is closed.
     *
     * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
     */
    HubConnection.prototype.onclose = function (callback) {
        if (callback) {
            this.closedCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection starts reconnecting.
     *
     * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
     */
    HubConnection.prototype.onreconnecting = function (callback) {
        if (callback) {
            this.reconnectingCallbacks.push(callback);
        }
    };
    /** Registers a handler that will be invoked when the connection successfully reconnects.
     *
     * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
     */
    HubConnection.prototype.onreconnected = function (callback) {
        if (callback) {
            this.reconnectedCallbacks.push(callback);
        }
    };
    HubConnection.prototype.processIncomingData = function (data) {
        this.cleanupTimeout();
        if (!this.receivedHandshakeResponse) {
            data = this.processHandshakeResponse(data);
            this.receivedHandshakeResponse = true;
        }
        // Data may have all been read when processing handshake response
        if (data) {
            // Parse the messages
            var messages = this.protocol.parseMessages(data, this.logger);
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                switch (message.type) {
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Invocation:
                        this.invokeClientMethod(message);
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.StreamItem:
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion:
                        var callback = this.callbacks[message.invocationId];
                        if (callback) {
                            if (message.type === _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion) {
                                delete this.callbacks[message.invocationId];
                            }
                            callback(message);
                        }
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Ping:
                        // Don't care about pings
                        break;
                    case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Close:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Close message received from server.");
                        var error = message.error ? new Error("Server returned an error on close: " + message.error) : undefined;
                        if (message.allowReconnect === true) {
                            // It feels wrong not to await connection.stop() here, but processIncomingData is called as part of an onreceive callback which is not async,
                            // this is already the behavior for serverTimeout(), and HttpConnection.Stop() should catch and log all possible exceptions.
                            // tslint:disable-next-line:no-floating-promises
                            this.connection.stop(error);
                        }
                        else {
                            // We cannot await stopInternal() here, but subsequent calls to stop() will await this if stopInternal() is still ongoing.
                            this.stopPromise = this.stopInternal(error);
                        }
                        break;
                    default:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "Invalid message type: " + message.type + ".");
                        break;
                }
            }
        }
        this.resetTimeoutPeriod();
    };
    HubConnection.prototype.processHandshakeResponse = function (data) {
        var _a;
        var responseMessage;
        var remainingData;
        try {
            _a = this.handshakeProtocol.parseHandshakeResponse(data), remainingData = _a[0], responseMessage = _a[1];
        }
        catch (e) {
            var message = "Error parsing handshake response: " + e;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        if (responseMessage.error) {
            var message = "Server returned handshake error: " + responseMessage.error;
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, message);
            var error = new Error(message);
            this.handshakeRejecter(error);
            throw error;
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Server handshake complete.");
        }
        this.handshakeResolver();
        return remainingData;
    };
    HubConnection.prototype.resetKeepAliveInterval = function () {
        if (this.connection.features.inherentKeepAlive) {
            return;
        }
        // Set the time we want the next keep alive to be sent
        // Timer will be setup on next message receive
        this.nextKeepAlive = new Date().getTime() + this.keepAliveIntervalInMilliseconds;
        this.cleanupPingTimer();
    };
    HubConnection.prototype.resetTimeoutPeriod = function () {
        var _this = this;
        if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
            // Set the timeout timer
            this.timeoutHandle = setTimeout(function () { return _this.serverTimeout(); }, this.serverTimeoutInMilliseconds);
            // Set keepAlive timer if there isn't one
            if (this.pingServerHandle === undefined) {
                var nextPing = this.nextKeepAlive - new Date().getTime();
                if (nextPing < 0) {
                    nextPing = 0;
                }
                // The timer needs to be set from a networking callback to avoid Chrome timer throttling from causing timers to run once a minute
                this.pingServerHandle = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(this.connectionState === HubConnectionState.Connected)) return [3 /*break*/, 4];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, this.sendMessage(this.cachedPingMessage)];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                _a = _b.sent();
                                // We don't care about the error. It should be seen elsewhere in the client.
                                // The connection is probably in a bad or closed state now, cleanup the timer so it stops triggering
                                this.cleanupPingTimer();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, nextPing);
            }
        }
    };
    HubConnection.prototype.serverTimeout = function () {
        // The server hasn't talked to us in a while. It doesn't like us anymore ... :(
        // Terminate the connection, but we don't need to wait on the promise. This could trigger reconnecting.
        // tslint:disable-next-line:no-floating-promises
        this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
    };
    HubConnection.prototype.invokeClientMethod = function (invocationMessage) {
        var _this = this;
        var methods = this.methods[invocationMessage.target.toLowerCase()];
        if (methods) {
            try {
                methods.forEach(function (m) { return m.apply(_this, invocationMessage.arguments); });
            }
            catch (e) {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "A callback for the method " + invocationMessage.target.toLowerCase() + " threw error '" + e + "'.");
            }
            if (invocationMessage.invocationId) {
                // This is not supported in v1. So we return an error to avoid blocking the server waiting for the response.
                var message = "Server requested a response, which is not supported in this version of the client.";
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, message);
                // We don't want to wait on the stop itself.
                this.stopPromise = this.stopInternal(new Error(message));
            }
        }
        else {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "No client method with the name '" + invocationMessage.target + "' found.");
        }
    };
    HubConnection.prototype.connectionClosed = function (error) {
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "HubConnection.connectionClosed(" + error + ") called while in state " + this.connectionState + ".");
        // Triggering this.handshakeRejecter is insufficient because it could already be resolved without the continuation having run yet.
        this.stopDuringStartError = this.stopDuringStartError || error || new Error("The underlying connection was closed before the hub handshake could complete.");
        // If the handshake is in progress, start will be waiting for the handshake promise, so we complete it.
        // If it has already completed, this should just noop.
        if (this.handshakeResolver) {
            this.handshakeResolver();
        }
        this.cancelCallbacksWithError(error || new Error("Invocation canceled due to the underlying connection being closed."));
        this.cleanupTimeout();
        this.cleanupPingTimer();
        if (this.connectionState === HubConnectionState.Disconnecting) {
            this.completeClose(error);
        }
        else if (this.connectionState === HubConnectionState.Connected && this.reconnectPolicy) {
            // tslint:disable-next-line:no-floating-promises
            this.reconnect(error);
        }
        else if (this.connectionState === HubConnectionState.Connected) {
            this.completeClose(error);
        }
        // If none of the above if conditions were true were called the HubConnection must be in either:
        // 1. The Connecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail it.
        // 2. The Reconnecting state in which case the handshakeResolver will complete it and stopDuringStartError will fail the current reconnect attempt
        //    and potentially continue the reconnect() loop.
        // 3. The Disconnected state in which case we're already done.
    };
    HubConnection.prototype.completeClose = function (error) {
        var _this = this;
        if (this.connectionStarted) {
            this.connectionState = HubConnectionState.Disconnected;
            this.connectionStarted = false;
            try {
                this.closedCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
            }
            catch (e) {
                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "An onclose callback called with error '" + error + "' threw error '" + e + "'.");
            }
        }
    };
    HubConnection.prototype.reconnect = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var reconnectStartTime, previousReconnectAttempts, retryError, nextRetryDelay, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reconnectStartTime = Date.now();
                        previousReconnectAttempts = 0;
                        retryError = error !== undefined ? error : new Error("Attempting to reconnect due to a unknown error.");
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, 0, retryError);
                        if (nextRetryDelay === null) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");
                            this.completeClose(error);
                            return [2 /*return*/];
                        }
                        this.connectionState = HubConnectionState.Reconnecting;
                        if (error) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Connection reconnecting because of error '" + error + "'.");
                        }
                        else {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Connection reconnecting.");
                        }
                        if (this.onreconnecting) {
                            try {
                                this.reconnectingCallbacks.forEach(function (c) { return c.apply(_this, [error]); });
                            }
                            catch (e) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "An onreconnecting callback called with error '" + error + "' threw error '" + e + "'.");
                            }
                            // Exit early if an onreconnecting callback called connection.stop().
                            if (this.connectionState !== HubConnectionState.Reconnecting) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
                                return [2 /*return*/];
                            }
                        }
                        _a.label = 1;
                    case 1:
                        if (!(nextRetryDelay !== null)) return [3 /*break*/, 7];
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Reconnect attempt number " + previousReconnectAttempts + " will start in " + nextRetryDelay + " ms.");
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.reconnectDelayHandle = setTimeout(resolve, nextRetryDelay);
                            })];
                    case 2:
                        _a.sent();
                        this.reconnectDelayHandle = undefined;
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.startInternal()];
                    case 4:
                        _a.sent();
                        this.connectionState = HubConnectionState.Connected;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "HubConnection reconnected successfully.");
                        if (this.onreconnected) {
                            try {
                                this.reconnectedCallbacks.forEach(function (c) { return c.apply(_this, [_this.connection.connectionId]); });
                            }
                            catch (e) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "An onreconnected callback called with connectionId '" + this.connection.connectionId + "; threw error '" + e + "'.");
                            }
                        }
                        return [2 /*return*/];
                    case 5:
                        e_4 = _a.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Reconnect attempt failed because of error '" + e_4 + "'.");
                        if (this.connectionState !== HubConnectionState.Reconnecting) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Debug, "Connection moved to the '" + this.connectionState + "' from the reconnecting state during reconnect attempt. Done reconnecting.");
                            // The TypeScript compiler thinks that connectionState must be Connected here. The TypeScript compiler is wrong.
                            if (this.connectionState === HubConnectionState.Disconnecting) {
                                this.completeClose();
                            }
                            return [2 /*return*/];
                        }
                        retryError = e_4 instanceof Error ? e_4 : new Error(e_4.toString());
                        nextRetryDelay = this.getNextRetryDelay(previousReconnectAttempts++, Date.now() - reconnectStartTime, retryError);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "Reconnect retries have been exhausted after " + (Date.now() - reconnectStartTime) + " ms and " + previousReconnectAttempts + " failed attempts. Connection disconnecting.");
                        this.completeClose();
                        return [2 /*return*/];
                }
            });
        });
    };
    HubConnection.prototype.getNextRetryDelay = function (previousRetryCount, elapsedMilliseconds, retryReason) {
        try {
            return this.reconnectPolicy.nextRetryDelayInMilliseconds({
                elapsedMilliseconds: elapsedMilliseconds,
                previousRetryCount: previousRetryCount,
                retryReason: retryReason,
            });
        }
        catch (e) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "IRetryPolicy.nextRetryDelayInMilliseconds(" + previousRetryCount + ", " + elapsedMilliseconds + ") threw error '" + e + "'.");
            return null;
        }
    };
    HubConnection.prototype.cancelCallbacksWithError = function (error) {
        var callbacks = this.callbacks;
        this.callbacks = {};
        Object.keys(callbacks)
            .forEach(function (key) {
            var callback = callbacks[key];
            callback(null, error);
        });
    };
    HubConnection.prototype.cleanupPingTimer = function () {
        if (this.pingServerHandle) {
            clearTimeout(this.pingServerHandle);
            this.pingServerHandle = undefined;
        }
    };
    HubConnection.prototype.cleanupTimeout = function () {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    };
    HubConnection.prototype.createInvocation = function (methodName, args, nonblocking, streamIds) {
        if (nonblocking) {
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    streamIds: streamIds,
                    target: methodName,
                    type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    target: methodName,
                    type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Invocation,
                };
            }
        }
        else {
            var invocationId = this.invocationId;
            this.invocationId++;
            if (streamIds.length !== 0) {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    streamIds: streamIds,
                    target: methodName,
                    type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Invocation,
                };
            }
            else {
                return {
                    arguments: args,
                    invocationId: invocationId.toString(),
                    target: methodName,
                    type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Invocation,
                };
            }
        }
    };
    HubConnection.prototype.launchStreams = function (streams, promiseQueue) {
        var _this = this;
        if (streams.length === 0) {
            return;
        }
        // Synchronize stream data so they arrive in-order on the server
        if (!promiseQueue) {
            promiseQueue = Promise.resolve();
        }
        var _loop_1 = function (streamId) {
            streams[streamId].subscribe({
                complete: function () {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId)); });
                },
                error: function (err) {
                    var message;
                    if (err instanceof Error) {
                        message = err.message;
                    }
                    else if (err && err.toString) {
                        message = err.toString();
                    }
                    else {
                        message = "Unknown error";
                    }
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createCompletionMessage(streamId, message)); });
                },
                next: function (item) {
                    promiseQueue = promiseQueue.then(function () { return _this.sendWithProtocol(_this.createStreamItemMessage(streamId, item)); });
                },
            });
        };
        // We want to iterate over the keys, since the keys are the stream ids
        // tslint:disable-next-line:forin
        for (var streamId in streams) {
            _loop_1(streamId);
        }
    };
    HubConnection.prototype.replaceStreamingParams = function (args) {
        var streams = [];
        var streamIds = [];
        for (var i = 0; i < args.length; i++) {
            var argument = args[i];
            if (this.isObservable(argument)) {
                var streamId = this.invocationId;
                this.invocationId++;
                // Store the stream for later use
                streams[streamId] = argument;
                streamIds.push(streamId.toString());
                // remove stream from args
                args.splice(i, 1);
            }
        }
        return [streams, streamIds];
    };
    HubConnection.prototype.isObservable = function (arg) {
        // This allows other stream implementations to just work (like rxjs)
        return arg && arg.subscribe && typeof arg.subscribe === "function";
    };
    HubConnection.prototype.createStreamInvocation = function (methodName, args, streamIds) {
        var invocationId = this.invocationId;
        this.invocationId++;
        if (streamIds.length !== 0) {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                streamIds: streamIds,
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.StreamInvocation,
            };
        }
        else {
            return {
                arguments: args,
                invocationId: invocationId.toString(),
                target: methodName,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.StreamInvocation,
            };
        }
    };
    HubConnection.prototype.createCancelInvocation = function (id) {
        return {
            invocationId: id,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.CancelInvocation,
        };
    };
    HubConnection.prototype.createStreamItemMessage = function (id, item) {
        return {
            invocationId: id,
            item: item,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.StreamItem,
        };
    };
    HubConnection.prototype.createCompletionMessage = function (id, error, result) {
        if (error) {
            return {
                error: error,
                invocationId: id,
                type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion,
            };
        }
        return {
            invocationId: id,
            result: result,
            type: _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__.MessageType.Completion,
        };
    };
    return HubConnection;
}());

//# sourceMappingURL=HubConnection.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HubConnectionBuilder": () => (/* binding */ HubConnectionBuilder)
/* harmony export */ });
/* harmony import */ var _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DefaultReconnectPolicy */ "./node_modules/@microsoft/signalr/dist/esm/DefaultReconnectPolicy.js");
/* harmony import */ var _HttpConnection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpConnection */ "./node_modules/@microsoft/signalr/dist/esm/HttpConnection.js");
/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HubConnection */ "./node_modules/@microsoft/signalr/dist/esm/HubConnection.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./JsonHubProtocol */ "./node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@microsoft/signalr/dist/esm/Loggers.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};







// tslint:disable:object-literal-sort-keys
var LogLevelNameMapping = {
    trace: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Trace,
    debug: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Debug,
    info: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Information,
    information: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Information,
    warn: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Warning,
    warning: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Warning,
    error: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Error,
    critical: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.Critical,
    none: _ILogger__WEBPACK_IMPORTED_MODULE_3__.LogLevel.None,
};
function parseLogLevel(name) {
    // Case-insensitive matching via lower-casing
    // Yes, I know case-folding is a complicated problem in Unicode, but we only support
    // the ASCII strings defined in LogLevelNameMapping anyway, so it's fine -anurse.
    var mapping = LogLevelNameMapping[name.toLowerCase()];
    if (typeof mapping !== "undefined") {
        return mapping;
    }
    else {
        throw new Error("Unknown log level: " + name);
    }
}
/** A builder for configuring {@link @microsoft/signalr.HubConnection} instances. */
var HubConnectionBuilder = /** @class */ (function () {
    function HubConnectionBuilder() {
    }
    HubConnectionBuilder.prototype.configureLogging = function (logging) {
        _Utils__WEBPACK_IMPORTED_MODULE_6__.Arg.isRequired(logging, "logging");
        if (isLogger(logging)) {
            this.logger = logging;
        }
        else if (typeof logging === "string") {
            var logLevel = parseLogLevel(logging);
            this.logger = new _Utils__WEBPACK_IMPORTED_MODULE_6__.ConsoleLogger(logLevel);
        }
        else {
            this.logger = new _Utils__WEBPACK_IMPORTED_MODULE_6__.ConsoleLogger(logging);
        }
        return this;
    };
    HubConnectionBuilder.prototype.withUrl = function (url, transportTypeOrOptions) {
        _Utils__WEBPACK_IMPORTED_MODULE_6__.Arg.isRequired(url, "url");
        _Utils__WEBPACK_IMPORTED_MODULE_6__.Arg.isNotEmpty(url, "url");
        this.url = url;
        // Flow-typing knows where it's at. Since HttpTransportType is a number and IHttpConnectionOptions is guaranteed
        // to be an object, we know (as does TypeScript) this comparison is all we need to figure out which overload was called.
        if (typeof transportTypeOrOptions === "object") {
            this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, transportTypeOrOptions);
        }
        else {
            this.httpConnectionOptions = __assign({}, this.httpConnectionOptions, { transport: transportTypeOrOptions });
        }
        return this;
    };
    /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
     *
     * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
     */
    HubConnectionBuilder.prototype.withHubProtocol = function (protocol) {
        _Utils__WEBPACK_IMPORTED_MODULE_6__.Arg.isRequired(protocol, "protocol");
        this.protocol = protocol;
        return this;
    };
    HubConnectionBuilder.prototype.withAutomaticReconnect = function (retryDelaysOrReconnectPolicy) {
        if (this.reconnectPolicy) {
            throw new Error("A reconnectPolicy has already been set.");
        }
        if (!retryDelaysOrReconnectPolicy) {
            this.reconnectPolicy = new _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__.DefaultReconnectPolicy();
        }
        else if (Array.isArray(retryDelaysOrReconnectPolicy)) {
            this.reconnectPolicy = new _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__.DefaultReconnectPolicy(retryDelaysOrReconnectPolicy);
        }
        else {
            this.reconnectPolicy = retryDelaysOrReconnectPolicy;
        }
        return this;
    };
    /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
     *
     * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
     */
    HubConnectionBuilder.prototype.build = function () {
        // If httpConnectionOptions has a logger, use it. Otherwise, override it with the one
        // provided to configureLogger
        var httpConnectionOptions = this.httpConnectionOptions || {};
        // If it's 'null', the user **explicitly** asked for null, don't mess with it.
        if (httpConnectionOptions.logger === undefined) {
            // If our logger is undefined or null, that's OK, the HttpConnection constructor will handle it.
            httpConnectionOptions.logger = this.logger;
        }
        // Now create the connection
        if (!this.url) {
            throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
        }
        var connection = new _HttpConnection__WEBPACK_IMPORTED_MODULE_1__.HttpConnection(this.url, httpConnectionOptions);
        return _HubConnection__WEBPACK_IMPORTED_MODULE_2__.HubConnection.create(connection, this.logger || _Loggers__WEBPACK_IMPORTED_MODULE_5__.NullLogger.instance, this.protocol || new _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_4__.JsonHubProtocol(), this.reconnectPolicy);
    };
    return HubConnectionBuilder;
}());

function isLogger(logger) {
    return logger.log !== undefined;
}
//# sourceMappingURL=HubConnectionBuilder.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js":
/*!******************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageType": () => (/* binding */ MessageType)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** Defines the type of a Hub Message. */
var MessageType;
(function (MessageType) {
    /** Indicates the message is an Invocation message and implements the {@link @microsoft/signalr.InvocationMessage} interface. */
    MessageType[MessageType["Invocation"] = 1] = "Invocation";
    /** Indicates the message is a StreamItem message and implements the {@link @microsoft/signalr.StreamItemMessage} interface. */
    MessageType[MessageType["StreamItem"] = 2] = "StreamItem";
    /** Indicates the message is a Completion message and implements the {@link @microsoft/signalr.CompletionMessage} interface. */
    MessageType[MessageType["Completion"] = 3] = "Completion";
    /** Indicates the message is a Stream Invocation message and implements the {@link @microsoft/signalr.StreamInvocationMessage} interface. */
    MessageType[MessageType["StreamInvocation"] = 4] = "StreamInvocation";
    /** Indicates the message is a Cancel Invocation message and implements the {@link @microsoft/signalr.CancelInvocationMessage} interface. */
    MessageType[MessageType["CancelInvocation"] = 5] = "CancelInvocation";
    /** Indicates the message is a Ping message and implements the {@link @microsoft/signalr.PingMessage} interface. */
    MessageType[MessageType["Ping"] = 6] = "Ping";
    /** Indicates the message is a Close message and implements the {@link @microsoft/signalr.CloseMessage} interface. */
    MessageType[MessageType["Close"] = 7] = "Close";
})(MessageType || (MessageType = {}));
//# sourceMappingURL=IHubProtocol.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js":
/*!*************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/ILogger.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogLevel": () => (/* binding */ LogLevel)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// These values are designed to match the ASP.NET Log Levels since that's the pattern we're emulating here.
/** Indicates the severity of a log message.
 *
 * Log Levels are ordered in increasing severity. So `Debug` is more severe than `Trace`, etc.
 */
var LogLevel;
(function (LogLevel) {
    /** Log level for very low severity diagnostic messages. */
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    /** Log level for low severity diagnostic messages. */
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    /** Log level for informational diagnostic messages. */
    LogLevel[LogLevel["Information"] = 2] = "Information";
    /** Log level for diagnostic messages that indicate a non-fatal problem. */
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    /** Log level for diagnostic messages that indicate a failure in the current operation. */
    LogLevel[LogLevel["Error"] = 4] = "Error";
    /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
    LogLevel[LogLevel["Critical"] = 5] = "Critical";
    /** The highest possible log level. Used when configuring logging to indicate that no log messages should be emitted. */
    LogLevel[LogLevel["None"] = 6] = "None";
})(LogLevel || (LogLevel = {}));
//# sourceMappingURL=ILogger.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js":
/*!****************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/ITransport.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpTransportType": () => (/* binding */ HttpTransportType),
/* harmony export */   "TransferFormat": () => (/* binding */ TransferFormat)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// This will be treated as a bit flag in the future, so we keep it using power-of-two values.
/** Specifies a specific HTTP transport type. */
var HttpTransportType;
(function (HttpTransportType) {
    /** Specifies no transport preference. */
    HttpTransportType[HttpTransportType["None"] = 0] = "None";
    /** Specifies the WebSockets transport. */
    HttpTransportType[HttpTransportType["WebSockets"] = 1] = "WebSockets";
    /** Specifies the Server-Sent Events transport. */
    HttpTransportType[HttpTransportType["ServerSentEvents"] = 2] = "ServerSentEvents";
    /** Specifies the Long Polling transport. */
    HttpTransportType[HttpTransportType["LongPolling"] = 4] = "LongPolling";
})(HttpTransportType || (HttpTransportType = {}));
/** Specifies the transfer format for a connection. */
var TransferFormat;
(function (TransferFormat) {
    /** Specifies that only text data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Text"] = 1] = "Text";
    /** Specifies that binary data will be transmitted over the connection. */
    TransferFormat[TransferFormat["Binary"] = 2] = "Binary";
})(TransferFormat || (TransferFormat = {}));
//# sourceMappingURL=ITransport.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonHubProtocol": () => (/* binding */ JsonHubProtocol)
/* harmony export */ });
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@microsoft/signalr/dist/esm/Loggers.js");
/* harmony import */ var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextMessageFormat */ "./node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.





var JSON_HUB_PROTOCOL_NAME = "json";
/** Implements the JSON Hub Protocol. */
var JsonHubProtocol = /** @class */ (function () {
    function JsonHubProtocol() {
        /** @inheritDoc */
        this.name = JSON_HUB_PROTOCOL_NAME;
        /** @inheritDoc */
        this.version = 1;
        /** @inheritDoc */
        this.transferFormat = _ITransport__WEBPACK_IMPORTED_MODULE_2__.TransferFormat.Text;
    }
    /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
     *
     * @param {string} input A string containing the serialized representation.
     * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
     */
    JsonHubProtocol.prototype.parseMessages = function (input, logger) {
        // The interface does allow "ArrayBuffer" to be passed in, but this implementation does not. So let's throw a useful error.
        if (typeof input !== "string") {
            throw new Error("Invalid input for JSON hub protocol. Expected a string.");
        }
        if (!input) {
            return [];
        }
        if (logger === null) {
            logger = _Loggers__WEBPACK_IMPORTED_MODULE_3__.NullLogger.instance;
        }
        // Parse the messages
        var messages = _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__.TextMessageFormat.parse(input);
        var hubMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            var parsedMessage = JSON.parse(message);
            if (typeof parsedMessage.type !== "number") {
                throw new Error("Invalid payload.");
            }
            switch (parsedMessage.type) {
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__.MessageType.Invocation:
                    this.isInvocationMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__.MessageType.StreamItem:
                    this.isStreamItemMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__.MessageType.Completion:
                    this.isCompletionMessage(parsedMessage);
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__.MessageType.Ping:
                    // Single value, no need to validate
                    break;
                case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__.MessageType.Close:
                    // All optional values, no need to validate
                    break;
                default:
                    // Future protocol changes can add message types, old clients can ignore them
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__.LogLevel.Information, "Unknown message type '" + parsedMessage.type + "' ignored.");
                    continue;
            }
            hubMessages.push(parsedMessage);
        }
        return hubMessages;
    };
    /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
     *
     * @param {HubMessage} message The message to write.
     * @returns {string} A string containing the serialized representation of the message.
     */
    JsonHubProtocol.prototype.writeMessage = function (message) {
        return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__.TextMessageFormat.write(JSON.stringify(message));
    };
    JsonHubProtocol.prototype.isInvocationMessage = function (message) {
        this.assertNotEmptyString(message.target, "Invalid payload for Invocation message.");
        if (message.invocationId !== undefined) {
            this.assertNotEmptyString(message.invocationId, "Invalid payload for Invocation message.");
        }
    };
    JsonHubProtocol.prototype.isStreamItemMessage = function (message) {
        this.assertNotEmptyString(message.invocationId, "Invalid payload for StreamItem message.");
        if (message.item === undefined) {
            throw new Error("Invalid payload for StreamItem message.");
        }
    };
    JsonHubProtocol.prototype.isCompletionMessage = function (message) {
        if (message.result && message.error) {
            throw new Error("Invalid payload for Completion message.");
        }
        if (!message.result && message.error) {
            this.assertNotEmptyString(message.error, "Invalid payload for Completion message.");
        }
        this.assertNotEmptyString(message.invocationId, "Invalid payload for Completion message.");
    };
    JsonHubProtocol.prototype.assertNotEmptyString = function (value, errorMessage) {
        if (typeof value !== "string" || value === "") {
            throw new Error(errorMessage);
        }
    };
    return JsonHubProtocol;
}());

//# sourceMappingURL=JsonHubProtocol.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/Loggers.js":
/*!*************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/Loggers.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NullLogger": () => (/* binding */ NullLogger)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
/** A logger that does nothing when log messages are sent to it. */
var NullLogger = /** @class */ (function () {
    function NullLogger() {
    }
    /** @inheritDoc */
    // tslint:disable-next-line
    NullLogger.prototype.log = function (_logLevel, _message) {
    };
    /** The singleton instance of the {@link @microsoft/signalr.NullLogger}. */
    NullLogger.instance = new NullLogger();
    return NullLogger;
}());

//# sourceMappingURL=Loggers.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/LongPollingTransport.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/LongPollingTransport.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LongPollingTransport": () => (/* binding */ LongPollingTransport)
/* harmony export */ });
/* harmony import */ var _AbortController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbortController */ "./node_modules/@microsoft/signalr/dist/esm/AbortController.js");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Errors */ "./node_modules/@microsoft/signalr/dist/esm/Errors.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// Not exported from 'index', this type is internal.
/** @private */
var LongPollingTransport = /** @class */ (function () {
    function LongPollingTransport(httpClient, accessTokenFactory, logger, logMessageContent, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.pollAbort = new _AbortController__WEBPACK_IMPORTED_MODULE_0__.AbortController();
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.headers = headers;
        this.running = false;
        this.onreceive = null;
        this.onclose = null;
    }
    Object.defineProperty(LongPollingTransport.prototype, "pollAborted", {
        // This is an internal type, not exported from 'index' so this is really just internal.
        get: function () {
            return this.pollAbort.aborted;
        },
        enumerable: true,
        configurable: true
    });
    LongPollingTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, value, headers, pollOptions, token, pollUrl, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_4__.Arg.isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_3__.TransferFormat, "transferFormat");
                        this.url = url;
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Connecting.");
                        // Allow binary format on Node and Browsers that support binary content (indicated by the presence of responseType property)
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_3__.TransferFormat.Binary &&
                            (typeof XMLHttpRequest !== "undefined" && typeof new XMLHttpRequest().responseType !== "string")) {
                            throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
                        }
                        _b = (0,_Utils__WEBPACK_IMPORTED_MODULE_4__.getUserAgentHeader)(), name = _b[0], value = _b[1];
                        headers = __assign((_a = {}, _a[name] = value, _a), this.headers);
                        pollOptions = {
                            abortSignal: this.pollAbort.signal,
                            headers: headers,
                            timeout: 100000,
                            withCredentials: this.withCredentials,
                        };
                        if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_3__.TransferFormat.Binary) {
                            pollOptions.responseType = "arraybuffer";
                        }
                        return [4 /*yield*/, this.getAccessToken()];
                    case 1:
                        token = _c.sent();
                        this.updateHeaderToken(pollOptions, token);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 2:
                        response = _c.sent();
                        if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Mark running as false so that the poll immediately ends and runs the close logic
                            this.closeError = new _Errors__WEBPACK_IMPORTED_MODULE_1__.HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            this.running = true;
                        }
                        this.receiving = this.poll(this.url, pollOptions);
                        return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    LongPollingTransport.prototype.updateHeaderToken = function (request, token) {
        if (!request.headers) {
            request.headers = {};
        }
        if (token) {
            // tslint:disable-next-line:no-string-literal
            request.headers["Authorization"] = "Bearer " + token;
            return;
        }
        // tslint:disable-next-line:no-string-literal
        if (request.headers["Authorization"]) {
            // tslint:disable-next-line:no-string-literal
            delete request.headers["Authorization"];
        }
    };
    LongPollingTransport.prototype.poll = function (url, pollOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var token, pollUrl, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 8, 9]);
                        _a.label = 1;
                    case 1:
                        if (!this.running) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getAccessToken()];
                    case 2:
                        token = _a.sent();
                        this.updateHeaderToken(pollOptions, token);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        pollUrl = url + "&_=" + Date.now();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) polling: " + pollUrl + ".");
                        return [4 /*yield*/, this.httpClient.get(pollUrl, pollOptions)];
                    case 4:
                        response = _a.sent();
                        if (response.statusCode === 204) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Information, "(LongPolling transport) Poll terminated by server.");
                            this.running = false;
                        }
                        else if (response.statusCode !== 200) {
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + response.statusCode + ".");
                            // Unexpected status code
                            this.closeError = new _Errors__WEBPACK_IMPORTED_MODULE_1__.HttpError(response.statusText || "", response.statusCode);
                            this.running = false;
                        }
                        else {
                            // Process the response
                            if (response.content) {
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) data received. " + (0,_Utils__WEBPACK_IMPORTED_MODULE_4__.getDataDetail)(response.content, this.logMessageContent) + ".");
                                if (this.onreceive) {
                                    this.onreceive(response.content);
                                }
                            }
                            else {
                                // This is another way timeout manifest.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (!this.running) {
                            // Log but disregard errors that occur after stopping
                            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Poll errored after shutdown: " + e_1.message);
                        }
                        else {
                            if (e_1 instanceof _Errors__WEBPACK_IMPORTED_MODULE_1__.TimeoutError) {
                                // Ignore timeouts and reissue the poll.
                                this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
                            }
                            else {
                                // Close the connection with the error as the result.
                                this.closeError = e_1;
                                this.running = false;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Polling complete.");
                        // We will reach here with pollAborted==false when the server returned a response causing the transport to stop.
                        // If pollAborted==true then client initiated the stop and the stop method will raise the close event after DELETE is sent.
                        if (!this.pollAborted) {
                            this.raiseOnClose();
                        }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.running) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, (0,_Utils__WEBPACK_IMPORTED_MODULE_4__.sendMessage)(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    LongPollingTransport.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, name_1, value, deleteOptions, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Stopping polling.");
                        // Tell receiving loop to stop, abort any current request, and then wait for it to finish
                        this.running = false;
                        this.pollAbort.abort();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 5, 6]);
                        return [4 /*yield*/, this.receiving];
                    case 2:
                        _b.sent();
                        // Send DELETE to clean up long polling on the server
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) sending DELETE request to " + this.url + ".");
                        headers = {};
                        _a = (0,_Utils__WEBPACK_IMPORTED_MODULE_4__.getUserAgentHeader)(), name_1 = _a[0], value = _a[1];
                        headers[name_1] = value;
                        deleteOptions = {
                            headers: __assign({}, headers, this.headers),
                            withCredentials: this.withCredentials,
                        };
                        return [4 /*yield*/, this.getAccessToken()];
                    case 3:
                        token = _b.sent();
                        this.updateHeaderToken(deleteOptions, token);
                        return [4 /*yield*/, this.httpClient.delete(this.url, deleteOptions)];
                    case 4:
                        _b.sent();
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) DELETE request sent.");
                        return [3 /*break*/, 6];
                    case 5:
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, "(LongPolling transport) Stop finished.");
                        // Raise close event here instead of in polling
                        // It needs to happen after the DELETE request is sent
                        this.raiseOnClose();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LongPollingTransport.prototype.raiseOnClose = function () {
        if (this.onclose) {
            var logMessage = "(LongPolling transport) Firing onclose event.";
            if (this.closeError) {
                logMessage += " Error: " + this.closeError;
            }
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Trace, logMessage);
            this.onclose(this.closeError);
        }
    };
    return LongPollingTransport;
}());

//# sourceMappingURL=LongPollingTransport.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/ServerSentEventsTransport.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/ServerSentEventsTransport.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerSentEventsTransport": () => (/* binding */ ServerSentEventsTransport)
/* harmony export */ });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/** @private */
var ServerSentEventsTransport = /** @class */ (function () {
    function ServerSentEventsTransport(httpClient, accessTokenFactory, logger, logMessageContent, eventSourceConstructor, withCredentials, headers) {
        this.httpClient = httpClient;
        this.accessTokenFactory = accessTokenFactory;
        this.logger = logger;
        this.logMessageContent = logMessageContent;
        this.withCredentials = withCredentials;
        this.eventSourceConstructor = eventSourceConstructor;
        this.headers = headers;
        this.onreceive = null;
        this.onclose = null;
    }
    ServerSentEventsTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_1__.TransferFormat, "transferFormat");
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(SSE transport) Connecting.");
                        // set url before accessTokenFactory because this.url is only for send and we set the auth header instead of the query string for send
                        this.url = url;
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            var opened = false;
                            if (transferFormat !== _ITransport__WEBPACK_IMPORTED_MODULE_1__.TransferFormat.Text) {
                                reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
                                return;
                            }
                            var eventSource;
                            if (_Utils__WEBPACK_IMPORTED_MODULE_2__.Platform.isBrowser || _Utils__WEBPACK_IMPORTED_MODULE_2__.Platform.isWebWorker) {
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials });
                            }
                            else {
                                // Non-browser passes cookies via the dictionary
                                var cookies = _this.httpClient.getCookieString(url);
                                var headers = {};
                                headers.Cookie = cookies;
                                var _a = (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.getUserAgentHeader)(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                eventSource = new _this.eventSourceConstructor(url, { withCredentials: _this.withCredentials, headers: __assign({}, headers, _this.headers) });
                            }
                            try {
                                eventSource.onmessage = function (e) {
                                    if (_this.onreceive) {
                                        try {
                                            _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(SSE transport) data received. " + (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.getDataDetail)(e.data, _this.logMessageContent) + ".");
                                            _this.onreceive(e.data);
                                        }
                                        catch (error) {
                                            _this.close(error);
                                            return;
                                        }
                                    }
                                };
                                eventSource.onerror = function (e) {
                                    var error = new Error(e.data || "Error occurred");
                                    if (opened) {
                                        _this.close(error);
                                    }
                                    else {
                                        reject(error);
                                    }
                                };
                                eventSource.onopen = function () {
                                    _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Information, "SSE connected to " + _this.url);
                                    _this.eventSource = eventSource;
                                    opened = true;
                                    resolve();
                                };
                            }
                            catch (e) {
                                reject(e);
                                return;
                            }
                        })];
                }
            });
        });
    };
    ServerSentEventsTransport.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.eventSource) {
                    return [2 /*return*/, Promise.reject(new Error("Cannot send until the transport is connected"))];
                }
                return [2 /*return*/, (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.sendMessage)(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, data, this.logMessageContent, this.withCredentials, this.headers)];
            });
        });
    };
    ServerSentEventsTransport.prototype.stop = function () {
        this.close();
        return Promise.resolve();
    };
    ServerSentEventsTransport.prototype.close = function (e) {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = undefined;
            if (this.onclose) {
                this.onclose(e);
            }
        }
    };
    return ServerSentEventsTransport;
}());

//# sourceMappingURL=ServerSentEventsTransport.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/Subject.js":
/*!*************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/Subject.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subject": () => (/* binding */ Subject)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

/** Stream implementation to stream items to the server. */
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.next = function (item) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.next(item);
        }
    };
    Subject.prototype.error = function (err) {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.error) {
                observer.error(err);
            }
        }
    };
    Subject.prototype.complete = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            if (observer.complete) {
                observer.complete();
            }
        }
    };
    Subject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        return new _Utils__WEBPACK_IMPORTED_MODULE_0__.SubjectSubscription(this, observer);
    };
    return Subject;
}());

//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/TextMessageFormat.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextMessageFormat": () => (/* binding */ TextMessageFormat)
/* harmony export */ });
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Not exported from index
/** @private */
var TextMessageFormat = /** @class */ (function () {
    function TextMessageFormat() {
    }
    TextMessageFormat.write = function (output) {
        return "" + output + TextMessageFormat.RecordSeparator;
    };
    TextMessageFormat.parse = function (input) {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error("Message is incomplete.");
        }
        var messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    };
    TextMessageFormat.RecordSeparatorCode = 0x1e;
    TextMessageFormat.RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);
    return TextMessageFormat;
}());

//# sourceMappingURL=TextMessageFormat.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/Utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/Utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "Arg": () => (/* binding */ Arg),
/* harmony export */   "Platform": () => (/* binding */ Platform),
/* harmony export */   "getDataDetail": () => (/* binding */ getDataDetail),
/* harmony export */   "formatArrayBuffer": () => (/* binding */ formatArrayBuffer),
/* harmony export */   "isArrayBuffer": () => (/* binding */ isArrayBuffer),
/* harmony export */   "sendMessage": () => (/* binding */ sendMessage),
/* harmony export */   "createLogger": () => (/* binding */ createLogger),
/* harmony export */   "SubjectSubscription": () => (/* binding */ SubjectSubscription),
/* harmony export */   "ConsoleLogger": () => (/* binding */ ConsoleLogger),
/* harmony export */   "getUserAgentHeader": () => (/* binding */ getUserAgentHeader),
/* harmony export */   "constructUserAgent": () => (/* binding */ constructUserAgent)
/* harmony export */ });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@microsoft/signalr/dist/esm/Loggers.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// Version token that will be replaced by the prepack command
/** The version of the SignalR client. */
var VERSION = "5.0.6";
/** @private */
var Arg = /** @class */ (function () {
    function Arg() {
    }
    Arg.isRequired = function (val, name) {
        if (val === null || val === undefined) {
            throw new Error("The '" + name + "' argument is required.");
        }
    };
    Arg.isNotEmpty = function (val, name) {
        if (!val || val.match(/^\s*$/)) {
            throw new Error("The '" + name + "' argument should not be empty.");
        }
    };
    Arg.isIn = function (val, values, name) {
        // TypeScript enums have keys for **both** the name and the value of each enum member on the type itself.
        if (!(val in values)) {
            throw new Error("Unknown " + name + " value: " + val + ".");
        }
    };
    return Arg;
}());

/** @private */
var Platform = /** @class */ (function () {
    function Platform() {
    }
    Object.defineProperty(Platform, "isBrowser", {
        get: function () {
            return typeof window === "object";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isWebWorker", {
        get: function () {
            return typeof self === "object" && "importScripts" in self;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Platform, "isNode", {
        get: function () {
            return !this.isBrowser && !this.isWebWorker;
        },
        enumerable: true,
        configurable: true
    });
    return Platform;
}());

/** @private */
function getDataDetail(data, includeContent) {
    var detail = "";
    if (isArrayBuffer(data)) {
        detail = "Binary data of length " + data.byteLength;
        if (includeContent) {
            detail += ". Content: '" + formatArrayBuffer(data) + "'";
        }
    }
    else if (typeof data === "string") {
        detail = "String data of length " + data.length;
        if (includeContent) {
            detail += ". Content: '" + data + "'";
        }
    }
    return detail;
}
/** @private */
function formatArrayBuffer(data) {
    var view = new Uint8Array(data);
    // Uint8Array.map only supports returning another Uint8Array?
    var str = "";
    view.forEach(function (num) {
        var pad = num < 16 ? "0" : "";
        str += "0x" + pad + num.toString(16) + " ";
    });
    // Trim of trailing space.
    return str.substr(0, str.length - 1);
}
// Also in signalr-protocol-msgpack/Utils.ts
/** @private */
function isArrayBuffer(val) {
    return val && typeof ArrayBuffer !== "undefined" &&
        (val instanceof ArrayBuffer ||
            // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
            (val.constructor && val.constructor.name === "ArrayBuffer"));
}
/** @private */
function sendMessage(logger, transportName, httpClient, url, accessTokenFactory, content, logMessageContent, withCredentials, defaultHeaders) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, headers, token, _b, name, value, responseType, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    headers = {};
                    if (!accessTokenFactory) return [3 /*break*/, 2];
                    return [4 /*yield*/, accessTokenFactory()];
                case 1:
                    token = _c.sent();
                    if (token) {
                        headers = (_a = {},
                            _a["Authorization"] = "Bearer " + token,
                            _a);
                    }
                    _c.label = 2;
                case 2:
                    _b = getUserAgentHeader(), name = _b[0], value = _b[1];
                    headers[name] = value;
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(" + transportName + " transport) sending data. " + getDataDetail(content, logMessageContent) + ".");
                    responseType = isArrayBuffer(content) ? "arraybuffer" : "text";
                    return [4 /*yield*/, httpClient.post(url, {
                            content: content,
                            headers: __assign({}, headers, defaultHeaders),
                            responseType: responseType,
                            withCredentials: withCredentials,
                        })];
                case 3:
                    response = _c.sent();
                    logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(" + transportName + " transport) request complete. Response status: " + response.statusCode + ".");
                    return [2 /*return*/];
            }
        });
    });
}
/** @private */
function createLogger(logger) {
    if (logger === undefined) {
        return new ConsoleLogger(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Information);
    }
    if (logger === null) {
        return _Loggers__WEBPACK_IMPORTED_MODULE_1__.NullLogger.instance;
    }
    if (logger.log) {
        return logger;
    }
    return new ConsoleLogger(logger);
}
/** @private */
var SubjectSubscription = /** @class */ (function () {
    function SubjectSubscription(subject, observer) {
        this.subject = subject;
        this.observer = observer;
    }
    SubjectSubscription.prototype.dispose = function () {
        var index = this.subject.observers.indexOf(this.observer);
        if (index > -1) {
            this.subject.observers.splice(index, 1);
        }
        if (this.subject.observers.length === 0 && this.subject.cancelCallback) {
            this.subject.cancelCallback().catch(function (_) { });
        }
    };
    return SubjectSubscription;
}());

/** @private */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(minimumLogLevel) {
        this.minimumLogLevel = minimumLogLevel;
        this.outputConsole = console;
    }
    ConsoleLogger.prototype.log = function (logLevel, message) {
        if (logLevel >= this.minimumLogLevel) {
            switch (logLevel) {
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Critical:
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Error:
                    this.outputConsole.error("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel[logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Warning:
                    this.outputConsole.warn("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel[logLevel] + ": " + message);
                    break;
                case _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Information:
                    this.outputConsole.info("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel[logLevel] + ": " + message);
                    break;
                default:
                    // console.debug only goes to attached debuggers in Node, so we use console.log for Trace and Debug
                    this.outputConsole.log("[" + new Date().toISOString() + "] " + _ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel[logLevel] + ": " + message);
                    break;
            }
        }
    };
    return ConsoleLogger;
}());

/** @private */
function getUserAgentHeader() {
    var userAgentHeaderName = "X-SignalR-User-Agent";
    if (Platform.isNode) {
        userAgentHeaderName = "User-Agent";
    }
    return [userAgentHeaderName, constructUserAgent(VERSION, getOsName(), getRuntime(), getRuntimeVersion())];
}
/** @private */
function constructUserAgent(version, os, runtime, runtimeVersion) {
    // Microsoft SignalR/[Version] ([Detailed Version]; [Operating System]; [Runtime]; [Runtime Version])
    var userAgent = "Microsoft SignalR/";
    var majorAndMinor = version.split(".");
    userAgent += majorAndMinor[0] + "." + majorAndMinor[1];
    userAgent += " (" + version + "; ";
    if (os && os !== "") {
        userAgent += os + "; ";
    }
    else {
        userAgent += "Unknown OS; ";
    }
    userAgent += "" + runtime;
    if (runtimeVersion) {
        userAgent += "; " + runtimeVersion;
    }
    else {
        userAgent += "; Unknown Runtime Version";
    }
    userAgent += ")";
    return userAgent;
}
function getOsName() {
    if (Platform.isNode) {
        switch (process.platform) {
            case "win32":
                return "Windows NT";
            case "darwin":
                return "macOS";
            case "linux":
                return "Linux";
            default:
                return process.platform;
        }
    }
    else {
        return "";
    }
}
function getRuntimeVersion() {
    if (Platform.isNode) {
        return process.versions.node;
    }
    return undefined;
}
function getRuntime() {
    if (Platform.isNode) {
        return "NodeJS";
    }
    else {
        return "Browser";
    }
}
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/WebSocketTransport.js":
/*!************************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/WebSocketTransport.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocketTransport": () => (/* binding */ WebSocketTransport)
/* harmony export */ });
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/** @private */
var WebSocketTransport = /** @class */ (function () {
    function WebSocketTransport(httpClient, accessTokenFactory, logger, logMessageContent, webSocketConstructor, headers) {
        this.logger = logger;
        this.accessTokenFactory = accessTokenFactory;
        this.logMessageContent = logMessageContent;
        this.webSocketConstructor = webSocketConstructor;
        this.httpClient = httpClient;
        this.onreceive = null;
        this.onclose = null;
        this.headers = headers;
    }
    WebSocketTransport.prototype.connect = function (url, transferFormat) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isRequired(url, "url");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isRequired(transferFormat, "transferFormat");
                        _Utils__WEBPACK_IMPORTED_MODULE_2__.Arg.isIn(transferFormat, _ITransport__WEBPACK_IMPORTED_MODULE_1__.TransferFormat, "transferFormat");
                        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(WebSockets transport) Connecting.");
                        if (!this.accessTokenFactory) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.accessTokenFactory()];
                    case 1:
                        token = _a.sent();
                        if (token) {
                            url += (url.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(token));
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            url = url.replace(/^http/, "ws");
                            var webSocket;
                            var cookies = _this.httpClient.getCookieString(url);
                            var opened = false;
                            if (_Utils__WEBPACK_IMPORTED_MODULE_2__.Platform.isNode) {
                                var headers = {};
                                var _a = (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.getUserAgentHeader)(), name_1 = _a[0], value = _a[1];
                                headers[name_1] = value;
                                if (cookies) {
                                    headers["Cookie"] = "" + cookies;
                                }
                                // Only pass headers when in non-browser environments
                                webSocket = new _this.webSocketConstructor(url, undefined, {
                                    headers: __assign({}, headers, _this.headers),
                                });
                            }
                            if (!webSocket) {
                                // Chrome is not happy with passing 'undefined' as protocol
                                webSocket = new _this.webSocketConstructor(url);
                            }
                            if (transferFormat === _ITransport__WEBPACK_IMPORTED_MODULE_1__.TransferFormat.Binary) {
                                webSocket.binaryType = "arraybuffer";
                            }
                            // tslint:disable-next-line:variable-name
                            webSocket.onopen = function (_event) {
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Information, "WebSocket connected to " + url + ".");
                                _this.webSocket = webSocket;
                                opened = true;
                                resolve();
                            };
                            webSocket.onerror = function (event) {
                                var error = null;
                                // ErrorEvent is a browser only type we need to check if the type exists before using it
                                if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                    error = event.error;
                                }
                                else {
                                    error = new Error("There was an error with the transport.");
                                }
                                reject(error);
                            };
                            webSocket.onmessage = function (message) {
                                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(WebSockets transport) data received. " + (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.getDataDetail)(message.data, _this.logMessageContent) + ".");
                                if (_this.onreceive) {
                                    try {
                                        _this.onreceive(message.data);
                                    }
                                    catch (error) {
                                        _this.close(error);
                                        return;
                                    }
                                }
                            };
                            webSocket.onclose = function (event) {
                                // Don't call close handler if connection was never established
                                // We'll reject the connect call instead
                                if (opened) {
                                    _this.close(event);
                                }
                                else {
                                    var error = null;
                                    // ErrorEvent is a browser only type we need to check if the type exists before using it
                                    if (typeof ErrorEvent !== "undefined" && event instanceof ErrorEvent) {
                                        error = event.error;
                                    }
                                    else {
                                        error = new Error("There was an error with the transport.");
                                    }
                                    reject(error);
                                }
                            };
                        })];
                }
            });
        });
    };
    WebSocketTransport.prototype.send = function (data) {
        if (this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN) {
            this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(WebSockets transport) sending data. " + (0,_Utils__WEBPACK_IMPORTED_MODULE_2__.getDataDetail)(data, this.logMessageContent) + ".");
            this.webSocket.send(data);
            return Promise.resolve();
        }
        return Promise.reject("WebSocket is not in the OPEN state");
    };
    WebSocketTransport.prototype.stop = function () {
        if (this.webSocket) {
            // Manually invoke onclose callback inline so we know the HttpConnection was closed properly before returning
            // This also solves an issue where websocket.onclose could take 18+ seconds to trigger during network disconnects
            this.close(undefined);
        }
        return Promise.resolve();
    };
    WebSocketTransport.prototype.close = function (event) {
        // webSocket will be null if the transport did not start successfully
        if (this.webSocket) {
            // Clear websocket handlers because we are considering the socket closed now
            this.webSocket.onclose = function () { };
            this.webSocket.onmessage = function () { };
            this.webSocket.onerror = function () { };
            this.webSocket.close();
            this.webSocket = undefined;
        }
        this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__.LogLevel.Trace, "(WebSockets transport) socket closed.");
        if (this.onclose) {
            if (this.isCloseEvent(event) && (event.wasClean === false || event.code !== 1000)) {
                this.onclose(new Error("WebSocket closed with status code: " + event.code + " (" + event.reason + ")."));
            }
            else if (event instanceof Error) {
                this.onclose(event);
            }
            else {
                this.onclose();
            }
        }
    };
    WebSocketTransport.prototype.isCloseEvent = function (event) {
        return event && typeof event.wasClean === "boolean" && typeof event.code === "number";
    };
    return WebSocketTransport;
}());

//# sourceMappingURL=WebSocketTransport.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/XhrHttpClient.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XhrHttpClient": () => (/* binding */ XhrHttpClient)
/* harmony export */ });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@microsoft/signalr/dist/esm/Errors.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@microsoft/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var XhrHttpClient = /** @class */ (function (_super) {
    __extends(XhrHttpClient, _super);
    function XhrHttpClient(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        return _this;
    }
    /** @inheritDoc */
    XhrHttpClient.prototype.send = function (request) {
        var _this = this;
        // Check that abort was not signaled before calling send
        if (request.abortSignal && request.abortSignal.aborted) {
            return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError());
        }
        if (!request.method) {
            return Promise.reject(new Error("No method defined."));
        }
        if (!request.url) {
            return Promise.reject(new Error("No url defined."));
        }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(request.method, request.url, true);
            xhr.withCredentials = request.withCredentials === undefined ? true : request.withCredentials;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            // Explicitly setting the Content-Type header for React Native on Android platform.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            var headers = request.headers;
            if (headers) {
                Object.keys(headers)
                    .forEach(function (header) {
                    xhr.setRequestHeader(header, headers[header]);
                });
            }
            if (request.responseType) {
                xhr.responseType = request.responseType;
            }
            if (request.abortSignal) {
                request.abortSignal.onabort = function () {
                    xhr.abort();
                    reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError());
                };
            }
            if (request.timeout) {
                xhr.timeout = request.timeout;
            }
            xhr.onload = function () {
                if (request.abortSignal) {
                    request.abortSignal.onabort = null;
                }
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(new _HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpResponse(xhr.status, xhr.statusText, xhr.response || xhr.responseText));
                }
                else {
                    reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.HttpError(xhr.statusText, xhr.status));
                }
            };
            xhr.onerror = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "Error from HTTP request. " + xhr.status + ": " + xhr.statusText + ".");
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.HttpError(xhr.statusText, xhr.status));
            };
            xhr.ontimeout = function () {
                _this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, "Timeout from HTTP request.");
                reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__.TimeoutError());
            };
            xhr.send(request.content || "");
        });
    };
    return XhrHttpClient;
}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpClient));

//# sourceMappingURL=XhrHttpClient.js.map

/***/ }),

/***/ "./node_modules/@microsoft/signalr/dist/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@microsoft/signalr/dist/esm/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortError": () => (/* reexport safe */ _Errors__WEBPACK_IMPORTED_MODULE_0__.AbortError),
/* harmony export */   "HttpError": () => (/* reexport safe */ _Errors__WEBPACK_IMPORTED_MODULE_0__.HttpError),
/* harmony export */   "TimeoutError": () => (/* reexport safe */ _Errors__WEBPACK_IMPORTED_MODULE_0__.TimeoutError),
/* harmony export */   "HttpClient": () => (/* reexport safe */ _HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpClient),
/* harmony export */   "HttpResponse": () => (/* reexport safe */ _HttpClient__WEBPACK_IMPORTED_MODULE_1__.HttpResponse),
/* harmony export */   "DefaultHttpClient": () => (/* reexport safe */ _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__.DefaultHttpClient),
/* harmony export */   "HubConnection": () => (/* reexport safe */ _HubConnection__WEBPACK_IMPORTED_MODULE_3__.HubConnection),
/* harmony export */   "HubConnectionState": () => (/* reexport safe */ _HubConnection__WEBPACK_IMPORTED_MODULE_3__.HubConnectionState),
/* harmony export */   "HubConnectionBuilder": () => (/* reexport safe */ _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__.HubConnectionBuilder),
/* harmony export */   "MessageType": () => (/* reexport safe */ _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__.MessageType),
/* harmony export */   "LogLevel": () => (/* reexport safe */ _ILogger__WEBPACK_IMPORTED_MODULE_6__.LogLevel),
/* harmony export */   "HttpTransportType": () => (/* reexport safe */ _ITransport__WEBPACK_IMPORTED_MODULE_7__.HttpTransportType),
/* harmony export */   "TransferFormat": () => (/* reexport safe */ _ITransport__WEBPACK_IMPORTED_MODULE_7__.TransferFormat),
/* harmony export */   "NullLogger": () => (/* reexport safe */ _Loggers__WEBPACK_IMPORTED_MODULE_8__.NullLogger),
/* harmony export */   "JsonHubProtocol": () => (/* reexport safe */ _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__.JsonHubProtocol),
/* harmony export */   "Subject": () => (/* reexport safe */ _Subject__WEBPACK_IMPORTED_MODULE_10__.Subject),
/* harmony export */   "VERSION": () => (/* reexport safe */ _Utils__WEBPACK_IMPORTED_MODULE_11__.VERSION)
/* harmony export */ });
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Errors */ "./node_modules/@microsoft/signalr/dist/esm/Errors.js");
/* harmony import */ var _HttpClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HttpClient */ "./node_modules/@microsoft/signalr/dist/esm/HttpClient.js");
/* harmony import */ var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DefaultHttpClient */ "./node_modules/@microsoft/signalr/dist/esm/DefaultHttpClient.js");
/* harmony import */ var _HubConnection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HubConnection */ "./node_modules/@microsoft/signalr/dist/esm/HubConnection.js");
/* harmony import */ var _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HubConnectionBuilder */ "./node_modules/@microsoft/signalr/dist/esm/HubConnectionBuilder.js");
/* harmony import */ var _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IHubProtocol */ "./node_modules/@microsoft/signalr/dist/esm/IHubProtocol.js");
/* harmony import */ var _ILogger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ILogger */ "./node_modules/@microsoft/signalr/dist/esm/ILogger.js");
/* harmony import */ var _ITransport__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ITransport */ "./node_modules/@microsoft/signalr/dist/esm/ITransport.js");
/* harmony import */ var _Loggers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Loggers */ "./node_modules/@microsoft/signalr/dist/esm/Loggers.js");
/* harmony import */ var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./JsonHubProtocol */ "./node_modules/@microsoft/signalr/dist/esm/JsonHubProtocol.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Subject */ "./node_modules/@microsoft/signalr/dist/esm/Subject.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Utils */ "./node_modules/@microsoft/signalr/dist/esm/Utils.js");
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.












//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/awesome-notifications/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/awesome-notifications/dist/index.js ***!
  \**********************************************************/
/***/ ((module) => {

!function(t,e){ true?module.exports=e():0}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}n.r(e);var r={maxNotifications:10,animationDuration:300,position:"bottom-right",labels:{tip:"Tip",info:"Info",success:"Success",warning:"Attention",alert:"Error",async:"Loading",confirm:"Confirmation required",confirmOk:"OK",confirmCancel:"Cancel"},icons:{tip:"question-circle",info:"info-circle",success:"check-circle",warning:"exclamation-circle",alert:"exclamation-triangle",async:"cog fa-spin",confirm:"exclamation-triangle",prefix:"<i class='fa fas fa-fw fa-",suffix:"'></i>",enabled:!0},replacements:{tip:null,info:null,success:null,warning:null,alert:null,async:null,"async-block":null,modal:null,confirm:null,general:{"<script>":"","<\/script>":""}},messages:{tip:"",info:"",success:"Action has been succeeded",warning:"",alert:"Action has been failed",confirm:"This action can't be undone. Continue?",async:"Please, wait...","async-block":"Loading"},formatError:function(t){if(t.response){if(!t.response.data)return"500 API Server Error";if(t.response.data.errors)return t.response.data.errors.map((function(t){return t.detail})).join("<br>");if(t.response.statusText)return"".concat(t.response.status," ").concat(t.response.statusText,": ").concat(t.response.data)}return t.message?t.message:t},durations:{global:5e3,success:null,info:null,tip:null,warning:null,alert:null},minDurations:{async:1e3,"async-block":1e3}},a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Object.assign(this,this.defaultsDeep(n,e))}var e,n,a;return e=t,(n=[{key:"icon",value:function(t){return this.icons.enabled?"".concat(this.icons.prefix).concat(this.icons[t]).concat(this.icons.suffix):""}},{key:"label",value:function(t){return this.labels[t]}},{key:"duration",value:function(t){var e=this.durations[t];return null===e?this.durations.global:e}},{key:"toSecs",value:function(t){return"".concat(t/1e3,"s")}},{key:"applyReplacements",value:function(t,e){if(!t)return this.messages[e]||"";for(var n=0,o=["general",e];n<o.length;n++){var i=o[n];if(this.replacements[i])for(var r in this.replacements[i])t=t.replace(r,this.replacements[i][r])}return t}},{key:"override",value:function(e){return e?new t(e,this):this}},{key:"defaultsDeep",value:function(t,e){var n={};for(var i in t)e.hasOwnProperty(i)?n[i]="object"===o(t[i])&&null!==t[i]?this.defaultsDeep(t[i],e[i]):e[i]:n[i]=t[i];return n}}])&&i(e.prototype,n),a&&i(e,a),t}(),s={popup:"".concat("awn","-popup"),toast:"".concat("awn","-toast"),btn:"".concat("awn","-btn"),confirm:"".concat("awn","-confirm")},c={prefix:s.toast,klass:{label:"".concat(s.toast,"-label"),content:"".concat(s.toast,"-content"),icon:"".concat(s.toast,"-icon"),progressBar:"".concat(s.toast,"-progress-bar"),progressBarPause:"".concat(s.toast,"-progress-bar-paused")},ids:{container:"".concat(s.toast,"-container")}},u={prefix:s.popup,klass:{buttons:"".concat("awn","-buttons"),button:s.btn,successBtn:"".concat(s.btn,"-success"),cancelBtn:"".concat(s.btn,"-cancel"),title:"".concat(s.popup,"-title"),body:"".concat(s.popup,"-body"),content:"".concat(s.popup,"-content"),dotAnimation:"".concat(s.popup,"-loading-dots")},ids:{wrapper:"".concat(s.popup,"-wrapper"),confirmOk:"".concat(s.confirm,"-ok"),confirmCancel:"".concat(s.confirm,"-cancel")}},l={klass:{hiding:"".concat("awn","-hiding")},lib:"awn"};function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var p=function(){function t(e,n,o,i,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.newNode=document.createElement("div"),n&&(this.newNode.id=n),o&&(this.newNode.className=o),i&&(this.newNode.style.cssText=i),this.parent=e,this.options=r}var e,n,o;return e=t,(n=[{key:"beforeInsert",value:function(){}},{key:"afterInsert",value:function(){}},{key:"insert",value:function(){return this.beforeInsert(),this.el=this.parent.appendChild(this.newNode),this.afterInsert(),this}},{key:"replace",value:function(t){var e=this;if(this.getElement())return this.beforeDelete().then((function(){return e.updateType(t.type),e.parent.replaceChild(t.newNode,e.el),e.el=e.getElement(t.newNode),e.afterInsert(),e}))}},{key:"beforeDelete",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el,n=0;return this.start&&(n=this.options.minDurations[this.type]+this.start-Date.now())<0&&(n=0),new Promise((function(o){setTimeout((function(){e.classList.add(l.klass.hiding),setTimeout(o,t.options.animationDuration)}),n)}))}},{key:"delete",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return this.getElement(e)?this.beforeDelete(e).then((function(){e.remove(),t.afterDelete()})):null}},{key:"afterDelete",value:function(){}},{key:"getElement",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return t?document.getElementById(t.id):null}},{key:"addEvent",value:function(t,e){this.el.addEventListener(t,e)}},{key:"toggleClass",value:function(t){this.el.classList.toggle(t)}},{key:"updateType",value:function(t){this.type=t,this.duration=this.options.duration(this.type)}}])&&f(e.prototype,n),o&&f(e,o),t}();function d(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var y=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.callback=e,this.remaining=n,this.resume()}var e,n,o;return e=t,(n=[{key:"pause",value:function(){this.paused=!0,window.clearTimeout(this.timerId),this.remaining-=new Date-this.start}},{key:"resume",value:function(){var t=this;this.paused=!1,this.start=new Date,window.clearTimeout(this.timerId),this.timerId=window.setTimeout((function(){window.clearTimeout(t.timerId),t.callback()}),this.remaining)}},{key:"toggle",value:function(){this.paused?this.resume():this.pause()}}])&&d(e.prototype,n),o&&d(e,o),t}();function h(t){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function v(t,e){return!e||"object"!==h(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var g=function(t){function e(t,n,o,i){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(r=v(this,b(e).call(this,i,"".concat(c.prefix,"-").concat(Math.floor(Date.now()-100*Math.random())),"".concat(c.prefix," ").concat(c.prefix,"-").concat(n),"animation-duration: ".concat(o.toSecs(o.animationDuration),";"),o))).updateType(n),r.setInnerHtml(t),r}var n,o,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(e,t),n=e,(o=[{key:"setInnerHtml",value:function(t){"alert"===this.type&&t&&(t=this.options.formatError(t)),t=this.options.applyReplacements(t,this.type),this.newNode.innerHTML='<div class="awn-toast-wrapper">'.concat(this.progressBar).concat(this.label,'<div class="').concat(c.klass.content,'">').concat(t,'</div><span class="').concat(c.klass.icon,'">').concat(this.options.icon(this.type),"</span></div>")}},{key:"beforeInsert",value:function(){var t=this;if(this.parent.childElementCount>=this.options.maxNotifications){var e=Array.from(this.parent.getElementsByClassName(c.prefix));this.delete(e.find((function(e){return!t.isDeleted(e)})))}}},{key:"afterInsert",value:function(){var t=this;if("async"==this.type)return this.start=Date.now();if(this.addEvent("click",(function(){return t.delete()})),!(this.duration<=0)){this.timer=new y((function(){return t.delete()}),this.duration);for(var e=0,n=["mouseenter","mouseleave"];e<n.length;e++){var o=n[e];this.addEvent(o,(function(){t.isDeleted()||(t.toggleClass(c.klass.progressBarPause),t.timer.toggle())}))}}}},{key:"isDeleted",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return t.classList.contains(l.klass.hiding)}},{key:"progressBar",get:function(){return this.duration<=0||"async"===this.type?"":"<div class='".concat(c.klass.progressBar,"' style=\"animation-duration:").concat(this.options.toSecs(this.duration),';"></div>')}},{key:"label",get:function(){return'<b class="'.concat(c.klass.label,'">').concat(this.options.label(this.type),"</b>")}}])&&m(n.prototype,o),i&&m(n,i),e}(p);function w(t){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function O(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _(t,e){return!e||"object"!==w(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var S=function(t){function e(t){var n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"modal",i=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var s="animation-duration: ".concat(i.toSecs(i.animationDuration),";");return(n=_(this,T(e).call(this,document.body,u.ids.wrapper,null,s,i)))[u.ids.confirmOk]=r,n[u.ids.confirmCancel]=a,n.className="".concat(u.prefix,"-").concat(o),["confirm","async-block","modal"].includes(o)||(o="modal"),n.updateType(o),n.setInnerHtml(t),n.insert(),n}var n,o,i;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(e,t),n=e,(o=[{key:"setInnerHtml",value:function(t){var e=this.options.applyReplacements(t,this.type);switch(this.type){case"confirm":var n=["<button class='".concat(u.klass.button," ").concat(u.klass.successBtn,"'id='").concat(u.ids.confirmOk,"'>").concat(this.options.labels.confirmOk,"</button>")];!1!==this[u.ids.confirmCancel]&&n.push("<button class='".concat(u.klass.button," ").concat(u.klass.cancelBtn,"'id='").concat(u.ids.confirmCancel,"'>").concat(this.options.labels.confirmCancel,"</button>")),e="".concat(this.options.icon(this.type),"<div class='").concat(u.klass.title,"'>").concat(this.options.label(this.type),'</div><div class="').concat(u.klass.content,'">').concat(e,"</div><div class='").concat(u.klass.buttons," ").concat(u.klass.buttons,"-").concat(n.length,"'>").concat(n.join(""),"</div>");break;case"async-block":e="".concat(e,'<div class="').concat(u.klass.dotAnimation,'"></div>')}this.newNode.innerHTML='<div class="'.concat(u.klass.body," ").concat(this.className,'">').concat(e,"</div>")}},{key:"keyupListener",value:function(t){if("async-block"===this.type)return t.preventDefault();switch(t.code){case"Escape":t.preventDefault(),this.delete();case"Tab":if(t.preventDefault(),"confirm"!==this.type||!1===this[u.ids.confirmCancel])return!0;var e=this.okBtn;t.shiftKey?document.activeElement.id==u.ids.confirmOk&&(e=this.cancelBtn):document.activeElement.id!==u.ids.confirmCancel&&(e=this.cancelBtn),e.focus()}}},{key:"afterInsert",value:function(){var t=this;switch(this.listener=function(e){return t.keyupListener(e)},window.addEventListener("keydown",this.listener),this.type){case"async-block":this.start=Date.now();break;case"confirm":this.okBtn.focus(),this.addEvent("click",(function(e){if("BUTTON"!==e.target.nodeName)return!1;t.delete(),t[e.target.id]&&t[e.target.id]()}));break;default:document.activeElement.blur(),this.addEvent("click",(function(e){e.target.id===t.newNode.id&&t.delete()}))}}},{key:"afterDelete",value:function(){window.removeEventListener("keydown",this.listener)}},{key:"okBtn",get:function(){return document.getElementById(u.ids.confirmOk)}},{key:"cancelBtn",get:function(){return document.getElementById(u.ids.confirmCancel)}}])&&O(n.prototype,o),i&&O(n,i),e}(p);function j(t){return(j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}n.d(e,"default",(function(){return C}));var C=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=new a(e)}var e,n,o;return e=t,(n=[{key:"tip",value:function(t,e){return this._addToast(t,"tip",e).el}},{key:"info",value:function(t,e){return this._addToast(t,"info",e).el}},{key:"success",value:function(t,e){return this._addToast(t,"success",e).el}},{key:"warning",value:function(t,e){return this._addToast(t,"warning",e).el}},{key:"alert",value:function(t,e){return this._addToast(t,"alert",e).el}},{key:"async",value:function(t,e,n,o,i){var r=this._addToast(o,"async",i);return this._afterAsync(t,e,n,i,r)}},{key:"confirm",value:function(t,e,n,o){return this._addPopup(t,"confirm",o,e,n)}},{key:"asyncBlock",value:function(t,e,n,o,i){var r=this._addPopup(o,"async-block",i);return this._afterAsync(t,e,n,i,r)}},{key:"modal",value:function(t,e,n){return this._addPopup(t,e,n)}},{key:"closeToasts",value:function(){for(var t=this.container;t.firstChild;)t.removeChild(t.firstChild)}},{key:"_addPopup",value:function(t,e,n,o,i){return new S(t,e,this.options.override(n),o,i)}},{key:"_addToast",value:function(t,e,n,o){n=this.options.override(n);var i=new g(t,e,n,this.container);return o?o instanceof S?o.delete().then((function(){return i.insert()})):o.replace(i):i.insert()}},{key:"_afterAsync",value:function(t,e,n,o,i){return t.then(this._responseHandler(e,"success",o,i),this._responseHandler(n,"alert",o,i))}},{key:"_responseHandler",value:function(t,e,n,o){var i=this;return function(r){switch(j(t)){case"undefined":case"string":var a="alert"===e?t||r:t;i._addToast(a,e,n,o);break;default:o.delete().then((function(){t&&t(r)}))}}}},{key:"_createContainer",value:function(){return new p(document.body,c.ids.container,"awn-".concat(this.options.position)).insert().el}},{key:"container",get:function(){return document.getElementById(c.ids.container)||this._createContainer()}}])&&x(e.prototype,n),o&&x(e,o),t}()}])}));

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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./wwwroot/src/js/app.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var awesome_notifications__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! awesome-notifications */ "./node_modules/awesome-notifications/dist/index.js");
/* harmony import */ var awesome_notifications__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(awesome_notifications__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_signalr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/signalr */ "./node_modules/@microsoft/signalr/dist/esm/index.js");
const createRoomBtn = document.getElementById('side-menu__create-room');
const createRoomModal = document.getElementById('create-room-modal');
const closeModalBtn = document.getElementById('modal__body__close');

if (createRoomBtn) {
    createRoomBtn.addEventListener('click', function () {
        createRoomModal.classList.add('modal--active');
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function () {
        createRoomModal.classList.remove('modal--active');
    });
}


// Other stuff



const con = new _microsoft_signalr__WEBPACK_IMPORTED_MODULE_1__.HubConnectionBuilder()
    .withUrl("/notificationHub")
    .build();

con.on("NotifyAll", function (data) {
    const notifier = new (awesome_notifications__WEBPACK_IMPORTED_MODULE_0___default())({
        position: 'top-right',
    });
    notifier.success(data.text);
});

con.start();
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./wwwroot/src/scss/app.scss ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "app.css");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0Fib3J0Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0RlZmF1bHRIdHRwQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vRGVmYXVsdFJlY29ubmVjdFBvbGljeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0ZldGNoSHR0cENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0hhbmRzaGFrZVByb3RvY29sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSHR0cENsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0h0dHBDb25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSHViQ29ubmVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0h1YkNvbm5lY3Rpb25CdWlsZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSUh1YlByb3RvY29sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSUxvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0lUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9Kc29uSHViUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9Mb2dnZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vTG9uZ1BvbGxpbmdUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vU3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL1RleHRNZXNzYWdlRm9ybWF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9XZWJTb2NrZXRUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9YaHJIdHRwQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F3ZXNvbWUtbm90aWZpY2F0aW9ucy9kaXN0L2luZGV4LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3Qvc3JjL3Njc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUMwQjtBQUMzQiwyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3QjtBQUNBLFVBQVUsZ0JBQWdCLHNDQUFzQyxpQkFBaUIsRUFBRTtBQUNuRix5QkFBeUIsdURBQXVEO0FBQ2hGO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ3FDO0FBQ2M7QUFDVjtBQUNQO0FBQ2E7QUFDaEQsK0JBQStCLG9DQUFvQztBQUNuRTtBQUNBO0FBQ0EsdUNBQXVDLDJD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QUFHLFNBQXpDLEUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyBSb3VnaCBwb2x5ZmlsbCBvZiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQWJvcnRDb250cm9sbGVyXHJcbi8vIFdlIGRvbid0IGFjdHVhbGx5IGV2ZXIgdXNlIHRoZSBBUEkgYmVpbmcgcG9seWZpbGxlZCwgd2UgYWx3YXlzIHVzZSB0aGUgcG9seWZpbGwgYmVjYXVzZVxyXG4vLyBpdCdzIGEgdmVyeSBuZXcgQVBJIHJpZ2h0IG5vdy5cclxuLy8gTm90IGV4cG9ydGVkIGZyb20gaW5kZXguXHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgQWJvcnRDb250cm9sbGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQWJvcnRDb250cm9sbGVyKCkge1xyXG4gICAgICAgIHRoaXMuaXNBYm9ydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbmFib3J0ID0gbnVsbDtcclxuICAgIH1cclxuICAgIEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQWJvcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQWJvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uYWJvcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBYm9ydENvbnRyb2xsZXIucHJvdG90eXBlLCBcInNpZ25hbFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUsIFwiYWJvcnRlZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzQWJvcnRlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBBYm9ydENvbnRyb2xsZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFib3J0Q29udHJvbGxlciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BYm9ydENvbnRyb2xsZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgQWJvcnRFcnJvciB9IGZyb20gXCIuL0Vycm9yc1wiO1xyXG5pbXBvcnQgeyBGZXRjaEh0dHBDbGllbnQgfSBmcm9tIFwiLi9GZXRjaEh0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCIuL0h0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBYaHJIdHRwQ2xpZW50IH0gZnJvbSBcIi4vWGhySHR0cENsaWVudFwiO1xyXG4vKiogRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh0dHBDbGllbnR9LiAqL1xyXG52YXIgRGVmYXVsdEh0dHBDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoRGVmYXVsdEh0dHBDbGllbnQsIF9zdXBlcik7XHJcbiAgICAvKiogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5EZWZhdWx0SHR0cENsaWVudH0sIHVzaW5nIHRoZSBwcm92aWRlZCB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLklMb2dnZXJ9IHRvIGxvZyBtZXNzYWdlcy4gKi9cclxuICAgIGZ1bmN0aW9uIERlZmF1bHRIdHRwQ2xpZW50KGxvZ2dlcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmZXRjaCAhPT0gXCJ1bmRlZmluZWRcIiB8fCBQbGF0Zm9ybS5pc05vZGUpIHtcclxuICAgICAgICAgICAgX3RoaXMuaHR0cENsaWVudCA9IG5ldyBGZXRjaEh0dHBDbGllbnQobG9nZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmh0dHBDbGllbnQgPSBuZXcgWGhySHR0cENsaWVudChsb2dnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdXNhYmxlIEh0dHBDbGllbnQgZm91bmQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIERlZmF1bHRIdHRwQ2xpZW50LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICAvLyBDaGVjayB0aGF0IGFib3J0IHdhcyBub3Qgc2lnbmFsZWQgYmVmb3JlIGNhbGxpbmcgc2VuZFxyXG4gICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsICYmIHJlcXVlc3QuYWJvcnRTaWduYWwuYWJvcnRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFib3J0RXJyb3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVxdWVzdC5tZXRob2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIG1ldGhvZCBkZWZpbmVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVxdWVzdC51cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vIHVybCBkZWZpbmVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuc2VuZChyZXF1ZXN0KTtcclxuICAgIH07XHJcbiAgICBEZWZhdWx0SHR0cENsaWVudC5wcm90b3R5cGUuZ2V0Q29va2llU3RyaW5nID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0Q29va2llU3RyaW5nKHVybCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERlZmF1bHRIdHRwQ2xpZW50O1xyXG59KEh0dHBDbGllbnQpKTtcclxuZXhwb3J0IHsgRGVmYXVsdEh0dHBDbGllbnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGVmYXVsdEh0dHBDbGllbnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyAwLCAyLCAxMCwgMzAgc2Vjb25kIGRlbGF5cyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHRzLlxyXG52YXIgREVGQVVMVF9SRVRSWV9ERUxBWVNfSU5fTUlMTElTRUNPTkRTID0gWzAsIDIwMDAsIDEwMDAwLCAzMDAwMCwgbnVsbF07XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgRGVmYXVsdFJlY29ubmVjdFBvbGljeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIERlZmF1bHRSZWNvbm5lY3RQb2xpY3kocmV0cnlEZWxheXMpIHtcclxuICAgICAgICB0aGlzLnJldHJ5RGVsYXlzID0gcmV0cnlEZWxheXMgIT09IHVuZGVmaW5lZCA/IHJldHJ5RGVsYXlzLmNvbmNhdChbbnVsbF0pIDogREVGQVVMVF9SRVRSWV9ERUxBWVNfSU5fTUlMTElTRUNPTkRTO1xyXG4gICAgfVxyXG4gICAgRGVmYXVsdFJlY29ubmVjdFBvbGljeS5wcm90b3R5cGUubmV4dFJldHJ5RGVsYXlJbk1pbGxpc2Vjb25kcyA9IGZ1bmN0aW9uIChyZXRyeUNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXRyeURlbGF5c1tyZXRyeUNvbnRleHQucHJldmlvdXNSZXRyeUNvdW50XTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGVmYXVsdFJlY29ubmVjdFBvbGljeTtcclxufSgpKTtcclxuZXhwb3J0IHsgRGVmYXVsdFJlY29ubmVjdFBvbGljeSB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZWZhdWx0UmVjb25uZWN0UG9saWN5LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbi8qKiBFcnJvciB0aHJvd24gd2hlbiBhbiBIVFRQIHJlcXVlc3QgZmFpbHMuICovXHJcbnZhciBIdHRwRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSHR0cEVycm9yLCBfc3VwZXIpO1xyXG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdHRwRXJyb3J9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXR1c0NvZGUgVGhlIEhUVFAgc3RhdHVzIGNvZGUgcmVwcmVzZW50ZWQgYnkgdGhpcyBlcnJvci5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gSHR0cEVycm9yKGVycm9yTWVzc2FnZSwgc3RhdHVzQ29kZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cnVlUHJvdG8gPSBfbmV3VGFyZ2V0LnByb3RvdHlwZTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIGlzc3VlIGluIFR5cGVzY3JpcHQgY29tcGlsZXJcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcclxuICAgICAgICBfdGhpcy5fX3Byb3RvX18gPSB0cnVlUHJvdG87XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEh0dHBFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBIdHRwRXJyb3IgfTtcclxuLyoqIEVycm9yIHRocm93biB3aGVuIGEgdGltZW91dCBlbGFwc2VzLiAqL1xyXG52YXIgVGltZW91dEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKFRpbWVvdXRFcnJvciwgX3N1cGVyKTtcclxuICAgIC8qKiBDb25zdHJ1Y3RzIGEgbmV3IGluc3RhbmNlIG9mIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuVGltZW91dEVycm9yfS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXJyb3JNZXNzYWdlIEEgZGVzY3JpcHRpdmUgZXJyb3IgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gVGltZW91dEVycm9yKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlID09PSB2b2lkIDApIHsgZXJyb3JNZXNzYWdlID0gXCJBIHRpbWVvdXQgb2NjdXJyZWQuXCI7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cnVlUHJvdG8gPSBfbmV3VGFyZ2V0LnByb3RvdHlwZTtcclxuICAgICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcclxuICAgICAgICAvLyBXb3JrYXJvdW5kIGlzc3VlIGluIFR5cGVzY3JpcHQgY29tcGlsZXJcclxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzEzOTY1I2lzc3VlY29tbWVudC0yNzg1NzAyMDBcclxuICAgICAgICBfdGhpcy5fX3Byb3RvX18gPSB0cnVlUHJvdG87XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFRpbWVvdXRFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBUaW1lb3V0RXJyb3IgfTtcclxuLyoqIEVycm9yIHRocm93biB3aGVuIGFuIGFjdGlvbiBpcyBhYm9ydGVkLiAqL1xyXG52YXIgQWJvcnRFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhBYm9ydEVycm9yLCBfc3VwZXIpO1xyXG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEFib3J0RXJyb3J9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBBYm9ydEVycm9yKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBfbmV3VGFyZ2V0ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBpZiAoZXJyb3JNZXNzYWdlID09PSB2b2lkIDApIHsgZXJyb3JNZXNzYWdlID0gXCJBbiBhYm9ydCBvY2N1cnJlZC5cIjsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM5NjUjaXNzdWVjb21tZW50LTI3ODU3MDIwMFxyXG4gICAgICAgIF90aGlzLl9fcHJvdG9fXyA9IHRydWVQcm90bztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQWJvcnRFcnJvcjtcclxufShFcnJvcikpO1xyXG5leHBvcnQgeyBBYm9ydEVycm9yIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVycm9ycy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IEFib3J0RXJyb3IsIEh0dHBFcnJvciwgVGltZW91dEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gXCIuL0h0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxudmFyIEZldGNoSHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhGZXRjaEh0dHBDbGllbnQsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBGZXRjaEh0dHBDbGllbnQobG9nZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmZXRjaCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBpZ25vcmUgdGhlIGR5bmFtaWMgcmVxdWlyZSBpbiB3ZWJwYWNrIGJ1aWxkcyB3ZSBuZWVkIHRvIGRvIHRoaXMgbWFnaWNcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogVFMgZG9lc24ndCBrbm93IGFib3V0IHRoZXNlIG5hbWVzXHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlRnVuYyA9IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fID09PSBcImZ1bmN0aW9uXCIgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XHJcbiAgICAgICAgICAgIC8vIENvb2tpZXMgYXJlbid0IGF1dG9tYXRpY2FsbHkgaGFuZGxlZCBpbiBOb2RlIHNvIHdlIG5lZWQgdG8gYWRkIGEgQ29va2llSmFyIHRvIHByZXNlcnZlIGNvb2tpZXMgYWNyb3NzIHJlcXVlc3RzXHJcbiAgICAgICAgICAgIF90aGlzLmphciA9IG5ldyAocmVxdWlyZUZ1bmMoXCJ0b3VnaC1jb29raWVcIikpLkNvb2tpZUphcigpO1xyXG4gICAgICAgICAgICBfdGhpcy5mZXRjaFR5cGUgPSByZXF1aXJlRnVuYyhcIm5vZGUtZmV0Y2hcIik7XHJcbiAgICAgICAgICAgIC8vIG5vZGUtZmV0Y2ggZG9lc24ndCBoYXZlIGEgbmljZSBBUEkgZm9yIGdldHRpbmcgYW5kIHNldHRpbmcgY29va2llc1xyXG4gICAgICAgICAgICAvLyBmZXRjaC1jb29raWUgd2lsbCB3cmFwIGEgZmV0Y2ggaW1wbGVtZW50YXRpb24gd2l0aCBhIGRlZmF1bHQgQ29va2llSmFyIG9yIGEgcHJvdmlkZWQgb25lXHJcbiAgICAgICAgICAgIF90aGlzLmZldGNoVHlwZSA9IHJlcXVpcmVGdW5jKFwiZmV0Y2gtY29va2llXCIpKF90aGlzLmZldGNoVHlwZSwgX3RoaXMuamFyKTtcclxuICAgICAgICAgICAgLy8gTm9kZSBuZWVkcyBFdmVudExpc3RlbmVyIG1ldGhvZHMgb24gQWJvcnRDb250cm9sbGVyIHdoaWNoIG91ciBjdXN0b20gcG9seWZpbGwgZG9lc24ndCBwcm92aWRlXHJcbiAgICAgICAgICAgIF90aGlzLmFib3J0Q29udHJvbGxlclR5cGUgPSByZXF1aXJlRnVuYyhcImFib3J0LWNvbnRyb2xsZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5mZXRjaFR5cGUgPSBmZXRjaC5iaW5kKHNlbGYpO1xyXG4gICAgICAgICAgICBfdGhpcy5hYm9ydENvbnRyb2xsZXJUeXBlID0gQWJvcnRDb250cm9sbGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIEZldGNoSHR0cENsaWVudC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgYWJvcnRDb250cm9sbGVyLCBlcnJvciwgdGltZW91dElkLCBtc1RpbWVvdXQsIHJlc3BvbnNlLCBlXzEsIGNvbnRlbnQsIHBheWxvYWQ7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsICYmIHJlcXVlc3QuYWJvcnRTaWduYWwuYWJvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFib3J0RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QubWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXRob2QgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlciA9IG5ldyB0aGlzLmFib3J0Q29udHJvbGxlclR5cGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSG9vayBvdXIgYWJvcnRTaWduYWwgaW50byB0aGUgYWJvcnQgY29udHJvbGxlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydFNpZ25hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydFNpZ25hbC5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEFib3J0RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dElkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNUaW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIlRpbWVvdXQgZnJvbSBIVFRQIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IFRpbWVvdXRFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgbXNUaW1lb3V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsIDQsIDVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5mZXRjaFR5cGUocmVxdWVzdC51cmwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiByZXF1ZXN0LmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPT09IHRydWUgPyBcImluY2x1ZGVcIiA6IFwic2FtZS1vcmlnaW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIsIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCIgfSwgcmVxdWVzdC5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0OiBcIm1hbnVhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJFcnJvciBmcm9tIEhUVFAgcmVxdWVzdC4gXCIgKyBlXzEgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVfMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSHR0cEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQsIHJlc3BvbnNlLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVxdWVzdC5yZXNwb25zZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjb250ZW50XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgSHR0cFJlc3BvbnNlKHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCwgcGF5bG9hZCldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBGZXRjaEh0dHBDbGllbnQucHJvdG90eXBlLmdldENvb2tpZVN0cmluZyA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICB2YXIgY29va2llcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKFBsYXRmb3JtLmlzTm9kZSAmJiB0aGlzLmphcikge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiB1bnVzZWQgdmFyaWFibGVcclxuICAgICAgICAgICAgdGhpcy5qYXIuZ2V0Q29va2llcyh1cmwsIGZ1bmN0aW9uIChlLCBjKSB7IHJldHVybiBjb29raWVzID0gYy5qb2luKFwiOyBcIik7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29va2llcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gRmV0Y2hIdHRwQ2xpZW50O1xyXG59KEh0dHBDbGllbnQpKTtcclxuZXhwb3J0IHsgRmV0Y2hIdHRwQ2xpZW50IH07XHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplQ29udGVudChyZXNwb25zZSwgcmVzcG9uc2VUeXBlKSB7XHJcbiAgICB2YXIgY29udGVudDtcclxuICAgIHN3aXRjaCAocmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImFycmF5YnVmZmVyXCI6XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwidGV4dFwiOlxyXG4gICAgICAgICAgICBjb250ZW50ID0gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiYmxvYlwiOlxyXG4gICAgICAgIGNhc2UgXCJkb2N1bWVudFwiOlxyXG4gICAgICAgIGNhc2UgXCJqc29uXCI6XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZVR5cGUgKyBcIiBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb250ZW50ID0gcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZW50O1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZldGNoSHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbmltcG9ydCB7IFRleHRNZXNzYWdlRm9ybWF0IH0gZnJvbSBcIi4vVGV4dE1lc3NhZ2VGb3JtYXRcIjtcclxuaW1wb3J0IHsgaXNBcnJheUJ1ZmZlciB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgSGFuZHNoYWtlUHJvdG9jb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIYW5kc2hha2VQcm90b2NvbCgpIHtcclxuICAgIH1cclxuICAgIC8vIEhhbmRzaGFrZSByZXF1ZXN0IGlzIGFsd2F5cyBKU09OXHJcbiAgICBIYW5kc2hha2VQcm90b2NvbC5wcm90b3R5cGUud3JpdGVIYW5kc2hha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKGhhbmRzaGFrZVJlcXVlc3QpIHtcclxuICAgICAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXQud3JpdGUoSlNPTi5zdHJpbmdpZnkoaGFuZHNoYWtlUmVxdWVzdCkpO1xyXG4gICAgfTtcclxuICAgIEhhbmRzaGFrZVByb3RvY29sLnByb3RvdHlwZS5wYXJzZUhhbmRzaGFrZVJlc3BvbnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgcmVzcG9uc2VNZXNzYWdlO1xyXG4gICAgICAgIHZhciBtZXNzYWdlRGF0YTtcclxuICAgICAgICB2YXIgcmVtYWluaW5nRGF0YTtcclxuICAgICAgICBpZiAoaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCAodHlwZW9mIEJ1ZmZlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkYXRhIGluc3RhbmNlb2YgQnVmZmVyKSkge1xyXG4gICAgICAgICAgICAvLyBGb3JtYXQgaXMgYmluYXJ5IGJ1dCBzdGlsbCBuZWVkIHRvIHJlYWQgSlNPTiB0ZXh0IGZyb20gaGFuZHNoYWtlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIHZhciBiaW5hcnlEYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JJbmRleCA9IGJpbmFyeURhdGEuaW5kZXhPZihUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3JDb2RlKTtcclxuICAgICAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZSBpcyBpbmNvbXBsZXRlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb250ZW50IGJlZm9yZSBzZXBhcmF0b3IgaXMgaGFuZHNoYWtlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsIGNvbnRlbnQgYWZ0ZXIgaXMgYWRkaXRpb25hbCBtZXNzYWdlc1xyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VMZW5ndGggPSBzZXBhcmF0b3JJbmRleCArIDE7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiaW5hcnlEYXRhLnNsaWNlKDAsIHJlc3BvbnNlTGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIHJlbWFpbmluZ0RhdGEgPSAoYmluYXJ5RGF0YS5ieXRlTGVuZ3RoID4gcmVzcG9uc2VMZW5ndGgpID8gYmluYXJ5RGF0YS5zbGljZShyZXNwb25zZUxlbmd0aCkuYnVmZmVyIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JJbmRleCA9IHRleHREYXRhLmluZGV4T2YoVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgaWYgKHNlcGFyYXRvckluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWVzc2FnZSBpcyBpbmNvbXBsZXRlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb250ZW50IGJlZm9yZSBzZXBhcmF0b3IgaXMgaGFuZHNoYWtlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsIGNvbnRlbnQgYWZ0ZXIgaXMgYWRkaXRpb25hbCBtZXNzYWdlc1xyXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VMZW5ndGggPSBzZXBhcmF0b3JJbmRleCArIDE7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VEYXRhID0gdGV4dERhdGEuc3Vic3RyaW5nKDAsIHJlc3BvbnNlTGVuZ3RoKTtcclxuICAgICAgICAgICAgcmVtYWluaW5nRGF0YSA9ICh0ZXh0RGF0YS5sZW5ndGggPiByZXNwb25zZUxlbmd0aCkgPyB0ZXh0RGF0YS5zdWJzdHJpbmcocmVzcG9uc2VMZW5ndGgpIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBzaG91bGQgaGF2ZSBqdXN0IHRoZSBzaW5nbGUgaGFuZHNoYWtlIG1lc3NhZ2VcclxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBUZXh0TWVzc2FnZUZvcm1hdC5wYXJzZShtZXNzYWdlRGF0YSk7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZShtZXNzYWdlc1swXSk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYSBoYW5kc2hha2UgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzcG9uc2VNZXNzYWdlID0gcmVzcG9uc2U7XHJcbiAgICAgICAgLy8gbXVsdGlwbGUgbWVzc2FnZXMgY291bGQgaGF2ZSBhcnJpdmVkIHdpdGggaGFuZHNoYWtlXHJcbiAgICAgICAgLy8gcmV0dXJuIGFkZGl0aW9uYWwgZGF0YSB0byBiZSBwYXJzZWQgYXMgdXN1YWwsIG9yIG51bGwgaWYgYWxsIHBhcnNlZFxyXG4gICAgICAgIHJldHVybiBbcmVtYWluaW5nRGF0YSwgcmVzcG9uc2VNZXNzYWdlXTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSGFuZHNoYWtlUHJvdG9jb2w7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEhhbmRzaGFrZVByb3RvY29sIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUhhbmRzaGFrZVByb3RvY29sLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuLyoqIFJlcHJlc2VudHMgYW4gSFRUUCByZXNwb25zZS4gKi9cclxudmFyIEh0dHBSZXNwb25zZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh0dHBSZXNwb25zZShzdGF0dXNDb2RlLCBzdGF0dXNUZXh0LCBjb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcclxuICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSHR0cFJlc3BvbnNlO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdHRwUmVzcG9uc2UgfTtcclxuLyoqIEFic3RyYWN0aW9uIG92ZXIgYW4gSFRUUCBjbGllbnQuXHJcbiAqXHJcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgYW4gYWJzdHJhY3Rpb24gb3ZlciBhbiBIVFRQIGNsaWVudCBzbyB0aGF0IGEgZGlmZmVyZW50IGltcGxlbWVudGF0aW9uIGNhbiBiZSBwcm92aWRlZCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLlxyXG4gKi9cclxudmFyIEh0dHBDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdHRwQ2xpZW50KCkge1xyXG4gICAgfVxyXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoX19hc3NpZ24oe30sIG9wdGlvbnMsIHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCB9KSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKF9fYXNzaWduKHt9LCBvcHRpb25zLCB7IG1ldGhvZDogXCJQT1NUXCIsIHVybDogdXJsIH0pKTtcclxuICAgIH07XHJcbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChfX2Fzc2lnbih7fSwgb3B0aW9ucywgeyBtZXRob2Q6IFwiREVMRVRFXCIsIHVybDogdXJsIH0pKTtcclxuICAgIH07XHJcbiAgICAvKiogR2V0cyBhbGwgY29va2llcyB0aGF0IGFwcGx5IHRvIHRoZSBzcGVjaWZpZWQgVVJMLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1cmwgVGhlIFVSTCB0aGF0IHRoZSBjb29raWVzIGFyZSB2YWxpZCBmb3IuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZyBjb250YWluaW5nIGFsbCB0aGUga2V5LXZhbHVlIGNvb2tpZSBwYWlycyBmb3IgdGhlIHNwZWNpZmllZCBVUkwuXHJcbiAgICAgKi9cclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmdldENvb2tpZVN0cmluZyA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSHR0cENsaWVudDtcclxufSgpKTtcclxuZXhwb3J0IHsgSHR0cENsaWVudCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1IdHRwQ2xpZW50LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBEZWZhdWx0SHR0cENsaWVudCB9IGZyb20gXCIuL0RlZmF1bHRIdHRwQ2xpZW50XCI7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG5pbXBvcnQgeyBIdHRwVHJhbnNwb3J0VHlwZSwgVHJhbnNmZXJGb3JtYXQgfSBmcm9tIFwiLi9JVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IExvbmdQb2xsaW5nVHJhbnNwb3J0IH0gZnJvbSBcIi4vTG9uZ1BvbGxpbmdUcmFuc3BvcnRcIjtcclxuaW1wb3J0IHsgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydCB9IGZyb20gXCIuL1NlcnZlclNlbnRFdmVudHNUcmFuc3BvcnRcIjtcclxuaW1wb3J0IHsgQXJnLCBjcmVhdGVMb2dnZXIsIGdldFVzZXJBZ2VudEhlYWRlciwgUGxhdGZvcm0gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgeyBXZWJTb2NrZXRUcmFuc3BvcnQgfSBmcm9tIFwiLi9XZWJTb2NrZXRUcmFuc3BvcnRcIjtcclxudmFyIE1BWF9SRURJUkVDVFMgPSAxMDA7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgSHR0cENvbm5lY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdHRwQ29ubmVjdGlvbih1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxyXG4gICAgICAgIHRoaXMuc3RvcFByb21pc2VSZXNvbHZlciA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzID0ge307XHJcbiAgICAgICAgdGhpcy5uZWdvdGlhdGVWZXJzaW9uID0gMTtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyID0gY3JlYXRlTG9nZ2VyKG9wdGlvbnMubG9nZ2VyKTtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSB0aGlzLnJlc29sdmVVcmwodXJsKTtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBvcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50ID0gb3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPT09IFwiYm9vbGVhblwiIHx8IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwid2l0aENyZWRlbnRpYWxzIG9wdGlvbiB3YXMgbm90IGEgJ2Jvb2xlYW4nIG9yICd1bmRlZmluZWQnIHZhbHVlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgd2ViU29ja2V0TW9kdWxlID0gbnVsbDtcclxuICAgICAgICB2YXIgZXZlbnRTb3VyY2VNb2R1bGUgPSBudWxsO1xyXG4gICAgICAgIGlmIChQbGF0Zm9ybS5pc05vZGUgJiYgdHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgLy8gSW4gb3JkZXIgdG8gaWdub3JlIHRoZSBkeW5hbWljIHJlcXVpcmUgaW4gd2VicGFjayBidWlsZHMgd2UgbmVlZCB0byBkbyB0aGlzIG1hZ2ljXHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IFRTIGRvZXNuJ3Qga25vdyBhYm91dCB0aGVzZSBuYW1lc1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZUZ1bmMgPSB0eXBlb2YgX193ZWJwYWNrX3JlcXVpcmVfXyA9PT0gXCJmdW5jdGlvblwiID8gX19ub25fd2VicGFja19yZXF1aXJlX18gOiByZXF1aXJlO1xyXG4gICAgICAgICAgICB3ZWJTb2NrZXRNb2R1bGUgPSByZXF1aXJlRnVuYyhcIndzXCIpO1xyXG4gICAgICAgICAgICBldmVudFNvdXJjZU1vZHVsZSA9IHJlcXVpcmVGdW5jKFwiZXZlbnRzb3VyY2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghUGxhdGZvcm0uaXNOb2RlICYmIHR5cGVvZiBXZWJTb2NrZXQgIT09IFwidW5kZWZpbmVkXCIgJiYgIW9wdGlvbnMuV2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuV2ViU29ja2V0ID0gV2ViU29ja2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChQbGF0Zm9ybS5pc05vZGUgJiYgIW9wdGlvbnMuV2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh3ZWJTb2NrZXRNb2R1bGUpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuV2ViU29ja2V0ID0gd2ViU29ja2V0TW9kdWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghUGxhdGZvcm0uaXNOb2RlICYmIHR5cGVvZiBFdmVudFNvdXJjZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhb3B0aW9ucy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLkV2ZW50U291cmNlID0gRXZlbnRTb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKFBsYXRmb3JtLmlzTm9kZSAmJiAhb3B0aW9ucy5FdmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50U291cmNlTW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLkV2ZW50U291cmNlID0gZXZlbnRTb3VyY2VNb2R1bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gb3B0aW9ucy5odHRwQ2xpZW50IHx8IG5ldyBEZWZhdWx0SHR0cENsaWVudCh0aGlzLmxvZ2dlcik7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLztcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLm9ucmVjZWl2ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbmNsb3NlID0gbnVsbDtcclxuICAgIH1cclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICh0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UsIG1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZmVyRm9ybWF0ID0gdHJhbnNmZXJGb3JtYXQgfHwgVHJhbnNmZXJGb3JtYXQuQmluYXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTdGFydGluZyBjb25uZWN0aW9uIHdpdGggdHJhbnNmZXIgZm9ybWF0ICdcIiArIFRyYW5zZmVyRm9ybWF0W3RyYW5zZmVyRm9ybWF0XSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3Qgc3RhcnQgYW4gSHR0cENvbm5lY3Rpb24gdGhhdCBpcyBub3QgaW4gdGhlICdEaXNjb25uZWN0ZWQnIHN0YXRlLlwiKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEludGVybmFsUHJvbWlzZSA9IHRoaXMuc3RhcnRJbnRlcm5hbCh0cmFuc2ZlckZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJGYWlsZWQgdG8gc3RhcnQgdGhlIEh0dHBDb25uZWN0aW9uIGJlZm9yZSBzdG9wKCkgd2FzIGNhbGxlZC5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2Fubm90IGF3YWl0IHN0b3BQcm9taXNlIGluc2lkZSBzdGFydEludGVybmFsIHNpbmNlIHN0b3BJbnRlcm5hbCBhd2FpdHMgdGhlIHN0YXJ0SW50ZXJuYWxQcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0b3BQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbm5vdCBhd2FpdCBzdG9wUHJvbWlzZSBpbnNpZGUgc3RhcnRJbnRlcm5hbCBzaW5jZSBzdG9wSW50ZXJuYWwgYXdhaXRzIHRoZSBzdGFydEludGVybmFsUHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiQ29ubmVjdGVkXCIgLyogQ29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJIdHRwQ29ubmVjdGlvbi5zdGFydEludGVybmFsIGNvbXBsZXRlZCBncmFjZWZ1bGx5IGJ1dCBkaWRuJ3QgZW50ZXIgdGhlIGNvbm5lY3Rpb24gaW50byB0aGUgY29ubmVjdGVkIHN0YXRlIVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBcIkNvbm5lY3RlZFwiIC8qIENvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgZGF0YSBpZiB0aGUgY29ubmVjdGlvbiBpcyBub3QgaW4gdGhlICdDb25uZWN0ZWQnIFN0YXRlLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zZW5kUXVldWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUXVldWUgPSBuZXcgVHJhbnNwb3J0U2VuZFF1ZXVlKHRoaXMudHJhbnNwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVHJhbnNwb3J0IHdpbGwgbm90IGJlIG51bGwgaWYgc3RhdGUgaXMgY29ubmVjdGVkXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFF1ZXVlLnNlbmQoZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3AoXCIgKyBlcnJvciArIFwiKSBpZ25vcmVkIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlc29sdmUoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuc3RvcFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBjb21wbGV0ZSBzdG9wKCkgdW50aWwgc3RvcENvbm5lY3Rpb24oKSBjb21wbGV0ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0b3BJbnRlcm5hbCBzaG91bGQgbmV2ZXIgdGhyb3cgc28ganVzdCBvYnNlcnZlIGl0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0b3BJbnRlcm5hbChlcnJvcildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RvcEludGVybmFsIHNob3VsZCBuZXZlciB0aHJvdyBzbyBqdXN0IG9ic2VydmUgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9wUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3BJbnRlcm5hbCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGVfMSwgZV8yO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgZXJyb3IgYXMgc29vbiBhcyBwb3NzaWJsZSBvdGhlcndpc2UgdGhlcmUgaXMgYSByYWNlIGJldHdlZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHRyYW5zcG9ydCBjbG9zaW5nIGFuZCBwcm92aWRpbmcgYW4gZXJyb3IgYW5kIHRoZSBlcnJvciBmcm9tIGEgY2xvc2UgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3b3VsZCBwcmVmZXIgdGhlIGNsb3NlIG1lc3NhZ2UgZXJyb3IuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudHJhbnNwb3J0KSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs1LCA3LCAsIDhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy50cmFuc3BvcnQuc3RvcCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJIdHRwQ29ubmVjdGlvbi50cmFuc3BvcnQuc3RvcCgpIHRocmV3IGVycm9yICdcIiArIGVfMiArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcENvbm5lY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkh0dHBDb25uZWN0aW9uLnRyYW5zcG9ydCBpcyB1bmRlZmluZWQgaW4gSHR0cENvbm5lY3Rpb24uc3RvcCgpIGJlY2F1c2Ugc3RhcnQoKSBmYWlsZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0SW50ZXJuYWwgPSBmdW5jdGlvbiAodHJhbnNmZXJGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwsIG5lZ290aWF0ZVJlc3BvbnNlLCByZWRpcmVjdHMsIF9sb29wXzEsIHRoaXNfMSwgZV8zO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLmJhc2VVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5ID0gdGhpcy5vcHRpb25zLmFjY2Vzc1Rva2VuRmFjdG9yeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAxMiwgLCAxM10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5za2lwTmVnb3RpYXRpb24pIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLm9wdGlvbnMudHJhbnNwb3J0ID09PSBIdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gYWRkIGEgY29ubmVjdGlvbiBJRCBpbiB0aGlzIGNhc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0aGlzLmNvbnN0cnVjdFRyYW5zcG9ydChIdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugc2hvdWxkIGp1c3QgY2FsbCBjb25uZWN0IGRpcmVjdGx5IGluIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gZmFsbGJhY2sgb3IgbmVnb3RpYXRlIGluIHRoaXMgY2FzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydCh1cmwsIHRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQganVzdCBjYWxsIGNvbm5lY3QgZGlyZWN0bHkgaW4gdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBmYWxsYmFjayBvciBuZWdvdGlhdGUgaW4gdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogdGhyb3cgbmV3IEVycm9yKFwiTmVnb3RpYXRpb24gY2FuIG9ubHkgYmUgc2tpcHBlZCB3aGVuIHVzaW5nIHRoZSBXZWJTb2NrZXQgdHJhbnNwb3J0IGRpcmVjdGx5LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY2Nlc3NUb2tlbl8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzXzEuZ2V0TmVnb3RpYXRpb25SZXNwb25zZSh1cmwpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlUmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdXNlciB0cmllcyB0byBzdG9wIHRoZSBjb25uZWN0aW9uIHdoZW4gaXQgaXMgYmVpbmcgc3RhcnRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNfMS5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGluZ1wiIC8qIERpc2Nvbm5lY3RpbmcgKi8gfHwgdGhpc18xLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBkdXJpbmcgbmVnb3RpYXRpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5lZ290aWF0ZVJlc3BvbnNlLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS5Qcm90b2NvbFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZXRlY3RlZCBhIGNvbm5lY3Rpb24gYXR0ZW1wdCB0byBhbiBBU1AuTkVUIFNpZ25hbFIgU2VydmVyLiBUaGlzIGNsaWVudCBvbmx5IHN1cHBvcnRzIGNvbm5lY3RpbmcgdG8gYW4gQVNQLk5FVCBDb3JlIFNpZ25hbFIgU2VydmVyLiBTZWUgaHR0cHM6Ly9ha2EubXMvc2lnbmFsci1jb3JlLWRpZmZlcmVuY2VzIGZvciBkZXRhaWxzLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBuZWdvdGlhdGVSZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UuYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbl8xID0gbmVnb3RpYXRlUmVzcG9uc2UuYWNjZXNzVG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFjY2Vzc1Rva2VuXzE7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdHMrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFs1IC8qeWllbGQqKi8sIF9sb29wXzEoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gODtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS51cmwgJiYgcmVkaXJlY3RzIDwgTUFYX1JFRElSRUNUUykgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gOTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdHMgPT09IE1BWF9SRURJUkVDVFMgJiYgbmVnb3RpYXRlUmVzcG9uc2UudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWdvdGlhdGUgcmVkaXJlY3Rpb24gbGltaXQgZXhjZWVkZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuY3JlYXRlVHJhbnNwb3J0KHVybCwgdGhpcy5vcHRpb25zLnRyYW5zcG9ydCwgbmVnb3RpYXRlUmVzcG9uc2UsIHRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDExO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCBpbnN0YW5jZW9mIExvbmdQb2xsaW5nVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmVzLmluaGVyZW50S2VlcEFsaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgY29ubmVjdGlvbiB0cmFuc2l0aW9ucyB0byB0aGUgY29ubmVjdGVkIHN0YXRlIHByaW9yIHRvIGNvbXBsZXRpbmcgdGhpcy5zdGFydEludGVybmFsUHJvbWlzZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0KCkgd2lsbCBoYW5kbGUgdGhlIGNhc2Ugd2hlbiBzdG9wIHdhcyBjYWxsZWQgYW5kIHN0YXJ0SW50ZXJuYWwgZXhpdHMgc3RpbGwgaW4gdGhlIGRpc2Nvbm5lY3Rpbmcgc3RhdGUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiVGhlIEh0dHBDb25uZWN0aW9uIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkNvbm5lY3RlZFwiIC8qIENvbm5lY3RlZCAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxM107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8zID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiRmFpbGVkIHRvIHN0YXJ0IHRoZSBjb25uZWN0aW9uOiBcIiArIGVfMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBzdGFydCBmYWlscywgYW55IGFjdGl2ZSBjYWxscyB0byBzdG9wIGFzc3VtZSB0aGF0IHN0YXJ0IHdpbGwgY29tcGxldGUgdGhlIHN0b3AgcHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlUmVzb2x2ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGVfMyldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmdldE5lZ290aWF0aW9uUmVzcG9uc2UgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycywgdG9rZW4sIF9hLCBuYW1lLCB2YWx1ZSwgbmVnb3RpYXRlVXJsLCByZXNwb25zZSwgbmVnb3RpYXRlUmVzcG9uc2UsIGVfNDtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBnZXRVc2VyQWdlbnRIZWFkZXIoKSwgbmFtZSA9IF9hWzBdLCB2YWx1ZSA9IF9hWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVVybCA9IHRoaXMucmVzb2x2ZU5lZ290aWF0ZVVybCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2VuZGluZyBuZWdvdGlhdGlvbiByZXF1ZXN0OiBcIiArIG5lZ290aWF0ZVVybCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFszLCA1LCAsIDZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5odHRwQ2xpZW50LnBvc3QobmVnb3RpYXRlVXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgdGhpcy5vcHRpb25zLmhlYWRlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBzdGF0dXMgY29kZSByZXR1cm5lZCBmcm9tIG5lZ290aWF0ZSAnXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCInXCIpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZ290aWF0ZVJlc3BvbnNlLm5lZ290aWF0ZVZlcnNpb24gfHwgbmVnb3RpYXRlUmVzcG9uc2UubmVnb3RpYXRlVmVyc2lvbiA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5lZ290aWF0ZSB2ZXJzaW9uIDAgZG9lc24ndCB1c2UgY29ubmVjdGlvblRva2VuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTbyB3ZSBzZXQgaXQgZXF1YWwgdG8gY29ubmVjdGlvbklkIHNvIGFsbCBvdXIgbG9naWMgY2FuIHVzZSBjb25uZWN0aW9uVG9rZW4gd2l0aG91dCBiZWluZyBhd2FyZSBvZiB0aGUgbmVnb3RpYXRlIHZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25Ub2tlbiA9IG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbmVnb3RpYXRlUmVzcG9uc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV80ID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiRmFpbGVkIHRvIGNvbXBsZXRlIG5lZ290aWF0aW9uIHdpdGggdGhlIHNlcnZlcjogXCIgKyBlXzQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QoZV80KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVDb25uZWN0VXJsID0gZnVuY3Rpb24gKHVybCwgY29ubmVjdGlvblRva2VuKSB7XHJcbiAgICAgICAgaWYgKCFjb25uZWN0aW9uVG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybCArICh1cmwuaW5kZXhPZihcIj9cIikgPT09IC0xID8gXCI/XCIgOiBcIiZcIikgKyAoXCJpZD1cIiArIGNvbm5lY3Rpb25Ub2tlbik7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uICh1cmwsIHJlcXVlc3RlZFRyYW5zcG9ydCwgbmVnb3RpYXRlUmVzcG9uc2UsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY29ubmVjdFVybCwgdHJhbnNwb3J0RXhjZXB0aW9ucywgdHJhbnNwb3J0cywgbmVnb3RpYXRlLCBfaSwgdHJhbnNwb3J0c18xLCBlbmRwb2ludCwgdHJhbnNwb3J0T3JFcnJvciwgZXhfMSwgZXhfMiwgbWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdFVybCA9IHRoaXMuY3JlYXRlQ29ubmVjdFVybCh1cmwsIG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25Ub2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0lUcmFuc3BvcnQocmVxdWVzdGVkVHJhbnNwb3J0KSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIHdhcyBwcm92aWRlZCBhbiBpbnN0YW5jZSBvZiBJVHJhbnNwb3J0LCB1c2luZyB0aGF0IGRpcmVjdGx5LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSByZXF1ZXN0ZWRUcmFuc3BvcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRUcmFuc3BvcnQoY29ubmVjdFVybCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uSWQgPSBuZWdvdGlhdGVSZXNwb25zZS5jb25uZWN0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydEV4Y2VwdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0cyA9IG5lZ290aWF0ZVJlc3BvbnNlLmF2YWlsYWJsZVRyYW5zcG9ydHMgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZSA9IG5lZ290aWF0ZVJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaSA9IDAsIHRyYW5zcG9ydHNfMSA9IHRyYW5zcG9ydHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKF9pIDwgdHJhbnNwb3J0c18xLmxlbmd0aCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDEzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kcG9pbnQgPSB0cmFuc3BvcnRzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRPckVycm9yID0gdGhpcy5yZXNvbHZlVHJhbnNwb3J0T3JFcnJvcihlbmRwb2ludCwgcmVxdWVzdGVkVHJhbnNwb3J0LCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRyYW5zcG9ydE9yRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgZXJyb3IgYW5kIGNvbnRpbnVlLCB3ZSBkb24ndCB3YW50IHRvIGNhdXNlIGEgcmUtbmVnb3RpYXRlIGluIHRoZXNlIGNhc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydEV4Y2VwdGlvbnMucHVzaChlbmRwb2ludC50cmFuc3BvcnQgKyBcIiBmYWlsZWQ6IFwiICsgdHJhbnNwb3J0T3JFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0lUcmFuc3BvcnQodHJhbnNwb3J0T3JFcnJvcikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnRPckVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFuZWdvdGlhdGUpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzUsIDcsICwgOF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldE5lZ290aWF0aW9uUmVzcG9uc2UodXJsKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGV4XzEpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RVcmwgPSB0aGlzLmNyZWF0ZUNvbm5lY3RVcmwodXJsLCBuZWdvdGlhdGUuY29ubmVjdGlvblRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFs5LCAxMSwgLCAxMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0VHJhbnNwb3J0KGNvbm5lY3RVcmwsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IG5lZ290aWF0ZS5jb25uZWN0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleF8yID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiRmFpbGVkIHRvIHN0YXJ0IHRoZSB0cmFuc3BvcnQgJ1wiICsgZW5kcG9pbnQudHJhbnNwb3J0ICsgXCInOiBcIiArIGV4XzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydEV4Y2VwdGlvbnMucHVzaChlbmRwb2ludC50cmFuc3BvcnQgKyBcIiBmYWlsZWQ6IFwiICsgZXhfMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiRmFpbGVkIHRvIHNlbGVjdCB0cmFuc3BvcnQgYmVmb3JlIHN0b3AoKSB3YXMgY2FsbGVkLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2krKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydEV4Y2VwdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhbnkgb2YgdGhlIGF2YWlsYWJsZSB0cmFuc3BvcnRzLiBcIiArIHRyYW5zcG9ydEV4Y2VwdGlvbnMuam9pbihcIiBcIikpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk5vbmUgb2YgdGhlIHRyYW5zcG9ydHMgc3VwcG9ydGVkIGJ5IHRoZSBjbGllbnQgYXJlIHN1cHBvcnRlZCBieSB0aGUgc2VydmVyLlwiKSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuY29uc3RydWN0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xyXG4gICAgICAgIHN3aXRjaCAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgSHR0cFRyYW5zcG9ydFR5cGUuV2ViU29ja2V0czpcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLldlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidXZWJTb2NrZXQnIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdlYlNvY2tldFRyYW5zcG9ydCh0aGlzLmh0dHBDbGllbnQsIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5LCB0aGlzLmxvZ2dlciwgdGhpcy5vcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50IHx8IGZhbHNlLCB0aGlzLm9wdGlvbnMuV2ViU29ja2V0LCB0aGlzLm9wdGlvbnMuaGVhZGVycyB8fCB7fSk7XHJcbiAgICAgICAgICAgIGNhc2UgSHR0cFRyYW5zcG9ydFR5cGUuU2VydmVyU2VudEV2ZW50czpcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ0V2ZW50U291cmNlJyBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy5FdmVudFNvdXJjZSwgdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscywgdGhpcy5vcHRpb25zLmhlYWRlcnMgfHwge30pO1xyXG4gICAgICAgICAgICBjYXNlIEh0dHBUcmFuc3BvcnRUeXBlLkxvbmdQb2xsaW5nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBMb25nUG9sbGluZ1RyYW5zcG9ydCh0aGlzLmh0dHBDbGllbnQsIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5LCB0aGlzLmxvZ2dlciwgdGhpcy5vcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50IHx8IGZhbHNlLCB0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyB8fCB7fSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHRyYW5zcG9ydDogXCIgKyB0cmFuc3BvcnQgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbnJlY2VpdmUgPSB0aGlzLm9ucmVjZWl2ZTtcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydC5vbmNsb3NlID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLnN0b3BDb25uZWN0aW9uKGUpOyB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydC5jb25uZWN0KHVybCwgdHJhbnNmZXJGb3JtYXQpO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNvbHZlVHJhbnNwb3J0T3JFcnJvciA9IGZ1bmN0aW9uIChlbmRwb2ludCwgcmVxdWVzdGVkVHJhbnNwb3J0LCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHZhciB0cmFuc3BvcnQgPSBIdHRwVHJhbnNwb3J0VHlwZVtlbmRwb2ludC50cmFuc3BvcnRdO1xyXG4gICAgICAgIGlmICh0cmFuc3BvcnQgPT09IG51bGwgfHwgdHJhbnNwb3J0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBlbmRwb2ludC50cmFuc3BvcnQgKyBcIicgYmVjYXVzZSBpdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgY2xpZW50LlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBlbmRwb2ludC50cmFuc3BvcnQgKyBcIicgYmVjYXVzZSBpdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgY2xpZW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnRNYXRjaGVzKHJlcXVlc3RlZFRyYW5zcG9ydCwgdHJhbnNwb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZmVyRm9ybWF0cyA9IGVuZHBvaW50LnRyYW5zZmVyRm9ybWF0cy5tYXAoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIFRyYW5zZmVyRm9ybWF0W3NdOyB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2ZlckZvcm1hdHMuaW5kZXhPZihyZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodHJhbnNwb3J0ID09PSBIdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzICYmICF0aGlzLm9wdGlvbnMuV2ViU29ja2V0KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodHJhbnNwb3J0ID09PSBIdHRwVHJhbnNwb3J0VHlwZS5TZXJ2ZXJTZW50RXZlbnRzICYmICF0aGlzLm9wdGlvbnMuRXZlbnRTb3VyY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBiZWNhdXNlIGl0IGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC4nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBpcyBub3Qgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNlbGVjdGluZyB0cmFuc3BvcnQgJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RUcmFuc3BvcnQodHJhbnNwb3J0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTa2lwcGluZyB0cmFuc3BvcnQgJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBiZWNhdXNlIGl0IGRvZXMgbm90IHN1cHBvcnQgdGhlIHJlcXVlc3RlZCB0cmFuc2ZlciBmb3JtYXQgJ1wiICsgVHJhbnNmZXJGb3JtYXRbcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXRdICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICsgVHJhbnNmZXJGb3JtYXRbcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXRdICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGJlY2F1c2UgaXQgd2FzIGRpc2FibGVkIGJ5IHRoZSBjbGllbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcIidcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgaXMgZGlzYWJsZWQgYnkgdGhlIGNsaWVudC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmlzSVRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcclxuICAgICAgICByZXR1cm4gdHJhbnNwb3J0ICYmIHR5cGVvZiAodHJhbnNwb3J0KSA9PT0gXCJvYmplY3RcIiAmJiBcImNvbm5lY3RcIiBpbiB0cmFuc3BvcnQ7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3BDb25uZWN0aW9uID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiSHR0cENvbm5lY3Rpb24uc3RvcENvbm5lY3Rpb24oXCIgKyBlcnJvciArIFwiKSBjYWxsZWQgd2hpbGUgaW4gc3RhdGUgXCIgKyB0aGlzLmNvbm5lY3Rpb25TdGF0ZSArIFwiLlwiKTtcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgc3RvcEVycm9yLCBpdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhlIGVycm9yIGZyb20gdGhlIHRyYW5zcG9ydFxyXG4gICAgICAgIGVycm9yID0gdGhpcy5zdG9wRXJyb3IgfHwgZXJyb3I7XHJcbiAgICAgICAgdGhpcy5zdG9wRXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wQ29ubmVjdGlvbihcIiArIGVycm9yICsgXCIpIHdhcyBpZ25vcmVkIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiQ29ubmVjdGluZ1wiIC8qIENvbm5lY3RpbmcgKi8pIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLldhcm5pbmcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wQ29ubmVjdGlvbihcIiArIGVycm9yICsgXCIpIHdhcyBpZ25vcmVkIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gaXMgc3RpbGwgaW4gdGhlIGNvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIdHRwQ29ubmVjdGlvbi5zdG9wQ29ubmVjdGlvbihcIiArIGVycm9yICsgXCIpIHdhcyBjYWxsZWQgd2hpbGUgdGhlIGNvbm5lY3Rpb24gaXMgc3RpbGwgaW4gdGhlIGNvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGluZ1wiIC8qIERpc2Nvbm5lY3RpbmcgKi8pIHtcclxuICAgICAgICAgICAgLy8gQSBjYWxsIHRvIHN0b3AoKSBpbmR1Y2VkIHRoaXMgY2FsbCB0byBzdG9wQ29ubmVjdGlvbiBhbmQgbmVlZHMgdG8gYmUgY29tcGxldGVkLlxyXG4gICAgICAgICAgICAvLyBBbnkgc3RvcCgpIGF3YWl0ZXJzIHdpbGwgYmUgc2NoZWR1bGVkIHRvIGNvbnRpbnVlIGFmdGVyIHRoZSBvbmNsb3NlIGNhbGxiYWNrIGZpcmVzLlxyXG4gICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlUmVzb2x2ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJDb25uZWN0aW9uIGRpc2Nvbm5lY3RlZCB3aXRoIGVycm9yICdcIiArIGVycm9yICsgXCInLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJDb25uZWN0aW9uIGRpc2Nvbm5lY3RlZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNlbmRRdWV1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZS5zdG9wKCkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiVHJhbnNwb3J0U2VuZFF1ZXVlLnN0b3AoKSB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFF1ZXVlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGFydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiSHR0cENvbm5lY3Rpb24ub25jbG9zZShcIiArIGVycm9yICsgXCIpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNvbHZlVXJsID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIC8vIHN0YXJ0c1dpdGggaXMgbm90IHN1cHBvcnRlZCBpbiBJRVxyXG4gICAgICAgIGlmICh1cmwubGFzdEluZGV4T2YoXCJodHRwczovL1wiLCAwKSA9PT0gMCB8fCB1cmwubGFzdEluZGV4T2YoXCJodHRwOi8vXCIsIDApID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghUGxhdGZvcm0uaXNCcm93c2VyIHx8ICF3aW5kb3cuZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlc29sdmUgJ1wiICsgdXJsICsgXCInLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0dGluZyB0aGUgdXJsIHRvIHRoZSBocmVmIHByb3Blcnkgb2YgYW4gYW5jaG9yIHRhZyBoYW5kbGVzIG5vcm1hbGl6YXRpb25cclxuICAgICAgICAvLyBmb3IgdXMuIFRoZXJlIGFyZSAzIG1haW4gY2FzZXMuXHJcbiAgICAgICAgLy8gMS4gUmVsYXRpdmUgcGF0aCBub3JtYWxpemF0aW9uIGUuZyBcImJcIiAtPiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hL2JcIlxyXG4gICAgICAgIC8vIDIuIEFic29sdXRlIHBhdGggbm9ybWFsaXphdGlvbiBlLmcgXCIvYS9iXCIgLT4gXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYS9iXCJcclxuICAgICAgICAvLyAzLiBOZXR3b3JrcGF0aCByZWZlcmVuY2Ugbm9ybWFsaXphdGlvbiBlLmcgXCIvL2xvY2FsaG9zdDo1MDAwL2EvYlwiIC0+IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2EvYlwiXHJcbiAgICAgICAgdmFyIGFUYWcgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgYVRhZy5ocmVmID0gdXJsO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJOb3JtYWxpemluZyAnXCIgKyB1cmwgKyBcIicgdG8gJ1wiICsgYVRhZy5ocmVmICsgXCInLlwiKTtcclxuICAgICAgICByZXR1cm4gYVRhZy5ocmVmO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNvbHZlTmVnb3RpYXRlVXJsID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHVybC5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICB2YXIgbmVnb3RpYXRlVXJsID0gdXJsLnN1YnN0cmluZygwLCBpbmRleCA9PT0gLTEgPyB1cmwubGVuZ3RoIDogaW5kZXgpO1xyXG4gICAgICAgIGlmIChuZWdvdGlhdGVVcmxbbmVnb3RpYXRlVXJsLmxlbmd0aCAtIDFdICE9PSBcIi9cIikge1xyXG4gICAgICAgICAgICBuZWdvdGlhdGVVcmwgKz0gXCIvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5lZ290aWF0ZVVybCArPSBcIm5lZ290aWF0ZVwiO1xyXG4gICAgICAgIG5lZ290aWF0ZVVybCArPSBpbmRleCA9PT0gLTEgPyBcIlwiIDogdXJsLnN1YnN0cmluZyhpbmRleCk7XHJcbiAgICAgICAgaWYgKG5lZ290aWF0ZVVybC5pbmRleE9mKFwibmVnb3RpYXRlVmVyc2lvblwiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgbmVnb3RpYXRlVXJsICs9IGluZGV4ID09PSAtMSA/IFwiP1wiIDogXCImXCI7XHJcbiAgICAgICAgICAgIG5lZ290aWF0ZVVybCArPSBcIm5lZ290aWF0ZVZlcnNpb249XCIgKyB0aGlzLm5lZ290aWF0ZVZlcnNpb247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZWdvdGlhdGVVcmw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh0dHBDb25uZWN0aW9uO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdHRwQ29ubmVjdGlvbiB9O1xyXG5mdW5jdGlvbiB0cmFuc3BvcnRNYXRjaGVzKHJlcXVlc3RlZFRyYW5zcG9ydCwgYWN0dWFsVHJhbnNwb3J0KSB7XHJcbiAgICByZXR1cm4gIXJlcXVlc3RlZFRyYW5zcG9ydCB8fCAoKGFjdHVhbFRyYW5zcG9ydCAmIHJlcXVlc3RlZFRyYW5zcG9ydCkgIT09IDApO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgVHJhbnNwb3J0U2VuZFF1ZXVlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVHJhbnNwb3J0U2VuZFF1ZXVlKHRyYW5zcG9ydCkge1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XHJcbiAgICAgICAgdGhpcy5leGVjdXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlcmVkRGF0YSA9IG5ldyBQcm9taXNlU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnRSZXN1bHQgPSBuZXcgUHJvbWlzZVNvdXJjZSgpO1xyXG4gICAgICAgIHRoaXMuc2VuZExvb3BQcm9taXNlID0gdGhpcy5zZW5kTG9vcCgpO1xyXG4gICAgfVxyXG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlckRhdGEoZGF0YSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zcG9ydFJlc3VsdCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdCA9IG5ldyBQcm9taXNlU291cmNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydFJlc3VsdC5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlcmVkRGF0YS5yZXNvbHZlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZExvb3BQcm9taXNlO1xyXG4gICAgfTtcclxuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5wcm90b3R5cGUuYnVmZmVyRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCAmJiB0eXBlb2YgKHRoaXMuYnVmZmVyWzBdKSAhPT0gdHlwZW9mIChkYXRhKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBkYXRhIHRvIGJlIG9mIHR5cGUgXCIgKyB0eXBlb2YgKHRoaXMuYnVmZmVyKSArIFwiIGJ1dCB3YXMgb2YgdHlwZSBcIiArIHR5cGVvZiAoZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlcmVkRGF0YS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5zZW5kTG9vcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc3BvcnRSZXN1bHQsIGRhdGEsIGVycm9yXzE7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJ1ZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2VuZEJ1ZmZlcmVkRGF0YS5wcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV4ZWN1dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRSZXN1bHQucmVqZWN0KFwiQ29ubmVjdGlvbiBzdG9wcGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlcmVkRGF0YSA9IG5ldyBQcm9taXNlU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydFJlc3VsdCA9IHRoaXMudHJhbnNwb3J0UmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHR5cGVvZiAodGhpcy5idWZmZXJbMF0pID09PSBcInN0cmluZ1wiID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLmpvaW4oXCJcIikgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVHJhbnNwb3J0U2VuZFF1ZXVlLmNvbmNhdEJ1ZmZlcnModGhpcy5idWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzIsIDQsICwgNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyYW5zcG9ydC5zZW5kKGRhdGEpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0UmVzdWx0LnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcl8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRSZXN1bHQucmVqZWN0KGVycm9yXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMyAvKmJyZWFrKi8sIDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBUcmFuc3BvcnRTZW5kUXVldWUuY29uY2F0QnVmZmVycyA9IGZ1bmN0aW9uIChhcnJheUJ1ZmZlcnMpIHtcclxuICAgICAgICB2YXIgdG90YWxMZW5ndGggPSBhcnJheUJ1ZmZlcnMubWFwKGZ1bmN0aW9uIChiKSB7IHJldHVybiBiLmJ5dGVMZW5ndGg7IH0pLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBhcnJheUJ1ZmZlcnNfMSA9IGFycmF5QnVmZmVyczsgX2kgPCBhcnJheUJ1ZmZlcnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBhcnJheUJ1ZmZlcnNfMVtfaV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5zZXQobmV3IFVpbnQ4QXJyYXkoaXRlbSksIG9mZnNldCk7XHJcbiAgICAgICAgICAgIG9mZnNldCArPSBpdGVtLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQuYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUcmFuc3BvcnRTZW5kUXVldWU7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFRyYW5zcG9ydFNlbmRRdWV1ZSB9O1xyXG52YXIgUHJvbWlzZVNvdXJjZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFByb21pc2VTb3VyY2UoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgcmV0dXJuIF9hID0gW3Jlc29sdmUsIHJlamVjdF0sIF90aGlzLnJlc29sdmVyID0gX2FbMF0sIF90aGlzLnJlamVjdGVyID0gX2FbMV0sIF9hO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgUHJvbWlzZVNvdXJjZS5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlc29sdmVyKCk7XHJcbiAgICB9O1xyXG4gICAgUHJvbWlzZVNvdXJjZS5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgIHRoaXMucmVqZWN0ZXIocmVhc29uKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUHJvbWlzZVNvdXJjZTtcclxufSgpKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SHR0cENvbm5lY3Rpb24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IEhhbmRzaGFrZVByb3RvY29sIH0gZnJvbSBcIi4vSGFuZHNoYWtlUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9JSHViUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tIFwiLi9TdWJqZWN0XCI7XHJcbmltcG9ydCB7IEFyZyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbnZhciBERUZBVUxUX1RJTUVPVVRfSU5fTVMgPSAzMCAqIDEwMDA7XHJcbnZhciBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVMgPSAxNSAqIDEwMDA7XHJcbi8qKiBEZXNjcmliZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHtAbGluayBIdWJDb25uZWN0aW9ufSB0byB0aGUgc2VydmVyLiAqL1xyXG5leHBvcnQgdmFyIEh1YkNvbm5lY3Rpb25TdGF0ZTtcclxuKGZ1bmN0aW9uIChIdWJDb25uZWN0aW9uU3RhdGUpIHtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGVkLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiRGlzY29ubmVjdGVkXCJdID0gXCJEaXNjb25uZWN0ZWRcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgY29ubmVjdGluZy4gKi9cclxuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkNvbm5lY3RpbmdcIl0gPSBcIkNvbm5lY3RpbmdcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgY29ubmVjdGVkLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiQ29ubmVjdGVkXCJdID0gXCJDb25uZWN0ZWRcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgZGlzY29ubmVjdGluZy4gKi9cclxuICAgIEh1YkNvbm5lY3Rpb25TdGF0ZVtcIkRpc2Nvbm5lY3RpbmdcIl0gPSBcIkRpc2Nvbm5lY3RpbmdcIjtcclxuICAgIC8qKiBUaGUgaHViIGNvbm5lY3Rpb24gaXMgcmVjb25uZWN0aW5nLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiUmVjb25uZWN0aW5nXCJdID0gXCJSZWNvbm5lY3RpbmdcIjtcclxufSkoSHViQ29ubmVjdGlvblN0YXRlIHx8IChIdWJDb25uZWN0aW9uU3RhdGUgPSB7fSkpO1xyXG4vKiogUmVwcmVzZW50cyBhIGNvbm5lY3Rpb24gdG8gYSBTaWduYWxSIEh1Yi4gKi9cclxudmFyIEh1YkNvbm5lY3Rpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdWJDb25uZWN0aW9uKGNvbm5lY3Rpb24sIGxvZ2dlciwgcHJvdG9jb2wsIHJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5uZXh0S2VlcEFsaXZlID0gMDtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChjb25uZWN0aW9uLCBcImNvbm5lY3Rpb25cIik7XHJcbiAgICAgICAgQXJnLmlzUmVxdWlyZWQobG9nZ2VyLCBcImxvZ2dlclwiKTtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChwcm90b2NvbCwgXCJwcm90b2NvbFwiKTtcclxuICAgICAgICB0aGlzLnNlcnZlclRpbWVvdXRJbk1pbGxpc2Vjb25kcyA9IERFRkFVTFRfVElNRU9VVF9JTl9NUztcclxuICAgICAgICB0aGlzLmtlZXBBbGl2ZUludGVydmFsSW5NaWxsaXNlY29uZHMgPSBERUZBVUxUX1BJTkdfSU5URVJWQUxfSU5fTVM7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IHByb3RvY29sO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSByZWNvbm5lY3RQb2xpY3k7XHJcbiAgICAgICAgdGhpcy5oYW5kc2hha2VQcm90b2NvbCA9IG5ldyBIYW5kc2hha2VQcm90b2NvbCgpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbnJlY2VpdmUgPSBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gX3RoaXMucHJvY2Vzc0luY29taW5nRGF0YShkYXRhKTsgfTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IGZ1bmN0aW9uIChlcnJvcikgeyByZXR1cm4gX3RoaXMuY29ubmVjdGlvbkNsb3NlZChlcnJvcik7IH07XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcclxuICAgICAgICB0aGlzLm1ldGhvZHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNsb3NlZENhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVjb25uZWN0aW5nQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RlZENhbGxiYWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW52b2NhdGlvbklkID0gMDtcclxuICAgICAgICB0aGlzLnJlY2VpdmVkSGFuZHNoYWtlUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkUGluZ01lc3NhZ2UgPSB0aGlzLnByb3RvY29sLndyaXRlTWVzc2FnZSh7IHR5cGU6IE1lc3NhZ2VUeXBlLlBpbmcgfSk7XHJcbiAgICB9XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICAvLyBVc2luZyBhIHB1YmxpYyBzdGF0aWMgZmFjdG9yeSBtZXRob2QgbWVhbnMgd2UgY2FuIGhhdmUgYSBwcml2YXRlIGNvbnN0cnVjdG9yIGFuZCBhbiBfaW50ZXJuYWxfXHJcbiAgICAvLyBjcmVhdGUgbWV0aG9kIHRoYXQgY2FuIGJlIHVzZWQgYnkgSHViQ29ubmVjdGlvbkJ1aWxkZXIuIEFuIFwiaW50ZXJuYWxcIiBjb25zdHJ1Y3RvciB3b3VsZCBqdXN0XHJcbiAgICAvLyBiZSBzdHJpcHBlZCBhd2F5IGFuZCB0aGUgJy5kLnRzJyBmaWxlIHdvdWxkIGhhdmUgbm8gY29uc3RydWN0b3IsIHdoaWNoIGlzIGludGVycHJldGVkIGFzIGFcclxuICAgIC8vIHB1YmxpYyBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgIEh1YkNvbm5lY3Rpb24uY3JlYXRlID0gZnVuY3Rpb24gKGNvbm5lY3Rpb24sIGxvZ2dlciwgcHJvdG9jb2wsIHJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgSHViQ29ubmVjdGlvbihjb25uZWN0aW9uLCBsb2dnZXIsIHByb3RvY29sLCByZWNvbm5lY3RQb2xpY3kpO1xyXG4gICAgfTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIdWJDb25uZWN0aW9uLnByb3RvdHlwZSwgXCJzdGF0ZVwiLCB7XHJcbiAgICAgICAgLyoqIEluZGljYXRlcyB0aGUgc3RhdGUgb2YgdGhlIHtAbGluayBIdWJDb25uZWN0aW9ufSB0byB0aGUgc2VydmVyLiAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSHViQ29ubmVjdGlvbi5wcm90b3R5cGUsIFwiY29ubmVjdGlvbklkXCIsIHtcclxuICAgICAgICAvKiogUmVwcmVzZW50cyB0aGUgY29ubmVjdGlvbiBpZCBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IG9uIHRoZSBzZXJ2ZXIuIFRoZSBjb25uZWN0aW9uIGlkIHdpbGwgYmUgbnVsbCB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGVpdGhlclxyXG4gICAgICAgICAqICBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIG9yIGlmIHRoZSBuZWdvdGlhdGlvbiBzdGVwIHdhcyBza2lwcGVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uID8gKHRoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWQgfHwgbnVsbCkgOiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLCBcImJhc2VVcmxcIiwge1xyXG4gICAgICAgIC8qKiBJbmRpY2F0ZXMgdGhlIHVybCBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IHRvIHRoZSBzZXJ2ZXIuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uYmFzZVVybCB8fCBcIlwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyBhIG5ldyB1cmwgZm9yIHRoZSBIdWJDb25uZWN0aW9uLiBOb3RlIHRoYXQgdGhlIHVybCBjYW4gb25seSBiZSBjaGFuZ2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgaW4gZWl0aGVyIHRoZSBEaXNjb25uZWN0ZWQgb3JcclxuICAgICAgICAgKiBSZWNvbm5lY3Rpbmcgc3RhdGVzLlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCB0byBjb25uZWN0IHRvLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQgJiYgdGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBIdWJDb25uZWN0aW9uIG11c3QgYmUgaW4gdGhlIERpc2Nvbm5lY3RlZCBvciBSZWNvbm5lY3Rpbmcgc3RhdGUgdG8gY2hhbmdlIHRoZSB1cmwuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgSHViQ29ubmVjdGlvbiB1cmwgbXVzdCBiZSBhIHZhbGlkIHVybC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmJhc2VVcmwgPSB1cmw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKiogU3RhcnRzIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBlc3RhYmxpc2hlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0UHJvbWlzZSA9IHRoaXMuc3RhcnRXaXRoU3RhdGVUcmFuc2l0aW9ucygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0UHJvbWlzZTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydFdpdGhTdGF0ZVRyYW5zaXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGVfMTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHN0YXJ0IGEgSHViQ29ubmVjdGlvbiB0aGF0IGlzIG5vdCBpbiB0aGUgJ0Rpc2Nvbm5lY3RlZCcgc3RhdGUuXCIpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlN0YXJ0aW5nIEh1YkNvbm5lY3Rpb24uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDMsICwgNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0SW50ZXJuYWwoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiSHViQ29ubmVjdGlvbiBmYWlsZWQgdG8gc3RhcnQgc3VjY2Vzc2Z1bGx5IGJlY2F1c2Ugb2YgZXJyb3IgJ1wiICsgZV8xICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KGVfMSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdGFydEludGVybmFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZVByb21pc2UsIGhhbmRzaGFrZVJlcXVlc3QsIGVfMjtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRzaGFrZVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oYW5kc2hha2VSZXNvbHZlciA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5oYW5kc2hha2VSZWplY3RlciA9IHJlamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuY29ubmVjdGlvbi5zdGFydCh0aGlzLnByb3RvY29sLnRyYW5zZmVyRm9ybWF0KV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNSwgLCA3XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRzaGFrZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90b2NvbDogdGhpcy5wcm90b2NvbC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdGhpcy5wcm90b2NvbC52ZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2VuZGluZyBoYW5kc2hha2UgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc2VuZE1lc3NhZ2UodGhpcy5oYW5kc2hha2VQcm90b2NvbC53cml0ZUhhbmRzaGFrZVJlcXVlc3QoaGFuZHNoYWtlUmVxdWVzdCkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlVzaW5nIEh1YlByb3RvY29sICdcIiArIHRoaXMucHJvdG9jb2wubmFtZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmVuc2l2ZWx5IGNsZWFudXAgdGltZW91dCBpbiBjYXNlIHdlIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIHNlcnZlciBiZWZvcmUgd2UgZmluaXNoIHN0YXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVvdXRQZXJpb2QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldEtlZXBBbGl2ZUludGVydmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGhhbmRzaGFrZVByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJdCdzIGltcG9ydGFudCB0byBjaGVjayB0aGUgc3RvcER1cmluZ1N0YXJ0RXJyb3IgaW5zdGVhZCBvZiBqdXN0IHJlbHlpbmcgb24gdGhlIGhhbmRzaGFrZVByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmVpbmcgcmVqZWN0ZWQgb24gY2xvc2UsIGJlY2F1c2UgdGhpcyBjb250aW51YXRpb24gY2FuIHJ1biBhZnRlciBib3RoIHRoZSBoYW5kc2hha2UgY29tcGxldGVkIHN1Y2Nlc3NmdWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIHRocm93IGluc3RlYWQgb2YgcmV0dXJuaW5nIGEgcmVqZWN0ZWQgcHJvbWlzZSwgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFsbG93IGFueSBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbnMgdG8gb2NjdXIgYmV0d2VlbiBub3cgYW5kIHRoZSBjYWxsaW5nIGNvZGUgb2JzZXJ2aW5nIHRoZSBleGNlcHRpb25zLiBSZXR1cm5pbmcgYSByZWplY3RlZCBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGNhdXNlIHRoZSBjYWxsaW5nIGNvbnRpbnVhdGlvbiB0byBnZXQgc2NoZWR1bGVkIHRvIHJ1biBsYXRlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWIgaGFuZHNoYWtlIGZhaWxlZCB3aXRoIGVycm9yICdcIiArIGVfMiArIFwiJyBkdXJpbmcgc3RhcnQoKS4gU3RvcHBpbmcgSHViQ29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBzaG91bGQgbm90IGNvbXBsZXRlIHVudGlsIGFmdGVyIHRoZSBvbmNsb3NlIGNhbGxiYWNrIGlzIGludm9rZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uIHRvIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuY29ubmVjdGlvbi5zdG9wKGVfMildO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIHRyYW5zaXRpb24gdGhlIEh1YkNvbm5lY3Rpb24gdG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZSBiZWZvcmUgSHR0cENvbm5lY3Rpb24uc3RvcCgpIGNvbXBsZXRlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXzI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8qKiBTdG9wcyB0aGUgY29ubmVjdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29ubmVjdGlvbiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgdGVybWluYXRlZCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UHJvbWlzZSwgZV8zO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFByb21pc2UgPSB0aGlzLnN0YXJ0UHJvbWlzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZSA9IHRoaXMuc3RvcEludGVybmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzIsIDQsICwgNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHN0YXJ0UHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBd2FpdGluZyB1bmRlZmluZWQgY29udGludWVzIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zdG9wSW50ZXJuYWwgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHViQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIGl0IGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdHRwQ29ubmVjdGlvbi5zdG9wKFwiICsgZXJyb3IgKyBcIikgaWdub3JlZCBiZWNhdXNlIHRoZSBjb25uZWN0aW9uIGlzIGFscmVhZHkgaW4gdGhlIGRpc2Nvbm5lY3Rpbmcgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wUHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZztcclxuICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU3RvcHBpbmcgSHViQ29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUpIHtcclxuICAgICAgICAgICAgLy8gV2UncmUgaW4gYSByZWNvbm5lY3QgZGVsYXkgd2hpY2ggbWVhbnMgdGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiBpcyBjdXJyZW50bHkgYWxyZWFkeSBzdG9wcGVkLlxyXG4gICAgICAgICAgICAvLyBKdXN0IGNsZWFyIHRoZSBoYW5kbGUgdG8gc3RvcCB0aGUgcmVjb25uZWN0IGxvb3AgKHdoaWNoIG5vIG9uZSBpcyB3YWl0aW5nIG9uIHRoYW5rZnVsbHkpIGFuZFxyXG4gICAgICAgICAgICAvLyBmaXJlIHRoZSBvbmNsb3NlIGNhbGxiYWNrcy5cclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gc3RvcHBlZCBkdXJpbmcgcmVjb25uZWN0IGRlbGF5LiBEb25lIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFBpbmdUaW1lcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgPSBlcnJvciB8fCBuZXcgRXJyb3IoXCJUaGUgY29ubmVjdGlvbiB3YXMgc3RvcHBlZCBiZWZvcmUgdGhlIGh1YiBoYW5kc2hha2UgY291bGQgY29tcGxldGUuXCIpO1xyXG4gICAgICAgIC8vIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBzaG91bGQgbm90IGNvbXBsZXRlIHVudGlsIGFmdGVyIGVpdGhlciBIdHRwQ29ubmVjdGlvbi5zdGFydCgpIGZhaWxzXHJcbiAgICAgICAgLy8gb3IgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC4gVGhlIG9uY2xvc2UgY2FsbGJhY2sgd2lsbCB0cmFuc2l0aW9uIHRoZSBIdWJDb25uZWN0aW9uXHJcbiAgICAgICAgLy8gdG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZSBpZiBuZWVkIGJlIGJlZm9yZSBIdHRwQ29ubmVjdGlvbi5zdG9wKCkgY29tcGxldGVzLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc3RvcChlcnJvcik7XHJcbiAgICB9O1xyXG4gICAgLyoqIEludm9rZXMgYSBzdHJlYW1pbmcgaHViIG1ldGhvZCBvbiB0aGUgc2VydmVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlcGFyYW0gVCBUaGUgdHlwZSBvZiB0aGUgaXRlbXMgcmV0dXJuZWQgYnkgdGhlIHNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIHRvIGludm9rZS5cclxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3MgVGhlIGFyZ3VtZW50cyB1c2VkIHRvIGludm9rZSB0aGUgc2VydmVyIG1ldGhvZC5cclxuICAgICAqIEByZXR1cm5zIHtJU3RyZWFtUmVzdWx0PFQ+fSBBbiBvYmplY3QgdGhhdCB5aWVsZHMgcmVzdWx0cyBmcm9tIHRoZSBzZXJ2ZXIgYXMgdGhleSBhcmUgcmVjZWl2ZWQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0cmVhbSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcclxuICAgICAgICB2YXIgaW52b2NhdGlvbkRlc2NyaXB0b3IgPSB0aGlzLmNyZWF0ZVN0cmVhbUludm9jYXRpb24obWV0aG9kTmFtZSwgYXJncywgc3RyZWFtSWRzKTtcclxuICAgICAgICB2YXIgcHJvbWlzZVF1ZXVlO1xyXG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgICBzdWJqZWN0LmNhbmNlbENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgY2FuY2VsSW52b2NhdGlvbiA9IF90aGlzLmNyZWF0ZUNhbmNlbEludm9jYXRpb24oaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkKTtcclxuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woY2FuY2VsSW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXSA9IGZ1bmN0aW9uIChpbnZvY2F0aW9uRXZlbnQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaW52b2NhdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uRXZlbnQgd2lsbCBub3QgYmUgbnVsbCB3aGVuIGFuIGVycm9yIGlzIG5vdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LnR5cGUgPT09IE1lc3NhZ2VUeXBlLkNvbXBsZXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QuZXJyb3IobmV3IEVycm9yKGludm9jYXRpb25FdmVudC5lcnJvcikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3QubmV4dCgoaW52b2NhdGlvbkV2ZW50Lml0ZW0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvbWlzZVF1ZXVlID0gdGhpcy5zZW5kV2l0aFByb3RvY29sKGludm9jYXRpb25EZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc3ViamVjdC5lcnJvcihlKTtcclxuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF1bmNoU3RyZWFtcyhzdHJlYW1zLCBwcm9taXNlUXVldWUpO1xyXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRNZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnJlc2V0S2VlcEFsaXZlSW50ZXJ2YWwoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZW5kcyBhIGpzIG9iamVjdCB0byB0aGUgc2VydmVyLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGpzIG9iamVjdCB0byBzZXJpYWxpemUgYW5kIHNlbmQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRXaXRoUHJvdG9jb2wgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRNZXNzYWdlKHRoaXMucHJvdG9jb2wud3JpdGVNZXNzYWdlKG1lc3NhZ2UpKTtcclxuICAgIH07XHJcbiAgICAvKiogSW52b2tlcyBhIGh1YiBtZXRob2Qgb24gdGhlIHNlcnZlciB1c2luZyB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIGFyZ3VtZW50cy4gRG9lcyBub3Qgd2FpdCBmb3IgYSByZXNwb25zZSBmcm9tIHRoZSByZWNlaXZlci5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgUHJvbWlzZSByZXR1cm5lZCBieSB0aGlzIG1ldGhvZCByZXNvbHZlcyB3aGVuIHRoZSBjbGllbnQgaGFzIHNlbnQgdGhlIGludm9jYXRpb24gdG8gdGhlIHNlcnZlci4gVGhlIHNlcnZlciBtYXkgc3RpbGxcclxuICAgICAqIGJlIHByb2Nlc3NpbmcgdGhlIGludm9jYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZlciBtZXRob2QgdG8gaW52b2tlLlxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJncyBUaGUgYXJndW1lbnRzIHVzZWQgdG8gaW52b2tlIHRoZSBzZXJ2ZXIgbWV0aG9kLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGludm9jYXRpb24gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHNlbnQsIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX2EgPSB0aGlzLnJlcGxhY2VTdHJlYW1pbmdQYXJhbXMoYXJncyksIHN0cmVhbXMgPSBfYVswXSwgc3RyZWFtSWRzID0gX2FbMV07XHJcbiAgICAgICAgdmFyIHNlbmRQcm9taXNlID0gdGhpcy5zZW5kV2l0aFByb3RvY29sKHRoaXMuY3JlYXRlSW52b2NhdGlvbihtZXRob2ROYW1lLCBhcmdzLCB0cnVlLCBzdHJlYW1JZHMpKTtcclxuICAgICAgICB0aGlzLmxhdW5jaFN0cmVhbXMoc3RyZWFtcywgc2VuZFByb21pc2UpO1xyXG4gICAgICAgIHJldHVybiBzZW5kUHJvbWlzZTtcclxuICAgIH07XHJcbiAgICAvKiogSW52b2tlcyBhIGh1YiBtZXRob2Qgb24gdGhlIHNlcnZlciB1c2luZyB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kIGFyZ3VtZW50cy5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgUHJvbWlzZSByZXR1cm5lZCBieSB0aGlzIG1ldGhvZCByZXNvbHZlcyB3aGVuIHRoZSBzZXJ2ZXIgaW5kaWNhdGVzIGl0IGhhcyBmaW5pc2hlZCBpbnZva2luZyB0aGUgbWV0aG9kLiBXaGVuIHRoZSBwcm9taXNlXHJcbiAgICAgKiByZXNvbHZlcywgdGhlIHNlcnZlciBoYXMgZmluaXNoZWQgaW52b2tpbmcgdGhlIG1ldGhvZC4gSWYgdGhlIHNlcnZlciBtZXRob2QgcmV0dXJucyBhIHJlc3VsdCwgaXQgaXMgcHJvZHVjZWQgYXMgdGhlIHJlc3VsdCBvZlxyXG4gICAgICogcmVzb2x2aW5nIHRoZSBQcm9taXNlLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlcGFyYW0gVCBUaGUgZXhwZWN0ZWQgcmV0dXJuIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgc2VydmVyIG1ldGhvZCB0byBpbnZva2UuXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzIFRoZSBhcmd1bWVudHMgdXNlZCB0byBpbnZva2UgdGhlIHNlcnZlciBtZXRob2QuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIChpZiBhbnkpLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcclxuICAgICAgICB2YXIgaW52b2NhdGlvbkRlc2NyaXB0b3IgPSB0aGlzLmNyZWF0ZUludm9jYXRpb24obWV0aG9kTmFtZSwgYXJncywgZmFsc2UsIHN0cmVhbUlkcyk7XHJcbiAgICAgICAgdmFyIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vIGludm9jYXRpb25JZCB3aWxsIGFsd2F5cyBoYXZlIGEgdmFsdWUgZm9yIGEgbm9uLWJsb2NraW5nIGludm9jYXRpb25cclxuICAgICAgICAgICAgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF0gPSBmdW5jdGlvbiAoaW52b2NhdGlvbkV2ZW50LCBlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnZvY2F0aW9uRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uRXZlbnQgd2lsbCBub3QgYmUgbnVsbCB3aGVuIGFuIGVycm9yIGlzIG5vdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludm9jYXRpb25FdmVudC50eXBlID09PSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoaW52b2NhdGlvbkV2ZW50LmVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGludm9jYXRpb25FdmVudC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVW5leHBlY3RlZCBtZXNzYWdlIHR5cGU6IFwiICsgaW52b2NhdGlvbkV2ZW50LnR5cGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBwcm9taXNlUXVldWUgPSBfdGhpcy5zZW5kV2l0aFByb3RvY29sKGludm9jYXRpb25EZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnZvY2F0aW9uSWQgd2lsbCBhbHdheXMgaGF2ZSBhIHZhbHVlIGZvciBhIG5vbi1ibG9ja2luZyBpbnZvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5sYXVuY2hTdHJlYW1zKHN0cmVhbXMsIHByb21pc2VRdWV1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgaHViIG1ldGhvZCB3aXRoIHRoZSBzcGVjaWZpZWQgbWV0aG9kIG5hbWUgaXMgaW52b2tlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgaHViIG1ldGhvZCB0byBkZWZpbmUuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdNZXRob2QgVGhlIGhhbmRsZXIgdGhhdCB3aWxsIGJlIHJhaXNlZCB3aGVuIHRoZSBodWIgbWV0aG9kIGlzIGludm9rZWQuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIG5ld01ldGhvZCkge1xyXG4gICAgICAgIGlmICghbWV0aG9kTmFtZSB8fCAhbmV3TWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1ldGhvZE5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoIXRoaXMubWV0aG9kc1ttZXRob2ROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUHJldmVudGluZyBhZGRpbmcgdGhlIHNhbWUgaGFuZGxlciBtdWx0aXBsZSB0aW1lcy5cclxuICAgICAgICBpZiAodGhpcy5tZXRob2RzW21ldGhvZE5hbWVdLmluZGV4T2YobmV3TWV0aG9kKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0ucHVzaChuZXdNZXRob2QpO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBtZXRob2QpIHtcclxuICAgICAgICBpZiAoIW1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2ROYW1lID0gbWV0aG9kTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICBpZiAoIWhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgcmVtb3ZlSWR4ID0gaGFuZGxlcnMuaW5kZXhPZihtZXRob2QpO1xyXG4gICAgICAgICAgICBpZiAocmVtb3ZlSWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKHJlbW92ZUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWQuIE9wdGlvbmFsbHkgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQgY29udGFpbmluZyB0aGUgZXJyb3IgdGhhdCBjYXVzZWQgdGhlIGNvbm5lY3Rpb24gdG8gY2xvc2UgKGlmIGFueSkuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhcnRzIHJlY29ubmVjdGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXJ0cyByZWNvbm5lY3RpbmcuIE9wdGlvbmFsbHkgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQgY29udGFpbmluZyB0aGUgZXJyb3IgdGhhdCBjYXVzZWQgdGhlIGNvbm5lY3Rpb24gdG8gc3RhcnQgcmVjb25uZWN0aW5nIChpZiBhbnkpLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlY29ubmVjdGluZyA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdWNjZXNzZnVsbHkgcmVjb25uZWN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseSByZWNvbm5lY3RzLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlY29ubmVjdGVkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NJbmNvbWluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICBpZiAoIXRoaXMucmVjZWl2ZWRIYW5kc2hha2VSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBkYXRhID0gdGhpcy5wcm9jZXNzSGFuZHNoYWtlUmVzcG9uc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRIYW5kc2hha2VSZXNwb25zZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERhdGEgbWF5IGhhdmUgYWxsIGJlZW4gcmVhZCB3aGVuIHByb2Nlc3NpbmcgaGFuZHNoYWtlIHJlc3BvbnNlXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gUGFyc2UgdGhlIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlcyA9IHRoaXMucHJvdG9jb2wucGFyc2VNZXNzYWdlcyhkYXRhLCB0aGlzLmxvZ2dlcik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgbWVzc2FnZXNfMSA9IG1lc3NhZ2VzOyBfaSA8IG1lc3NhZ2VzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzXzFbX2ldO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtZXNzYWdlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkludm9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW52b2tlQ2xpZW50TWV0aG9kKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlN0cmVhbUl0ZW06XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gTWVzc2FnZVR5cGUuQ29tcGxldGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1ttZXNzYWdlLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlBpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhcmUgYWJvdXQgcGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5DbG9zZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIkNsb3NlIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSBzZXJ2ZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBtZXNzYWdlLmVycm9yID8gbmV3IEVycm9yKFwiU2VydmVyIHJldHVybmVkIGFuIGVycm9yIG9uIGNsb3NlOiBcIiArIG1lc3NhZ2UuZXJyb3IpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5hbGxvd1JlY29ubmVjdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQgZmVlbHMgd3Jvbmcgbm90IHRvIGF3YWl0IGNvbm5lY3Rpb24uc3RvcCgpIGhlcmUsIGJ1dCBwcm9jZXNzSW5jb21pbmdEYXRhIGlzIGNhbGxlZCBhcyBwYXJ0IG9mIGFuIG9ucmVjZWl2ZSBjYWxsYmFjayB3aGljaCBpcyBub3QgYXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGFscmVhZHkgdGhlIGJlaGF2aW9yIGZvciBzZXJ2ZXJUaW1lb3V0KCksIGFuZCBIdHRwQ29ubmVjdGlvbi5TdG9wKCkgc2hvdWxkIGNhdGNoIGFuZCBsb2cgYWxsIHBvc3NpYmxlIGV4Y2VwdGlvbnMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zdG9wKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbm5vdCBhd2FpdCBzdG9wSW50ZXJuYWwoKSBoZXJlLCBidXQgc3Vic2VxdWVudCBjYWxscyB0byBzdG9wKCkgd2lsbCBhd2FpdCB0aGlzIGlmIHN0b3BJbnRlcm5hbCgpIGlzIHN0aWxsIG9uZ29pbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gdGhpcy5zdG9wSW50ZXJuYWwoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIkludmFsaWQgbWVzc2FnZSB0eXBlOiBcIiArIG1lc3NhZ2UudHlwZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXRQZXJpb2QoKTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5wcm9jZXNzSGFuZHNoYWtlUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgcmVzcG9uc2VNZXNzYWdlO1xyXG4gICAgICAgIHZhciByZW1haW5pbmdEYXRhO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIF9hID0gdGhpcy5oYW5kc2hha2VQcm90b2NvbC5wYXJzZUhhbmRzaGFrZVJlc3BvbnNlKGRhdGEpLCByZW1haW5pbmdEYXRhID0gX2FbMF0sIHJlc3BvbnNlTWVzc2FnZSA9IF9hWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiRXJyb3IgcGFyc2luZyBoYW5kc2hha2UgcmVzcG9uc2U6IFwiICsgZTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRzaGFrZVJlamVjdGVyKGVycm9yKTtcclxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXNwb25zZU1lc3NhZ2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlNlcnZlciByZXR1cm5lZCBoYW5kc2hha2UgZXJyb3I6IFwiICsgcmVzcG9uc2VNZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTZXJ2ZXIgaGFuZHNoYWtlIGNvbXBsZXRlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kc2hha2VSZXNvbHZlcigpO1xyXG4gICAgICAgIHJldHVybiByZW1haW5pbmdEYXRhO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnJlc2V0S2VlcEFsaXZlSW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcy5pbmhlcmVudEtlZXBBbGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCB0aGUgdGltZSB3ZSB3YW50IHRoZSBuZXh0IGtlZXAgYWxpdmUgdG8gYmUgc2VudFxyXG4gICAgICAgIC8vIFRpbWVyIHdpbGwgYmUgc2V0dXAgb24gbmV4dCBtZXNzYWdlIHJlY2VpdmVcclxuICAgICAgICB0aGlzLm5leHRLZWVwQWxpdmUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMua2VlcEFsaXZlSW50ZXJ2YWxJbk1pbGxpc2Vjb25kcztcclxuICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXNldFRpbWVvdXRQZXJpb2QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbi5mZWF0dXJlcyB8fCAhdGhpcy5jb25uZWN0aW9uLmZlYXR1cmVzLmluaGVyZW50S2VlcEFsaXZlKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdGltZW91dCB0aW1lclxyXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlcnZlclRpbWVvdXQoKTsgfSwgdGhpcy5zZXJ2ZXJUaW1lb3V0SW5NaWxsaXNlY29uZHMpO1xyXG4gICAgICAgICAgICAvLyBTZXQga2VlcEFsaXZlIHRpbWVyIGlmIHRoZXJlIGlzbid0IG9uZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5waW5nU2VydmVySGFuZGxlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0UGluZyA9IHRoaXMubmV4dEtlZXBBbGl2ZSAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHRQaW5nIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRQaW5nID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIFRoZSB0aW1lciBuZWVkcyB0byBiZSBzZXQgZnJvbSBhIG5ldHdvcmtpbmcgY2FsbGJhY2sgdG8gYXZvaWQgQ2hyb21lIHRpbWVyIHRocm90dGxpbmcgZnJvbSBjYXVzaW5nIHRpbWVycyB0byBydW4gb25jZSBhIG1pbnV0ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5waW5nU2VydmVySGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZW5kTWVzc2FnZSh0aGlzLmNhY2hlZFBpbmdNZXNzYWdlKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yLiBJdCBzaG91bGQgYmUgc2VlbiBlbHNld2hlcmUgaW4gdGhlIGNsaWVudC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY29ubmVjdGlvbiBpcyBwcm9iYWJseSBpbiBhIGJhZCBvciBjbG9zZWQgc3RhdGUgbm93LCBjbGVhbnVwIHRoZSB0aW1lciBzbyBpdCBzdG9wcyB0cmlnZ2VyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7IH0sIG5leHRQaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXJ2ZXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRoZSBzZXJ2ZXIgaGFzbid0IHRhbGtlZCB0byB1cyBpbiBhIHdoaWxlLiBJdCBkb2Vzbid0IGxpa2UgdXMgYW55bW9yZSAuLi4gOihcclxuICAgICAgICAvLyBUZXJtaW5hdGUgdGhlIGNvbm5lY3Rpb24sIGJ1dCB3ZSBkb24ndCBuZWVkIHRvIHdhaXQgb24gdGhlIHByb21pc2UuIFRoaXMgY291bGQgdHJpZ2dlciByZWNvbm5lY3RpbmcuXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnN0b3AobmV3IEVycm9yKFwiU2VydmVyIHRpbWVvdXQgZWxhcHNlZCB3aXRob3V0IHJlY2VpdmluZyBhIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyLlwiKSk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuaW52b2tlQ2xpZW50TWV0aG9kID0gZnVuY3Rpb24gKGludm9jYXRpb25NZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbWV0aG9kcyA9IHRoaXMubWV0aG9kc1tpbnZvY2F0aW9uTWVzc2FnZS50YXJnZXQudG9Mb3dlckNhc2UoKV07XHJcbiAgICAgICAgaWYgKG1ldGhvZHMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5hcHBseShfdGhpcywgaW52b2NhdGlvbk1lc3NhZ2UuYXJndW1lbnRzKTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJBIGNhbGxiYWNrIGZvciB0aGUgbWV0aG9kIFwiICsgaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0LnRvTG93ZXJDYXNlKCkgKyBcIiB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW52b2NhdGlvbk1lc3NhZ2UuaW52b2NhdGlvbklkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdjEuIFNvIHdlIHJldHVybiBhbiBlcnJvciB0byBhdm9pZCBibG9ja2luZyB0aGUgc2VydmVyIHdhaXRpbmcgZm9yIHRoZSByZXNwb25zZS5cclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJTZXJ2ZXIgcmVxdWVzdGVkIGEgcmVzcG9uc2UsIHdoaWNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyB2ZXJzaW9uIG9mIHRoZSBjbGllbnQuXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB3YWl0IG9uIHRoZSBzdG9wIGl0c2VsZi5cclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSB0aGlzLnN0b3BJbnRlcm5hbChuZXcgRXJyb3IobWVzc2FnZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJObyBjbGllbnQgbWV0aG9kIHdpdGggdGhlIG5hbWUgJ1wiICsgaW52b2NhdGlvbk1lc3NhZ2UudGFyZ2V0ICsgXCInIGZvdW5kLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY29ubmVjdGlvbkNsb3NlZCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uLmNvbm5lY3Rpb25DbG9zZWQoXCIgKyBlcnJvciArIFwiKSBjYWxsZWQgd2hpbGUgaW4gc3RhdGUgXCIgKyB0aGlzLmNvbm5lY3Rpb25TdGF0ZSArIFwiLlwiKTtcclxuICAgICAgICAvLyBUcmlnZ2VyaW5nIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIgaXMgaW5zdWZmaWNpZW50IGJlY2F1c2UgaXQgY291bGQgYWxyZWFkeSBiZSByZXNvbHZlZCB3aXRob3V0IHRoZSBjb250aW51YXRpb24gaGF2aW5nIHJ1biB5ZXQuXHJcbiAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IHRoaXMuc3RvcER1cmluZ1N0YXJ0RXJyb3IgfHwgZXJyb3IgfHwgbmV3IEVycm9yKFwiVGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiB3YXMgY2xvc2VkIGJlZm9yZSB0aGUgaHViIGhhbmRzaGFrZSBjb3VsZCBjb21wbGV0ZS5cIik7XHJcbiAgICAgICAgLy8gSWYgdGhlIGhhbmRzaGFrZSBpcyBpbiBwcm9ncmVzcywgc3RhcnQgd2lsbCBiZSB3YWl0aW5nIGZvciB0aGUgaGFuZHNoYWtlIHByb21pc2UsIHNvIHdlIGNvbXBsZXRlIGl0LlxyXG4gICAgICAgIC8vIElmIGl0IGhhcyBhbHJlYWR5IGNvbXBsZXRlZCwgdGhpcyBzaG91bGQganVzdCBub29wLlxyXG4gICAgICAgIGlmICh0aGlzLmhhbmRzaGFrZVJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVzb2x2ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYW5jZWxDYWxsYmFja3NXaXRoRXJyb3IoZXJyb3IgfHwgbmV3IEVycm9yKFwiSW52b2NhdGlvbiBjYW5jZWxlZCBkdWUgdG8gdGhlIHVuZGVybHlpbmcgY29ubmVjdGlvbiBiZWluZyBjbG9zZWQuXCIpKTtcclxuICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuRGlzY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCAmJiB0aGlzLnJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBJZiBub25lIG9mIHRoZSBhYm92ZSBpZiBjb25kaXRpb25zIHdlcmUgdHJ1ZSB3ZXJlIGNhbGxlZCB0aGUgSHViQ29ubmVjdGlvbiBtdXN0IGJlIGluIGVpdGhlcjpcclxuICAgICAgICAvLyAxLiBUaGUgQ29ubmVjdGluZyBzdGF0ZSBpbiB3aGljaCBjYXNlIHRoZSBoYW5kc2hha2VSZXNvbHZlciB3aWxsIGNvbXBsZXRlIGl0IGFuZCBzdG9wRHVyaW5nU3RhcnRFcnJvciB3aWxsIGZhaWwgaXQuXHJcbiAgICAgICAgLy8gMi4gVGhlIFJlY29ubmVjdGluZyBzdGF0ZSBpbiB3aGljaCBjYXNlIHRoZSBoYW5kc2hha2VSZXNvbHZlciB3aWxsIGNvbXBsZXRlIGl0IGFuZCBzdG9wRHVyaW5nU3RhcnRFcnJvciB3aWxsIGZhaWwgdGhlIGN1cnJlbnQgcmVjb25uZWN0IGF0dGVtcHRcclxuICAgICAgICAvLyAgICBhbmQgcG90ZW50aWFsbHkgY29udGludWUgdGhlIHJlY29ubmVjdCgpIGxvb3AuXHJcbiAgICAgICAgLy8gMy4gVGhlIERpc2Nvbm5lY3RlZCBzdGF0ZSBpbiB3aGljaCBjYXNlIHdlJ3JlIGFscmVhZHkgZG9uZS5cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jb21wbGV0ZUNsb3NlID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhcnRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VkQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuYXBwbHkoX3RoaXMsIFtlcnJvcl0pOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkFuIG9uY2xvc2UgY2FsbGJhY2sgY2FsbGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVjb25uZWN0U3RhcnRUaW1lLCBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzLCByZXRyeUVycm9yLCBuZXh0UmV0cnlEZWxheSwgZV80O1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNvbm5lY3RTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlFcnJvciA9IGVycm9yICE9PSB1bmRlZmluZWQgPyBlcnJvciA6IG5ldyBFcnJvcihcIkF0dGVtcHRpbmcgdG8gcmVjb25uZWN0IGR1ZSB0byBhIHVua25vd24gZXJyb3IuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UmV0cnlEZWxheSA9IHRoaXMuZ2V0TmV4dFJldHJ5RGVsYXkocHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cysrLCAwLCByZXRyeUVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRSZXRyeURlbGF5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBub3QgcmVjb25uZWN0aW5nIGJlY2F1c2UgdGhlIElSZXRyeVBvbGljeSByZXR1cm5lZCBudWxsIG9uIHRoZSBmaXJzdCByZWNvbm5lY3QgYXR0ZW1wdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiByZWNvbm5lY3RpbmcgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlcnJvciArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ29ubmVjdGlvbiByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ucmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuYXBwbHkoX3RoaXMsIFtlcnJvcl0pOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkFuIG9ucmVjb25uZWN0aW5nIGNhbGxiYWNrIGNhbGxlZCB3aXRoIGVycm9yICdcIiArIGVycm9yICsgXCInIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhpdCBlYXJseSBpZiBhbiBvbnJlY29ubmVjdGluZyBjYWxsYmFjayBjYWxsZWQgY29ubmVjdGlvbi5zdG9wKCkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBsZWZ0IHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgaW4gb25yZWNvbm5lY3RpbmcgY2FsbGJhY2suIERvbmUgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEobmV4dFJldHJ5RGVsYXkgIT09IG51bGwpKSByZXR1cm4gWzMgLypicmVhayovLCA3XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlJlY29ubmVjdCBhdHRlbXB0IG51bWJlciBcIiArIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMgKyBcIiB3aWxsIHN0YXJ0IGluIFwiICsgbmV4dFJldHJ5RGVsYXkgKyBcIiBtcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUgPSBzZXRUaW1lb3V0KHJlc29sdmUsIG5leHRSZXRyeURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBIdWJDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBsZWZ0IHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgZHVyaW5nIHJlY29ubmVjdCBkZWxheS4gRG9uZSByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMywgNSwgLCA2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiSHViQ29ubmVjdGlvbiByZWNvbm5lY3RlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbnJlY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25uZWN0ZWRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW190aGlzLmNvbm5lY3Rpb24uY29ubmVjdGlvbklkXSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiQW4gb25yZWNvbm5lY3RlZCBjYWxsYmFjayBjYWxsZWQgd2l0aCBjb25uZWN0aW9uSWQgJ1wiICsgdGhpcy5jb25uZWN0aW9uLmNvbm5lY3Rpb25JZCArIFwiOyB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzQgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJSZWNvbm5lY3QgYXR0ZW1wdCBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlXzQgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIG1vdmVkIHRvIHRoZSAnXCIgKyB0aGlzLmNvbm5lY3Rpb25TdGF0ZSArIFwiJyBmcm9tIHRoZSByZWNvbm5lY3Rpbmcgc3RhdGUgZHVyaW5nIHJlY29ubmVjdCBhdHRlbXB0LiBEb25lIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgVHlwZVNjcmlwdCBjb21waWxlciB0aGlua3MgdGhhdCBjb25uZWN0aW9uU3RhdGUgbXVzdCBiZSBDb25uZWN0ZWQgaGVyZS4gVGhlIFR5cGVTY3JpcHQgY29tcGlsZXIgaXMgd3JvbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0cnlFcnJvciA9IGVfNCBpbnN0YW5jZW9mIEVycm9yID8gZV80IDogbmV3IEVycm9yKGVfNC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJldHJ5RGVsYXkgPSB0aGlzLmdldE5leHRSZXRyeURlbGF5KHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMrKywgRGF0ZS5ub3coKSAtIHJlY29ubmVjdFN0YXJ0VGltZSwgcmV0cnlFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiUmVjb25uZWN0IHJldHJpZXMgaGF2ZSBiZWVuIGV4aGF1c3RlZCBhZnRlciBcIiArIChEYXRlLm5vdygpIC0gcmVjb25uZWN0U3RhcnRUaW1lKSArIFwiIG1zIGFuZCBcIiArIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMgKyBcIiBmYWlsZWQgYXR0ZW1wdHMuIENvbm5lY3Rpb24gZGlzY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldE5leHRSZXRyeURlbGF5ID0gZnVuY3Rpb24gKHByZXZpb3VzUmV0cnlDb3VudCwgZWxhcHNlZE1pbGxpc2Vjb25kcywgcmV0cnlSZWFzb24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWNvbm5lY3RQb2xpY3kubmV4dFJldHJ5RGVsYXlJbk1pbGxpc2Vjb25kcyh7XHJcbiAgICAgICAgICAgICAgICBlbGFwc2VkTWlsbGlzZWNvbmRzOiBlbGFwc2VkTWlsbGlzZWNvbmRzLFxyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNSZXRyeUNvdW50OiBwcmV2aW91c1JldHJ5Q291bnQsXHJcbiAgICAgICAgICAgICAgICByZXRyeVJlYXNvbjogcmV0cnlSZWFzb24sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiSVJldHJ5UG9saWN5Lm5leHRSZXRyeURlbGF5SW5NaWxsaXNlY29uZHMoXCIgKyBwcmV2aW91c1JldHJ5Q291bnQgKyBcIiwgXCIgKyBlbGFwc2VkTWlsbGlzZWNvbmRzICsgXCIpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY2FuY2VsQ2FsbGJhY2tzV2l0aEVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuY2FsbGJhY2tzO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IGNhbGxiYWNrc1trZXldO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYW51cFBpbmdUaW1lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5waW5nU2VydmVySGFuZGxlKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNsZWFudXBUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRIYW5kbGUpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgbm9uYmxvY2tpbmcsIHN0cmVhbUlkcykge1xyXG4gICAgICAgIGlmIChub25ibG9ja2luZykge1xyXG4gICAgICAgICAgICBpZiAoc3RyZWFtSWRzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtSWRzOiBzdHJlYW1JZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaW52b2NhdGlvbklkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuaW52b2NhdGlvbklkKys7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW1JZHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGludm9jYXRpb25JZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbUlkczogc3RyZWFtSWRzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5JbnZvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmxhdW5jaFN0cmVhbXMgPSBmdW5jdGlvbiAoc3RyZWFtcywgcHJvbWlzZVF1ZXVlKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoc3RyZWFtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTeW5jaHJvbml6ZSBzdHJlYW0gZGF0YSBzbyB0aGV5IGFycml2ZSBpbi1vcmRlciBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgaWYgKCFwcm9taXNlUXVldWUpIHtcclxuICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHN0cmVhbUlkKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbXNbc3RyZWFtSWRdLnN1YnNjcmliZSh7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VRdWV1ZSA9IHByb21pc2VRdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woX3RoaXMuY3JlYXRlQ29tcGxldGlvbk1lc3NhZ2Uoc3RyZWFtSWQpKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlcnIgJiYgZXJyLnRvU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnIudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIlVua25vd24gZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChfdGhpcy5jcmVhdGVDb21wbGV0aW9uTWVzc2FnZShzdHJlYW1JZCwgbWVzc2FnZSkpOyB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VRdWV1ZSA9IHByb21pc2VRdWV1ZS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLnNlbmRXaXRoUHJvdG9jb2woX3RoaXMuY3JlYXRlU3RyZWFtSXRlbU1lc3NhZ2Uoc3RyZWFtSWQsIGl0ZW0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gaXRlcmF0ZSBvdmVyIHRoZSBrZXlzLCBzaW5jZSB0aGUga2V5cyBhcmUgdGhlIHN0cmVhbSBpZHNcclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cclxuICAgICAgICBmb3IgKHZhciBzdHJlYW1JZCBpbiBzdHJlYW1zKSB7XHJcbiAgICAgICAgICAgIF9sb29wXzEoc3RyZWFtSWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXBsYWNlU3RyZWFtaW5nUGFyYW1zID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgc3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIHZhciBzdHJlYW1JZHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3VtZW50ID0gYXJnc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPYnNlcnZhYmxlKGFyZ3VtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmVhbUlkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludm9jYXRpb25JZCsrO1xyXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIHN0cmVhbSBmb3IgbGF0ZXIgdXNlXHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3N0cmVhbUlkXSA9IGFyZ3VtZW50O1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtSWRzLnB1c2goc3RyZWFtSWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3RyZWFtIGZyb20gYXJnc1xyXG4gICAgICAgICAgICAgICAgYXJncy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtzdHJlYW1zLCBzdHJlYW1JZHNdO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmlzT2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAvLyBUaGlzIGFsbG93cyBvdGhlciBzdHJlYW0gaW1wbGVtZW50YXRpb25zIHRvIGp1c3Qgd29yayAobGlrZSByeGpzKVxyXG4gICAgICAgIHJldHVybiBhcmcgJiYgYXJnLnN1YnNjcmliZSAmJiB0eXBlb2YgYXJnLnN1YnNjcmliZSA9PT0gXCJmdW5jdGlvblwiO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZVN0cmVhbUludm9jYXRpb24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgYXJncywgc3RyZWFtSWRzKSB7XHJcbiAgICAgICAgdmFyIGludm9jYXRpb25JZCA9IHRoaXMuaW52b2NhdGlvbklkO1xyXG4gICAgICAgIHRoaXMuaW52b2NhdGlvbklkKys7XHJcbiAgICAgICAgaWYgKHN0cmVhbUlkcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBzdHJlYW1JZHM6IHN0cmVhbUlkcyxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlN0cmVhbUludm9jYXRpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpbnZvY2F0aW9uSWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbWV0aG9kTmFtZSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlN0cmVhbUludm9jYXRpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUNhbmNlbEludm9jYXRpb24gPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5DYW5jZWxJbnZvY2F0aW9uLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlU3RyZWFtSXRlbU1lc3NhZ2UgPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5TdHJlYW1JdGVtLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQ29tcGxldGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAoaWQsIGVycm9yLCByZXN1bHQpIHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5Db21wbGV0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGlkLFxyXG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuQ29tcGxldGlvbixcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdWJDb25uZWN0aW9uO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh1YkNvbm5lY3Rpb24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG5pbXBvcnQgeyBEZWZhdWx0UmVjb25uZWN0UG9saWN5IH0gZnJvbSBcIi4vRGVmYXVsdFJlY29ubmVjdFBvbGljeVwiO1xyXG5pbXBvcnQgeyBIdHRwQ29ubmVjdGlvbiB9IGZyb20gXCIuL0h0dHBDb25uZWN0aW9uXCI7XHJcbmltcG9ydCB7IEh1YkNvbm5lY3Rpb24gfSBmcm9tIFwiLi9IdWJDb25uZWN0aW9uXCI7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG5pbXBvcnQgeyBKc29uSHViUHJvdG9jb2wgfSBmcm9tIFwiLi9Kc29uSHViUHJvdG9jb2xcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuaW1wb3J0IHsgQXJnLCBDb25zb2xlTG9nZ2VyIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuLy8gdHNsaW50OmRpc2FibGU6b2JqZWN0LWxpdGVyYWwtc29ydC1rZXlzXHJcbnZhciBMb2dMZXZlbE5hbWVNYXBwaW5nID0ge1xyXG4gICAgdHJhY2U6IExvZ0xldmVsLlRyYWNlLFxyXG4gICAgZGVidWc6IExvZ0xldmVsLkRlYnVnLFxyXG4gICAgaW5mbzogTG9nTGV2ZWwuSW5mb3JtYXRpb24sXHJcbiAgICBpbmZvcm1hdGlvbjogTG9nTGV2ZWwuSW5mb3JtYXRpb24sXHJcbiAgICB3YXJuOiBMb2dMZXZlbC5XYXJuaW5nLFxyXG4gICAgd2FybmluZzogTG9nTGV2ZWwuV2FybmluZyxcclxuICAgIGVycm9yOiBMb2dMZXZlbC5FcnJvcixcclxuICAgIGNyaXRpY2FsOiBMb2dMZXZlbC5Dcml0aWNhbCxcclxuICAgIG5vbmU6IExvZ0xldmVsLk5vbmUsXHJcbn07XHJcbmZ1bmN0aW9uIHBhcnNlTG9nTGV2ZWwobmFtZSkge1xyXG4gICAgLy8gQ2FzZS1pbnNlbnNpdGl2ZSBtYXRjaGluZyB2aWEgbG93ZXItY2FzaW5nXHJcbiAgICAvLyBZZXMsIEkga25vdyBjYXNlLWZvbGRpbmcgaXMgYSBjb21wbGljYXRlZCBwcm9ibGVtIGluIFVuaWNvZGUsIGJ1dCB3ZSBvbmx5IHN1cHBvcnRcclxuICAgIC8vIHRoZSBBU0NJSSBzdHJpbmdzIGRlZmluZWQgaW4gTG9nTGV2ZWxOYW1lTWFwcGluZyBhbnl3YXksIHNvIGl0J3MgZmluZSAtYW51cnNlLlxyXG4gICAgdmFyIG1hcHBpbmcgPSBMb2dMZXZlbE5hbWVNYXBwaW5nW25hbWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICBpZiAodHlwZW9mIG1hcHBpbmcgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICByZXR1cm4gbWFwcGluZztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gbG9nIGxldmVsOiBcIiArIG5hbWUpO1xyXG4gICAgfVxyXG59XHJcbi8qKiBBIGJ1aWxkZXIgZm9yIGNvbmZpZ3VyaW5nIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gaW5zdGFuY2VzLiAqL1xyXG52YXIgSHViQ29ubmVjdGlvbkJ1aWxkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBIdWJDb25uZWN0aW9uQnVpbGRlcigpIHtcclxuICAgIH1cclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS5jb25maWd1cmVMb2dnaW5nID0gZnVuY3Rpb24gKGxvZ2dpbmcpIHtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChsb2dnaW5nLCBcImxvZ2dpbmdcIik7XHJcbiAgICAgICAgaWYgKGlzTG9nZ2VyKGxvZ2dpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2luZztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGxvZ2dpbmcgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdmFyIGxvZ0xldmVsID0gcGFyc2VMb2dMZXZlbChsb2dnaW5nKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBuZXcgQ29uc29sZUxvZ2dlcihsb2dMZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKGxvZ2dpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aFVybCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zcG9ydFR5cGVPck9wdGlvbnMpIHtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xyXG4gICAgICAgIEFyZy5pc05vdEVtcHR5KHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgLy8gRmxvdy10eXBpbmcga25vd3Mgd2hlcmUgaXQncyBhdC4gU2luY2UgSHR0cFRyYW5zcG9ydFR5cGUgaXMgYSBudW1iZXIgYW5kIElIdHRwQ29ubmVjdGlvbk9wdGlvbnMgaXMgZ3VhcmFudGVlZFxyXG4gICAgICAgIC8vIHRvIGJlIGFuIG9iamVjdCwgd2Uga25vdyAoYXMgZG9lcyBUeXBlU2NyaXB0KSB0aGlzIGNvbXBhcmlzb24gaXMgYWxsIHdlIG5lZWQgdG8gZmlndXJlIG91dCB3aGljaCBvdmVybG9hZCB3YXMgY2FsbGVkLlxyXG4gICAgICAgIGlmICh0eXBlb2YgdHJhbnNwb3J0VHlwZU9yT3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBDb25uZWN0aW9uT3B0aW9ucyA9IF9fYXNzaWduKHt9LCB0aGlzLmh0dHBDb25uZWN0aW9uT3B0aW9ucywgdHJhbnNwb3J0VHlwZU9yT3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBDb25uZWN0aW9uT3B0aW9ucyA9IF9fYXNzaWduKHt9LCB0aGlzLmh0dHBDb25uZWN0aW9uT3B0aW9ucywgeyB0cmFuc3BvcnQ6IHRyYW5zcG9ydFR5cGVPck9wdGlvbnMgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIC8qKiBDb25maWd1cmVzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1YkNvbm5lY3Rpb259IHRvIHVzZSB0aGUgc3BlY2lmaWVkIEh1YiBQcm90b2NvbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lIdWJQcm90b2NvbH0gcHJvdG9jb2wgVGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSUh1YlByb3RvY29sfSBpbXBsZW1lbnRhdGlvbiB0byB1c2UuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS53aXRoSHViUHJvdG9jb2wgPSBmdW5jdGlvbiAocHJvdG9jb2wpIHtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChwcm90b2NvbCwgXCJwcm90b2NvbFwiKTtcclxuICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbkJ1aWxkZXIucHJvdG90eXBlLndpdGhBdXRvbWF0aWNSZWNvbm5lY3QgPSBmdW5jdGlvbiAocmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHJlY29ubmVjdFBvbGljeSBoYXMgYWxyZWFkeSBiZWVuIHNldC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdFBvbGljeSA9IG5ldyBEZWZhdWx0UmVjb25uZWN0UG9saWN5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeSkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSBuZXcgRGVmYXVsdFJlY29ubmVjdFBvbGljeShyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0UG9saWN5ID0gcmV0cnlEZWxheXNPclJlY29ubmVjdFBvbGljeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqIENyZWF0ZXMgYSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1YkNvbm5lY3Rpb259IGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBzcGVjaWZpZWQgaW4gdGhpcyBidWlsZGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtIdWJDb25uZWN0aW9ufSBUaGUgY29uZmlndXJlZCB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1YkNvbm5lY3Rpb259LlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gSWYgaHR0cENvbm5lY3Rpb25PcHRpb25zIGhhcyBhIGxvZ2dlciwgdXNlIGl0LiBPdGhlcndpc2UsIG92ZXJyaWRlIGl0IHdpdGggdGhlIG9uZVxyXG4gICAgICAgIC8vIHByb3ZpZGVkIHRvIGNvbmZpZ3VyZUxvZ2dlclxyXG4gICAgICAgIHZhciBodHRwQ29ubmVjdGlvbk9wdGlvbnMgPSB0aGlzLmh0dHBDb25uZWN0aW9uT3B0aW9ucyB8fCB7fTtcclxuICAgICAgICAvLyBJZiBpdCdzICdudWxsJywgdGhlIHVzZXIgKipleHBsaWNpdGx5KiogYXNrZWQgZm9yIG51bGwsIGRvbid0IG1lc3Mgd2l0aCBpdC5cclxuICAgICAgICBpZiAoaHR0cENvbm5lY3Rpb25PcHRpb25zLmxvZ2dlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIElmIG91ciBsb2dnZXIgaXMgdW5kZWZpbmVkIG9yIG51bGwsIHRoYXQncyBPSywgdGhlIEh0dHBDb25uZWN0aW9uIGNvbnN0cnVjdG9yIHdpbGwgaGFuZGxlIGl0LlxyXG4gICAgICAgICAgICBodHRwQ29ubmVjdGlvbk9wdGlvbnMubG9nZ2VyID0gdGhpcy5sb2dnZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5vdyBjcmVhdGUgdGhlIGNvbm5lY3Rpb25cclxuICAgICAgICBpZiAoIXRoaXMudXJsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSAnSHViQ29ubmVjdGlvbkJ1aWxkZXIud2l0aFVybCcgbWV0aG9kIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBidWlsZGluZyB0aGUgY29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gbmV3IEh0dHBDb25uZWN0aW9uKHRoaXMudXJsLCBodHRwQ29ubmVjdGlvbk9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBIdWJDb25uZWN0aW9uLmNyZWF0ZShjb25uZWN0aW9uLCB0aGlzLmxvZ2dlciB8fCBOdWxsTG9nZ2VyLmluc3RhbmNlLCB0aGlzLnByb3RvY29sIHx8IG5ldyBKc29uSHViUHJvdG9jb2woKSwgdGhpcy5yZWNvbm5lY3RQb2xpY3kpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdWJDb25uZWN0aW9uQnVpbGRlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgSHViQ29ubmVjdGlvbkJ1aWxkZXIgfTtcclxuZnVuY3Rpb24gaXNMb2dnZXIobG9nZ2VyKSB7XHJcbiAgICByZXR1cm4gbG9nZ2VyLmxvZyAhPT0gdW5kZWZpbmVkO1xyXG59XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh1YkNvbm5lY3Rpb25CdWlsZGVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLyoqIERlZmluZXMgdGhlIHR5cGUgb2YgYSBIdWIgTWVzc2FnZS4gKi9cclxuZXhwb3J0IHZhciBNZXNzYWdlVHlwZTtcclxuKGZ1bmN0aW9uIChNZXNzYWdlVHlwZSkge1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhbiBJbnZvY2F0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSW52b2NhdGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiSW52b2NhdGlvblwiXSA9IDFdID0gXCJJbnZvY2F0aW9uXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgU3RyZWFtSXRlbSBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLlN0cmVhbUl0ZW1NZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIlN0cmVhbUl0ZW1cIl0gPSAyXSA9IFwiU3RyZWFtSXRlbVwiO1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIENvbXBsZXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5Db21wbGV0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xyXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJDb21wbGV0aW9uXCJdID0gM10gPSBcIkNvbXBsZXRpb25cIjtcclxuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBTdHJlYW0gSW52b2NhdGlvbiBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLlN0cmVhbUludm9jYXRpb25NZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIlN0cmVhbUludm9jYXRpb25cIl0gPSA0XSA9IFwiU3RyZWFtSW52b2NhdGlvblwiO1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIENhbmNlbCBJbnZvY2F0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuQ2FuY2VsSW52b2NhdGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiQ2FuY2VsSW52b2NhdGlvblwiXSA9IDVdID0gXCJDYW5jZWxJbnZvY2F0aW9uXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgUGluZyBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLlBpbmdNZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIlBpbmdcIl0gPSA2XSA9IFwiUGluZ1wiO1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIENsb3NlIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuQ2xvc2VNZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIkNsb3NlXCJdID0gN10gPSBcIkNsb3NlXCI7XHJcbn0pKE1lc3NhZ2VUeXBlIHx8IChNZXNzYWdlVHlwZSA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlIdWJQcm90b2NvbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIFRoZXNlIHZhbHVlcyBhcmUgZGVzaWduZWQgdG8gbWF0Y2ggdGhlIEFTUC5ORVQgTG9nIExldmVscyBzaW5jZSB0aGF0J3MgdGhlIHBhdHRlcm4gd2UncmUgZW11bGF0aW5nIGhlcmUuXHJcbi8qKiBJbmRpY2F0ZXMgdGhlIHNldmVyaXR5IG9mIGEgbG9nIG1lc3NhZ2UuXHJcbiAqXHJcbiAqIExvZyBMZXZlbHMgYXJlIG9yZGVyZWQgaW4gaW5jcmVhc2luZyBzZXZlcml0eS4gU28gYERlYnVnYCBpcyBtb3JlIHNldmVyZSB0aGFuIGBUcmFjZWAsIGV0Yy5cclxuICovXHJcbmV4cG9ydCB2YXIgTG9nTGV2ZWw7XHJcbihmdW5jdGlvbiAoTG9nTGV2ZWwpIHtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIHZlcnkgbG93IHNldmVyaXR5IGRpYWdub3N0aWMgbWVzc2FnZXMuICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIlRyYWNlXCJdID0gMF0gPSBcIlRyYWNlXCI7XHJcbiAgICAvKiogTG9nIGxldmVsIGZvciBsb3cgc2V2ZXJpdHkgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiRGVidWdcIl0gPSAxXSA9IFwiRGVidWdcIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGluZm9ybWF0aW9uYWwgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiSW5mb3JtYXRpb25cIl0gPSAyXSA9IFwiSW5mb3JtYXRpb25cIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGRpYWdub3N0aWMgbWVzc2FnZXMgdGhhdCBpbmRpY2F0ZSBhIG5vbi1mYXRhbCBwcm9ibGVtLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJXYXJuaW5nXCJdID0gM10gPSBcIldhcm5pbmdcIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGRpYWdub3N0aWMgbWVzc2FnZXMgdGhhdCBpbmRpY2F0ZSBhIGZhaWx1cmUgaW4gdGhlIGN1cnJlbnQgb3BlcmF0aW9uLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJFcnJvclwiXSA9IDRdID0gXCJFcnJvclwiO1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgZmFpbHVyZSB0aGF0IHdpbGwgdGVybWluYXRlIHRoZSBlbnRpcmUgYXBwbGljYXRpb24uICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkNyaXRpY2FsXCJdID0gNV0gPSBcIkNyaXRpY2FsXCI7XHJcbiAgICAvKiogVGhlIGhpZ2hlc3QgcG9zc2libGUgbG9nIGxldmVsLiBVc2VkIHdoZW4gY29uZmlndXJpbmcgbG9nZ2luZyB0byBpbmRpY2F0ZSB0aGF0IG5vIGxvZyBtZXNzYWdlcyBzaG91bGQgYmUgZW1pdHRlZC4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiTm9uZVwiXSA9IDZdID0gXCJOb25lXCI7XHJcbn0pKExvZ0xldmVsIHx8IChMb2dMZXZlbCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlMb2dnZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyBUaGlzIHdpbGwgYmUgdHJlYXRlZCBhcyBhIGJpdCBmbGFnIGluIHRoZSBmdXR1cmUsIHNvIHdlIGtlZXAgaXQgdXNpbmcgcG93ZXItb2YtdHdvIHZhbHVlcy5cclxuLyoqIFNwZWNpZmllcyBhIHNwZWNpZmljIEhUVFAgdHJhbnNwb3J0IHR5cGUuICovXHJcbmV4cG9ydCB2YXIgSHR0cFRyYW5zcG9ydFR5cGU7XHJcbihmdW5jdGlvbiAoSHR0cFRyYW5zcG9ydFR5cGUpIHtcclxuICAgIC8qKiBTcGVjaWZpZXMgbm8gdHJhbnNwb3J0IHByZWZlcmVuY2UuICovXHJcbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xyXG4gICAgLyoqIFNwZWNpZmllcyB0aGUgV2ViU29ja2V0cyB0cmFuc3BvcnQuICovXHJcbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIldlYlNvY2tldHNcIl0gPSAxXSA9IFwiV2ViU29ja2V0c1wiO1xyXG4gICAgLyoqIFNwZWNpZmllcyB0aGUgU2VydmVyLVNlbnQgRXZlbnRzIHRyYW5zcG9ydC4gKi9cclxuICAgIEh0dHBUcmFuc3BvcnRUeXBlW0h0dHBUcmFuc3BvcnRUeXBlW1wiU2VydmVyU2VudEV2ZW50c1wiXSA9IDJdID0gXCJTZXJ2ZXJTZW50RXZlbnRzXCI7XHJcbiAgICAvKiogU3BlY2lmaWVzIHRoZSBMb25nIFBvbGxpbmcgdHJhbnNwb3J0LiAqL1xyXG4gICAgSHR0cFRyYW5zcG9ydFR5cGVbSHR0cFRyYW5zcG9ydFR5cGVbXCJMb25nUG9sbGluZ1wiXSA9IDRdID0gXCJMb25nUG9sbGluZ1wiO1xyXG59KShIdHRwVHJhbnNwb3J0VHlwZSB8fCAoSHR0cFRyYW5zcG9ydFR5cGUgPSB7fSkpO1xyXG4vKiogU3BlY2lmaWVzIHRoZSB0cmFuc2ZlciBmb3JtYXQgZm9yIGEgY29ubmVjdGlvbi4gKi9cclxuZXhwb3J0IHZhciBUcmFuc2ZlckZvcm1hdDtcclxuKGZ1bmN0aW9uIChUcmFuc2ZlckZvcm1hdCkge1xyXG4gICAgLyoqIFNwZWNpZmllcyB0aGF0IG9ubHkgdGV4dCBkYXRhIHdpbGwgYmUgdHJhbnNtaXR0ZWQgb3ZlciB0aGUgY29ubmVjdGlvbi4gKi9cclxuICAgIFRyYW5zZmVyRm9ybWF0W1RyYW5zZmVyRm9ybWF0W1wiVGV4dFwiXSA9IDFdID0gXCJUZXh0XCI7XHJcbiAgICAvKiogU3BlY2lmaWVzIHRoYXQgYmluYXJ5IGRhdGEgd2lsbCBiZSB0cmFuc21pdHRlZCBvdmVyIHRoZSBjb25uZWN0aW9uLiAqL1xyXG4gICAgVHJhbnNmZXJGb3JtYXRbVHJhbnNmZXJGb3JtYXRbXCJCaW5hcnlcIl0gPSAyXSA9IFwiQmluYXJ5XCI7XHJcbn0pKFRyYW5zZmVyRm9ybWF0IHx8IChUcmFuc2ZlckZvcm1hdCA9IHt9KSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlUcmFuc3BvcnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL0lIdWJQcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgVHJhbnNmZXJGb3JtYXQgfSBmcm9tIFwiLi9JVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IE51bGxMb2dnZXIgfSBmcm9tIFwiLi9Mb2dnZXJzXCI7XHJcbmltcG9ydCB7IFRleHRNZXNzYWdlRm9ybWF0IH0gZnJvbSBcIi4vVGV4dE1lc3NhZ2VGb3JtYXRcIjtcclxudmFyIEpTT05fSFVCX1BST1RPQ09MX05BTUUgPSBcImpzb25cIjtcclxuLyoqIEltcGxlbWVudHMgdGhlIEpTT04gSHViIFByb3RvY29sLiAqL1xyXG52YXIgSnNvbkh1YlByb3RvY29sID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSnNvbkh1YlByb3RvY29sKCkge1xyXG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgICAgIHRoaXMubmFtZSA9IEpTT05fSFVCX1BST1RPQ09MX05BTUU7XHJcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gMTtcclxuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgICAgICB0aGlzLnRyYW5zZmVyRm9ybWF0ID0gVHJhbnNmZXJGb3JtYXQuVGV4dDtcclxuICAgIH1cclxuICAgIC8qKiBDcmVhdGVzIGFuIGFycmF5IG9mIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViTWVzc2FnZX0gb2JqZWN0cyBmcm9tIHRoZSBzcGVjaWZpZWQgc2VyaWFsaXplZCByZXByZXNlbnRhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgQSBzdHJpbmcgY29udGFpbmluZyB0aGUgc2VyaWFsaXplZCByZXByZXNlbnRhdGlvbi5cclxuICAgICAqIEBwYXJhbSB7SUxvZ2dlcn0gbG9nZ2VyIEEgbG9nZ2VyIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGxvZyBtZXNzYWdlcyB0aGF0IG9jY3VyIGR1cmluZyBwYXJzaW5nLlxyXG4gICAgICovXHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLnBhcnNlTWVzc2FnZXMgPSBmdW5jdGlvbiAoaW5wdXQsIGxvZ2dlcikge1xyXG4gICAgICAgIC8vIFRoZSBpbnRlcmZhY2UgZG9lcyBhbGxvdyBcIkFycmF5QnVmZmVyXCIgdG8gYmUgcGFzc2VkIGluLCBidXQgdGhpcyBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdC4gU28gbGV0J3MgdGhyb3cgYSB1c2VmdWwgZXJyb3IuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IGZvciBKU09OIGh1YiBwcm90b2NvbC4gRXhwZWN0ZWQgYSBzdHJpbmcuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvZ2dlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2dnZXIgPSBOdWxsTG9nZ2VyLmluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQYXJzZSB0aGUgbWVzc2FnZXNcclxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBUZXh0TWVzc2FnZUZvcm1hdC5wYXJzZShpbnB1dCk7XHJcbiAgICAgICAgdmFyIGh1Yk1lc3NhZ2VzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtZXNzYWdlc18xID0gbWVzc2FnZXM7IF9pIDwgbWVzc2FnZXNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBtZXNzYWdlc18xW19pXTtcclxuICAgICAgICAgICAgdmFyIHBhcnNlZE1lc3NhZ2UgPSBKU09OLnBhcnNlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlZE1lc3NhZ2UudHlwZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXlsb2FkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHBhcnNlZE1lc3NhZ2UudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5JbnZvY2F0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNJbnZvY2F0aW9uTWVzc2FnZShwYXJzZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuU3RyZWFtSXRlbTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3RyZWFtSXRlbU1lc3NhZ2UocGFyc2VkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNvbXBsZXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRpb25NZXNzYWdlKHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5QaW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmdsZSB2YWx1ZSwgbm8gbmVlZCB0byB2YWxpZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5DbG9zZTpcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbGwgb3B0aW9uYWwgdmFsdWVzLCBubyBuZWVkIHRvIHZhbGlkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZ1dHVyZSBwcm90b2NvbCBjaGFuZ2VzIGNhbiBhZGQgbWVzc2FnZSB0eXBlcywgb2xkIGNsaWVudHMgY2FuIGlnbm9yZSB0aGVtXHJcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJVbmtub3duIG1lc3NhZ2UgdHlwZSAnXCIgKyBwYXJzZWRNZXNzYWdlLnR5cGUgKyBcIicgaWdub3JlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHViTWVzc2FnZXMucHVzaChwYXJzZWRNZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGh1Yk1lc3NhZ2VzO1xyXG4gICAgfTtcclxuICAgIC8qKiBXcml0ZXMgdGhlIHNwZWNpZmllZCB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh1Yk1lc3NhZ2V9IHRvIGEgc3RyaW5nIGFuZCByZXR1cm5zIGl0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SHViTWVzc2FnZX0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byB3cml0ZS5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHNlcmlhbGl6ZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUud3JpdGVNZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXQud3JpdGUoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgfTtcclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUuaXNJbnZvY2F0aW9uTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5hc3NlcnROb3RFbXB0eVN0cmluZyhtZXNzYWdlLnRhcmdldCwgXCJJbnZhbGlkIHBheWxvYWQgZm9yIEludm9jYXRpb24gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuaW52b2NhdGlvbklkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hc3NlcnROb3RFbXB0eVN0cmluZyhtZXNzYWdlLmludm9jYXRpb25JZCwgXCJJbnZhbGlkIHBheWxvYWQgZm9yIEludm9jYXRpb24gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUuaXNTdHJlYW1JdGVtTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgdGhpcy5hc3NlcnROb3RFbXB0eVN0cmluZyhtZXNzYWdlLmludm9jYXRpb25JZCwgXCJJbnZhbGlkIHBheWxvYWQgZm9yIFN0cmVhbUl0ZW0gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuaXRlbSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGF5bG9hZCBmb3IgU3RyZWFtSXRlbSBtZXNzYWdlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5pc0NvbXBsZXRpb25NZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAobWVzc2FnZS5yZXN1bHQgJiYgbWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQgZm9yIENvbXBsZXRpb24gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbWVzc2FnZS5yZXN1bHQgJiYgbWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuZXJyb3IsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBDb21wbGV0aW9uIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuaW52b2NhdGlvbklkLCBcIkludmFsaWQgcGF5bG9hZCBmb3IgQ29tcGxldGlvbiBtZXNzYWdlLlwiKTtcclxuICAgIH07XHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmFzc2VydE5vdEVtcHR5U3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiIHx8IHZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gSnNvbkh1YlByb3RvY29sO1xyXG59KCkpO1xyXG5leHBvcnQgeyBKc29uSHViUHJvdG9jb2wgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SnNvbkh1YlByb3RvY29sLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLyoqIEEgbG9nZ2VyIHRoYXQgZG9lcyBub3RoaW5nIHdoZW4gbG9nIG1lc3NhZ2VzIGFyZSBzZW50IHRvIGl0LiAqL1xyXG52YXIgTnVsbExvZ2dlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIE51bGxMb2dnZXIoKSB7XHJcbiAgICB9XHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxyXG4gICAgTnVsbExvZ2dlci5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKF9sb2dMZXZlbCwgX21lc3NhZ2UpIHtcclxuICAgIH07XHJcbiAgICAvKiogVGhlIHNpbmdsZXRvbiBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5OdWxsTG9nZ2VyfS4gKi9cclxuICAgIE51bGxMb2dnZXIuaW5zdGFuY2UgPSBuZXcgTnVsbExvZ2dlcigpO1xyXG4gICAgcmV0dXJuIE51bGxMb2dnZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IE51bGxMb2dnZXIgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TG9nZ2Vycy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgQWJvcnRDb250cm9sbGVyIH0gZnJvbSBcIi4vQWJvcnRDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IEh0dHBFcnJvciwgVGltZW91dEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG5pbXBvcnQgeyBUcmFuc2ZlckZvcm1hdCB9IGZyb20gXCIuL0lUcmFuc3BvcnRcIjtcclxuaW1wb3J0IHsgQXJnLCBnZXREYXRhRGV0YWlsLCBnZXRVc2VyQWdlbnRIZWFkZXIsIHNlbmRNZXNzYWdlIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuLy8gTm90IGV4cG9ydGVkIGZyb20gJ2luZGV4JywgdGhpcyB0eXBlIGlzIGludGVybmFsLlxyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIExvbmdQb2xsaW5nVHJhbnNwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTG9uZ1BvbGxpbmdUcmFuc3BvcnQoaHR0cENsaWVudCwgYWNjZXNzVG9rZW5GYWN0b3J5LCBsb2dnZXIsIGxvZ01lc3NhZ2VDb250ZW50LCB3aXRoQ3JlZGVudGlhbHMsIGhlYWRlcnMpIHtcclxuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xyXG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5ID0gYWNjZXNzVG9rZW5GYWN0b3J5O1xyXG4gICAgICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xyXG4gICAgICAgIHRoaXMucG9sbEFib3J0ID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICAgIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQgPSBsb2dNZXNzYWdlQ29udGVudDtcclxuICAgICAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscztcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZSwgXCJwb2xsQWJvcnRlZFwiLCB7XHJcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBpbnRlcm5hbCB0eXBlLCBub3QgZXhwb3J0ZWQgZnJvbSAnaW5kZXgnIHNvIHRoaXMgaXMgcmVhbGx5IGp1c3QgaW50ZXJuYWwuXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvbGxBYm9ydC5hYm9ydGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYiwgbmFtZSwgdmFsdWUsIGhlYWRlcnMsIHBvbGxPcHRpb25zLCB0b2tlbiwgcG9sbFVybCwgcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgQ29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFsbG93IGJpbmFyeSBmb3JtYXQgb24gTm9kZSBhbmQgQnJvd3NlcnMgdGhhdCBzdXBwb3J0IGJpbmFyeSBjb250ZW50IChpbmRpY2F0ZWQgYnkgdGhlIHByZXNlbmNlIG9mIHJlc3BvbnNlVHlwZSBwcm9wZXJ0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZmVyRm9ybWF0ID09PSBUcmFuc2ZlckZvcm1hdC5CaW5hcnkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIG5ldyBYTUxIdHRwUmVxdWVzdCgpLnJlc3BvbnNlVHlwZSAhPT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJpbmFyeSBwcm90b2NvbHMgb3ZlciBYbWxIdHRwUmVxdWVzdCBub3QgaW1wbGVtZW50aW5nIGFkdmFuY2VkIGZlYXR1cmVzIGFyZSBub3Qgc3VwcG9ydGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYiA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSBfX2Fzc2lnbigoX2EgPSB7fSwgX2FbbmFtZV0gPSB2YWx1ZSwgX2EpLCB0aGlzLmhlYWRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0U2lnbmFsOiB0aGlzLnBvbGxBYm9ydC5zaWduYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDogMTAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLndpdGhDcmVkZW50aWFscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZmVyRm9ybWF0ID09PSBUcmFuc2ZlckZvcm1hdC5CaW5hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxPcHRpb25zLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldEFjY2Vzc1Rva2VuKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyVG9rZW4ocG9sbE9wdGlvbnMsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9sbFVybCA9IHVybCArIFwiJl89XCIgKyBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgcG9sbGluZzogXCIgKyBwb2xsVXJsICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmh0dHBDbGllbnQuZ2V0KHBvbGxVcmwsIHBvbGxPcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFVuZXhwZWN0ZWQgcmVzcG9uc2UgY29kZTogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWFyayBydW5uaW5nIGFzIGZhbHNlIHNvIHRoYXQgdGhlIHBvbGwgaW1tZWRpYXRlbHkgZW5kcyBhbmQgcnVucyB0aGUgY2xvc2UgbG9naWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFcnJvciA9IG5ldyBIdHRwRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCB8fCBcIlwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmluZyA9IHRoaXMucG9sbCh0aGlzLnVybCwgcG9sbE9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5nZXRBY2Nlc3NUb2tlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiBbMiAvKnJldHVybiovLCBfYS5zZW50KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUudXBkYXRlSGVhZGVyVG9rZW4gPSBmdW5jdGlvbiAocmVxdWVzdCwgdG9rZW4pIHtcclxuICAgICAgICBpZiAoIXJlcXVlc3QuaGVhZGVycykge1xyXG4gICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyB0b2tlbjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcclxuICAgICAgICBpZiAocmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSkge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWxcclxuICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24gKHVybCwgcG9sbE9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0b2tlbiwgcG9sbFVybCwgcmVzcG9uc2UsIGVfMTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFswLCAsIDgsIDldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldEFjY2Vzc1Rva2VuKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyVG9rZW4ocG9sbE9wdGlvbnMsIHRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFszLCA1LCAsIDZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9sbFVybCA9IHVybCArIFwiJl89XCIgKyBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgcG9sbGluZzogXCIgKyBwb2xsVXJsICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmh0dHBDbGllbnQuZ2V0KHBvbGxVcmwsIHBvbGxPcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgPT09IDIwNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGwgdGVybWluYXRlZCBieSBzZXJ2ZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgVW5leHBlY3RlZCByZXNwb25zZSBjb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHN0YXR1cyBjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRXJyb3IgPSBuZXcgSHR0cEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQgfHwgXCJcIiwgcmVzcG9uc2Uuc3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBkYXRhIHJlY2VpdmVkLiBcIiArIGdldERhdGFEZXRhaWwocmVzcG9uc2UuY29udGVudCwgdGhpcy5sb2dNZXNzYWdlQ29udGVudCkgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25yZWNlaXZlKHJlc3BvbnNlLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgYW5vdGhlciB3YXkgdGltZW91dCBtYW5pZmVzdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCB0aW1lZCBvdXQsIHJlaXNzdWluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2cgYnV0IGRpc3JlZ2FyZCBlcnJvcnMgdGhhdCBvY2N1ciBhZnRlciBzdG9wcGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGwgZXJyb3JlZCBhZnRlciBzaHV0ZG93bjogXCIgKyBlXzEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZV8xIGluc3RhbmNlb2YgVGltZW91dEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRpbWVvdXRzIGFuZCByZWlzc3VlIHRoZSBwb2xsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsIHRpbWVkIG91dCwgcmVpc3N1aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIGVycm9yIGFzIHRoZSByZXN1bHQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVycm9yID0gZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gWzMgLypicmVhayovLCA5XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsaW5nIGNvbXBsZXRlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2lsbCByZWFjaCBoZXJlIHdpdGggcG9sbEFib3J0ZWQ9PWZhbHNlIHdoZW4gdGhlIHNlcnZlciByZXR1cm5lZCBhIHJlc3BvbnNlIGNhdXNpbmcgdGhlIHRyYW5zcG9ydCB0byBzdG9wLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBwb2xsQWJvcnRlZD09dHJ1ZSB0aGVuIGNsaWVudCBpbml0aWF0ZWQgdGhlIHN0b3AgYW5kIHRoZSBzdG9wIG1ldGhvZCB3aWxsIHJhaXNlIHRoZSBjbG9zZSBldmVudCBhZnRlciBERUxFVEUgaXMgc2VudC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvbGxBYm9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlT25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzZW5kIHVudGlsIHRoZSB0cmFuc3BvcnQgaXMgY29ubmVjdGVkXCIpKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgc2VuZE1lc3NhZ2UodGhpcy5sb2dnZXIsIFwiTG9uZ1BvbGxpbmdcIiwgdGhpcy5odHRwQ2xpZW50LCB0aGlzLnVybCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIGRhdGEsIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQsIHRoaXMud2l0aENyZWRlbnRpYWxzLCB0aGlzLmhlYWRlcnMpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycywgX2EsIG5hbWVfMSwgdmFsdWUsIGRlbGV0ZU9wdGlvbnMsIHRva2VuO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgU3RvcHBpbmcgcG9sbGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRlbGwgcmVjZWl2aW5nIGxvb3AgdG8gc3RvcCwgYWJvcnQgYW55IGN1cnJlbnQgcmVxdWVzdCwgYW5kIHRoZW4gd2FpdCBmb3IgaXQgdG8gZmluaXNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbGxBYm9ydC5hYm9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzEsICwgNSwgNl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnJlY2VpdmluZ107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbmQgREVMRVRFIHRvIGNsZWFuIHVwIGxvbmcgcG9sbGluZyBvbiB0aGUgc2VydmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBzZW5kaW5nIERFTEVURSByZXF1ZXN0IHRvIFwiICsgdGhpcy51cmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBnZXRVc2VyQWdlbnRIZWFkZXIoKSwgbmFtZV8xID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbbmFtZV8xXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIHRoaXMuaGVhZGVycyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmdldEFjY2Vzc1Rva2VuKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhZGVyVG9rZW4oZGVsZXRlT3B0aW9ucywgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmh0dHBDbGllbnQuZGVsZXRlKHRoaXMudXJsLCBkZWxldGVPcHRpb25zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBERUxFVEUgcmVxdWVzdCBzZW50LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgU3RvcCBmaW5pc2hlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJhaXNlIGNsb3NlIGV2ZW50IGhlcmUgaW5zdGVhZCBvZiBpbiBwb2xsaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0IG5lZWRzIHRvIGhhcHBlbiBhZnRlciB0aGUgREVMRVRFIHJlcXVlc3QgaXMgc2VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhaXNlT25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUucmFpc2VPbkNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcclxuICAgICAgICAgICAgdmFyIGxvZ01lc3NhZ2UgPSBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIEZpcmluZyBvbmNsb3NlIGV2ZW50LlwiO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZUVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBsb2dNZXNzYWdlICs9IFwiIEVycm9yOiBcIiArIHRoaXMuY2xvc2VFcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIGxvZ01lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UodGhpcy5jbG9zZUVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIExvbmdQb2xsaW5nVHJhbnNwb3J0O1xyXG59KCkpO1xyXG5leHBvcnQgeyBMb25nUG9sbGluZ1RyYW5zcG9ydCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Mb25nUG9sbGluZ1RyYW5zcG9ydC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGdldERhdGFEZXRhaWwsIGdldFVzZXJBZ2VudEhlYWRlciwgUGxhdGZvcm0sIHNlbmRNZXNzYWdlIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIGV2ZW50U291cmNlQ29uc3RydWN0b3IsIHdpdGhDcmVkZW50aWFscywgaGVhZGVycykge1xyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlQ29udGVudCA9IGxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgIHRoaXMuZXZlbnRTb3VyY2VDb25zdHJ1Y3RvciA9IGV2ZW50U291cmNlQ29uc3RydWN0b3I7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcclxuICAgICAgICB0aGlzLm9ucmVjZWl2ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbmNsb3NlID0gbnVsbDtcclxuICAgIH1cclxuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh0cmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzSW4odHJhbnNmZXJGb3JtYXQsIFRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFNTRSB0cmFuc3BvcnQpIENvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgdXJsIGJlZm9yZSBhY2Nlc3NUb2tlbkZhY3RvcnkgYmVjYXVzZSB0aGlzLnVybCBpcyBvbmx5IGZvciBzZW5kIGFuZCB3ZSBzZXQgdGhlIGF1dGggaGVhZGVyIGluc3RlYWQgb2YgdGhlIHF1ZXJ5IHN0cmluZyBmb3Igc2VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIikgKyAoXCJhY2Nlc3NfdG9rZW49XCIgKyBlbmNvZGVVUklDb21wb25lbnQodG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zZmVyRm9ybWF0ICE9PSBUcmFuc2ZlckZvcm1hdC5UZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRoZSBTZXJ2ZXItU2VudCBFdmVudHMgdHJhbnNwb3J0IG9ubHkgc3VwcG9ydHMgdGhlICdUZXh0JyB0cmFuc2ZlciBmb3JtYXRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudFNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQbGF0Zm9ybS5pc0Jyb3dzZXIgfHwgUGxhdGZvcm0uaXNXZWJXb3JrZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZSA9IG5ldyBfdGhpcy5ldmVudFNvdXJjZUNvbnN0cnVjdG9yKHVybCwgeyB3aXRoQ3JlZGVudGlhbHM6IF90aGlzLndpdGhDcmVkZW50aWFscyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vbi1icm93c2VyIHBhc3NlcyBjb29raWVzIHZpYSB0aGUgZGljdGlvbmFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb29raWVzID0gX3RoaXMuaHR0cENsaWVudC5nZXRDb29raWVTdHJpbmcodXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMuQ29va2llID0gY29va2llcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBnZXRVc2VyQWdlbnRIZWFkZXIoKSwgbmFtZV8xID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTb3VyY2UgPSBuZXcgX3RoaXMuZXZlbnRTb3VyY2VDb25zdHJ1Y3Rvcih1cmwsIHsgd2l0aENyZWRlbnRpYWxzOiBfdGhpcy53aXRoQ3JlZGVudGlhbHMsIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCBfdGhpcy5oZWFkZXJzKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRTb3VyY2Uub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm9ucmVjZWl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihTU0UgdHJhbnNwb3J0KSBkYXRhIHJlY2VpdmVkLiBcIiArIGdldERhdGFEZXRhaWwoZS5kYXRhLCBfdGhpcy5sb2dNZXNzYWdlQ29udGVudCkgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub25yZWNlaXZlKGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZS5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGUuZGF0YSB8fCBcIkVycm9yIG9jY3VycmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jbG9zZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiU1NFIGNvbm5lY3RlZCB0byBcIiArIF90aGlzLnVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50U291cmNlID0gZXZlbnRTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzZW5kIHVudGlsIHRoZSB0cmFuc3BvcnQgaXMgY29ubmVjdGVkXCIpKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgc2VuZE1lc3NhZ2UodGhpcy5sb2dnZXIsIFwiU1NFXCIsIHRoaXMuaHR0cENsaWVudCwgdGhpcy51cmwsIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5LCBkYXRhLCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50LCB0aGlzLndpdGhDcmVkZW50aWFscywgdGhpcy5oZWFkZXJzKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFNvdXJjZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbmNsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbmltcG9ydCB7IFN1YmplY3RTdWJzY3JpcHRpb24gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vKiogU3RyZWFtIGltcGxlbWVudGF0aW9uIHRvIHN0cmVhbSBpdGVtcyB0byB0aGUgc2VydmVyLiAqL1xyXG52YXIgU3ViamVjdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFN1YmplY3QoKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcclxuICAgIH1cclxuICAgIFN1YmplY3QucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5vYnNlcnZlcnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IF9hW19pXTtcclxuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFN1YmplY3QucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU3ViamVjdC5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJqZWN0U3Vic2NyaXB0aW9uKHRoaXMsIG9ic2VydmVyKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU3ViamVjdDtcclxufSgpKTtcclxuZXhwb3J0IHsgU3ViamVjdCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJqZWN0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gTm90IGV4cG9ydGVkIGZyb20gaW5kZXhcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBUZXh0TWVzc2FnZUZvcm1hdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRleHRNZXNzYWdlRm9ybWF0KCkge1xyXG4gICAgfVxyXG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQud3JpdGUgPSBmdW5jdGlvbiAob3V0cHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIgKyBvdXRwdXQgKyBUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3I7XHJcbiAgICB9O1xyXG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQucGFyc2UgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gIT09IFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWVzc2FnZXMgPSBpbnB1dC5zcGxpdChUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3IpO1xyXG4gICAgICAgIG1lc3NhZ2VzLnBvcCgpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcclxuICAgIH07XHJcbiAgICBUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3JDb2RlID0gMHgxZTtcclxuICAgIFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yQ29kZSk7XHJcbiAgICByZXR1cm4gVGV4dE1lc3NhZ2VGb3JtYXQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFRleHRNZXNzYWdlRm9ybWF0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRleHRNZXNzYWdlRm9ybWF0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuLy8gVmVyc2lvbiB0b2tlbiB0aGF0IHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIHByZXBhY2sgY29tbWFuZFxyXG4vKiogVGhlIHZlcnNpb24gb2YgdGhlIFNpZ25hbFIgY2xpZW50LiAqL1xyXG5leHBvcnQgdmFyIFZFUlNJT04gPSBcIjUuMC42XCI7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgQXJnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXJnKCkge1xyXG4gICAgfVxyXG4gICAgQXJnLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1wiICsgbmFtZSArIFwiJyBhcmd1bWVudCBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc05vdEVtcHR5ID0gZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xyXG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5tYXRjaCgvXlxccyokLykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdcIiArIG5hbWUgKyBcIicgYXJndW1lbnQgc2hvdWxkIG5vdCBiZSBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc0luID0gZnVuY3Rpb24gKHZhbCwgdmFsdWVzLCBuYW1lKSB7XHJcbiAgICAgICAgLy8gVHlwZVNjcmlwdCBlbnVtcyBoYXZlIGtleXMgZm9yICoqYm90aCoqIHRoZSBuYW1lIGFuZCB0aGUgdmFsdWUgb2YgZWFjaCBlbnVtIG1lbWJlciBvbiB0aGUgdHlwZSBpdHNlbGYuXHJcbiAgICAgICAgaWYgKCEodmFsIGluIHZhbHVlcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBcIiArIG5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWwgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcmc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFyZyB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFBsYXRmb3JtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGxhdGZvcm0oKSB7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNCcm93c2VyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNXZWJXb3JrZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgXCJpbXBvcnRTY3JpcHRzXCIgaW4gc2VsZjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQbGF0Zm9ybSwgXCJpc05vZGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNCcm93c2VyICYmICF0aGlzLmlzV2ViV29ya2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFBsYXRmb3JtO1xyXG59KCkpO1xyXG5leHBvcnQgeyBQbGF0Zm9ybSB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFEZXRhaWwoZGF0YSwgaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgIHZhciBkZXRhaWwgPSBcIlwiO1xyXG4gICAgaWYgKGlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcclxuICAgICAgICBkZXRhaWwgPSBcIkJpbmFyeSBkYXRhIG9mIGxlbmd0aCBcIiArIGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBmb3JtYXRBcnJheUJ1ZmZlcihkYXRhKSArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgZGV0YWlsID0gXCJTdHJpbmcgZGF0YSBvZiBsZW5ndGggXCIgKyBkYXRhLmxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBkYXRhICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRldGFpbDtcclxufVxyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEFycmF5QnVmZmVyKGRhdGEpIHtcclxuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAvLyBVaW50OEFycmF5Lm1hcCBvbmx5IHN1cHBvcnRzIHJldHVybmluZyBhbm90aGVyIFVpbnQ4QXJyYXk/XHJcbiAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgIHZpZXcuZm9yRWFjaChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgdmFyIHBhZCA9IG51bSA8IDE2ID8gXCIwXCIgOiBcIlwiO1xyXG4gICAgICAgIHN0ciArPSBcIjB4XCIgKyBwYWQgKyBudW0udG9TdHJpbmcoMTYpICsgXCIgXCI7XHJcbiAgICB9KTtcclxuICAgIC8vIFRyaW0gb2YgdHJhaWxpbmcgc3BhY2UuXHJcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMSk7XHJcbn1cclxuLy8gQWxzbyBpbiBzaWduYWxyLXByb3RvY29sLW1zZ3BhY2svVXRpbHMudHNcclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCAmJiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgICAgICAodmFsIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcclxuICAgICAgICAgICAgLy8gU29tZXRpbWVzIHdlIGdldCBhbiBBcnJheUJ1ZmZlciB0aGF0IGRvZXNuJ3Qgc2F0aXNmeSBpbnN0YW5jZW9mXHJcbiAgICAgICAgICAgICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQXJyYXlCdWZmZXJcIikpO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobG9nZ2VyLCB0cmFuc3BvcnROYW1lLCBodHRwQ2xpZW50LCB1cmwsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgZGVmYXVsdEhlYWRlcnMpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EsIGhlYWRlcnMsIHRva2VuLCBfYiwgbmFtZSwgdmFsdWUsIHJlc3BvbnNlVHlwZSwgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAoX2EgPSB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBfYiA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFwiICsgdHJhbnNwb3J0TmFtZSArIFwiIHRyYW5zcG9ydCkgc2VuZGluZyBkYXRhLiBcIiArIGdldERhdGFEZXRhaWwoY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9IGlzQXJyYXlCdWZmZXIoY29udGVudCkgPyBcImFycmF5YnVmZmVyXCIgOiBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBodHRwQ2xpZW50LnBvc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIGRlZmF1bHRIZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogcmVzcG9uc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihcIiArIHRyYW5zcG9ydE5hbWUgKyBcIiB0cmFuc3BvcnQpIHJlcXVlc3QgY29tcGxldGUuIFJlc3BvbnNlIHN0YXR1czogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIobG9nZ2VyKSB7XHJcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnNvbGVMb2dnZXIoTG9nTGV2ZWwuSW5mb3JtYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlciA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBOdWxsTG9nZ2VyLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlci5sb2cpIHtcclxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBDb25zb2xlTG9nZ2VyKGxvZ2dlcik7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3ViamVjdFN1YnNjcmlwdGlvbihzdWJqZWN0LCBvYnNlcnZlcikge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgU3ViamVjdFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN1YmplY3Qub2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5vYnNlcnZlcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdWJqZWN0Lm9ic2VydmVycy5sZW5ndGggPT09IDAgJiYgdGhpcy5zdWJqZWN0LmNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5jYW5jZWxDYWxsYmFjaygpLmNhdGNoKGZ1bmN0aW9uIChfKSB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmlwdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIENvbnNvbGVMb2dnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb25zb2xlTG9nZ2VyKG1pbmltdW1Mb2dMZXZlbCkge1xyXG4gICAgICAgIHRoaXMubWluaW11bUxvZ0xldmVsID0gbWluaW11bUxvZ0xldmVsO1xyXG4gICAgICAgIHRoaXMub3V0cHV0Q29uc29sZSA9IGNvbnNvbGU7XHJcbiAgICB9XHJcbiAgICBDb25zb2xlTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAobG9nTGV2ZWwsIG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAobG9nTGV2ZWwgPj0gdGhpcy5taW5pbXVtTG9nTGV2ZWwpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5Dcml0aWNhbDpcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmVycm9yKFwiW1wiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgXCJdIFwiICsgTG9nTGV2ZWxbbG9nTGV2ZWxdICsgXCI6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLldhcm5pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLndhcm4oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuSW5mb3JtYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmluZm8oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyBvbmx5IGdvZXMgdG8gYXR0YWNoZWQgZGVidWdnZXJzIGluIE5vZGUsIHNvIHdlIHVzZSBjb25zb2xlLmxvZyBmb3IgVHJhY2UgYW5kIERlYnVnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmxvZyhcIltcIiArIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArIFwiXSBcIiArIExvZ0xldmVsW2xvZ0xldmVsXSArIFwiOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDb25zb2xlTG9nZ2VyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDb25zb2xlTG9nZ2VyIH07XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFnZW50SGVhZGVyKCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudEhlYWRlck5hbWUgPSBcIlgtU2lnbmFsUi1Vc2VyLUFnZW50XCI7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgdXNlckFnZW50SGVhZGVyTmFtZSA9IFwiVXNlci1BZ2VudFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt1c2VyQWdlbnRIZWFkZXJOYW1lLCBjb25zdHJ1Y3RVc2VyQWdlbnQoVkVSU0lPTiwgZ2V0T3NOYW1lKCksIGdldFJ1bnRpbWUoKSwgZ2V0UnVudGltZVZlcnNpb24oKSldO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0VXNlckFnZW50KHZlcnNpb24sIG9zLCBydW50aW1lLCBydW50aW1lVmVyc2lvbikge1xyXG4gICAgLy8gTWljcm9zb2Z0IFNpZ25hbFIvW1ZlcnNpb25dIChbRGV0YWlsZWQgVmVyc2lvbl07IFtPcGVyYXRpbmcgU3lzdGVtXTsgW1J1bnRpbWVdOyBbUnVudGltZSBWZXJzaW9uXSlcclxuICAgIHZhciB1c2VyQWdlbnQgPSBcIk1pY3Jvc29mdCBTaWduYWxSL1wiO1xyXG4gICAgdmFyIG1ham9yQW5kTWlub3IgPSB2ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIHVzZXJBZ2VudCArPSBtYWpvckFuZE1pbm9yWzBdICsgXCIuXCIgKyBtYWpvckFuZE1pbm9yWzFdO1xyXG4gICAgdXNlckFnZW50ICs9IFwiIChcIiArIHZlcnNpb24gKyBcIjsgXCI7XHJcbiAgICBpZiAob3MgJiYgb3MgIT09IFwiXCIpIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gb3MgKyBcIjsgXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gXCJVbmtub3duIE9TOyBcIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIlwiICsgcnVudGltZTtcclxuICAgIGlmIChydW50aW1lVmVyc2lvbikge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgXCIgKyBydW50aW1lVmVyc2lvbjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgVW5rbm93biBSdW50aW1lIFZlcnNpb25cIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIilcIjtcclxuICAgIHJldHVybiB1c2VyQWdlbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T3NOYW1lKCkge1xyXG4gICAgaWYgKFBsYXRmb3JtLmlzTm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid2luMzJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIldpbmRvd3MgTlRcIjtcclxuICAgICAgICAgICAgY2FzZSBcImRhcndpblwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWFjT1NcIjtcclxuICAgICAgICAgICAgY2FzZSBcImxpbnV4XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJMaW51eFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZVZlcnNpb24oKSB7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZSgpIHtcclxuICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcclxuICAgICAgICByZXR1cm4gXCJOb2RlSlNcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIkJyb3dzZXJcIjtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlscy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGdldERhdGFEZXRhaWwsIGdldFVzZXJBZ2VudEhlYWRlciwgUGxhdGZvcm0gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFdlYlNvY2tldFRyYW5zcG9ydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlNvY2tldFRyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIHdlYlNvY2tldENvbnN0cnVjdG9yLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlQ29udGVudCA9IGxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIHRoaXMud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjtcclxuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICB9XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh0cmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzSW4odHJhbnNmZXJGb3JtYXQsIFRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBDb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIikgKyAoXCJhY2Nlc3NfdG9rZW49XCIgKyBlbmNvZGVVUklDb21wb25lbnQodG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL15odHRwLywgXCJ3c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3ZWJTb2NrZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29va2llcyA9IF90aGlzLmh0dHBDbGllbnQuZ2V0Q29va2llU3RyaW5nKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBnZXRVc2VyQWdlbnRIZWFkZXIoKSwgbmFtZV8xID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvb2tpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tcIkNvb2tpZVwiXSA9IFwiXCIgKyBjb29raWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHBhc3MgaGVhZGVycyB3aGVuIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldCA9IG5ldyBfdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvcih1cmwsIHVuZGVmaW5lZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgX3RoaXMuaGVhZGVycyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSBpcyBub3QgaGFwcHkgd2l0aCBwYXNzaW5nICd1bmRlZmluZWQnIGFzIHByb3RvY29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0ID0gbmV3IF90aGlzLndlYlNvY2tldENvbnN0cnVjdG9yKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoX2V2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJXZWJTb2NrZXQgY29ubmVjdGVkIHRvIFwiICsgdXJsICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndlYlNvY2tldCA9IHdlYlNvY2tldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXJyb3JFdmVudCBpcyBhIGJyb3dzZXIgb25seSB0eXBlIHdlIG5lZWQgdG8gY2hlY2sgaWYgdGhlIHR5cGUgZXhpc3RzIGJlZm9yZSB1c2luZyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRXJyb3JFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudCBpbnN0YW5jZW9mIEVycm9yRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBldmVudC5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggdGhlIHRyYW5zcG9ydC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChtZXNzYWdlLmRhdGEsIF90aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhbGwgY2xvc2UgaGFuZGxlciBpZiBjb25uZWN0aW9uIHdhcyBuZXZlciBlc3RhYmxpc2hlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlJ2xsIHJlamVjdCB0aGUgY29ubmVjdCBjYWxsIGluc3RlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVycm9yRXZlbnQgaXMgYSBicm93c2VyIG9ubHkgdHlwZSB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSB0eXBlIGV4aXN0cyBiZWZvcmUgdXNpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFcnJvckV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50IGluc3RhbmNlb2YgRXJyb3JFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBldmVudC5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggdGhlIHRyYW5zcG9ydC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0ICYmIHRoaXMud2ViU29ja2V0LnJlYWR5U3RhdGUgPT09IHRoaXMud2ViU29ja2V0Q29uc3RydWN0b3IuT1BFTikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBzZW5kaW5nIGRhdGEuIFwiICsgZ2V0RGF0YURldGFpbChkYXRhLCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQuc2VuZChkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJXZWJTb2NrZXQgaXMgbm90IGluIHRoZSBPUEVOIHN0YXRlXCIpO1xyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy53ZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIG9uY2xvc2UgY2FsbGJhY2sgaW5saW5lIHNvIHdlIGtub3cgdGhlIEh0dHBDb25uZWN0aW9uIHdhcyBjbG9zZWQgcHJvcGVybHkgYmVmb3JlIHJldHVybmluZ1xyXG4gICAgICAgICAgICAvLyBUaGlzIGFsc28gc29sdmVzIGFuIGlzc3VlIHdoZXJlIHdlYnNvY2tldC5vbmNsb3NlIGNvdWxkIHRha2UgMTgrIHNlY29uZHMgdG8gdHJpZ2dlciBkdXJpbmcgbmV0d29yayBkaXNjb25uZWN0c1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gd2ViU29ja2V0IHdpbGwgYmUgbnVsbCBpZiB0aGUgdHJhbnNwb3J0IGRpZCBub3Qgc3RhcnQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIHdlYnNvY2tldCBoYW5kbGVycyBiZWNhdXNlIHdlIGFyZSBjb25zaWRlcmluZyB0aGUgc29ja2V0IGNsb3NlZCBub3dcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihXZWJTb2NrZXRzIHRyYW5zcG9ydCkgc29ja2V0IGNsb3NlZC5cIik7XHJcbiAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nsb3NlRXZlbnQoZXZlbnQpICYmIChldmVudC53YXNDbGVhbiA9PT0gZmFsc2UgfHwgZXZlbnQuY29kZSAhPT0gMTAwMCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShuZXcgRXJyb3IoXCJXZWJTb2NrZXQgY2xvc2VkIHdpdGggc3RhdHVzIGNvZGU6IFwiICsgZXZlbnQuY29kZSArIFwiIChcIiArIGV2ZW50LnJlYXNvbiArIFwiKS5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmlzQ2xvc2VFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudCAmJiB0eXBlb2YgZXZlbnQud2FzQ2xlYW4gPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBldmVudC5jb2RlID09PSBcIm51bWJlclwiO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWJTb2NrZXRUcmFuc3BvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFdlYlNvY2tldFRyYW5zcG9ydCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1XZWJTb2NrZXRUcmFuc3BvcnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgQWJvcnRFcnJvciwgSHR0cEVycm9yLCBUaW1lb3V0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4vSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxudmFyIFhockh0dHBDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoWGhySHR0cENsaWVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFhockh0dHBDbGllbnQobG9nZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBYaHJIdHRwQ2xpZW50LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwgJiYgcmVxdWVzdC5hYm9ydFNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQWJvcnRFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0Lm1ldGhvZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbWV0aG9kIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByZXF1ZXN0LndpdGhDcmVkZW50aWFscztcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYLVJlcXVlc3RlZC1XaXRoXCIsIFwiWE1MSHR0cFJlcXVlc3RcIik7XHJcbiAgICAgICAgICAgIC8vIEV4cGxpY2l0bHkgc2V0dGluZyB0aGUgQ29udGVudC1UeXBlIGhlYWRlciBmb3IgUmVhY3QgTmF0aXZlIG9uIEFuZHJvaWQgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycztcclxuICAgICAgICAgICAgaWYgKGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlc3BvbnNlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBYm9ydEVycm9yKCkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHJlcXVlc3QudGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBIdHRwUmVzcG9uc2UoeGhyLnN0YXR1cywgeGhyLnN0YXR1c1RleHQsIHhoci5yZXNwb25zZSB8fCB4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEh0dHBFcnJvcih4aHIuc3RhdHVzVGV4dCwgeGhyLnN0YXR1cykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJFcnJvciBmcm9tIEhUVFAgcmVxdWVzdC4gXCIgKyB4aHIuc3RhdHVzICsgXCI6IFwiICsgeGhyLnN0YXR1c1RleHQgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEh0dHBFcnJvcih4aHIuc3RhdHVzVGV4dCwgeGhyLnN0YXR1cykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIlRpbWVvdXQgZnJvbSBIVFRQIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IoKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHJlcXVlc3QuY29udGVudCB8fCBcIlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gWGhySHR0cENsaWVudDtcclxufShIdHRwQ2xpZW50KSk7XHJcbmV4cG9ydCB7IFhockh0dHBDbGllbnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9WGhySHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbmV4cG9ydCB7IEFib3J0RXJyb3IsIEh0dHBFcnJvciwgVGltZW91dEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmV4cG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gXCIuL0h0dHBDbGllbnRcIjtcclxuZXhwb3J0IHsgRGVmYXVsdEh0dHBDbGllbnQgfSBmcm9tIFwiLi9EZWZhdWx0SHR0cENsaWVudFwiO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uLCBIdWJDb25uZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi9IdWJDb25uZWN0aW9uXCI7XHJcbmV4cG9ydCB7IEh1YkNvbm5lY3Rpb25CdWlsZGVyIH0gZnJvbSBcIi4vSHViQ29ubmVjdGlvbkJ1aWxkZXJcIjtcclxuZXhwb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9JSHViUHJvdG9jb2xcIjtcclxuZXhwb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmV4cG9ydCB7IEh0dHBUcmFuc3BvcnRUeXBlLCBUcmFuc2ZlckZvcm1hdCB9IGZyb20gXCIuL0lUcmFuc3BvcnRcIjtcclxuZXhwb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuZXhwb3J0IHsgSnNvbkh1YlByb3RvY29sIH0gZnJvbSBcIi4vSnNvbkh1YlByb3RvY29sXCI7XHJcbmV4cG9ydCB7IFN1YmplY3QgfSBmcm9tIFwiLi9TdWJqZWN0XCI7XHJcbmV4cG9ydCB7IFZFUlNJT04gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLkFXTj1lKCk6dC5BV049ZSgpfSh3aW5kb3csKGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe3ZhciBlPXt9O2Z1bmN0aW9uIG4obyl7aWYoZVtvXSlyZXR1cm4gZVtvXS5leHBvcnRzO3ZhciBpPWVbb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiB0W29dLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLG4pLGkubD0hMCxpLmV4cG9ydHN9cmV0dXJuIG4ubT10LG4uYz1lLG4uZD1mdW5jdGlvbih0LGUsbyl7bi5vKHQsZSl8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse2VudW1lcmFibGU6ITAsZ2V0Om99KX0sbi5yPWZ1bmN0aW9uKHQpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC50b1N0cmluZ1RhZyYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsU3ltYm9sLnRvU3RyaW5nVGFnLHt2YWx1ZTpcIk1vZHVsZVwifSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9LG4udD1mdW5jdGlvbih0LGUpe2lmKDEmZSYmKHQ9bih0KSksOCZlKXJldHVybiB0O2lmKDQmZSYmXCJvYmplY3RcIj09dHlwZW9mIHQmJnQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDt2YXIgbz1PYmplY3QuY3JlYXRlKG51bGwpO2lmKG4ucihvKSxPYmplY3QuZGVmaW5lUHJvcGVydHkobyxcImRlZmF1bHRcIix7ZW51bWVyYWJsZTohMCx2YWx1ZTp0fSksMiZlJiZcInN0cmluZ1wiIT10eXBlb2YgdClmb3IodmFyIGkgaW4gdCluLmQobyxpLGZ1bmN0aW9uKGUpe3JldHVybiB0W2VdfS5iaW5kKG51bGwsaSkpO3JldHVybiBvfSxuLm49ZnVuY3Rpb24odCl7dmFyIGU9dCYmdC5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIHQuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gdH07cmV0dXJuIG4uZChlLFwiYVwiLGUpLGV9LG4ubz1mdW5jdGlvbih0LGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKX0sbi5wPVwiXCIsbihuLnM9MCl9KFtmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyh0KXtyZXR1cm4obz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9ZnVuY3Rpb24gaSh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgbz1lW25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxvLmtleSxvKX19bi5yKGUpO3ZhciByPXttYXhOb3RpZmljYXRpb25zOjEwLGFuaW1hdGlvbkR1cmF0aW9uOjMwMCxwb3NpdGlvbjpcImJvdHRvbS1yaWdodFwiLGxhYmVsczp7dGlwOlwiVGlwXCIsaW5mbzpcIkluZm9cIixzdWNjZXNzOlwiU3VjY2Vzc1wiLHdhcm5pbmc6XCJBdHRlbnRpb25cIixhbGVydDpcIkVycm9yXCIsYXN5bmM6XCJMb2FkaW5nXCIsY29uZmlybTpcIkNvbmZpcm1hdGlvbiByZXF1aXJlZFwiLGNvbmZpcm1PazpcIk9LXCIsY29uZmlybUNhbmNlbDpcIkNhbmNlbFwifSxpY29uczp7dGlwOlwicXVlc3Rpb24tY2lyY2xlXCIsaW5mbzpcImluZm8tY2lyY2xlXCIsc3VjY2VzczpcImNoZWNrLWNpcmNsZVwiLHdhcm5pbmc6XCJleGNsYW1hdGlvbi1jaXJjbGVcIixhbGVydDpcImV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCIsYXN5bmM6XCJjb2cgZmEtc3BpblwiLGNvbmZpcm06XCJleGNsYW1hdGlvbi10cmlhbmdsZVwiLHByZWZpeDpcIjxpIGNsYXNzPSdmYSBmYXMgZmEtZncgZmEtXCIsc3VmZml4OlwiJz48L2k+XCIsZW5hYmxlZDohMH0scmVwbGFjZW1lbnRzOnt0aXA6bnVsbCxpbmZvOm51bGwsc3VjY2VzczpudWxsLHdhcm5pbmc6bnVsbCxhbGVydDpudWxsLGFzeW5jOm51bGwsXCJhc3luYy1ibG9ja1wiOm51bGwsbW9kYWw6bnVsbCxjb25maXJtOm51bGwsZ2VuZXJhbDp7XCI8c2NyaXB0PlwiOlwiXCIsXCI8XFwvc2NyaXB0PlwiOlwiXCJ9fSxtZXNzYWdlczp7dGlwOlwiXCIsaW5mbzpcIlwiLHN1Y2Nlc3M6XCJBY3Rpb24gaGFzIGJlZW4gc3VjY2VlZGVkXCIsd2FybmluZzpcIlwiLGFsZXJ0OlwiQWN0aW9uIGhhcyBiZWVuIGZhaWxlZFwiLGNvbmZpcm06XCJUaGlzIGFjdGlvbiBjYW4ndCBiZSB1bmRvbmUuIENvbnRpbnVlP1wiLGFzeW5jOlwiUGxlYXNlLCB3YWl0Li4uXCIsXCJhc3luYy1ibG9ja1wiOlwiTG9hZGluZ1wifSxmb3JtYXRFcnJvcjpmdW5jdGlvbih0KXtpZih0LnJlc3BvbnNlKXtpZighdC5yZXNwb25zZS5kYXRhKXJldHVyblwiNTAwIEFQSSBTZXJ2ZXIgRXJyb3JcIjtpZih0LnJlc3BvbnNlLmRhdGEuZXJyb3JzKXJldHVybiB0LnJlc3BvbnNlLmRhdGEuZXJyb3JzLm1hcCgoZnVuY3Rpb24odCl7cmV0dXJuIHQuZGV0YWlsfSkpLmpvaW4oXCI8YnI+XCIpO2lmKHQucmVzcG9uc2Uuc3RhdHVzVGV4dClyZXR1cm5cIlwiLmNvbmNhdCh0LnJlc3BvbnNlLnN0YXR1cyxcIiBcIikuY29uY2F0KHQucmVzcG9uc2Uuc3RhdHVzVGV4dCxcIjogXCIpLmNvbmNhdCh0LnJlc3BvbnNlLmRhdGEpfXJldHVybiB0Lm1lc3NhZ2U/dC5tZXNzYWdlOnR9LGR1cmF0aW9uczp7Z2xvYmFsOjVlMyxzdWNjZXNzOm51bGwsaW5mbzpudWxsLHRpcDpudWxsLHdhcm5pbmc6bnVsbCxhbGVydDpudWxsfSxtaW5EdXJhdGlvbnM6e2FzeW5jOjFlMyxcImFzeW5jLWJsb2NrXCI6MWUzfX0sYT1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06cjshZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLHQpLE9iamVjdC5hc3NpZ24odGhpcyx0aGlzLmRlZmF1bHRzRGVlcChuLGUpKX12YXIgZSxuLGE7cmV0dXJuIGU9dCwobj1be2tleTpcImljb25cIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5pY29ucy5lbmFibGVkP1wiXCIuY29uY2F0KHRoaXMuaWNvbnMucHJlZml4KS5jb25jYXQodGhpcy5pY29uc1t0XSkuY29uY2F0KHRoaXMuaWNvbnMuc3VmZml4KTpcIlwifX0se2tleTpcImxhYmVsXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGFiZWxzW3RdfX0se2tleTpcImR1cmF0aW9uXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5kdXJhdGlvbnNbdF07cmV0dXJuIG51bGw9PT1lP3RoaXMuZHVyYXRpb25zLmdsb2JhbDplfX0se2tleTpcInRvU2Vjc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVyblwiXCIuY29uY2F0KHQvMWUzLFwic1wiKX19LHtrZXk6XCJhcHBseVJlcGxhY2VtZW50c1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7aWYoIXQpcmV0dXJuIHRoaXMubWVzc2FnZXNbZV18fFwiXCI7Zm9yKHZhciBuPTAsbz1bXCJnZW5lcmFsXCIsZV07bjxvLmxlbmd0aDtuKyspe3ZhciBpPW9bbl07aWYodGhpcy5yZXBsYWNlbWVudHNbaV0pZm9yKHZhciByIGluIHRoaXMucmVwbGFjZW1lbnRzW2ldKXQ9dC5yZXBsYWNlKHIsdGhpcy5yZXBsYWNlbWVudHNbaV1bcl0pfXJldHVybiB0fX0se2tleTpcIm92ZXJyaWRlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIGU/bmV3IHQoZSx0aGlzKTp0aGlzfX0se2tleTpcImRlZmF1bHRzRGVlcFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7dmFyIG49e307Zm9yKHZhciBpIGluIHQpZS5oYXNPd25Qcm9wZXJ0eShpKT9uW2ldPVwib2JqZWN0XCI9PT1vKHRbaV0pJiZudWxsIT09dFtpXT90aGlzLmRlZmF1bHRzRGVlcCh0W2ldLGVbaV0pOmVbaV06bltpXT10W2ldO3JldHVybiBufX1dKSYmaShlLnByb3RvdHlwZSxuKSxhJiZpKGUsYSksdH0oKSxzPXtwb3B1cDpcIlwiLmNvbmNhdChcImF3blwiLFwiLXBvcHVwXCIpLHRvYXN0OlwiXCIuY29uY2F0KFwiYXduXCIsXCItdG9hc3RcIiksYnRuOlwiXCIuY29uY2F0KFwiYXduXCIsXCItYnRuXCIpLGNvbmZpcm06XCJcIi5jb25jYXQoXCJhd25cIixcIi1jb25maXJtXCIpfSxjPXtwcmVmaXg6cy50b2FzdCxrbGFzczp7bGFiZWw6XCJcIi5jb25jYXQocy50b2FzdCxcIi1sYWJlbFwiKSxjb250ZW50OlwiXCIuY29uY2F0KHMudG9hc3QsXCItY29udGVudFwiKSxpY29uOlwiXCIuY29uY2F0KHMudG9hc3QsXCItaWNvblwiKSxwcm9ncmVzc0JhcjpcIlwiLmNvbmNhdChzLnRvYXN0LFwiLXByb2dyZXNzLWJhclwiKSxwcm9ncmVzc0JhclBhdXNlOlwiXCIuY29uY2F0KHMudG9hc3QsXCItcHJvZ3Jlc3MtYmFyLXBhdXNlZFwiKX0saWRzOntjb250YWluZXI6XCJcIi5jb25jYXQocy50b2FzdCxcIi1jb250YWluZXJcIil9fSx1PXtwcmVmaXg6cy5wb3B1cCxrbGFzczp7YnV0dG9uczpcIlwiLmNvbmNhdChcImF3blwiLFwiLWJ1dHRvbnNcIiksYnV0dG9uOnMuYnRuLHN1Y2Nlc3NCdG46XCJcIi5jb25jYXQocy5idG4sXCItc3VjY2Vzc1wiKSxjYW5jZWxCdG46XCJcIi5jb25jYXQocy5idG4sXCItY2FuY2VsXCIpLHRpdGxlOlwiXCIuY29uY2F0KHMucG9wdXAsXCItdGl0bGVcIiksYm9keTpcIlwiLmNvbmNhdChzLnBvcHVwLFwiLWJvZHlcIiksY29udGVudDpcIlwiLmNvbmNhdChzLnBvcHVwLFwiLWNvbnRlbnRcIiksZG90QW5pbWF0aW9uOlwiXCIuY29uY2F0KHMucG9wdXAsXCItbG9hZGluZy1kb3RzXCIpfSxpZHM6e3dyYXBwZXI6XCJcIi5jb25jYXQocy5wb3B1cCxcIi13cmFwcGVyXCIpLGNvbmZpcm1PazpcIlwiLmNvbmNhdChzLmNvbmZpcm0sXCItb2tcIiksY29uZmlybUNhbmNlbDpcIlwiLmNvbmNhdChzLmNvbmZpcm0sXCItY2FuY2VsXCIpfX0sbD17a2xhc3M6e2hpZGluZzpcIlwiLmNvbmNhdChcImF3blwiLFwiLWhpZGluZ1wiKX0sbGliOlwiYXduXCJ9O2Z1bmN0aW9uIGYodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIG89ZVtuXTtvLmVudW1lcmFibGU9by5lbnVtZXJhYmxlfHwhMSxvLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBvJiYoby53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsby5rZXksbyl9fXZhciBwPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlLG4sbyxpLHIpeyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsdCksdGhpcy5uZXdOb2RlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksbiYmKHRoaXMubmV3Tm9kZS5pZD1uKSxvJiYodGhpcy5uZXdOb2RlLmNsYXNzTmFtZT1vKSxpJiYodGhpcy5uZXdOb2RlLnN0eWxlLmNzc1RleHQ9aSksdGhpcy5wYXJlbnQ9ZSx0aGlzLm9wdGlvbnM9cn12YXIgZSxuLG87cmV0dXJuIGU9dCwobj1be2tleTpcImJlZm9yZUluc2VydFwiLHZhbHVlOmZ1bmN0aW9uKCl7fX0se2tleTpcImFmdGVySW5zZXJ0XCIsdmFsdWU6ZnVuY3Rpb24oKXt9fSx7a2V5OlwiaW5zZXJ0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5iZWZvcmVJbnNlcnQoKSx0aGlzLmVsPXRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMubmV3Tm9kZSksdGhpcy5hZnRlckluc2VydCgpLHRoaXN9fSx7a2V5OlwicmVwbGFjZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7aWYodGhpcy5nZXRFbGVtZW50KCkpcmV0dXJuIHRoaXMuYmVmb3JlRGVsZXRlKCkudGhlbigoZnVuY3Rpb24oKXtyZXR1cm4gZS51cGRhdGVUeXBlKHQudHlwZSksZS5wYXJlbnQucmVwbGFjZUNoaWxkKHQubmV3Tm9kZSxlLmVsKSxlLmVsPWUuZ2V0RWxlbWVudCh0Lm5ld05vZGUpLGUuYWZ0ZXJJbnNlcnQoKSxlfSkpfX0se2tleTpcImJlZm9yZURlbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLmVsLG49MDtyZXR1cm4gdGhpcy5zdGFydCYmKG49dGhpcy5vcHRpb25zLm1pbkR1cmF0aW9uc1t0aGlzLnR5cGVdK3RoaXMuc3RhcnQtRGF0ZS5ub3coKSk8MCYmKG49MCksbmV3IFByb21pc2UoKGZ1bmN0aW9uKG8pe3NldFRpbWVvdXQoKGZ1bmN0aW9uKCl7ZS5jbGFzc0xpc3QuYWRkKGwua2xhc3MuaGlkaW5nKSxzZXRUaW1lb3V0KG8sdC5vcHRpb25zLmFuaW1hdGlvbkR1cmF0aW9uKX0pLG4pfSkpfX0se2tleTpcImRlbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLmVsO3JldHVybiB0aGlzLmdldEVsZW1lbnQoZSk/dGhpcy5iZWZvcmVEZWxldGUoZSkudGhlbigoZnVuY3Rpb24oKXtlLnJlbW92ZSgpLHQuYWZ0ZXJEZWxldGUoKX0pKTpudWxsfX0se2tleTpcImFmdGVyRGVsZXRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt9fSx7a2V5OlwiZ2V0RWxlbWVudFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMuZWw7cmV0dXJuIHQ/ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodC5pZCk6bnVsbH19LHtrZXk6XCJhZGRFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7dGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKHQsZSl9fSx7a2V5OlwidG9nZ2xlQ2xhc3NcIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLmVsLmNsYXNzTGlzdC50b2dnbGUodCl9fSx7a2V5OlwidXBkYXRlVHlwZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMudHlwZT10LHRoaXMuZHVyYXRpb249dGhpcy5vcHRpb25zLmR1cmF0aW9uKHRoaXMudHlwZSl9fV0pJiZmKGUucHJvdG90eXBlLG4pLG8mJmYoZSxvKSx0fSgpO2Z1bmN0aW9uIGQodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIG89ZVtuXTtvLmVudW1lcmFibGU9by5lbnVtZXJhYmxlfHwhMSxvLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBvJiYoby53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsby5rZXksbyl9fXZhciB5PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlLG4peyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsdCksdGhpcy5jYWxsYmFjaz1lLHRoaXMucmVtYWluaW5nPW4sdGhpcy5yZXN1bWUoKX12YXIgZSxuLG87cmV0dXJuIGU9dCwobj1be2tleTpcInBhdXNlXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlZD0hMCx3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZCksdGhpcy5yZW1haW5pbmctPW5ldyBEYXRlLXRoaXMuc3RhcnR9fSx7a2V5OlwicmVzdW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucGF1c2VkPSExLHRoaXMuc3RhcnQ9bmV3IERhdGUsd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpLHRoaXMudGltZXJJZD13aW5kb3cuc2V0VGltZW91dCgoZnVuY3Rpb24oKXt3aW5kb3cuY2xlYXJUaW1lb3V0KHQudGltZXJJZCksdC5jYWxsYmFjaygpfSksdGhpcy5yZW1haW5pbmcpfX0se2tleTpcInRvZ2dsZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wYXVzZWQ/dGhpcy5yZXN1bWUoKTp0aGlzLnBhdXNlKCl9fV0pJiZkKGUucHJvdG90eXBlLG4pLG8mJmQoZSxvKSx0fSgpO2Z1bmN0aW9uIGgodCl7cmV0dXJuKGg9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIG0odCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIG89ZVtuXTtvLmVudW1lcmFibGU9by5lbnVtZXJhYmxlfHwhMSxvLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBvJiYoby53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsby5rZXksbyl9fWZ1bmN0aW9uIHYodCxlKXtyZXR1cm4hZXx8XCJvYmplY3RcIiE9PWgoZSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGU/ZnVuY3Rpb24odCl7aWYodm9pZCAwPT09dCl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIHR9KHQpOmV9ZnVuY3Rpb24gYih0KXtyZXR1cm4oYj1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSkodCl9ZnVuY3Rpb24gayh0LGUpe3JldHVybihrPU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX12YXIgZz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQsbixvLGkpe3ZhciByO3JldHVybiBmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSksKHI9dih0aGlzLGIoZSkuY2FsbCh0aGlzLGksXCJcIi5jb25jYXQoYy5wcmVmaXgsXCItXCIpLmNvbmNhdChNYXRoLmZsb29yKERhdGUubm93KCktMTAwKk1hdGgucmFuZG9tKCkpKSxcIlwiLmNvbmNhdChjLnByZWZpeCxcIiBcIikuY29uY2F0KGMucHJlZml4LFwiLVwiKS5jb25jYXQobiksXCJhbmltYXRpb24tZHVyYXRpb246IFwiLmNvbmNhdChvLnRvU2VjcyhvLmFuaW1hdGlvbkR1cmF0aW9uKSxcIjtcIiksbykpKS51cGRhdGVUeXBlKG4pLHIuc2V0SW5uZXJIdG1sKHQpLHJ9dmFyIG4sbyxpO3JldHVybiBmdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTt0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmayh0LGUpfShlLHQpLG49ZSwobz1be2tleTpcInNldElubmVySHRtbFwiLHZhbHVlOmZ1bmN0aW9uKHQpe1wiYWxlcnRcIj09PXRoaXMudHlwZSYmdCYmKHQ9dGhpcy5vcHRpb25zLmZvcm1hdEVycm9yKHQpKSx0PXRoaXMub3B0aW9ucy5hcHBseVJlcGxhY2VtZW50cyh0LHRoaXMudHlwZSksdGhpcy5uZXdOb2RlLmlubmVySFRNTD0nPGRpdiBjbGFzcz1cImF3bi10b2FzdC13cmFwcGVyXCI+Jy5jb25jYXQodGhpcy5wcm9ncmVzc0JhcikuY29uY2F0KHRoaXMubGFiZWwsJzxkaXYgY2xhc3M9XCInKS5jb25jYXQoYy5rbGFzcy5jb250ZW50LCdcIj4nKS5jb25jYXQodCwnPC9kaXY+PHNwYW4gY2xhc3M9XCInKS5jb25jYXQoYy5rbGFzcy5pY29uLCdcIj4nKS5jb25jYXQodGhpcy5vcHRpb25zLmljb24odGhpcy50eXBlKSxcIjwvc3Bhbj48L2Rpdj5cIil9fSx7a2V5OlwiYmVmb3JlSW5zZXJ0XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO2lmKHRoaXMucGFyZW50LmNoaWxkRWxlbWVudENvdW50Pj10aGlzLm9wdGlvbnMubWF4Tm90aWZpY2F0aW9ucyl7dmFyIGU9QXJyYXkuZnJvbSh0aGlzLnBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGMucHJlZml4KSk7dGhpcy5kZWxldGUoZS5maW5kKChmdW5jdGlvbihlKXtyZXR1cm4hdC5pc0RlbGV0ZWQoZSl9KSkpfX19LHtrZXk6XCJhZnRlckluc2VydFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztpZihcImFzeW5jXCI9PXRoaXMudHlwZSlyZXR1cm4gdGhpcy5zdGFydD1EYXRlLm5vdygpO2lmKHRoaXMuYWRkRXZlbnQoXCJjbGlja1wiLChmdW5jdGlvbigpe3JldHVybiB0LmRlbGV0ZSgpfSkpLCEodGhpcy5kdXJhdGlvbjw9MCkpe3RoaXMudGltZXI9bmV3IHkoKGZ1bmN0aW9uKCl7cmV0dXJuIHQuZGVsZXRlKCl9KSx0aGlzLmR1cmF0aW9uKTtmb3IodmFyIGU9MCxuPVtcIm1vdXNlZW50ZXJcIixcIm1vdXNlbGVhdmVcIl07ZTxuLmxlbmd0aDtlKyspe3ZhciBvPW5bZV07dGhpcy5hZGRFdmVudChvLChmdW5jdGlvbigpe3QuaXNEZWxldGVkKCl8fCh0LnRvZ2dsZUNsYXNzKGMua2xhc3MucHJvZ3Jlc3NCYXJQYXVzZSksdC50aW1lci50b2dnbGUoKSl9KSl9fX19LHtrZXk6XCJpc0RlbGV0ZWRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0aGlzLmVsO3JldHVybiB0LmNsYXNzTGlzdC5jb250YWlucyhsLmtsYXNzLmhpZGluZyl9fSx7a2V5OlwicHJvZ3Jlc3NCYXJcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kdXJhdGlvbjw9MHx8XCJhc3luY1wiPT09dGhpcy50eXBlP1wiXCI6XCI8ZGl2IGNsYXNzPSdcIi5jb25jYXQoYy5rbGFzcy5wcm9ncmVzc0JhcixcIicgc3R5bGU9XFxcImFuaW1hdGlvbi1kdXJhdGlvbjpcIikuY29uY2F0KHRoaXMub3B0aW9ucy50b1NlY3ModGhpcy5kdXJhdGlvbiksJztcIj48L2Rpdj4nKX19LHtrZXk6XCJsYWJlbFwiLGdldDpmdW5jdGlvbigpe3JldHVybic8YiBjbGFzcz1cIicuY29uY2F0KGMua2xhc3MubGFiZWwsJ1wiPicpLmNvbmNhdCh0aGlzLm9wdGlvbnMubGFiZWwodGhpcy50eXBlKSxcIjwvYj5cIil9fV0pJiZtKG4ucHJvdG90eXBlLG8pLGkmJm0obixpKSxlfShwKTtmdW5jdGlvbiB3KHQpe3JldHVybih3PVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1mdW5jdGlvbiBPKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciBvPWVbbl07by5lbnVtZXJhYmxlPW8uZW51bWVyYWJsZXx8ITEsby5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbyYmKG8ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG8ua2V5LG8pfX1mdW5jdGlvbiBfKHQsZSl7cmV0dXJuIWV8fFwib2JqZWN0XCIhPT13KGUpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBlP2Z1bmN0aW9uKHQpe2lmKHZvaWQgMD09PXQpdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO3JldHVybiB0fSh0KTplfWZ1bmN0aW9uIFQodCl7cmV0dXJuKFQ9T2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5nZXRQcm90b3R5cGVPZjpmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KX0pKHQpfWZ1bmN0aW9uIEUodCxlKXtyZXR1cm4oRT1PYmplY3Quc2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuX19wcm90b19fPWUsdH0pKHQsZSl9dmFyIFM9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXt2YXIgbixvPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIm1vZGFsXCIsaT1hcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCxyPWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwLGE9YXJndW1lbnRzLmxlbmd0aD40P2FyZ3VtZW50c1s0XTp2b2lkIDA7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKTt2YXIgcz1cImFuaW1hdGlvbi1kdXJhdGlvbjogXCIuY29uY2F0KGkudG9TZWNzKGkuYW5pbWF0aW9uRHVyYXRpb24pLFwiO1wiKTtyZXR1cm4obj1fKHRoaXMsVChlKS5jYWxsKHRoaXMsZG9jdW1lbnQuYm9keSx1Lmlkcy53cmFwcGVyLG51bGwscyxpKSkpW3UuaWRzLmNvbmZpcm1Pa109cixuW3UuaWRzLmNvbmZpcm1DYW5jZWxdPWEsbi5jbGFzc05hbWU9XCJcIi5jb25jYXQodS5wcmVmaXgsXCItXCIpLmNvbmNhdChvKSxbXCJjb25maXJtXCIsXCJhc3luYy1ibG9ja1wiLFwibW9kYWxcIl0uaW5jbHVkZXMobyl8fChvPVwibW9kYWxcIiksbi51cGRhdGVUeXBlKG8pLG4uc2V0SW5uZXJIdG1sKHQpLG4uaW5zZXJ0KCksbn12YXIgbixvLGk7cmV0dXJuIGZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZSYmZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTp0LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSxlJiZFKHQsZSl9KGUsdCksbj1lLChvPVt7a2V5Olwic2V0SW5uZXJIdG1sXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5vcHRpb25zLmFwcGx5UmVwbGFjZW1lbnRzKHQsdGhpcy50eXBlKTtzd2l0Y2godGhpcy50eXBlKXtjYXNlXCJjb25maXJtXCI6dmFyIG49W1wiPGJ1dHRvbiBjbGFzcz0nXCIuY29uY2F0KHUua2xhc3MuYnV0dG9uLFwiIFwiKS5jb25jYXQodS5rbGFzcy5zdWNjZXNzQnRuLFwiJ2lkPSdcIikuY29uY2F0KHUuaWRzLmNvbmZpcm1PayxcIic+XCIpLmNvbmNhdCh0aGlzLm9wdGlvbnMubGFiZWxzLmNvbmZpcm1PayxcIjwvYnV0dG9uPlwiKV07ITEhPT10aGlzW3UuaWRzLmNvbmZpcm1DYW5jZWxdJiZuLnB1c2goXCI8YnV0dG9uIGNsYXNzPSdcIi5jb25jYXQodS5rbGFzcy5idXR0b24sXCIgXCIpLmNvbmNhdCh1LmtsYXNzLmNhbmNlbEJ0bixcIidpZD0nXCIpLmNvbmNhdCh1Lmlkcy5jb25maXJtQ2FuY2VsLFwiJz5cIikuY29uY2F0KHRoaXMub3B0aW9ucy5sYWJlbHMuY29uZmlybUNhbmNlbCxcIjwvYnV0dG9uPlwiKSksZT1cIlwiLmNvbmNhdCh0aGlzLm9wdGlvbnMuaWNvbih0aGlzLnR5cGUpLFwiPGRpdiBjbGFzcz0nXCIpLmNvbmNhdCh1LmtsYXNzLnRpdGxlLFwiJz5cIikuY29uY2F0KHRoaXMub3B0aW9ucy5sYWJlbCh0aGlzLnR5cGUpLCc8L2Rpdj48ZGl2IGNsYXNzPVwiJykuY29uY2F0KHUua2xhc3MuY29udGVudCwnXCI+JykuY29uY2F0KGUsXCI8L2Rpdj48ZGl2IGNsYXNzPSdcIikuY29uY2F0KHUua2xhc3MuYnV0dG9ucyxcIiBcIikuY29uY2F0KHUua2xhc3MuYnV0dG9ucyxcIi1cIikuY29uY2F0KG4ubGVuZ3RoLFwiJz5cIikuY29uY2F0KG4uam9pbihcIlwiKSxcIjwvZGl2PlwiKTticmVhaztjYXNlXCJhc3luYy1ibG9ja1wiOmU9XCJcIi5jb25jYXQoZSwnPGRpdiBjbGFzcz1cIicpLmNvbmNhdCh1LmtsYXNzLmRvdEFuaW1hdGlvbiwnXCI+PC9kaXY+Jyl9dGhpcy5uZXdOb2RlLmlubmVySFRNTD0nPGRpdiBjbGFzcz1cIicuY29uY2F0KHUua2xhc3MuYm9keSxcIiBcIikuY29uY2F0KHRoaXMuY2xhc3NOYW1lLCdcIj4nKS5jb25jYXQoZSxcIjwvZGl2PlwiKX19LHtrZXk6XCJrZXl1cExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24odCl7aWYoXCJhc3luYy1ibG9ja1wiPT09dGhpcy50eXBlKXJldHVybiB0LnByZXZlbnREZWZhdWx0KCk7c3dpdGNoKHQuY29kZSl7Y2FzZVwiRXNjYXBlXCI6dC5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuZGVsZXRlKCk7Y2FzZVwiVGFiXCI6aWYodC5wcmV2ZW50RGVmYXVsdCgpLFwiY29uZmlybVwiIT09dGhpcy50eXBlfHwhMT09PXRoaXNbdS5pZHMuY29uZmlybUNhbmNlbF0pcmV0dXJuITA7dmFyIGU9dGhpcy5va0J0bjt0LnNoaWZ0S2V5P2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQ9PXUuaWRzLmNvbmZpcm1PayYmKGU9dGhpcy5jYW5jZWxCdG4pOmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQhPT11Lmlkcy5jb25maXJtQ2FuY2VsJiYoZT10aGlzLmNhbmNlbEJ0biksZS5mb2N1cygpfX19LHtrZXk6XCJhZnRlckluc2VydFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztzd2l0Y2godGhpcy5saXN0ZW5lcj1mdW5jdGlvbihlKXtyZXR1cm4gdC5rZXl1cExpc3RlbmVyKGUpfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLmxpc3RlbmVyKSx0aGlzLnR5cGUpe2Nhc2VcImFzeW5jLWJsb2NrXCI6dGhpcy5zdGFydD1EYXRlLm5vdygpO2JyZWFrO2Nhc2VcImNvbmZpcm1cIjp0aGlzLm9rQnRuLmZvY3VzKCksdGhpcy5hZGRFdmVudChcImNsaWNrXCIsKGZ1bmN0aW9uKGUpe2lmKFwiQlVUVE9OXCIhPT1lLnRhcmdldC5ub2RlTmFtZSlyZXR1cm4hMTt0LmRlbGV0ZSgpLHRbZS50YXJnZXQuaWRdJiZ0W2UudGFyZ2V0LmlkXSgpfSkpO2JyZWFrO2RlZmF1bHQ6ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCksdGhpcy5hZGRFdmVudChcImNsaWNrXCIsKGZ1bmN0aW9uKGUpe2UudGFyZ2V0LmlkPT09dC5uZXdOb2RlLmlkJiZ0LmRlbGV0ZSgpfSkpfX19LHtrZXk6XCJhZnRlckRlbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5saXN0ZW5lcil9fSx7a2V5Olwib2tCdG5cIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodS5pZHMuY29uZmlybU9rKX19LHtrZXk6XCJjYW5jZWxCdG5cIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodS5pZHMuY29uZmlybUNhbmNlbCl9fV0pJiZPKG4ucHJvdG90eXBlLG8pLGkmJk8obixpKSxlfShwKTtmdW5jdGlvbiBqKHQpe3JldHVybihqPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1mdW5jdGlvbiB4KHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciBvPWVbbl07by5lbnVtZXJhYmxlPW8uZW51bWVyYWJsZXx8ITEsby5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbyYmKG8ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG8ua2V5LG8pfX1uLmQoZSxcImRlZmF1bHRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gQ30pKTt2YXIgQz1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e307IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyx0KSx0aGlzLm9wdGlvbnM9bmV3IGEoZSl9dmFyIGUsbixvO3JldHVybiBlPXQsKG49W3trZXk6XCJ0aXBcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLl9hZGRUb2FzdCh0LFwidGlwXCIsZSkuZWx9fSx7a2V5OlwiaW5mb1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJpbmZvXCIsZSkuZWx9fSx7a2V5Olwic3VjY2Vzc1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJzdWNjZXNzXCIsZSkuZWx9fSx7a2V5Olwid2FybmluZ1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJ3YXJuaW5nXCIsZSkuZWx9fSx7a2V5OlwiYWxlcnRcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLl9hZGRUb2FzdCh0LFwiYWxlcnRcIixlKS5lbH19LHtrZXk6XCJhc3luY1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLG8saSl7dmFyIHI9dGhpcy5fYWRkVG9hc3QobyxcImFzeW5jXCIsaSk7cmV0dXJuIHRoaXMuX2FmdGVyQXN5bmModCxlLG4saSxyKX19LHtrZXk6XCJjb25maXJtXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4sbyl7cmV0dXJuIHRoaXMuX2FkZFBvcHVwKHQsXCJjb25maXJtXCIsbyxlLG4pfX0se2tleTpcImFzeW5jQmxvY2tcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvLGkpe3ZhciByPXRoaXMuX2FkZFBvcHVwKG8sXCJhc3luYy1ibG9ja1wiLGkpO3JldHVybiB0aGlzLl9hZnRlckFzeW5jKHQsZSxuLGkscil9fSx7a2V5OlwibW9kYWxcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMuX2FkZFBvcHVwKHQsZSxuKX19LHtrZXk6XCJjbG9zZVRvYXN0c1wiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMuY29udGFpbmVyO3QuZmlyc3RDaGlsZDspdC5yZW1vdmVDaGlsZCh0LmZpcnN0Q2hpbGQpfX0se2tleTpcIl9hZGRQb3B1cFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLG8saSl7cmV0dXJuIG5ldyBTKHQsZSx0aGlzLm9wdGlvbnMub3ZlcnJpZGUobiksbyxpKX19LHtrZXk6XCJfYWRkVG9hc3RcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvKXtuPXRoaXMub3B0aW9ucy5vdmVycmlkZShuKTt2YXIgaT1uZXcgZyh0LGUsbix0aGlzLmNvbnRhaW5lcik7cmV0dXJuIG8/byBpbnN0YW5jZW9mIFM/by5kZWxldGUoKS50aGVuKChmdW5jdGlvbigpe3JldHVybiBpLmluc2VydCgpfSkpOm8ucmVwbGFjZShpKTppLmluc2VydCgpfX0se2tleTpcIl9hZnRlckFzeW5jXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4sbyxpKXtyZXR1cm4gdC50aGVuKHRoaXMuX3Jlc3BvbnNlSGFuZGxlcihlLFwic3VjY2Vzc1wiLG8saSksdGhpcy5fcmVzcG9uc2VIYW5kbGVyKG4sXCJhbGVydFwiLG8saSkpfX0se2tleTpcIl9yZXNwb25zZUhhbmRsZXJcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvKXt2YXIgaT10aGlzO3JldHVybiBmdW5jdGlvbihyKXtzd2l0Y2goaih0KSl7Y2FzZVwidW5kZWZpbmVkXCI6Y2FzZVwic3RyaW5nXCI6dmFyIGE9XCJhbGVydFwiPT09ZT90fHxyOnQ7aS5fYWRkVG9hc3QoYSxlLG4sbyk7YnJlYWs7ZGVmYXVsdDpvLmRlbGV0ZSgpLnRoZW4oKGZ1bmN0aW9uKCl7dCYmdChyKX0pKX19fX0se2tleTpcIl9jcmVhdGVDb250YWluZXJcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBuZXcgcChkb2N1bWVudC5ib2R5LGMuaWRzLmNvbnRhaW5lcixcImF3bi1cIi5jb25jYXQodGhpcy5vcHRpb25zLnBvc2l0aW9uKSkuaW5zZXJ0KCkuZWx9fSx7a2V5OlwiY29udGFpbmVyXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGMuaWRzLmNvbnRhaW5lcil8fHRoaXMuX2NyZWF0ZUNvbnRhaW5lcigpfX1dKSYmeChlLnByb3RvdHlwZSxuKSxvJiZ4KGUsbyksdH0oKX1dKX0pKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImNvbnN0IGNyZWF0ZVJvb21CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZS1tZW51X19jcmVhdGUtcm9vbScpO1xyXG5jb25zdCBjcmVhdGVSb29tTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXJvb20tbW9kYWwnKTtcclxuY29uc3QgY2xvc2VNb2RhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbF9fYm9keV9fY2xvc2UnKTtcclxuXHJcbmlmIChjcmVhdGVSb29tQnRuKSB7XHJcbiAgICBjcmVhdGVSb29tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNyZWF0ZVJvb21Nb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYgKGNsb3NlTW9kYWxCdG4pIHtcclxuICAgIGNsb3NlTW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY3JlYXRlUm9vbU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gT3RoZXIgc3R1ZmZcclxuaW1wb3J0IEFXTiBmcm9tICdhd2Vzb21lLW5vdGlmaWNhdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBzaWduYWxSIGZyb20gXCJAbWljcm9zb2Z0L3NpZ25hbHJcIjtcclxuXHJcbmNvbnN0IGNvbiA9IG5ldyBzaWduYWxSLkh1YkNvbm5lY3Rpb25CdWlsZGVyKClcclxuICAgIC53aXRoVXJsKFwiL25vdGlmaWNhdGlvbkh1YlwiKVxyXG4gICAgLmJ1aWxkKCk7XHJcblxyXG5jb24ub24oXCJOb3RpZnlBbGxcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGNvbnN0IG5vdGlmaWVyID0gbmV3IEFXTih7XHJcbiAgICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxyXG4gICAgfSk7XHJcbiAgICBub3RpZmllci5zdWNjZXNzKGRhdGEudGV4dCk7XHJcbn0pO1xyXG5cclxuY29uLnN0YXJ0KCk7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFwcC5jc3NcIjsiXSwic291cmNlUm9vdCI6IiJ9