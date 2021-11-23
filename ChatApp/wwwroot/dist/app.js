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
var VERSION = "5.0.12";
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

!function(t,e){ true?module.exports=e():0}(self,(function(){return(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}t.r(e),t.d(e,{default:()=>B});var i={maxNotifications:10,animationDuration:300,position:"bottom-right",labels:{tip:"Tip",info:"Info",success:"Success",warning:"Attention",alert:"Error",async:"Loading",confirm:"Confirmation required",confirmOk:"OK",confirmCancel:"Cancel"},icons:{tip:"question-circle",info:"info-circle",success:"check-circle",warning:"exclamation-circle",alert:"exclamation-triangle",async:"cog fa-spin",confirm:"exclamation-triangle",prefix:"<i class='fa fas fa-fw fa-",suffix:"'></i>",enabled:!0},replacements:{tip:null,info:null,success:null,warning:null,alert:null,async:null,"async-block":null,modal:null,confirm:null,general:{"<script>":"","<\/script>":""}},messages:{tip:"",info:"",success:"Action has been succeeded",warning:"",alert:"Action has been failed",confirm:"This action can't be undone. Continue?",async:"Please, wait...","async-block":"Loading"},formatError:function(t){if(t.response){if(!t.response.data)return"500 API Server Error";if(t.response.data.errors)return t.response.data.errors.map((function(t){return t.detail})).join("<br>");if(t.response.statusText)return"".concat(t.response.status," ").concat(t.response.statusText,": ").concat(t.response.data)}return t.message?t.message:t},durations:{global:5e3,success:null,info:null,tip:null,warning:null,alert:null},minDurations:{async:1e3,"async-block":1e3}},a=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;o(this,t),Object.assign(this,this.defaultsDeep(n,e))}var e,a;return e=t,a=[{key:"icon",value:function(t){return this.icons.enabled?"".concat(this.icons.prefix).concat(this.icons[t]).concat(this.icons.suffix):""}},{key:"label",value:function(t){return this.labels[t]}},{key:"duration",value:function(t){var e=this.durations[t];return null===e?this.durations.global:e}},{key:"toSecs",value:function(t){return"".concat(t/1e3,"s")}},{key:"applyReplacements",value:function(t,e){if(!t)return this.messages[e]||"";for(var n=0,o=["general",e];n<o.length;n++){var r=o[n];if(this.replacements[r])for(var i in this.replacements[r])t=t.replace(i,this.replacements[r][i])}return t}},{key:"override",value:function(e){return e?new t(e,this):this}},{key:"defaultsDeep",value:function(t,e){var o={};for(var r in t)e.hasOwnProperty(r)?o[r]="object"===n(t[r])&&null!==t[r]?this.defaultsDeep(t[r],e[r]):e[r]:o[r]=t[r];return o}}],a&&r(e.prototype,a),t}(),c="awn",s={popup:"".concat(c,"-popup"),toast:"".concat(c,"-toast"),btn:"".concat(c,"-btn"),confirm:"".concat(c,"-confirm")},u={prefix:s.toast,klass:{label:"".concat(s.toast,"-label"),content:"".concat(s.toast,"-content"),icon:"".concat(s.toast,"-icon"),progressBar:"".concat(s.toast,"-progress-bar"),progressBarPause:"".concat(s.toast,"-progress-bar-paused")},ids:{container:"".concat(s.toast,"-container")}},l={prefix:s.popup,klass:{buttons:"".concat(c,"-buttons"),button:s.btn,successBtn:"".concat(s.btn,"-success"),cancelBtn:"".concat(s.btn,"-cancel"),title:"".concat(s.popup,"-title"),body:"".concat(s.popup,"-body"),content:"".concat(s.popup,"-content"),dotAnimation:"".concat(s.popup,"-loading-dots")},ids:{wrapper:"".concat(s.popup,"-wrapper"),confirmOk:"".concat(s.confirm,"-ok"),confirmCancel:"".concat(s.confirm,"-cancel")}},f={klass:{hiding:"".concat(c,"-hiding")},lib:c};function p(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var d=function(){function t(e,n,o,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.newNode=document.createElement("div"),n&&(this.newNode.id=n),o&&(this.newNode.className=o),r&&(this.newNode.style.cssText=r),this.parent=e,this.options=i}var e,n;return e=t,n=[{key:"beforeInsert",value:function(){}},{key:"afterInsert",value:function(){}},{key:"insert",value:function(){return this.beforeInsert(),this.el=this.parent.appendChild(this.newNode),this.afterInsert(),this}},{key:"replace",value:function(t){var e=this;if(this.getElement())return this.beforeDelete().then((function(){return e.updateType(t.type),e.parent.replaceChild(t.newNode,e.el),e.el=e.getElement(t.newNode),e.afterInsert(),e}))}},{key:"beforeDelete",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el,n=0;return this.start&&(n=this.options.minDurations[this.type]+this.start-Date.now())<0&&(n=0),new Promise((function(o){setTimeout((function(){e.classList.add(f.klass.hiding),setTimeout(o,t.options.animationDuration)}),n)}))}},{key:"delete",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return this.getElement(e)?this.beforeDelete(e).then((function(){e.remove(),t.afterDelete()})):null}},{key:"afterDelete",value:function(){}},{key:"getElement",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return t?document.getElementById(t.id):null}},{key:"addEvent",value:function(t,e){this.el.addEventListener(t,e)}},{key:"toggleClass",value:function(t){this.el.classList.toggle(t)}},{key:"updateType",value:function(t){this.type=t,this.duration=this.options.duration(this.type)}}],n&&p(e.prototype,n),t}();function y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var h=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.callback=e,this.remaining=n,this.resume()}var e,n;return e=t,(n=[{key:"pause",value:function(){this.paused=!0,window.clearTimeout(this.timerId),this.remaining-=new Date-this.start}},{key:"resume",value:function(){var t=this;this.paused=!1,this.start=new Date,window.clearTimeout(this.timerId),this.timerId=window.setTimeout((function(){window.clearTimeout(t.timerId),t.callback()}),this.remaining)}},{key:"toggle",value:function(){this.paused?this.resume():this.pause()}}])&&y(e.prototype,n),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function v(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function b(t,e){return b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},b(t,e)}function k(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(a,t);var e,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=g(o);if(r){var n=g(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return k(this,t)});function a(t,e,n,o){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,o,"".concat(u.prefix,"-").concat(Math.floor(Date.now()-100*Math.random())),"".concat(u.prefix," ").concat(u.prefix,"-").concat(e),"animation-duration: ".concat(n.toSecs(n.animationDuration),";"),n)).updateType(e),r.setInnerHtml(t),r}return e=a,n=[{key:"setInnerHtml",value:function(t){"alert"===this.type&&t&&(t=this.options.formatError(t)),t=this.options.applyReplacements(t,this.type),this.newNode.innerHTML='<div class="awn-toast-wrapper">'.concat(this.progressBar).concat(this.label,'<div class="').concat(u.klass.content,'">').concat(t,'</div><span class="').concat(u.klass.icon,'">').concat(this.options.icon(this.type),"</span></div>")}},{key:"beforeInsert",value:function(){var t=this;if(this.parent.childElementCount>=this.options.maxNotifications){var e=Array.from(this.parent.getElementsByClassName(u.prefix));this.delete(e.find((function(e){return!t.isDeleted(e)})))}}},{key:"afterInsert",value:function(){var t=this;if("async"==this.type)return this.start=Date.now();if(this.addEvent("click",(function(){return t.delete()})),!(this.duration<=0)){this.timer=new h((function(){return t.delete()}),this.duration);for(var e=0,n=["mouseenter","mouseleave"];e<n.length;e++){var o=n[e];this.addEvent(o,(function(){t.isDeleted()||(t.toggleClass(u.klass.progressBarPause),t.timer.toggle())}))}}}},{key:"isDeleted",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.el;return t.classList.contains(f.klass.hiding)}},{key:"progressBar",get:function(){return this.duration<=0||"async"===this.type?"":"<div class='".concat(u.klass.progressBar,"' style=\"animation-duration:").concat(this.options.toSecs(this.duration),';"></div>')}},{key:"label",get:function(){return'<b class="'.concat(u.klass.label,'">').concat(this.options.label(this.type),"</b>")}}],n&&v(e.prototype,n),a}(d);function O(t){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},O(t)}function T(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _(t,e){return _=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},_(t,e)}function S(t,e){if(e&&("object"===O(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var P=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(a,t);var e,n,o,r,i=(o=a,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(o);if(r){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function a(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"modal",o=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,c=arguments.length>4?arguments[4]:void 0;T(this,a);var s="animation-duration: ".concat(o.toSecs(o.animationDuration),";");return(e=i.call(this,document.body,l.ids.wrapper,null,s,o))[l.ids.confirmOk]=r,e[l.ids.confirmCancel]=c,e.className="".concat(l.prefix,"-").concat(n),["confirm","async-block","modal"].includes(n)||(n="modal"),e.updateType(n),e.setInnerHtml(t),e.insert(),e}return e=a,(n=[{key:"setInnerHtml",value:function(t){var e=this.options.applyReplacements(t,this.type);switch(this.type){case"confirm":var n=["<button class='".concat(l.klass.button," ").concat(l.klass.successBtn,"'id='").concat(l.ids.confirmOk,"'>").concat(this.options.labels.confirmOk,"</button>")];!1!==this[l.ids.confirmCancel]&&n.push("<button class='".concat(l.klass.button," ").concat(l.klass.cancelBtn,"'id='").concat(l.ids.confirmCancel,"'>").concat(this.options.labels.confirmCancel,"</button>")),e="".concat(this.options.icon(this.type),"<div class='").concat(l.klass.title,"'>").concat(this.options.label(this.type),'</div><div class="').concat(l.klass.content,'">').concat(e,"</div><div class='").concat(l.klass.buttons," ").concat(l.klass.buttons,"-").concat(n.length,"'>").concat(n.join(""),"</div>");break;case"async-block":e="".concat(e,'<div class="').concat(l.klass.dotAnimation,'"></div>')}this.newNode.innerHTML='<div class="'.concat(l.klass.body," ").concat(this.className,'">').concat(e,"</div>")}},{key:"keyupListener",value:function(t){if("async-block"===this.type)return t.preventDefault();switch(t.code){case"Escape":t.preventDefault(),this.delete();case"Tab":if(t.preventDefault(),"confirm"!==this.type||!1===this[l.ids.confirmCancel])return!0;var e=this.okBtn;t.shiftKey?document.activeElement.id==l.ids.confirmOk&&(e=this.cancelBtn):document.activeElement.id!==l.ids.confirmCancel&&(e=this.cancelBtn),e.focus()}}},{key:"afterInsert",value:function(){var t=this;switch(this.listener=function(e){return t.keyupListener(e)},window.addEventListener("keydown",this.listener),this.type){case"async-block":this.start=Date.now();break;case"confirm":this.okBtn.focus(),this.addEvent("click",(function(e){if("BUTTON"!==e.target.nodeName)return!1;t.delete(),t[e.target.id]&&t[e.target.id]()}));break;default:document.activeElement.blur(),this.addEvent("click",(function(e){e.target.id===t.newNode.id&&t.delete()}))}}},{key:"afterDelete",value:function(){window.removeEventListener("keydown",this.listener)}},{key:"okBtn",get:function(){return document.getElementById(l.ids.confirmOk)}},{key:"cancelBtn",get:function(){return document.getElementById(l.ids.confirmCancel)}}])&&E(e.prototype,n),a}(d);function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function D(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var B=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};D(this,t),this.options=new a(e)}var e,n;return e=t,(n=[{key:"tip",value:function(t,e){return this._addToast(t,"tip",e).el}},{key:"info",value:function(t,e){return this._addToast(t,"info",e).el}},{key:"success",value:function(t,e){return this._addToast(t,"success",e).el}},{key:"warning",value:function(t,e){return this._addToast(t,"warning",e).el}},{key:"alert",value:function(t,e){return this._addToast(t,"alert",e).el}},{key:"async",value:function(t,e,n,o,r){var i=this._addToast(o,"async",r);return this._afterAsync(t,e,n,r,i)}},{key:"confirm",value:function(t,e,n,o){return this._addPopup(t,"confirm",o,e,n)}},{key:"asyncBlock",value:function(t,e,n,o,r){var i=this._addPopup(o,"async-block",r);return this._afterAsync(t,e,n,r,i)}},{key:"modal",value:function(t,e,n){return this._addPopup(t,e,n)}},{key:"closeToasts",value:function(){for(var t=this.container;t.firstChild;)t.removeChild(t.firstChild)}},{key:"_addPopup",value:function(t,e,n,o,r){return new P(t,e,this.options.override(n),o,r)}},{key:"_addToast",value:function(t,e,n,o){n=this.options.override(n);var r=new w(t,e,n,this.container);return o?o instanceof P?o.delete().then((function(){return r.insert()})):o.replace(r):r.insert()}},{key:"_afterAsync",value:function(t,e,n,o,r){return t.then(this._responseHandler(e,"success",o,r),this._responseHandler(n,"alert",o,r))}},{key:"_responseHandler",value:function(t,e,n,o){var r=this;return function(i){switch(C(t)){case"undefined":case"string":var a="alert"===e?t||i:t;r._addToast(a,e,n,o);break;default:o.delete().then((function(){t&&t(i)}))}}}},{key:"_createContainer",value:function(){return new d(document.body,u.ids.container,"awn-".concat(this.options.position)).insert().el}},{key:"container",get:function(){return document.getElementById(u.ids.container)||this._createContainer()}}])&&x(e.prototype,n),t}();return e})()}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ3dDO0FBQ007QUFDOUM7QUFDQSxnQkFBZ0Isb0VBQTRCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDhEQUFHO0FBQzVCO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsWTs7Ozs7Ozs7Ozs7OztBQ2hDQSxpRUFBZUEscUJBQXVCLEdBQUcsU0FBekMsRSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vQWJvcnRDb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vRGVmYXVsdEh0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9EZWZhdWx0UmVjb25uZWN0UG9saWN5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vRXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vRmV0Y2hIdHRwQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSGFuZHNoYWtlUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9IdHRwQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSHR0cENvbm5lY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9IdWJDb25uZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSHViQ29ubmVjdGlvbkJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9JSHViUHJvdG9jb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9JTG9nZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vSVRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0pzb25IdWJQcm90b2NvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL0xvZ2dlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9Mb25nUG9sbGluZ1RyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL1NlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9TdWJqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbWljcm9zb2Z0L3NpZ25hbHIvZGlzdC9lc20vVGV4dE1lc3NhZ2VGb3JtYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL1dlYlNvY2tldFRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG1pY3Jvc29mdC9zaWduYWxyL2Rpc3QvZXNtL1hockh0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BtaWNyb3NvZnQvc2lnbmFsci9kaXN0L2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXdlc29tZS1ub3RpZmljYXRpb25zL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly8vLi93d3dyb290L3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9zcmMvc2Nzcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIFJvdWdoIHBvbHlmaWxsIG9mIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BYm9ydENvbnRyb2xsZXJcclxuLy8gV2UgZG9uJ3QgYWN0dWFsbHkgZXZlciB1c2UgdGhlIEFQSSBiZWluZyBwb2x5ZmlsbGVkLCB3ZSBhbHdheXMgdXNlIHRoZSBwb2x5ZmlsbCBiZWNhdXNlXHJcbi8vIGl0J3MgYSB2ZXJ5IG5ldyBBUEkgcmlnaHQgbm93LlxyXG4vLyBOb3QgZXhwb3J0ZWQgZnJvbSBpbmRleC5cclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBBYm9ydENvbnRyb2xsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBBYm9ydENvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5pc0Fib3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uYWJvcnQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgQWJvcnRDb250cm9sbGVyLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBYm9ydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNBYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub25hYm9ydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmFib3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFib3J0Q29udHJvbGxlci5wcm90b3R5cGUsIFwic2lnbmFsXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQWJvcnRDb250cm9sbGVyLnByb3RvdHlwZSwgXCJhYm9ydGVkXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNBYm9ydGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEFib3J0Q29udHJvbGxlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgQWJvcnRDb250cm9sbGVyIH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFib3J0Q29udHJvbGxlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBBYm9ydEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmltcG9ydCB7IEZldGNoSHR0cENsaWVudCB9IGZyb20gXCIuL0ZldGNoSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSBcIi4vSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFhockh0dHBDbGllbnQgfSBmcm9tIFwiLi9YaHJIdHRwQ2xpZW50XCI7XHJcbi8qKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHR0cENsaWVudH0uICovXHJcbnZhciBEZWZhdWx0SHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhEZWZhdWx0SHR0cENsaWVudCwgX3N1cGVyKTtcclxuICAgIC8qKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkRlZmF1bHRIdHRwQ2xpZW50fSwgdXNpbmcgdGhlIHByb3ZpZGVkIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSUxvZ2dlcn0gdG8gbG9nIG1lc3NhZ2VzLiAqL1xyXG4gICAgZnVuY3Rpb24gRGVmYXVsdEh0dHBDbGllbnQobG9nZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBpZiAodHlwZW9mIGZldGNoICE9PSBcInVuZGVmaW5lZFwiIHx8IFBsYXRmb3JtLmlzTm9kZSkge1xyXG4gICAgICAgICAgICBfdGhpcy5odHRwQ2xpZW50ID0gbmV3IEZldGNoSHR0cENsaWVudChsb2dnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgX3RoaXMuaHR0cENsaWVudCA9IG5ldyBYaHJIdHRwQ2xpZW50KGxvZ2dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB1c2FibGUgSHR0cENsaWVudCBmb3VuZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgRGVmYXVsdEh0dHBDbGllbnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwgJiYgcmVxdWVzdC5hYm9ydFNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQWJvcnRFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0Lm1ldGhvZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbWV0aG9kIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5zZW5kKHJlcXVlc3QpO1xyXG4gICAgfTtcclxuICAgIERlZmF1bHRIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXRDb29raWVTdHJpbmcgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXRDb29raWVTdHJpbmcodXJsKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRGVmYXVsdEh0dHBDbGllbnQ7XHJcbn0oSHR0cENsaWVudCkpO1xyXG5leHBvcnQgeyBEZWZhdWx0SHR0cENsaWVudCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1EZWZhdWx0SHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIDAsIDIsIDEwLCAzMCBzZWNvbmQgZGVsYXlzIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdHMuXHJcbnZhciBERUZBVUxUX1JFVFJZX0RFTEFZU19JTl9NSUxMSVNFQ09ORFMgPSBbMCwgMjAwMCwgMTAwMDAsIDMwMDAwLCBudWxsXTtcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBEZWZhdWx0UmVjb25uZWN0UG9saWN5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRGVmYXVsdFJlY29ubmVjdFBvbGljeShyZXRyeURlbGF5cykge1xyXG4gICAgICAgIHRoaXMucmV0cnlEZWxheXMgPSByZXRyeURlbGF5cyAhPT0gdW5kZWZpbmVkID8gcmV0cnlEZWxheXMuY29uY2F0KFtudWxsXSkgOiBERUZBVUxUX1JFVFJZX0RFTEFZU19JTl9NSUxMSVNFQ09ORFM7XHJcbiAgICB9XHJcbiAgICBEZWZhdWx0UmVjb25uZWN0UG9saWN5LnByb3RvdHlwZS5uZXh0UmV0cnlEZWxheUluTWlsbGlzZWNvbmRzID0gZnVuY3Rpb24gKHJldHJ5Q29udGV4dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJldHJ5RGVsYXlzW3JldHJ5Q29udGV4dC5wcmV2aW91c1JldHJ5Q291bnRdO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBEZWZhdWx0UmVjb25uZWN0UG9saWN5O1xyXG59KCkpO1xyXG5leHBvcnQgeyBEZWZhdWx0UmVjb25uZWN0UG9saWN5IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURlZmF1bHRSZWNvbm5lY3RQb2xpY3kuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuLyoqIEVycm9yIHRocm93biB3aGVuIGFuIEhUVFAgcmVxdWVzdCBmYWlscy4gKi9cclxudmFyIEh0dHBFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhIdHRwRXJyb3IsIF9zdXBlcik7XHJcbiAgICAvKiogQ29uc3RydWN0cyBhIG5ldyBpbnN0YW5jZSBvZiB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkh0dHBFcnJvcn0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTWVzc2FnZSBBIGRlc2NyaXB0aXZlIGVycm9yIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RhdHVzQ29kZSBUaGUgSFRUUCBzdGF0dXMgY29kZSByZXByZXNlbnRlZCBieSB0aGlzIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBIdHRwRXJyb3IoZXJyb3JNZXNzYWdlLCBzdGF0dXNDb2RlKSB7XHJcbiAgICAgICAgdmFyIF9uZXdUYXJnZXQgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM5NjUjaXNzdWVjb21tZW50LTI3ODU3MDIwMFxyXG4gICAgICAgIF90aGlzLl9fcHJvdG9fXyA9IHRydWVQcm90bztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gSHR0cEVycm9yO1xyXG59KEVycm9yKSk7XHJcbmV4cG9ydCB7IEh0dHBFcnJvciB9O1xyXG4vKiogRXJyb3IgdGhyb3duIHdoZW4gYSB0aW1lb3V0IGVsYXBzZXMuICovXHJcbnZhciBUaW1lb3V0RXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGltZW91dEVycm9yLCBfc3VwZXIpO1xyXG4gICAgLyoqIENvbnN0cnVjdHMgYSBuZXcgaW5zdGFuY2Ugb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5UaW1lb3V0RXJyb3J9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvck1lc3NhZ2UgQSBkZXNjcmlwdGl2ZSBlcnJvciBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBUaW1lb3V0RXJyb3IoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIF9uZXdUYXJnZXQgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGlmIChlcnJvck1lc3NhZ2UgPT09IHZvaWQgMCkgeyBlcnJvck1lc3NhZ2UgPSBcIkEgdGltZW91dCBvY2N1cnJlZC5cIjsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRydWVQcm90byA9IF9uZXdUYXJnZXQucHJvdG90eXBlO1xyXG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xyXG4gICAgICAgIC8vIFdvcmthcm91bmQgaXNzdWUgaW4gVHlwZXNjcmlwdCBjb21waWxlclxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTM5NjUjaXNzdWVjb21tZW50LTI3ODU3MDIwMFxyXG4gICAgICAgIF90aGlzLl9fcHJvdG9fXyA9IHRydWVQcm90bztcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVGltZW91dEVycm9yO1xyXG59KEVycm9yKSk7XHJcbmV4cG9ydCB7IFRpbWVvdXRFcnJvciB9O1xyXG4vKiogRXJyb3IgdGhyb3duIHdoZW4gYW4gYWN0aW9uIGlzIGFib3J0ZWQuICovXHJcbnZhciBBYm9ydEVycm9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEFib3J0RXJyb3IsIF9zdXBlcik7XHJcbiAgICAvKiogQ29uc3RydWN0cyBhIG5ldyBpbnN0YW5jZSBvZiB7QGxpbmsgQWJvcnRFcnJvcn0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yTWVzc2FnZSBBIGRlc2NyaXB0aXZlIGVycm9yIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEFib3J0RXJyb3IoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIF9uZXdUYXJnZXQgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgIGlmIChlcnJvck1lc3NhZ2UgPT09IHZvaWQgMCkgeyBlcnJvck1lc3NhZ2UgPSBcIkFuIGFib3J0IG9jY3VycmVkLlwiOyB9XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgdHJ1ZVByb3RvID0gX25ld1RhcmdldC5wcm90b3R5cGU7XHJcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBlcnJvck1lc3NhZ2UpIHx8IHRoaXM7XHJcbiAgICAgICAgLy8gV29ya2Fyb3VuZCBpc3N1ZSBpbiBUeXBlc2NyaXB0IGNvbXBpbGVyXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzk2NSNpc3N1ZWNvbW1lbnQtMjc4NTcwMjAwXHJcbiAgICAgICAgX3RoaXMuX19wcm90b19fID0gdHJ1ZVByb3RvO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBBYm9ydEVycm9yO1xyXG59KEVycm9yKSk7XHJcbmV4cG9ydCB7IEFib3J0RXJyb3IgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXJyb3JzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgQWJvcnRFcnJvciwgSHR0cEVycm9yLCBUaW1lb3V0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4vSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG52YXIgRmV0Y2hIdHRwQ2xpZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKEZldGNoSHR0cENsaWVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEZldGNoSHR0cENsaWVudChsb2dnZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICBpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGlnbm9yZSB0aGUgZHluYW1pYyByZXF1aXJlIGluIHdlYnBhY2sgYnVpbGRzIHdlIG5lZWQgdG8gZG8gdGhpcyBtYWdpY1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlOiBUUyBkb2Vzbid0IGtub3cgYWJvdXQgdGhlc2UgbmFtZXNcclxuICAgICAgICAgICAgdmFyIHJlcXVpcmVGdW5jID0gdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09IFwiZnVuY3Rpb25cIiA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZTtcclxuICAgICAgICAgICAgLy8gQ29va2llcyBhcmVuJ3QgYXV0b21hdGljYWxseSBoYW5kbGVkIGluIE5vZGUgc28gd2UgbmVlZCB0byBhZGQgYSBDb29raWVKYXIgdG8gcHJlc2VydmUgY29va2llcyBhY3Jvc3MgcmVxdWVzdHNcclxuICAgICAgICAgICAgX3RoaXMuamFyID0gbmV3IChyZXF1aXJlRnVuYyhcInRvdWdoLWNvb2tpZVwiKSkuQ29va2llSmFyKCk7XHJcbiAgICAgICAgICAgIF90aGlzLmZldGNoVHlwZSA9IHJlcXVpcmVGdW5jKFwibm9kZS1mZXRjaFwiKTtcclxuICAgICAgICAgICAgLy8gbm9kZS1mZXRjaCBkb2Vzbid0IGhhdmUgYSBuaWNlIEFQSSBmb3IgZ2V0dGluZyBhbmQgc2V0dGluZyBjb29raWVzXHJcbiAgICAgICAgICAgIC8vIGZldGNoLWNvb2tpZSB3aWxsIHdyYXAgYSBmZXRjaCBpbXBsZW1lbnRhdGlvbiB3aXRoIGEgZGVmYXVsdCBDb29raWVKYXIgb3IgYSBwcm92aWRlZCBvbmVcclxuICAgICAgICAgICAgX3RoaXMuZmV0Y2hUeXBlID0gcmVxdWlyZUZ1bmMoXCJmZXRjaC1jb29raWVcIikoX3RoaXMuZmV0Y2hUeXBlLCBfdGhpcy5qYXIpO1xyXG4gICAgICAgICAgICAvLyBOb2RlIG5lZWRzIEV2ZW50TGlzdGVuZXIgbWV0aG9kcyBvbiBBYm9ydENvbnRyb2xsZXIgd2hpY2ggb3VyIGN1c3RvbSBwb2x5ZmlsbCBkb2Vzbid0IHByb3ZpZGVcclxuICAgICAgICAgICAgX3RoaXMuYWJvcnRDb250cm9sbGVyVHlwZSA9IHJlcXVpcmVGdW5jKFwiYWJvcnQtY29udHJvbGxlclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF90aGlzLmZldGNoVHlwZSA9IGZldGNoLmJpbmQoc2VsZik7XHJcbiAgICAgICAgICAgIF90aGlzLmFib3J0Q29udHJvbGxlclR5cGUgPSBBYm9ydENvbnRyb2xsZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgRmV0Y2hIdHRwQ2xpZW50LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBhYm9ydENvbnRyb2xsZXIsIGVycm9yLCB0aW1lb3V0SWQsIG1zVGltZW91dCwgcmVzcG9uc2UsIGVfMSwgY29udGVudCwgcGF5bG9hZDtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBhYm9ydCB3YXMgbm90IHNpZ25hbGVkIGJlZm9yZSBjYWxsaW5nIHNlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwgJiYgcmVxdWVzdC5hYm9ydFNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQWJvcnRFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVxdWVzdC5tZXRob2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG1ldGhvZCBkZWZpbmVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcXVlc3QudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyB1cmwgZGVmaW5lZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyID0gbmV3IHRoaXMuYWJvcnRDb250cm9sbGVyVHlwZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIb29rIG91ciBhYm9ydFNpZ25hbCBpbnRvIHRoZSBhYm9ydCBjb250cm9sbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgQWJvcnRFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc1RpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLldhcm5pbmcsIFwiVGltZW91dCBmcm9tIEhUVFAgcmVxdWVzdC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgVGltZW91dEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBtc1RpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgNCwgNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmZldGNoVHlwZShyZXF1ZXN0LnVybCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHJlcXVlc3QuY29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogXCJuby1jYWNoZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9PT0gdHJ1ZSA/IFwiaW5jbHVkZVwiIDogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHsgXCJDb250ZW50LVR5cGVcIjogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiwgXCJYLVJlcXVlc3RlZC1XaXRoXCI6IFwiWE1MSHR0cFJlcXVlc3RcIiB9LCByZXF1ZXN0LmhlYWRlcnMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdC5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3Q6IFwibWFudWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIkVycm9yIGZyb20gSFRUUCByZXF1ZXN0LiBcIiArIGVfMSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZV8xO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnRTaWduYWwub25hYm9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBIdHRwRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCwgcmVzcG9uc2Uuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gZGVzZXJpYWxpemVDb250ZW50KHJlc3BvbnNlLCByZXF1ZXN0LnJlc3BvbnNlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGNvbnRlbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBIdHRwUmVzcG9uc2UocmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0LCBwYXlsb2FkKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEZldGNoSHR0cENsaWVudC5wcm90b3R5cGUuZ2V0Q29va2llU3RyaW5nID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHZhciBjb29raWVzID0gXCJcIjtcclxuICAgICAgICBpZiAoUGxhdGZvcm0uaXNOb2RlICYmIHRoaXMuamFyKSB7XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IHVudXNlZCB2YXJpYWJsZVxyXG4gICAgICAgICAgICB0aGlzLmphci5nZXRDb29raWVzKHVybCwgZnVuY3Rpb24gKGUsIGMpIHsgcmV0dXJuIGNvb2tpZXMgPSBjLmpvaW4oXCI7IFwiKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb29raWVzO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBGZXRjaEh0dHBDbGllbnQ7XHJcbn0oSHR0cENsaWVudCkpO1xyXG5leHBvcnQgeyBGZXRjaEh0dHBDbGllbnQgfTtcclxuZnVuY3Rpb24gZGVzZXJpYWxpemVDb250ZW50KHJlc3BvbnNlLCByZXNwb25zZVR5cGUpIHtcclxuICAgIHZhciBjb250ZW50O1xyXG4gICAgc3dpdGNoIChyZXNwb25zZVR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiYXJyYXlidWZmZXJcIjpcclxuICAgICAgICAgICAgY29udGVudCA9IHJlc3BvbnNlLmFycmF5QnVmZmVyKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ0ZXh0XCI6XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJibG9iXCI6XHJcbiAgICAgICAgY2FzZSBcImRvY3VtZW50XCI6XHJcbiAgICAgICAgY2FzZSBcImpzb25cIjpcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlVHlwZSArIFwiIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmV0Y2hIdHRwQ2xpZW50LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuaW1wb3J0IHsgVGV4dE1lc3NhZ2VGb3JtYXQgfSBmcm9tIFwiLi9UZXh0TWVzc2FnZUZvcm1hdFwiO1xyXG5pbXBvcnQgeyBpc0FycmF5QnVmZmVyIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBIYW5kc2hha2VQcm90b2NvbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEhhbmRzaGFrZVByb3RvY29sKCkge1xyXG4gICAgfVxyXG4gICAgLy8gSGFuZHNoYWtlIHJlcXVlc3QgaXMgYWx3YXlzIEpTT05cclxuICAgIEhhbmRzaGFrZVByb3RvY29sLnByb3RvdHlwZS53cml0ZUhhbmRzaGFrZVJlcXVlc3QgPSBmdW5jdGlvbiAoaGFuZHNoYWtlUmVxdWVzdCkge1xyXG4gICAgICAgIHJldHVybiBUZXh0TWVzc2FnZUZvcm1hdC53cml0ZShKU09OLnN0cmluZ2lmeShoYW5kc2hha2VSZXF1ZXN0KSk7XHJcbiAgICB9O1xyXG4gICAgSGFuZHNoYWtlUHJvdG9jb2wucHJvdG90eXBlLnBhcnNlSGFuZHNoYWtlUmVzcG9uc2UgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciByZXNwb25zZU1lc3NhZ2U7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VEYXRhO1xyXG4gICAgICAgIHZhciByZW1haW5pbmdEYXRhO1xyXG4gICAgICAgIGlmIChpc0FycmF5QnVmZmVyKGRhdGEpIHx8ICh0eXBlb2YgQnVmZmVyICE9PSBcInVuZGVmaW5lZFwiICYmIGRhdGEgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIEZvcm1hdCBpcyBiaW5hcnkgYnV0IHN0aWxsIG5lZWQgdG8gcmVhZCBKU09OIHRleHQgZnJvbSBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgdmFyIGJpbmFyeURhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gYmluYXJ5RGF0YS5pbmRleE9mKFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvckNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnRlbnQgYmVmb3JlIHNlcGFyYXRvciBpcyBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwgY29udGVudCBhZnRlciBpcyBhZGRpdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZUxlbmd0aCA9IHNlcGFyYXRvckluZGV4ICsgMTtcclxuICAgICAgICAgICAgbWVzc2FnZURhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJpbmFyeURhdGEuc2xpY2UoMCwgcmVzcG9uc2VMZW5ndGgpKTtcclxuICAgICAgICAgICAgcmVtYWluaW5nRGF0YSA9IChiaW5hcnlEYXRhLmJ5dGVMZW5ndGggPiByZXNwb25zZUxlbmd0aCkgPyBiaW5hcnlEYXRhLnNsaWNlKHJlc3BvbnNlTGVuZ3RoKS5idWZmZXIgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRleHREYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgdmFyIHNlcGFyYXRvckluZGV4ID0gdGV4dERhdGEuaW5kZXhPZihUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9ySW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXNzYWdlIGlzIGluY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnRlbnQgYmVmb3JlIHNlcGFyYXRvciBpcyBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgLy8gb3B0aW9uYWwgY29udGVudCBhZnRlciBpcyBhZGRpdGlvbmFsIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIHZhciByZXNwb25zZUxlbmd0aCA9IHNlcGFyYXRvckluZGV4ICsgMTtcclxuICAgICAgICAgICAgbWVzc2FnZURhdGEgPSB0ZXh0RGF0YS5zdWJzdHJpbmcoMCwgcmVzcG9uc2VMZW5ndGgpO1xyXG4gICAgICAgICAgICByZW1haW5pbmdEYXRhID0gKHRleHREYXRhLmxlbmd0aCA+IHJlc3BvbnNlTGVuZ3RoKSA/IHRleHREYXRhLnN1YnN0cmluZyhyZXNwb25zZUxlbmd0aCkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIHNob3VsZCBoYXZlIGp1c3QgdGhlIHNpbmdsZSBoYW5kc2hha2UgbWVzc2FnZVxyXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IFRleHRNZXNzYWdlRm9ybWF0LnBhcnNlKG1lc3NhZ2VEYXRhKTtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKG1lc3NhZ2VzWzBdKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UudHlwZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIGhhbmRzaGFrZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXNwb25zZU1lc3NhZ2UgPSByZXNwb25zZTtcclxuICAgICAgICAvLyBtdWx0aXBsZSBtZXNzYWdlcyBjb3VsZCBoYXZlIGFycml2ZWQgd2l0aCBoYW5kc2hha2VcclxuICAgICAgICAvLyByZXR1cm4gYWRkaXRpb25hbCBkYXRhIHRvIGJlIHBhcnNlZCBhcyB1c3VhbCwgb3IgbnVsbCBpZiBhbGwgcGFyc2VkXHJcbiAgICAgICAgcmV0dXJuIFtyZW1haW5pbmdEYXRhLCByZXNwb25zZU1lc3NhZ2VdO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIYW5kc2hha2VQcm90b2NvbDtcclxufSgpKTtcclxuZXhwb3J0IHsgSGFuZHNoYWtlUHJvdG9jb2wgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SGFuZHNoYWtlUHJvdG9jb2wuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG4vKiogUmVwcmVzZW50cyBhbiBIVFRQIHJlc3BvbnNlLiAqL1xyXG52YXIgSHR0cFJlc3BvbnNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSHR0cFJlc3BvbnNlKHN0YXR1c0NvZGUsIHN0YXR1c1RleHQsIGNvbnRlbnQpIHtcclxuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xyXG4gICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9IHN0YXR1c1RleHQ7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBIdHRwUmVzcG9uc2U7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEh0dHBSZXNwb25zZSB9O1xyXG4vKiogQWJzdHJhY3Rpb24gb3ZlciBhbiBIVFRQIGNsaWVudC5cclxuICpcclxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhbiBhYnN0cmFjdGlvbiBvdmVyIGFuIEhUVFAgY2xpZW50IHNvIHRoYXQgYSBkaWZmZXJlbnQgaW1wbGVtZW50YXRpb24gY2FuIGJlIHByb3ZpZGVkIG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuXHJcbiAqL1xyXG52YXIgSHR0cENsaWVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh0dHBDbGllbnQoKSB7XHJcbiAgICB9XHJcbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChfX2Fzc2lnbih7fSwgb3B0aW9ucywgeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsIH0pKTtcclxuICAgIH07XHJcbiAgICBIdHRwQ2xpZW50LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoX19hc3NpZ24oe30sIG9wdGlvbnMsIHsgbWV0aG9kOiBcIlBPU1RcIiwgdXJsOiB1cmwgfSkpO1xyXG4gICAgfTtcclxuICAgIEh0dHBDbGllbnQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kKF9fYXNzaWduKHt9LCBvcHRpb25zLCB7IG1ldGhvZDogXCJERUxFVEVcIiwgdXJsOiB1cmwgfSkpO1xyXG4gICAgfTtcclxuICAgIC8qKiBHZXRzIGFsbCBjb29raWVzIHRoYXQgYXBwbHkgdG8gdGhlIHNwZWNpZmllZCBVUkwuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgVVJMIHRoYXQgdGhlIGNvb2tpZXMgYXJlIHZhbGlkIGZvci5cclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIGNvbnRhaW5pbmcgYWxsIHRoZSBrZXktdmFsdWUgY29va2llIHBhaXJzIGZvciB0aGUgc3BlY2lmaWVkIFVSTC5cclxuICAgICAqL1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgSHR0cENsaWVudC5wcm90b3R5cGUuZ2V0Q29va2llU3RyaW5nID0gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBIdHRwQ2xpZW50O1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdHRwQ2xpZW50IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUh0dHBDbGllbnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IERlZmF1bHRIdHRwQ2xpZW50IH0gZnJvbSBcIi4vRGVmYXVsdEh0dHBDbGllbnRcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEh0dHBUcmFuc3BvcnRUeXBlLCBUcmFuc2ZlckZvcm1hdCB9IGZyb20gXCIuL0lUcmFuc3BvcnRcIjtcclxuaW1wb3J0IHsgTG9uZ1BvbGxpbmdUcmFuc3BvcnQgfSBmcm9tIFwiLi9Mb25nUG9sbGluZ1RyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0IH0gZnJvbSBcIi4vU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGNyZWF0ZUxvZ2dlciwgZ2V0VXNlckFnZW50SGVhZGVyLCBQbGF0Zm9ybSB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFdlYlNvY2tldFRyYW5zcG9ydCB9IGZyb20gXCIuL1dlYlNvY2tldFRyYW5zcG9ydFwiO1xyXG52YXIgTUFYX1JFRElSRUNUUyA9IDEwMDtcclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBIdHRwQ29ubmVjdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh0dHBDb25uZWN0aW9uKHVybCwgb3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XHJcbiAgICAgICAgdGhpcy5zdG9wUHJvbWlzZVJlc29sdmVyID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgIHRoaXMuZmVhdHVyZXMgPSB7fTtcclxuICAgICAgICB0aGlzLm5lZ290aWF0ZVZlcnNpb24gPSAxO1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBjcmVhdGVMb2dnZXIob3B0aW9ucy5sb2dnZXIpO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IHRoaXMucmVzb2x2ZVVybCh1cmwpO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIG9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgPSBvcHRpb25zLmxvZ01lc3NhZ2VDb250ZW50ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9PT0gXCJib29sZWFuXCIgfHwgb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ3aXRoQ3JlZGVudGlhbHMgb3B0aW9uIHdhcyBub3QgYSAnYm9vbGVhbicgb3IgJ3VuZGVmaW5lZCcgdmFsdWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB3ZWJTb2NrZXRNb2R1bGUgPSBudWxsO1xyXG4gICAgICAgIHZhciBldmVudFNvdXJjZU1vZHVsZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKFBsYXRmb3JtLmlzTm9kZSAmJiB0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBpZ25vcmUgdGhlIGR5bmFtaWMgcmVxdWlyZSBpbiB3ZWJwYWNrIGJ1aWxkcyB3ZSBuZWVkIHRvIGRvIHRoaXMgbWFnaWNcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZTogVFMgZG9lc24ndCBrbm93IGFib3V0IHRoZXNlIG5hbWVzXHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlRnVuYyA9IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fID09PSBcImZ1bmN0aW9uXCIgPyBfX25vbl93ZWJwYWNrX3JlcXVpcmVfXyA6IHJlcXVpcmU7XHJcbiAgICAgICAgICAgIHdlYlNvY2tldE1vZHVsZSA9IHJlcXVpcmVGdW5jKFwid3NcIik7XHJcbiAgICAgICAgICAgIGV2ZW50U291cmNlTW9kdWxlID0gcmVxdWlyZUZ1bmMoXCJldmVudHNvdXJjZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFQbGF0Zm9ybS5pc05vZGUgJiYgdHlwZW9mIFdlYlNvY2tldCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhb3B0aW9ucy5XZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5XZWJTb2NrZXQgPSBXZWJTb2NrZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKFBsYXRmb3JtLmlzTm9kZSAmJiAhb3B0aW9ucy5XZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgaWYgKHdlYlNvY2tldE1vZHVsZSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5XZWJTb2NrZXQgPSB3ZWJTb2NrZXRNb2R1bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFQbGF0Zm9ybS5pc05vZGUgJiYgdHlwZW9mIEV2ZW50U291cmNlICE9PSBcInVuZGVmaW5lZFwiICYmICFvcHRpb25zLkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuRXZlbnRTb3VyY2UgPSBFdmVudFNvdXJjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoUGxhdGZvcm0uaXNOb2RlICYmICFvcHRpb25zLkV2ZW50U291cmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnRTb3VyY2VNb2R1bGUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuRXZlbnRTb3VyY2UgPSBldmVudFNvdXJjZU1vZHVsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBvcHRpb25zLmh0dHBDbGllbnQgfHwgbmV3IERlZmF1bHRIdHRwQ2xpZW50KHRoaXMubG9nZ2VyKTtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSwgbWVzc2FnZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmZXJGb3JtYXQgPSB0cmFuc2ZlckZvcm1hdCB8fCBUcmFuc2ZlckZvcm1hdC5CaW5hcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc0luKHRyYW5zZmVyRm9ybWF0LCBUcmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlN0YXJ0aW5nIGNvbm5lY3Rpb24gd2l0aCB0cmFuc2ZlciBmb3JtYXQgJ1wiICsgVHJhbnNmZXJGb3JtYXRbdHJhbnNmZXJGb3JtYXRdICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBzdGFydCBhbiBIdHRwQ29ubmVjdGlvbiB0aGF0IGlzIG5vdCBpbiB0aGUgJ0Rpc2Nvbm5lY3RlZCcgc3RhdGUuXCIpKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkNvbm5lY3RpbmdcIiAvKiBDb25uZWN0aW5nICovO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlID0gdGhpcy5zdGFydEludGVybmFsKHRyYW5zZmVyRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydEludGVybmFsUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkZhaWxlZCB0byBzdGFydCB0aGUgSHR0cENvbm5lY3Rpb24gYmVmb3JlIHN0b3AoKSB3YXMgY2FsbGVkLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW5ub3QgYXdhaXQgc3RvcFByb21pc2UgaW5zaWRlIHN0YXJ0SW50ZXJuYWwgc2luY2Ugc3RvcEludGVybmFsIGF3YWl0cyB0aGUgc3RhcnRJbnRlcm5hbFByb21pc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcFByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2Fubm90IGF3YWl0IHN0b3BQcm9taXNlIGluc2lkZSBzdGFydEludGVybmFsIHNpbmNlIHN0b3BJbnRlcm5hbCBhd2FpdHMgdGhlIHN0YXJ0SW50ZXJuYWxQcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gXCJDb25uZWN0ZWRcIiAvKiBDb25uZWN0ZWQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkh0dHBDb25uZWN0aW9uLnN0YXJ0SW50ZXJuYWwgY29tcGxldGVkIGdyYWNlZnVsbHkgYnV0IGRpZG4ndCBlbnRlciB0aGUgY29ubmVjdGlvbiBpbnRvIHRoZSBjb25uZWN0ZWQgc3RhdGUhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IFwiQ29ubmVjdGVkXCIgLyogQ29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3Qgc2VuZCBkYXRhIGlmIHRoZSBjb25uZWN0aW9uIGlzIG5vdCBpbiB0aGUgJ0Nvbm5lY3RlZCcgU3RhdGUuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbmRRdWV1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRRdWV1ZSA9IG5ldyBUcmFuc3BvcnRTZW5kUXVldWUodGhpcy50cmFuc3BvcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUcmFuc3BvcnQgd2lsbCBub3QgYmUgbnVsbCBpZiBzdGF0ZSBpcyBjb25uZWN0ZWRcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUXVldWUuc2VuZChkYXRhKTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNhbGwgdG8gSHR0cENvbm5lY3Rpb24uc3RvcChcIiArIGVycm9yICsgXCIpIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVzb2x2ZSgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGluZ1wiIC8qIERpc2Nvbm5lY3RpbmcgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3AoXCIgKyBlcnJvciArIFwiKSBpZ25vcmVkIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGluZyBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5zdG9wUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkRpc2Nvbm5lY3RpbmdcIiAvKiBEaXNjb25uZWN0aW5nICovO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNvbXBsZXRlIHN0b3AoKSB1bnRpbCBzdG9wQ29ubmVjdGlvbigpIGNvbXBsZXRlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN0b3BQcm9taXNlUmVzb2x2ZXIgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RvcEludGVybmFsIHNob3VsZCBuZXZlciB0aHJvdyBzbyBqdXN0IG9ic2VydmUgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RvcEludGVybmFsKGVycm9yKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdG9wSW50ZXJuYWwgc2hvdWxkIG5ldmVyIHRocm93IHNvIGp1c3Qgb2JzZXJ2ZSBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0b3BQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RvcEludGVybmFsID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZV8xLCBlXzI7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCBlcnJvciBhcyBzb29uIGFzIHBvc3NpYmxlIG90aGVyd2lzZSB0aGVyZSBpcyBhIHJhY2UgYmV0d2VlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgdHJhbnNwb3J0IGNsb3NpbmcgYW5kIHByb3ZpZGluZyBhbiBlcnJvciBhbmQgdGhlIGVycm9yIGZyb20gYSBjbG9zZSBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHdvdWxkIHByZWZlciB0aGUgY2xvc2UgbWVzc2FnZSBlcnJvci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wRXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydEludGVybmFsUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50cmFuc3BvcnQpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzUsIDcsICwgOF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnRyYW5zcG9ydC5zdG9wKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkh0dHBDb25uZWN0aW9uLnRyYW5zcG9ydC5zdG9wKCkgdGhyZXcgZXJyb3IgJ1wiICsgZV8yICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQ29ubmVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA4XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiSHR0cENvbm5lY3Rpb24udHJhbnNwb3J0IGlzIHVuZGVmaW5lZCBpbiBIdHRwQ29ubmVjdGlvbi5zdG9wKCkgYmVjYXVzZSBzdGFydCgpIGZhaWxlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RhcnRJbnRlcm5hbCA9IGZ1bmN0aW9uICh0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCwgbmVnb3RpYXRlUmVzcG9uc2UsIHJlZGlyZWN0cywgX2xvb3BfMSwgdGhpc18xLCBlXzM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuYmFzZVVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSB0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW5GYWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsIDEyLCAsIDEzXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNraXBOZWdvdGlhdGlvbikgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRoaXMub3B0aW9ucy50cmFuc3BvcnQgPT09IEh0dHBUcmFuc3BvcnRUeXBlLldlYlNvY2tldHMpKSByZXR1cm4gWzMgLypicmVhayovLCAzXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBhZGQgYSBjb25uZWN0aW9uIElEIGluIHRoaXMgY2FzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRoaXMuY29uc3RydWN0VHJhbnNwb3J0KEh0dHBUcmFuc3BvcnRUeXBlLldlYlNvY2tldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQganVzdCBjYWxsIGNvbm5lY3QgZGlyZWN0bHkgaW4gdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBObyBmYWxsYmFjayBvciBuZWdvdGlhdGUgaW4gdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnN0YXJ0VHJhbnNwb3J0KHVybCwgdHJhbnNmZXJGb3JtYXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIHNob3VsZCBqdXN0IGNhbGwgY29ubmVjdCBkaXJlY3RseSBpbiB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIGZhbGxiYWNrIG9yIG5lZ290aWF0ZSBpbiB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiB0aHJvdyBuZXcgRXJyb3IoXCJOZWdvdGlhdGlvbiBjYW4gb25seSBiZSBza2lwcGVkIHdoZW4gdXNpbmcgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQgZGlyZWN0bHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlUmVzcG9uc2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWRpcmVjdHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjY2Vzc1Rva2VuXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXNfMS5nZXROZWdvdGlhdGlvblJlc3BvbnNlKHVybCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVSZXNwb25zZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSB1c2VyIHRyaWVzIHRvIHN0b3AgdGhlIGNvbm5lY3Rpb24gd2hlbiBpdCBpcyBiZWluZyBzdGFydGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc18xLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLyB8fCB0aGlzXzEuY29ubmVjdGlvblN0YXRlID09PSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGR1cmluZyBuZWdvdGlhdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVnb3RpYXRlUmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmVnb3RpYXRlUmVzcG9uc2UuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLlByb3RvY29sVmVyc2lvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkRldGVjdGVkIGEgY29ubmVjdGlvbiBhdHRlbXB0IHRvIGFuIEFTUC5ORVQgU2lnbmFsUiBTZXJ2ZXIuIFRoaXMgY2xpZW50IG9ubHkgc3VwcG9ydHMgY29ubmVjdGluZyB0byBhbiBBU1AuTkVUIENvcmUgU2lnbmFsUiBTZXJ2ZXIuIFNlZSBodHRwczovL2FrYS5tcy9zaWduYWxyLWNvcmUtZGlmZmVyZW5jZXMgZm9yIGRldGFpbHMuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IG5lZ290aWF0ZVJlc3BvbnNlLnVybDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZWdvdGlhdGVSZXNwb25zZS5hY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuXzEgPSBuZWdvdGlhdGVSZXNwb25zZS5hY2Nlc3NUb2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYWNjZXNzVG9rZW5GYWN0b3J5ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gYWNjZXNzVG9rZW5fMTsgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0cysrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDY7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzUgLyp5aWVsZCoqLywgX2xvb3BfMSgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZ290aWF0ZVJlc3BvbnNlLnVybCAmJiByZWRpcmVjdHMgPCBNQVhfUkVESVJFQ1RTKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0cyA9PT0gTUFYX1JFRElSRUNUUyAmJiBuZWdvdGlhdGVSZXNwb25zZS51cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZ290aWF0ZSByZWRpcmVjdGlvbiBsaW1pdCBleGNlZWRlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5jcmVhdGVUcmFuc3BvcnQodXJsLCB0aGlzLm9wdGlvbnMudHJhbnNwb3J0LCBuZWdvdGlhdGVSZXNwb25zZSwgdHJhbnNmZXJGb3JtYXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0IGluc3RhbmNlb2YgTG9uZ1BvbGxpbmdUcmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZXMuaW5oZXJlbnRLZWVwQWxpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIHRoZSBjb25uZWN0aW9uIHRyYW5zaXRpb25zIHRvIHRoZSBjb25uZWN0ZWQgc3RhdGUgcHJpb3IgdG8gY29tcGxldGluZyB0aGlzLnN0YXJ0SW50ZXJuYWxQcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQoKSB3aWxsIGhhbmRsZSB0aGUgY2FzZSB3aGVuIHN0b3Agd2FzIGNhbGxlZCBhbmQgc3RhcnRJbnRlcm5hbCBleGl0cyBzdGlsbCBpbiB0aGUgZGlzY29ubmVjdGluZyBzdGF0ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJUaGUgSHR0cENvbm5lY3Rpb24gY29ubmVjdGVkIHN1Y2Nlc3NmdWxseS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IFwiQ29ubmVjdGVkXCIgLyogQ29ubmVjdGVkICovO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEzXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzMgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJGYWlsZWQgdG8gc3RhcnQgdGhlIGNvbm5lY3Rpb246IFwiICsgZV8zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBcIkRpc2Nvbm5lY3RlZFwiIC8qIERpc2Nvbm5lY3RlZCAqLztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHN0YXJ0IGZhaWxzLCBhbnkgYWN0aXZlIGNhbGxzIHRvIHN0b3AgYXNzdW1lIHRoYXQgc3RhcnQgd2lsbCBjb21wbGV0ZSB0aGUgc3RvcCBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2VSZXNvbHZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QoZV8zKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TmVnb3RpYXRpb25SZXNwb25zZSA9IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJzLCB0b2tlbiwgX2EsIG5hbWUsIHZhbHVlLCBuZWdvdGlhdGVVcmwsIHJlc3BvbnNlLCBuZWdvdGlhdGVSZXNwb25zZSwgZV80O1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gX2Iuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gXCJCZWFyZXIgXCIgKyB0b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlVXJsID0gdGhpcy5yZXNvbHZlTmVnb3RpYXRlVXJsKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTZW5kaW5nIG5lZ290aWF0aW9uIHJlcXVlc3Q6IFwiICsgbmVnb3RpYXRlVXJsICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYi50cnlzLnB1c2goWzMsIDUsICwgNl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmh0dHBDbGllbnQucG9zdChuZWdvdGlhdGVVcmwsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IF9fYXNzaWduKHt9LCBoZWFkZXJzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHN0YXR1cyBjb2RlIHJldHVybmVkIGZyb20gbmVnb3RpYXRlICdcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIidcIikpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZWdvdGlhdGVSZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmVnb3RpYXRlUmVzcG9uc2UubmVnb3RpYXRlVmVyc2lvbiB8fCBuZWdvdGlhdGVSZXNwb25zZS5uZWdvdGlhdGVWZXJzaW9uIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmVnb3RpYXRlIHZlcnNpb24gMCBkb2Vzbid0IHVzZSBjb25uZWN0aW9uVG9rZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNvIHdlIHNldCBpdCBlcXVhbCB0byBjb25uZWN0aW9uSWQgc28gYWxsIG91ciBsb2dpYyBjYW4gdXNlIGNvbm5lY3Rpb25Ub2tlbiB3aXRob3V0IGJlaW5nIGF3YXJlIG9mIHRoZSBuZWdvdGlhdGUgdmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvblRva2VuID0gbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvbklkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZWdvdGlhdGVSZXNwb25zZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlXzQgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJGYWlsZWQgdG8gY29tcGxldGUgbmVnb3RpYXRpb24gd2l0aCB0aGUgc2VydmVyOiBcIiArIGVfNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChlXzQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUNvbm5lY3RVcmwgPSBmdW5jdGlvbiAodXJsLCBjb25uZWN0aW9uVG9rZW4pIHtcclxuICAgICAgICBpZiAoIWNvbm5lY3Rpb25Ub2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKFwiP1wiKSA9PT0gLTEgPyBcIj9cIiA6IFwiJlwiKSArIChcImlkPVwiICsgY29ubmVjdGlvblRva2VuKTtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24gKHVybCwgcmVxdWVzdGVkVHJhbnNwb3J0LCBuZWdvdGlhdGVSZXNwb25zZSwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0VXJsLCB0cmFuc3BvcnRFeGNlcHRpb25zLCB0cmFuc3BvcnRzLCBuZWdvdGlhdGUsIF9pLCB0cmFuc3BvcnRzXzEsIGVuZHBvaW50LCB0cmFuc3BvcnRPckVycm9yLCBleF8xLCBleF8yLCBtZXNzYWdlO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0VXJsID0gdGhpcy5jcmVhdGVDb25uZWN0VXJsKHVybCwgbmVnb3RpYXRlUmVzcG9uc2UuY29ubmVjdGlvblRva2VuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSVRyYW5zcG9ydChyZXF1ZXN0ZWRUcmFuc3BvcnQpKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gd2FzIHByb3ZpZGVkIGFuIGluc3RhbmNlIG9mIElUcmFuc3BvcnQsIHVzaW5nIHRoYXQgZGlyZWN0bHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHJlcXVlc3RlZFRyYW5zcG9ydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydFRyYW5zcG9ydChjb25uZWN0VXJsLCByZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25JZCA9IG5lZ290aWF0ZVJlc3BvbnNlLmNvbm5lY3Rpb25JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0RXhjZXB0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzID0gbmVnb3RpYXRlUmVzcG9uc2UuYXZhaWxhYmxlVHJhbnNwb3J0cyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVnb3RpYXRlID0gbmVnb3RpYXRlUmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pID0gMCwgdHJhbnNwb3J0c18xID0gdHJhbnNwb3J0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2kgPCB0cmFuc3BvcnRzXzEubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludCA9IHRyYW5zcG9ydHNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydE9yRXJyb3IgPSB0aGlzLnJlc29sdmVUcmFuc3BvcnRPckVycm9yKGVuZHBvaW50LCByZXF1ZXN0ZWRUcmFuc3BvcnQsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodHJhbnNwb3J0T3JFcnJvciBpbnN0YW5jZW9mIEVycm9yKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBlcnJvciBhbmQgY29udGludWUsIHdlIGRvbid0IHdhbnQgdG8gY2F1c2UgYSByZS1uZWdvdGlhdGUgaW4gdGhlc2UgY2FzZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0RXhjZXB0aW9ucy5wdXNoKGVuZHBvaW50LnRyYW5zcG9ydCArIFwiIGZhaWxlZDogXCIgKyB0cmFuc3BvcnRPckVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSVRyYW5zcG9ydCh0cmFuc3BvcnRPckVycm9yKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydE9yRXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW5lZ290aWF0ZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gNTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbNSwgNywgLCA4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0TmVnb3RpYXRpb25SZXNwb25zZSh1cmwpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgOF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleF8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QoZXhfMSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdFVybCA9IHRoaXMuY3JlYXRlQ29ubmVjdFVybCh1cmwsIG5lZ290aWF0ZS5jb25uZWN0aW9uVG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzksIDExLCAsIDEyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRUcmFuc3BvcnQoY29ubmVjdFVybCwgcmVxdWVzdGVkVHJhbnNmZXJGb3JtYXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbklkID0gbmVnb3RpYXRlLmNvbm5lY3Rpb25JZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4XzIgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJGYWlsZWQgdG8gc3RhcnQgdGhlIHRyYW5zcG9ydCAnXCIgKyBlbmRwb2ludC50cmFuc3BvcnQgKyBcIic6IFwiICsgZXhfMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZ290aWF0ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0RXhjZXB0aW9ucy5wdXNoKGVuZHBvaW50LnRyYW5zcG9ydCArIFwiIGZhaWxlZDogXCIgKyBleF8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlICE9PSBcIkNvbm5lY3RpbmdcIiAvKiBDb25uZWN0aW5nICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gXCJGYWlsZWQgdG8gc2VsZWN0IHRyYW5zcG9ydCBiZWZvcmUgc3RvcCgpIHdhcyBjYWxsZWQuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0RXhjZXB0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvbm5lY3QgdG8gdGhlIHNlcnZlciB3aXRoIGFueSBvZiB0aGUgYXZhaWxhYmxlIHRyYW5zcG9ydHMuIFwiICsgdHJhbnNwb3J0RXhjZXB0aW9ucy5qb2luKFwiIFwiKSkpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm9uZSBvZiB0aGUgdHJhbnNwb3J0cyBzdXBwb3J0ZWQgYnkgdGhlIGNsaWVudCBhcmUgc3VwcG9ydGVkIGJ5IHRoZSBzZXJ2ZXIuXCIpKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh0dHBDb25uZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RUcmFuc3BvcnQgPSBmdW5jdGlvbiAodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgc3dpdGNoICh0cmFuc3BvcnQpIHtcclxuICAgICAgICAgICAgY2FzZSBIdHRwVHJhbnNwb3J0VHlwZS5XZWJTb2NrZXRzOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuV2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ1dlYlNvY2tldCcgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgV2ViU29ja2V0VHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy5XZWJTb2NrZXQsIHRoaXMub3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcclxuICAgICAgICAgICAgY2FzZSBIdHRwVHJhbnNwb3J0VHlwZS5TZXJ2ZXJTZW50RXZlbnRzOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuRXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInRXZlbnRTb3VyY2UnIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQodGhpcy5odHRwQ2xpZW50LCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSwgdGhpcy5sb2dnZXIsIHRoaXMub3B0aW9ucy5sb2dNZXNzYWdlQ29udGVudCB8fCBmYWxzZSwgdGhpcy5vcHRpb25zLkV2ZW50U291cmNlLCB0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzLCB0aGlzLm9wdGlvbnMuaGVhZGVycyB8fCB7fSk7XHJcbiAgICAgICAgICAgIGNhc2UgSHR0cFRyYW5zcG9ydFR5cGUuTG9uZ1BvbGxpbmc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IExvbmdQb2xsaW5nVHJhbnNwb3J0KHRoaXMuaHR0cENsaWVudCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIHRoaXMubG9nZ2VyLCB0aGlzLm9wdGlvbnMubG9nTWVzc2FnZUNvbnRlbnQgfHwgZmFsc2UsIHRoaXMub3B0aW9ucy53aXRoQ3JlZGVudGlhbHMsIHRoaXMub3B0aW9ucy5oZWFkZXJzIHx8IHt9KTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdHJhbnNwb3J0OiBcIiArIHRyYW5zcG9ydCArIFwiLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHVybCwgdHJhbnNmZXJGb3JtYXQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0Lm9ucmVjZWl2ZSA9IHRoaXMub25yZWNlaXZlO1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0Lm9uY2xvc2UgPSBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuc3RvcENvbm5lY3Rpb24oZSk7IH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0LmNvbm5lY3QodXJsLCB0cmFuc2ZlckZvcm1hdCk7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnJlc29sdmVUcmFuc3BvcnRPckVycm9yID0gZnVuY3Rpb24gKGVuZHBvaW50LCByZXF1ZXN0ZWRUcmFuc3BvcnQsIHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIHRyYW5zcG9ydCA9IEh0dHBUcmFuc3BvcnRUeXBlW2VuZHBvaW50LnRyYW5zcG9ydF07XHJcbiAgICAgICAgaWYgKHRyYW5zcG9ydCA9PT0gbnVsbCB8fCB0cmFuc3BvcnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIGVuZHBvaW50LnRyYW5zcG9ydCArIFwiJyBiZWNhdXNlIGl0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBjbGllbnQuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIGVuZHBvaW50LnRyYW5zcG9ydCArIFwiJyBiZWNhdXNlIGl0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBjbGllbnQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydE1hdGNoZXMocmVxdWVzdGVkVHJhbnNwb3J0LCB0cmFuc3BvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmZXJGb3JtYXRzID0gZW5kcG9pbnQudHJhbnNmZXJGb3JtYXRzLm1hcChmdW5jdGlvbiAocykgeyByZXR1cm4gVHJhbnNmZXJGb3JtYXRbc107IH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZmVyRm9ybWF0cy5pbmRleE9mKHJlcXVlc3RlZFRyYW5zZmVyRm9ybWF0KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0cmFuc3BvcnQgPT09IEh0dHBUcmFuc3BvcnRUeXBlLldlYlNvY2tldHMgJiYgIXRoaXMub3B0aW9ucy5XZWJTb2NrZXQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh0cmFuc3BvcnQgPT09IEh0dHBUcmFuc3BvcnRUeXBlLlNlcnZlclNlbnRFdmVudHMgJiYgIXRoaXMub3B0aW9ucy5FdmVudFNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGJlY2F1c2UgaXQgaXMgbm90IHN1cHBvcnRlZCBpbiB5b3VyIGVudmlyb25tZW50LidcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCInXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGlzIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2VsZWN0aW5nIHRyYW5zcG9ydCAnXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNraXBwaW5nIHRyYW5zcG9ydCAnXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGJlY2F1c2UgaXQgZG9lcyBub3Qgc3VwcG9ydCB0aGUgcmVxdWVzdGVkIHRyYW5zZmVyIGZvcm1hdCAnXCIgKyBUcmFuc2ZlckZvcm1hdFtyZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdF0gKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXCInXCIgKyBIdHRwVHJhbnNwb3J0VHlwZVt0cmFuc3BvcnRdICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgKyBUcmFuc2ZlckZvcm1hdFtyZXF1ZXN0ZWRUcmFuc2ZlckZvcm1hdF0gKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU2tpcHBpbmcgdHJhbnNwb3J0ICdcIiArIEh0dHBUcmFuc3BvcnRUeXBlW3RyYW5zcG9ydF0gKyBcIicgYmVjYXVzZSBpdCB3YXMgZGlzYWJsZWQgYnkgdGhlIGNsaWVudC5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiJ1wiICsgSHR0cFRyYW5zcG9ydFR5cGVbdHJhbnNwb3J0XSArIFwiJyBpcyBkaXNhYmxlZCBieSB0aGUgY2xpZW50LlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNJVHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xyXG4gICAgICAgIHJldHVybiB0cmFuc3BvcnQgJiYgdHlwZW9mICh0cmFuc3BvcnQpID09PSBcIm9iamVjdFwiICYmIFwiY29ubmVjdFwiIGluIHRyYW5zcG9ydDtcclxuICAgIH07XHJcbiAgICBIdHRwQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RvcENvbm5lY3Rpb24gPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdHRwQ29ubmVjdGlvbi5zdG9wQ29ubmVjdGlvbihcIiArIGVycm9yICsgXCIpIGNhbGxlZCB3aGlsZSBpbiBzdGF0ZSBcIiArIHRoaXMuY29ubmVjdGlvblN0YXRlICsgXCIuXCIpO1xyXG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBzdG9wRXJyb3IsIGl0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGUgZXJyb3IgZnJvbSB0aGUgdHJhbnNwb3J0XHJcbiAgICAgICAgZXJyb3IgPSB0aGlzLnN0b3BFcnJvciB8fCBlcnJvcjtcclxuICAgICAgICB0aGlzLnN0b3BFcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IFwiRGlzY29ubmVjdGVkXCIgLyogRGlzY29ubmVjdGVkICovKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgd2FzIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBhbHJlYWR5IGluIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJDb25uZWN0aW5nXCIgLyogQ29ubmVjdGluZyAqLykge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgd2FzIGlnbm9yZWQgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBzdGlsbCBpbiB0aGUgY29ubmVjdGluZyBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkh0dHBDb25uZWN0aW9uLnN0b3BDb25uZWN0aW9uKFwiICsgZXJyb3IgKyBcIikgd2FzIGNhbGxlZCB3aGlsZSB0aGUgY29ubmVjdGlvbiBpcyBzdGlsbCBpbiB0aGUgY29ubmVjdGluZyBzdGF0ZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJEaXNjb25uZWN0aW5nXCIgLyogRGlzY29ubmVjdGluZyAqLykge1xyXG4gICAgICAgICAgICAvLyBBIGNhbGwgdG8gc3RvcCgpIGluZHVjZWQgdGhpcyBjYWxsIHRvIHN0b3BDb25uZWN0aW9uIGFuZCBuZWVkcyB0byBiZSBjb21wbGV0ZWQuXHJcbiAgICAgICAgICAgIC8vIEFueSBzdG9wKCkgYXdhaXRlcnMgd2lsbCBiZSBzY2hlZHVsZWQgdG8gY29udGludWUgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgZmlyZXMuXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2VSZXNvbHZlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkNvbm5lY3Rpb24gZGlzY29ubmVjdGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIkNvbm5lY3Rpb24gZGlzY29ubmVjdGVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VuZFF1ZXVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFF1ZXVlLnN0b3AoKS5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJUcmFuc3BvcnRTZW5kUXVldWUuc3RvcCgpIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUXVldWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbklkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gXCJEaXNjb25uZWN0ZWRcIiAvKiBEaXNjb25uZWN0ZWQgKi87XHJcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvblN0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJIdHRwQ29ubmVjdGlvbi5vbmNsb3NlKFwiICsgZXJyb3IgKyBcIikgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnJlc29sdmVVcmwgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgLy8gc3RhcnRzV2l0aCBpcyBub3Qgc3VwcG9ydGVkIGluIElFXHJcbiAgICAgICAgaWYgKHVybC5sYXN0SW5kZXhPZihcImh0dHBzOi8vXCIsIDApID09PSAwIHx8IHVybC5sYXN0SW5kZXhPZihcImh0dHA6Ly9cIiwgMCkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFQbGF0Zm9ybS5pc0Jyb3dzZXIgfHwgIXdpbmRvdy5kb2N1bWVudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSAnXCIgKyB1cmwgKyBcIicuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXR0aW5nIHRoZSB1cmwgdG8gdGhlIGhyZWYgcHJvcGVyeSBvZiBhbiBhbmNob3IgdGFnIGhhbmRsZXMgbm9ybWFsaXphdGlvblxyXG4gICAgICAgIC8vIGZvciB1cy4gVGhlcmUgYXJlIDMgbWFpbiBjYXNlcy5cclxuICAgICAgICAvLyAxLiBSZWxhdGl2ZSBwYXRoIG5vcm1hbGl6YXRpb24gZS5nIFwiYlwiIC0+IFwiaHR0cDovL2xvY2FsaG9zdDo1MDAwL2EvYlwiXHJcbiAgICAgICAgLy8gMi4gQWJzb2x1dGUgcGF0aCBub3JtYWxpemF0aW9uIGUuZyBcIi9hL2JcIiAtPiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hL2JcIlxyXG4gICAgICAgIC8vIDMuIE5ldHdvcmtwYXRoIHJlZmVyZW5jZSBub3JtYWxpemF0aW9uIGUuZyBcIi8vbG9jYWxob3N0OjUwMDAvYS9iXCIgLT4gXCJodHRwOi8vbG9jYWxob3N0OjUwMDAvYS9iXCJcclxuICAgICAgICB2YXIgYVRhZyA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICBhVGFnLmhyZWYgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIk5vcm1hbGl6aW5nICdcIiArIHVybCArIFwiJyB0byAnXCIgKyBhVGFnLmhyZWYgKyBcIicuXCIpO1xyXG4gICAgICAgIHJldHVybiBhVGFnLmhyZWY7XHJcbiAgICB9O1xyXG4gICAgSHR0cENvbm5lY3Rpb24ucHJvdG90eXBlLnJlc29sdmVOZWdvdGlhdGVVcmwgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdXJsLmluZGV4T2YoXCI/XCIpO1xyXG4gICAgICAgIHZhciBuZWdvdGlhdGVVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIGluZGV4ID09PSAtMSA/IHVybC5sZW5ndGggOiBpbmRleCk7XHJcbiAgICAgICAgaWYgKG5lZ290aWF0ZVVybFtuZWdvdGlhdGVVcmwubGVuZ3RoIC0gMV0gIT09IFwiL1wiKSB7XHJcbiAgICAgICAgICAgIG5lZ290aWF0ZVVybCArPSBcIi9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmVnb3RpYXRlVXJsICs9IFwibmVnb3RpYXRlXCI7XHJcbiAgICAgICAgbmVnb3RpYXRlVXJsICs9IGluZGV4ID09PSAtMSA/IFwiXCIgOiB1cmwuc3Vic3RyaW5nKGluZGV4KTtcclxuICAgICAgICBpZiAobmVnb3RpYXRlVXJsLmluZGV4T2YoXCJuZWdvdGlhdGVWZXJzaW9uXCIpID09PSAtMSkge1xyXG4gICAgICAgICAgICBuZWdvdGlhdGVVcmwgKz0gaW5kZXggPT09IC0xID8gXCI/XCIgOiBcIiZcIjtcclxuICAgICAgICAgICAgbmVnb3RpYXRlVXJsICs9IFwibmVnb3RpYXRlVmVyc2lvbj1cIiArIHRoaXMubmVnb3RpYXRlVmVyc2lvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5lZ290aWF0ZVVybDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSHR0cENvbm5lY3Rpb247XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEh0dHBDb25uZWN0aW9uIH07XHJcbmZ1bmN0aW9uIHRyYW5zcG9ydE1hdGNoZXMocmVxdWVzdGVkVHJhbnNwb3J0LCBhY3R1YWxUcmFuc3BvcnQpIHtcclxuICAgIHJldHVybiAhcmVxdWVzdGVkVHJhbnNwb3J0IHx8ICgoYWN0dWFsVHJhbnNwb3J0ICYgcmVxdWVzdGVkVHJhbnNwb3J0KSAhPT0gMCk7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBUcmFuc3BvcnRTZW5kUXVldWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBUcmFuc3BvcnRTZW5kUXVldWUodHJhbnNwb3J0KSB7XHJcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XHJcbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyZWREYXRhID0gbmV3IFByb21pc2VTb3VyY2UoKTtcclxuICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdCA9IG5ldyBQcm9taXNlU291cmNlKCk7XHJcbiAgICAgICAgdGhpcy5zZW5kTG9vcFByb21pc2UgPSB0aGlzLnNlbmRMb29wKCk7XHJcbiAgICB9XHJcbiAgICBUcmFuc3BvcnRTZW5kUXVldWUucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyRGF0YShkYXRhKTtcclxuICAgICAgICBpZiAoIXRoaXMudHJhbnNwb3J0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0UmVzdWx0ID0gbmV3IFByb21pc2VTb3VyY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNwb3J0UmVzdWx0LnByb21pc2U7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZXhlY3V0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyZWREYXRhLnJlc29sdmUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kTG9vcFByb21pc2U7XHJcbiAgICB9O1xyXG4gICAgVHJhbnNwb3J0U2VuZFF1ZXVlLnByb3RvdHlwZS5idWZmZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoICYmIHR5cGVvZiAodGhpcy5idWZmZXJbMF0pICE9PSB0eXBlb2YgKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIGRhdGEgdG8gYmUgb2YgdHlwZSBcIiArIHR5cGVvZiAodGhpcy5idWZmZXIpICsgXCIgYnV0IHdhcyBvZiB0eXBlIFwiICsgdHlwZW9mIChkYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2goZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyZWREYXRhLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBUcmFuc3BvcnRTZW5kUXVldWUucHJvdG90eXBlLnNlbmRMb29wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydFJlc3VsdCwgZGF0YSwgZXJyb3JfMTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZW5kQnVmZmVyZWREYXRhLnByb21pc2VdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXhlY3V0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnRSZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydFJlc3VsdC5yZWplY3QoXCJDb25uZWN0aW9uIHN0b3BwZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyZWREYXRhID0gbmV3IFByb21pc2VTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0UmVzdWx0ID0gdGhpcy50cmFuc3BvcnRSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0UmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gdHlwZW9mICh0aGlzLmJ1ZmZlclswXSkgPT09IFwic3RyaW5nXCIgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idWZmZXIuam9pbihcIlwiKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUcmFuc3BvcnRTZW5kUXVldWUuY29uY2F0QnVmZmVycyh0aGlzLmJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNCwgLCA1XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMudHJhbnNwb3J0LnNlbmQoZGF0YSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRSZXN1bHQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yXzEgPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydFJlc3VsdC5yZWplY3QoZXJyb3JfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFRyYW5zcG9ydFNlbmRRdWV1ZS5jb25jYXRCdWZmZXJzID0gZnVuY3Rpb24gKGFycmF5QnVmZmVycykge1xyXG4gICAgICAgIHZhciB0b3RhbExlbmd0aCA9IGFycmF5QnVmZmVycy5tYXAoZnVuY3Rpb24gKGIpIHsgcmV0dXJuIGIuYnl0ZUxlbmd0aDsgfSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSk7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGFycmF5QnVmZmVyc18xID0gYXJyYXlCdWZmZXJzOyBfaSA8IGFycmF5QnVmZmVyc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGFycmF5QnVmZmVyc18xW19pXTtcclxuICAgICAgICAgICAgcmVzdWx0LnNldChuZXcgVWludDhBcnJheShpdGVtKSwgb2Zmc2V0KTtcclxuICAgICAgICAgICAgb2Zmc2V0ICs9IGl0ZW0uYnl0ZUxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5idWZmZXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFRyYW5zcG9ydFNlbmRRdWV1ZTtcclxufSgpKTtcclxuZXhwb3J0IHsgVHJhbnNwb3J0U2VuZFF1ZXVlIH07XHJcbnZhciBQcm9taXNlU291cmNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUHJvbWlzZVNvdXJjZSgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICByZXR1cm4gX2EgPSBbcmVzb2x2ZSwgcmVqZWN0XSwgX3RoaXMucmVzb2x2ZXIgPSBfYVswXSwgX3RoaXMucmVqZWN0ZXIgPSBfYVsxXSwgX2E7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBQcm9taXNlU291cmNlLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVzb2x2ZXIoKTtcclxuICAgIH07XHJcbiAgICBQcm9taXNlU291cmNlLnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgdGhpcy5yZWplY3RlcihyZWFzb24pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBQcm9taXNlU291cmNlO1xyXG59KCkpO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1IdHRwQ29ubmVjdGlvbi5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgSGFuZHNoYWtlUHJvdG9jb2wgfSBmcm9tIFwiLi9IYW5kc2hha2VQcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCIuL0lIdWJQcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gXCIuL1N1YmplY3RcIjtcclxuaW1wb3J0IHsgQXJnIH0gZnJvbSBcIi4vVXRpbHNcIjtcclxudmFyIERFRkFVTFRfVElNRU9VVF9JTl9NUyA9IDMwICogMTAwMDtcclxudmFyIERFRkFVTFRfUElOR19JTlRFUlZBTF9JTl9NUyA9IDE1ICogMTAwMDtcclxuLyoqIERlc2NyaWJlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IHRvIHRoZSBzZXJ2ZXIuICovXHJcbmV4cG9ydCB2YXIgSHViQ29ubmVjdGlvblN0YXRlO1xyXG4oZnVuY3Rpb24gKEh1YkNvbm5lY3Rpb25TdGF0ZSkge1xyXG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyBkaXNjb25uZWN0ZWQuICovXHJcbiAgICBIdWJDb25uZWN0aW9uU3RhdGVbXCJEaXNjb25uZWN0ZWRcIl0gPSBcIkRpc2Nvbm5lY3RlZFwiO1xyXG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyBjb25uZWN0aW5nLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiQ29ubmVjdGluZ1wiXSA9IFwiQ29ubmVjdGluZ1wiO1xyXG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyBjb25uZWN0ZWQuICovXHJcbiAgICBIdWJDb25uZWN0aW9uU3RhdGVbXCJDb25uZWN0ZWRcIl0gPSBcIkNvbm5lY3RlZFwiO1xyXG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyBkaXNjb25uZWN0aW5nLiAqL1xyXG4gICAgSHViQ29ubmVjdGlvblN0YXRlW1wiRGlzY29ubmVjdGluZ1wiXSA9IFwiRGlzY29ubmVjdGluZ1wiO1xyXG4gICAgLyoqIFRoZSBodWIgY29ubmVjdGlvbiBpcyByZWNvbm5lY3RpbmcuICovXHJcbiAgICBIdWJDb25uZWN0aW9uU3RhdGVbXCJSZWNvbm5lY3RpbmdcIl0gPSBcIlJlY29ubmVjdGluZ1wiO1xyXG59KShIdWJDb25uZWN0aW9uU3RhdGUgfHwgKEh1YkNvbm5lY3Rpb25TdGF0ZSA9IHt9KSk7XHJcbi8qKiBSZXByZXNlbnRzIGEgY29ubmVjdGlvbiB0byBhIFNpZ25hbFIgSHViLiAqL1xyXG52YXIgSHViQ29ubmVjdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh1YkNvbm5lY3Rpb24oY29ubmVjdGlvbiwgbG9nZ2VyLCBwcm90b2NvbCwgcmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLm5leHRLZWVwQWxpdmUgPSAwO1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKGNvbm5lY3Rpb24sIFwiY29ubmVjdGlvblwiKTtcclxuICAgICAgICBBcmcuaXNSZXF1aXJlZChsb2dnZXIsIFwibG9nZ2VyXCIpO1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHByb3RvY29sLCBcInByb3RvY29sXCIpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyVGltZW91dEluTWlsbGlzZWNvbmRzID0gREVGQVVMVF9USU1FT1VUX0lOX01TO1xyXG4gICAgICAgIHRoaXMua2VlcEFsaXZlSW50ZXJ2YWxJbk1pbGxpc2Vjb25kcyA9IERFRkFVTFRfUElOR19JTlRFUlZBTF9JTl9NUztcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICB0aGlzLnByb3RvY29sID0gcHJvdG9jb2w7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdFBvbGljeSA9IHJlY29ubmVjdFBvbGljeTtcclxuICAgICAgICB0aGlzLmhhbmRzaGFrZVByb3RvY29sID0gbmV3IEhhbmRzaGFrZVByb3RvY29sKCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9ucmVjZWl2ZSA9IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBfdGhpcy5wcm9jZXNzSW5jb21pbmdEYXRhKGRhdGEpOyB9O1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmNsb3NlID0gZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiBfdGhpcy5jb25uZWN0aW9uQ2xvc2VkKGVycm9yKTsgfTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrcyA9IHt9O1xyXG4gICAgICAgIHRoaXMubWV0aG9kcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2xvc2VkQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RpbmdDYWxsYmFja3MgPSBbXTtcclxuICAgICAgICB0aGlzLnJlY29ubmVjdGVkQ2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjZWl2ZWRIYW5kc2hha2VSZXNwb25zZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGFydGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRQaW5nTWVzc2FnZSA9IHRoaXMucHJvdG9jb2wud3JpdGVNZXNzYWdlKHsgdHlwZTogTWVzc2FnZVR5cGUuUGluZyB9KTtcclxuICAgIH1cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIC8vIFVzaW5nIGEgcHVibGljIHN0YXRpYyBmYWN0b3J5IG1ldGhvZCBtZWFucyB3ZSBjYW4gaGF2ZSBhIHByaXZhdGUgY29uc3RydWN0b3IgYW5kIGFuIF9pbnRlcm5hbF9cclxuICAgIC8vIGNyZWF0ZSBtZXRob2QgdGhhdCBjYW4gYmUgdXNlZCBieSBIdWJDb25uZWN0aW9uQnVpbGRlci4gQW4gXCJpbnRlcm5hbFwiIGNvbnN0cnVjdG9yIHdvdWxkIGp1c3RcclxuICAgIC8vIGJlIHN0cmlwcGVkIGF3YXkgYW5kIHRoZSAnLmQudHMnIGZpbGUgd291bGQgaGF2ZSBubyBjb25zdHJ1Y3Rvciwgd2hpY2ggaXMgaW50ZXJwcmV0ZWQgYXMgYVxyXG4gICAgLy8gcHVibGljIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgSHViQ29ubmVjdGlvbi5jcmVhdGUgPSBmdW5jdGlvbiAoY29ubmVjdGlvbiwgbG9nZ2VyLCBwcm90b2NvbCwgcmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBIdWJDb25uZWN0aW9uKGNvbm5lY3Rpb24sIGxvZ2dlciwgcHJvdG9jb2wsIHJlY29ubmVjdFBvbGljeSk7XHJcbiAgICB9O1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLCBcInN0YXRlXCIsIHtcclxuICAgICAgICAvKiogSW5kaWNhdGVzIHRoZSBzdGF0ZSBvZiB0aGUge0BsaW5rIEh1YkNvbm5lY3Rpb259IHRvIHRoZSBzZXJ2ZXIuICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIdWJDb25uZWN0aW9uLnByb3RvdHlwZSwgXCJjb25uZWN0aW9uSWRcIiwge1xyXG4gICAgICAgIC8qKiBSZXByZXNlbnRzIHRoZSBjb25uZWN0aW9uIGlkIG9mIHRoZSB7QGxpbmsgSHViQ29ubmVjdGlvbn0gb24gdGhlIHNlcnZlci4gVGhlIGNvbm5lY3Rpb24gaWQgd2lsbCBiZSBudWxsIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZWl0aGVyXHJcbiAgICAgICAgICogIGluIHRoZSBkaXNjb25uZWN0ZWQgc3RhdGUgb3IgaWYgdGhlIG5lZ290aWF0aW9uIHN0ZXAgd2FzIHNraXBwZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24gPyAodGhpcy5jb25uZWN0aW9uLmNvbm5lY3Rpb25JZCB8fCBudWxsKSA6IG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSHViQ29ubmVjdGlvbi5wcm90b3R5cGUsIFwiYmFzZVVybFwiLCB7XHJcbiAgICAgICAgLyoqIEluZGljYXRlcyB0aGUgdXJsIG9mIHRoZSB7QGxpbmsgSHViQ29ubmVjdGlvbn0gdG8gdGhlIHNlcnZlci4gKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5iYXNlVXJsIHx8IFwiXCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIGEgbmV3IHVybCBmb3IgdGhlIEh1YkNvbm5lY3Rpb24uIE5vdGUgdGhhdCB0aGUgdXJsIGNhbiBvbmx5IGJlIGNoYW5nZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBpbiBlaXRoZXIgdGhlIERpc2Nvbm5lY3RlZCBvclxyXG4gICAgICAgICAqIFJlY29ubmVjdGluZyBzdGF0ZXMuXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIHRvIGNvbm5lY3QgdG8uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCAmJiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIEh1YkNvbm5lY3Rpb24gbXVzdCBiZSBpbiB0aGUgRGlzY29ubmVjdGVkIG9yIFJlY29ubmVjdGluZyBzdGF0ZSB0byBjaGFuZ2UgdGhlIHVybC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBIdWJDb25uZWN0aW9uIHVybCBtdXN0IGJlIGEgdmFsaWQgdXJsLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYmFzZVVybCA9IHVybDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKiBTdGFydHMgdGhlIGNvbm5lY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbm5lY3Rpb24gaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGVzdGFibGlzaGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRQcm9taXNlID0gdGhpcy5zdGFydFdpdGhTdGF0ZVRyYW5zaXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRQcm9taXNlO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFN0YXRlVHJhbnNpdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZV8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3Qgc3RhcnQgYSBIdWJDb25uZWN0aW9uIHRoYXQgaXMgbm90IGluIHRoZSAnRGlzY29ubmVjdGVkJyBzdGF0ZS5cIikpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiU3RhcnRpbmcgSHViQ29ubmVjdGlvbi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgMywgLCA0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuc3RhcnRJbnRlcm5hbCgpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkh1YkNvbm5lY3Rpb24gY29ubmVjdGVkIHN1Y2Nlc3NmdWxseS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJIdWJDb25uZWN0aW9uIGZhaWxlZCB0byBzdGFydCBzdWNjZXNzZnVsbHkgYmVjYXVzZSBvZiBlcnJvciAnXCIgKyBlXzEgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QoZV8xKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0YXJ0SW50ZXJuYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZHNoYWtlUHJvbWlzZSwgaGFuZHNoYWtlUmVxdWVzdCwgZV8yO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BEdXJpbmdTdGFydEVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY2VpdmVkSGFuZHNoYWtlUmVzcG9uc2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHNoYWtlUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhhbmRzaGFrZVJlc29sdmVyID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhhbmRzaGFrZVJlamVjdGVyID0gcmVqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5jb25uZWN0aW9uLnN0YXJ0KHRoaXMucHJvdG9jb2wudHJhbnNmZXJGb3JtYXQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsyLCA1LCAsIDddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZHNoYWtlUmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvY29sOiB0aGlzLnByb3RvY29sLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnByb3RvY29sLnZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTZW5kaW5nIGhhbmRzaGFrZSByZXF1ZXN0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zZW5kTWVzc2FnZSh0aGlzLmhhbmRzaGFrZVByb3RvY29sLndyaXRlSGFuZHNoYWtlUmVxdWVzdChoYW5kc2hha2VSZXF1ZXN0KSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiVXNpbmcgSHViUHJvdG9jb2wgJ1wiICsgdGhpcy5wcm90b2NvbC5uYW1lICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmZW5zaXZlbHkgY2xlYW51cCB0aW1lb3V0IGluIGNhc2Ugd2UgcmVjZWl2ZSBhIG1lc3NhZ2UgZnJvbSB0aGUgc2VydmVyIGJlZm9yZSB3ZSBmaW5pc2ggc3RhcnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGltZW91dFBlcmlvZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0S2VlcEFsaXZlSW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgaGFuZHNoYWtlUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0J3MgaW1wb3J0YW50IHRvIGNoZWNrIHRoZSBzdG9wRHVyaW5nU3RhcnRFcnJvciBpbnN0ZWFkIG9mIGp1c3QgcmVseWluZyBvbiB0aGUgaGFuZHNoYWtlUHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiZWluZyByZWplY3RlZCBvbiBjbG9zZSwgYmVjYXVzZSB0aGlzIGNvbnRpbnVhdGlvbiBjYW4gcnVuIGFmdGVyIGJvdGggdGhlIGhhbmRzaGFrZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGUgY29ubmVjdGlvbiB3YXMgY2xvc2VkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gdGhyb3cgaW5zdGVhZCBvZiByZXR1cm5pbmcgYSByZWplY3RlZCBwcm9taXNlLCBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gYWxsb3cgYW55IHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0cmFuc2l0aW9ucyB0byBvY2N1ciBiZXR3ZWVuIG5vdyBhbmQgdGhlIGNhbGxpbmcgY29kZSBvYnNlcnZpbmcgdGhlIGV4Y2VwdGlvbnMuIFJldHVybmluZyBhIHJlamVjdGVkIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgY2F1c2UgdGhlIGNhbGxpbmcgY29udGludWF0aW9uIHRvIGdldCBzY2hlZHVsZWQgdG8gcnVuIGxhdGVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA3XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkh1YiBoYW5kc2hha2UgZmFpbGVkIHdpdGggZXJyb3IgJ1wiICsgZV8yICsgXCInIGR1cmluZyBzdGFydCgpLiBTdG9wcGluZyBIdWJDb25uZWN0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgdGhlIG9uY2xvc2UgY2FsbGJhY2sgaXMgaW52b2tlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIHRyYW5zaXRpb24gdGhlIEh1YkNvbm5lY3Rpb24gdG8gdGhlIGRpc2Nvbm5lY3RlZCBzdGF0ZSBiZWZvcmUgSHR0cENvbm5lY3Rpb24uc3RvcCgpIGNvbXBsZXRlcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5jb25uZWN0aW9uLnN0b3AoZV8yKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIdHRwQ29ubmVjdGlvbi5zdG9wKCkgc2hvdWxkIG5vdCBjb21wbGV0ZSB1bnRpbCBhZnRlciB0aGUgb25jbG9zZSBjYWxsYmFjayBpcyBpbnZva2VkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHdpbGwgdHJhbnNpdGlvbiB0aGUgSHViQ29ubmVjdGlvbiB0byB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIGJlZm9yZSBIdHRwQ29ubmVjdGlvbi5zdG9wKCkgY29tcGxldGVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVfMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIFN0b3BzIHRoZSBjb25uZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb25uZWN0aW9uIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSB0ZXJtaW5hdGVkLCBvciByZWplY3RzIHdpdGggYW4gZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQcm9taXNlLCBlXzM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvbWlzZSA9IHRoaXMuc3RhcnRQcm9taXNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BQcm9taXNlID0gdGhpcy5zdG9wSW50ZXJuYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdG9wUHJvbWlzZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMiwgNCwgLCA1XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF3YWl0aW5nIHVuZGVmaW5lZCBjb250aW51ZXMgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgc3RhcnRQcm9taXNlXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEF3YWl0aW5nIHVuZGVmaW5lZCBjb250aW51ZXMgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnN0b3BJbnRlcm5hbCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ2FsbCB0byBIdWJDb25uZWN0aW9uLnN0b3AoXCIgKyBlcnJvciArIFwiKSBpZ25vcmVkIGJlY2F1c2UgaXQgaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGVkIHN0YXRlLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDYWxsIHRvIEh0dHBDb25uZWN0aW9uLnN0b3AoXCIgKyBlcnJvciArIFwiKSBpZ25vcmVkIGJlY2F1c2UgdGhlIGNvbm5lY3Rpb24gaXMgYWxyZWFkeSBpbiB0aGUgZGlzY29ubmVjdGluZyBzdGF0ZS5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3BQcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJTdG9wcGluZyBIdWJDb25uZWN0aW9uLlwiKTtcclxuICAgICAgICBpZiAodGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSkge1xyXG4gICAgICAgICAgICAvLyBXZSdyZSBpbiBhIHJlY29ubmVjdCBkZWxheSB3aGljaCBtZWFucyB0aGUgdW5kZXJseWluZyBjb25uZWN0aW9uIGlzIGN1cnJlbnRseSBhbHJlYWR5IHN0b3BwZWQuXHJcbiAgICAgICAgICAgIC8vIEp1c3QgY2xlYXIgdGhlIGhhbmRsZSB0byBzdG9wIHRoZSByZWNvbm5lY3QgbG9vcCAod2hpY2ggbm8gb25lIGlzIHdhaXRpbmcgb24gdGhhbmtmdWxseSkgYW5kXHJcbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIG9uY2xvc2UgY2FsbGJhY2tzLlxyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRGVidWcsIFwiQ29ubmVjdGlvbiBzdG9wcGVkIGR1cmluZyByZWNvbm5lY3QgZGVsYXkuIERvbmUgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVjb25uZWN0RGVsYXlIYW5kbGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwUGluZ1RpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciA9IGVycm9yIHx8IG5ldyBFcnJvcihcIlRoZSBjb25uZWN0aW9uIHdhcyBzdG9wcGVkIGJlZm9yZSB0aGUgaHViIGhhbmRzaGFrZSBjb3VsZCBjb21wbGV0ZS5cIik7XHJcbiAgICAgICAgLy8gSHR0cENvbm5lY3Rpb24uc3RvcCgpIHNob3VsZCBub3QgY29tcGxldGUgdW50aWwgYWZ0ZXIgZWl0aGVyIEh0dHBDb25uZWN0aW9uLnN0YXJ0KCkgZmFpbHNcclxuICAgICAgICAvLyBvciB0aGUgb25jbG9zZSBjYWxsYmFjayBpcyBpbnZva2VkLiBUaGUgb25jbG9zZSBjYWxsYmFjayB3aWxsIHRyYW5zaXRpb24gdGhlIEh1YkNvbm5lY3Rpb25cclxuICAgICAgICAvLyB0byB0aGUgZGlzY29ubmVjdGVkIHN0YXRlIGlmIG5lZWQgYmUgYmVmb3JlIEh0dHBDb25uZWN0aW9uLnN0b3AoKSBjb21wbGV0ZXMuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5zdG9wKGVycm9yKTtcclxuICAgIH07XHJcbiAgICAvKiogSW52b2tlcyBhIHN0cmVhbWluZyBodWIgbWV0aG9kIG9uIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBuYW1lIGFuZCBhcmd1bWVudHMuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGVwYXJhbSBUIFRoZSB0eXBlIG9mIHRoZSBpdGVtcyByZXR1cm5lZCBieSB0aGUgc2VydmVyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZlciBtZXRob2QgdG8gaW52b2tlLlxyXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJncyBUaGUgYXJndW1lbnRzIHVzZWQgdG8gaW52b2tlIHRoZSBzZXJ2ZXIgbWV0aG9kLlxyXG4gICAgICogQHJldHVybnMge0lTdHJlYW1SZXN1bHQ8VD59IEFuIG9iamVjdCB0aGF0IHlpZWxkcyByZXN1bHRzIGZyb20gdGhlIHNlcnZlciBhcyB0aGV5IGFyZSByZWNlaXZlZC5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc3RyZWFtID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5yZXBsYWNlU3RyZWFtaW5nUGFyYW1zKGFyZ3MpLCBzdHJlYW1zID0gX2FbMF0sIHN0cmVhbUlkcyA9IF9hWzFdO1xyXG4gICAgICAgIHZhciBpbnZvY2F0aW9uRGVzY3JpcHRvciA9IHRoaXMuY3JlYXRlU3RyZWFtSW52b2NhdGlvbihtZXRob2ROYW1lLCBhcmdzLCBzdHJlYW1JZHMpO1xyXG4gICAgICAgIHZhciBwcm9taXNlUXVldWU7XHJcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICAgIHN1YmplY3QuY2FuY2VsQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBjYW5jZWxJbnZvY2F0aW9uID0gX3RoaXMuY3JlYXRlQ2FuY2VsSW52b2NhdGlvbihpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWQpO1xyXG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlUXVldWUudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChjYW5jZWxJbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrc1tpbnZvY2F0aW9uRGVzY3JpcHRvci5pbnZvY2F0aW9uSWRdID0gZnVuY3Rpb24gKGludm9jYXRpb25FdmVudCwgZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0LmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbnZvY2F0aW9uRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGludm9jYXRpb25FdmVudCB3aWxsIG5vdCBiZSBudWxsIHdoZW4gYW4gZXJyb3IgaXMgbm90IHBhc3NlZCB0byB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQudHlwZSA9PT0gTWVzc2FnZVR5cGUuQ29tcGxldGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uRXZlbnQuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5lcnJvcihuZXcgRXJyb3IoaW52b2NhdGlvbkV2ZW50LmVycm9yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5uZXh0KChpbnZvY2F0aW9uRXZlbnQuaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwcm9taXNlUXVldWUgPSB0aGlzLnNlbmRXaXRoUHJvdG9jb2woaW52b2NhdGlvbkRlc2NyaXB0b3IpXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBzdWJqZWN0LmVycm9yKGUpO1xyXG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuY2FsbGJhY2tzW2ludm9jYXRpb25EZXNjcmlwdG9yLmludm9jYXRpb25JZF07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sYXVuY2hTdHJlYW1zKHN0cmVhbXMsIHByb21pc2VRdWV1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3Q7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZE1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRLZWVwQWxpdmVJbnRlcnZhbCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNlbmRzIGEganMgb2JqZWN0IHRvIHRoZSBzZXJ2ZXIuXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUganMgb2JqZWN0IHRvIHNlcmlhbGl6ZSBhbmQgc2VuZC5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuc2VuZFdpdGhQcm90b2NvbCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2UodGhpcy5wcm90b2NvbC53cml0ZU1lc3NhZ2UobWVzc2FnZSkpO1xyXG4gICAgfTtcclxuICAgIC8qKiBJbnZva2VzIGEgaHViIG1ldGhvZCBvbiB0aGUgc2VydmVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgYXJndW1lbnRzLiBEb2VzIG5vdCB3YWl0IGZvciBhIHJlc3BvbnNlIGZyb20gdGhlIHJlY2VpdmVyLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBQcm9taXNlIHJldHVybmVkIGJ5IHRoaXMgbWV0aG9kIHJlc29sdmVzIHdoZW4gdGhlIGNsaWVudCBoYXMgc2VudCB0aGUgaW52b2NhdGlvbiB0byB0aGUgc2VydmVyLiBUaGUgc2VydmVyIG1heSBzdGlsbFxyXG4gICAgICogYmUgcHJvY2Vzc2luZyB0aGUgaW52b2NhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgc2VydmVyIG1ldGhvZCB0byBpbnZva2UuXHJcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzIFRoZSBhcmd1bWVudHMgdXNlZCB0byBpbnZva2UgdGhlIHNlcnZlciBtZXRob2QuXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaW52b2NhdGlvbiBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgc2VudCwgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfYSA9IHRoaXMucmVwbGFjZVN0cmVhbWluZ1BhcmFtcyhhcmdzKSwgc3RyZWFtcyA9IF9hWzBdLCBzdHJlYW1JZHMgPSBfYVsxXTtcclxuICAgICAgICB2YXIgc2VuZFByb21pc2UgPSB0aGlzLnNlbmRXaXRoUHJvdG9jb2wodGhpcy5jcmVhdGVJbnZvY2F0aW9uKG1ldGhvZE5hbWUsIGFyZ3MsIHRydWUsIHN0cmVhbUlkcykpO1xyXG4gICAgICAgIHRoaXMubGF1bmNoU3RyZWFtcyhzdHJlYW1zLCBzZW5kUHJvbWlzZSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbmRQcm9taXNlO1xyXG4gICAgfTtcclxuICAgIC8qKiBJbnZva2VzIGEgaHViIG1ldGhvZCBvbiB0aGUgc2VydmVyIHVzaW5nIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmQgYXJndW1lbnRzLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBQcm9taXNlIHJldHVybmVkIGJ5IHRoaXMgbWV0aG9kIHJlc29sdmVzIHdoZW4gdGhlIHNlcnZlciBpbmRpY2F0ZXMgaXQgaGFzIGZpbmlzaGVkIGludm9raW5nIHRoZSBtZXRob2QuIFdoZW4gdGhlIHByb21pc2VcclxuICAgICAqIHJlc29sdmVzLCB0aGUgc2VydmVyIGhhcyBmaW5pc2hlZCBpbnZva2luZyB0aGUgbWV0aG9kLiBJZiB0aGUgc2VydmVyIG1ldGhvZCByZXR1cm5zIGEgcmVzdWx0LCBpdCBpcyBwcm9kdWNlZCBhcyB0aGUgcmVzdWx0IG9mXHJcbiAgICAgKiByZXNvbHZpbmcgdGhlIFByb21pc2UuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGVwYXJhbSBUIFRoZSBleHBlY3RlZCByZXR1cm4gdHlwZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2ZXIgbWV0aG9kIHRvIGludm9rZS5cclxuICAgICAqIEBwYXJhbSB7YW55W119IGFyZ3MgVGhlIGFyZ3VtZW50cyB1c2VkIHRvIGludm9rZSB0aGUgc2VydmVyIG1ldGhvZC5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFQ+fSBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXN1bHQgb2YgdGhlIHNlcnZlciBtZXRob2QgKGlmIGFueSksIG9yIHJlamVjdHMgd2l0aCBhbiBlcnJvci5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9hID0gdGhpcy5yZXBsYWNlU3RyZWFtaW5nUGFyYW1zKGFyZ3MpLCBzdHJlYW1zID0gX2FbMF0sIHN0cmVhbUlkcyA9IF9hWzFdO1xyXG4gICAgICAgIHZhciBpbnZvY2F0aW9uRGVzY3JpcHRvciA9IHRoaXMuY3JlYXRlSW52b2NhdGlvbihtZXRob2ROYW1lLCBhcmdzLCBmYWxzZSwgc3RyZWFtSWRzKTtcclxuICAgICAgICB2YXIgcCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgLy8gaW52b2NhdGlvbklkIHdpbGwgYWx3YXlzIGhhdmUgYSB2YWx1ZSBmb3IgYSBub24tYmxvY2tpbmcgaW52b2NhdGlvblxyXG4gICAgICAgICAgICBfdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXSA9IGZ1bmN0aW9uIChpbnZvY2F0aW9uRXZlbnQsIGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGludm9jYXRpb25FdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGludm9jYXRpb25FdmVudCB3aWxsIG5vdCBiZSBudWxsIHdoZW4gYW4gZXJyb3IgaXMgbm90IHBhc3NlZCB0byB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2NhdGlvbkV2ZW50LnR5cGUgPT09IE1lc3NhZ2VUeXBlLkNvbXBsZXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGludm9jYXRpb25FdmVudC5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihpbnZvY2F0aW9uRXZlbnQuZXJyb3IpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaW52b2NhdGlvbkV2ZW50LnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIG1lc3NhZ2UgdHlwZTogXCIgKyBpbnZvY2F0aW9uRXZlbnQudHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHByb21pc2VRdWV1ZSA9IF90aGlzLnNlbmRXaXRoUHJvdG9jb2woaW52b2NhdGlvbkRlc2NyaXB0b3IpXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgIC8vIGludm9jYXRpb25JZCB3aWxsIGFsd2F5cyBoYXZlIGEgdmFsdWUgZm9yIGEgbm9uLWJsb2NraW5nIGludm9jYXRpb25cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5jYWxsYmFja3NbaW52b2NhdGlvbkRlc2NyaXB0b3IuaW52b2NhdGlvbklkXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIF90aGlzLmxhdW5jaFN0cmVhbXMoc3RyZWFtcywgcHJvbWlzZVF1ZXVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH07XHJcbiAgICAvKiogUmVnaXN0ZXJzIGEgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBodWIgbWV0aG9kIHdpdGggdGhlIHNwZWNpZmllZCBtZXRob2QgbmFtZSBpcyBpbnZva2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBodWIgbWV0aG9kIHRvIGRlZmluZS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld01ldGhvZCBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgcmFpc2VkIHdoZW4gdGhlIGh1YiBtZXRob2QgaXMgaW52b2tlZC5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgbmV3TWV0aG9kKSB7XHJcbiAgICAgICAgaWYgKCFtZXRob2ROYW1lIHx8ICFuZXdNZXRob2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXRob2ROYW1lID0gbWV0aG9kTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5tZXRob2RzW21ldGhvZE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQcmV2ZW50aW5nIGFkZGluZyB0aGUgc2FtZSBoYW5kbGVyIG11bHRpcGxlIHRpbWVzLlxyXG4gICAgICAgIGlmICh0aGlzLm1ldGhvZHNbbWV0aG9kTmFtZV0uaW5kZXhPZihuZXdNZXRob2QpICE9PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWV0aG9kc1ttZXRob2ROYW1lXS5wdXNoKG5ld01ldGhvZCk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIG1ldGhvZCkge1xyXG4gICAgICAgIGlmICghbWV0aG9kTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1ldGhvZE5hbWUgPSBtZXRob2ROYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gdGhpcy5tZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgICAgIGlmICghaGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVJZHggPSBoYW5kbGVycy5pbmRleE9mKG1ldGhvZCk7XHJcbiAgICAgICAgICAgIGlmIChyZW1vdmVJZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UocmVtb3ZlSWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5tZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tZXRob2RzW21ldGhvZE5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogUmVnaXN0ZXJzIGEgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGNsb3NlZC4gT3B0aW9uYWxseSByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudCBjb250YWluaW5nIHRoZSBlcnJvciB0aGF0IGNhdXNlZCB0aGUgY29ubmVjdGlvbiB0byBjbG9zZSAoaWYgYW55KS5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqIFJlZ2lzdGVycyBhIGhhbmRsZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGFydHMgcmVjb25uZWN0aW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhcnRzIHJlY29ubmVjdGluZy4gT3B0aW9uYWxseSByZWNlaXZlcyBhIHNpbmdsZSBhcmd1bWVudCBjb250YWluaW5nIHRoZSBlcnJvciB0aGF0IGNhdXNlZCB0aGUgY29ubmVjdGlvbiB0byBzdGFydCByZWNvbm5lY3RpbmcgKGlmIGFueSkuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVjb25uZWN0aW5nID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogUmVnaXN0ZXJzIGEgaGFuZGxlciB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBjb25uZWN0aW9uIHN1Y2Nlc3NmdWxseSByZWNvbm5lY3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBoYW5kbGVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5IHJlY29ubmVjdHMuXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVjb25uZWN0ZWQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RlZENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucHJvY2Vzc0luY29taW5nRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwVGltZW91dCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLnByb2Nlc3NIYW5kc2hha2VSZXNwb25zZShkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEhhbmRzaGFrZVJlc3BvbnNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGF0YSBtYXkgaGF2ZSBhbGwgYmVlbiByZWFkIHdoZW4gcHJvY2Vzc2luZyBoYW5kc2hha2UgcmVzcG9uc2VcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBQYXJzZSB0aGUgbWVzc2FnZXNcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VzID0gdGhpcy5wcm90b2NvbC5wYXJzZU1lc3NhZ2VzKGRhdGEsIHRoaXMubG9nZ2VyKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBtZXNzYWdlc18xID0gbWVzc2FnZXM7IF9pIDwgbWVzc2FnZXNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gbWVzc2FnZXNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuSW52b2NhdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZva2VDbGllbnRNZXRob2QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuU3RyZWFtSXRlbTpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNvbXBsZXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW21lc3NhZ2UuaW52b2NhdGlvbklkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBNZXNzYWdlVHlwZS5Db21wbGV0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FsbGJhY2tzW21lc3NhZ2UuaW52b2NhdGlvbklkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuUGluZzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgY2FyZSBhYm91dCBwaW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNsb3NlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiQ2xvc2UgbWVzc2FnZSByZWNlaXZlZCBmcm9tIHNlcnZlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG1lc3NhZ2UuZXJyb3IgPyBuZXcgRXJyb3IoXCJTZXJ2ZXIgcmV0dXJuZWQgYW4gZXJyb3Igb24gY2xvc2U6IFwiICsgbWVzc2FnZS5lcnJvcikgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmFsbG93UmVjb25uZWN0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJdCBmZWVscyB3cm9uZyBub3QgdG8gYXdhaXQgY29ubmVjdGlvbi5zdG9wKCkgaGVyZSwgYnV0IHByb2Nlc3NJbmNvbWluZ0RhdGEgaXMgY2FsbGVkIGFzIHBhcnQgb2YgYW4gb25yZWNlaXZlIGNhbGxiYWNrIHdoaWNoIGlzIG5vdCBhc3luYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYWxyZWFkeSB0aGUgYmVoYXZpb3IgZm9yIHNlcnZlclRpbWVvdXQoKSwgYW5kIEh0dHBDb25uZWN0aW9uLlN0b3AoKSBzaG91bGQgY2F0Y2ggYW5kIGxvZyBhbGwgcG9zc2libGUgZXhjZXB0aW9ucy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnN0b3AoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2Fubm90IGF3YWl0IHN0b3BJbnRlcm5hbCgpIGhlcmUsIGJ1dCBzdWJzZXF1ZW50IGNhbGxzIHRvIHN0b3AoKSB3aWxsIGF3YWl0IHRoaXMgaWYgc3RvcEludGVybmFsKCkgaXMgc3RpbGwgb25nb2luZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcFByb21pc2UgPSB0aGlzLnN0b3BJbnRlcm5hbChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLldhcm5pbmcsIFwiSW52YWxpZCBtZXNzYWdlIHR5cGU6IFwiICsgbWVzc2FnZS50eXBlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2V0VGltZW91dFBlcmlvZCgpO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnByb2Nlc3NIYW5kc2hha2VSZXNwb25zZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHZhciByZXNwb25zZU1lc3NhZ2U7XHJcbiAgICAgICAgdmFyIHJlbWFpbmluZ0RhdGE7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgX2EgPSB0aGlzLmhhbmRzaGFrZVByb3RvY29sLnBhcnNlSGFuZHNoYWtlUmVzcG9uc2UoZGF0YSksIHJlbWFpbmluZ0RhdGEgPSBfYVswXSwgcmVzcG9uc2VNZXNzYWdlID0gX2FbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCJFcnJvciBwYXJzaW5nIGhhbmRzaGFrZSByZXNwb25zZTogXCIgKyBlO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZHNoYWtlUmVqZWN0ZXIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlTWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiU2VydmVyIHJldHVybmVkIGhhbmRzaGFrZSBlcnJvcjogXCIgKyByZXNwb25zZU1lc3NhZ2UuZXJyb3I7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kc2hha2VSZWplY3RlcihlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIlNlcnZlciBoYW5kc2hha2UgY29tcGxldGUuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRzaGFrZVJlc29sdmVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlbWFpbmluZ0RhdGE7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUucmVzZXRLZWVwQWxpdmVJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmZlYXR1cmVzLmluaGVyZW50S2VlcEFsaXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHRoZSB0aW1lIHdlIHdhbnQgdGhlIG5leHQga2VlcCBhbGl2ZSB0byBiZSBzZW50XHJcbiAgICAgICAgLy8gVGltZXIgd2lsbCBiZSBzZXR1cCBvbiBuZXh0IG1lc3NhZ2UgcmVjZWl2ZVxyXG4gICAgICAgIHRoaXMubmV4dEtlZXBBbGl2ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy5rZWVwQWxpdmVJbnRlcnZhbEluTWlsbGlzZWNvbmRzO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFBpbmdUaW1lcigpO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnJlc2V0VGltZW91dFBlcmlvZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0aW9uLmZlYXR1cmVzIHx8ICF0aGlzLmNvbm5lY3Rpb24uZmVhdHVyZXMuaW5oZXJlbnRLZWVwQWxpdmUpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSB0aW1lb3V0IHRpbWVyXHJcbiAgICAgICAgICAgIHRoaXMudGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VydmVyVGltZW91dCgpOyB9LCB0aGlzLnNlcnZlclRpbWVvdXRJbk1pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgICAgIC8vIFNldCBrZWVwQWxpdmUgdGltZXIgaWYgdGhlcmUgaXNuJ3Qgb25lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5leHRQaW5nID0gdGhpcy5uZXh0S2VlcEFsaXZlIC0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dFBpbmcgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFBpbmcgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIHRpbWVyIG5lZWRzIHRvIGJlIHNldCBmcm9tIGEgbmV0d29ya2luZyBjYWxsYmFjayB0byBhdm9pZCBDaHJvbWUgdGltZXIgdGhyb3R0bGluZyBmcm9tIGNhdXNpbmcgdGltZXJzIHRvIHJ1biBvbmNlIGEgbWludXRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9iLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IudHJ5cy5wdXNoKFsxLCAzLCAsIDRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNlbmRNZXNzYWdlKHRoaXMuY2FjaGVkUGluZ01lc3NhZ2UpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfYi5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3IuIEl0IHNob3VsZCBiZSBzZWVuIGVsc2V3aGVyZSBpbiB0aGUgY2xpZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjb25uZWN0aW9uIGlzIHByb2JhYmx5IGluIGEgYmFkIG9yIGNsb3NlZCBzdGF0ZSBub3csIGNsZWFudXAgdGhlIHRpbWVyIHNvIGl0IHN0b3BzIHRyaWdnZXJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTsgfSwgbmV4dFBpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlcnZlclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVGhlIHNlcnZlciBoYXNuJ3QgdGFsa2VkIHRvIHVzIGluIGEgd2hpbGUuIEl0IGRvZXNuJ3QgbGlrZSB1cyBhbnltb3JlIC4uLiA6KFxyXG4gICAgICAgIC8vIFRlcm1pbmF0ZSB0aGUgY29ubmVjdGlvbiwgYnV0IHdlIGRvbid0IG5lZWQgdG8gd2FpdCBvbiB0aGUgcHJvbWlzZS4gVGhpcyBjb3VsZCB0cmlnZ2VyIHJlY29ubmVjdGluZy5cclxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZmxvYXRpbmctcHJvbWlzZXNcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc3RvcChuZXcgRXJyb3IoXCJTZXJ2ZXIgdGltZW91dCBlbGFwc2VkIHdpdGhvdXQgcmVjZWl2aW5nIGEgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIuXCIpKTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5pbnZva2VDbGllbnRNZXRob2QgPSBmdW5jdGlvbiAoaW52b2NhdGlvbk1lc3NhZ2UpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBtZXRob2RzID0gdGhpcy5tZXRob2RzW2ludm9jYXRpb25NZXNzYWdlLnRhcmdldC50b0xvd2VyQ2FzZSgpXTtcclxuICAgICAgICBpZiAobWV0aG9kcykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLmFwcGx5KF90aGlzLCBpbnZvY2F0aW9uTWVzc2FnZS5hcmd1bWVudHMpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkVycm9yLCBcIkEgY2FsbGJhY2sgZm9yIHRoZSBtZXRob2QgXCIgKyBpbnZvY2F0aW9uTWVzc2FnZS50YXJnZXQudG9Mb3dlckNhc2UoKSArIFwiIHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbnZvY2F0aW9uTWVzc2FnZS5pbnZvY2F0aW9uSWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiB2MS4gU28gd2UgcmV0dXJuIGFuIGVycm9yIHRvIGF2b2lkIGJsb2NraW5nIHRoZSBzZXJ2ZXIgd2FpdGluZyBmb3IgdGhlIHJlc3BvbnNlLlxyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlNlcnZlciByZXF1ZXN0ZWQgYSByZXNwb25zZSwgd2hpY2ggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIHZlcnNpb24gb2YgdGhlIGNsaWVudC5cIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHdhaXQgb24gdGhlIHN0b3AgaXRzZWxmLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wUHJvbWlzZSA9IHRoaXMuc3RvcEludGVybmFsKG5ldyBFcnJvcihtZXNzYWdlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIk5vIGNsaWVudCBtZXRob2Qgd2l0aCB0aGUgbmFtZSAnXCIgKyBpbnZvY2F0aW9uTWVzc2FnZS50YXJnZXQgKyBcIicgZm91bmQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jb25uZWN0aW9uQ2xvc2VkID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkh1YkNvbm5lY3Rpb24uY29ubmVjdGlvbkNsb3NlZChcIiArIGVycm9yICsgXCIpIGNhbGxlZCB3aGlsZSBpbiBzdGF0ZSBcIiArIHRoaXMuY29ubmVjdGlvblN0YXRlICsgXCIuXCIpO1xyXG4gICAgICAgIC8vIFRyaWdnZXJpbmcgdGhpcy5oYW5kc2hha2VSZWplY3RlciBpcyBpbnN1ZmZpY2llbnQgYmVjYXVzZSBpdCBjb3VsZCBhbHJlYWR5IGJlIHJlc29sdmVkIHdpdGhvdXQgdGhlIGNvbnRpbnVhdGlvbiBoYXZpbmcgcnVuIHlldC5cclxuICAgICAgICB0aGlzLnN0b3BEdXJpbmdTdGFydEVycm9yID0gdGhpcy5zdG9wRHVyaW5nU3RhcnRFcnJvciB8fCBlcnJvciB8fCBuZXcgRXJyb3IoXCJUaGUgdW5kZXJseWluZyBjb25uZWN0aW9uIHdhcyBjbG9zZWQgYmVmb3JlIHRoZSBodWIgaGFuZHNoYWtlIGNvdWxkIGNvbXBsZXRlLlwiKTtcclxuICAgICAgICAvLyBJZiB0aGUgaGFuZHNoYWtlIGlzIGluIHByb2dyZXNzLCBzdGFydCB3aWxsIGJlIHdhaXRpbmcgZm9yIHRoZSBoYW5kc2hha2UgcHJvbWlzZSwgc28gd2UgY29tcGxldGUgaXQuXHJcbiAgICAgICAgLy8gSWYgaXQgaGFzIGFscmVhZHkgY29tcGxldGVkLCB0aGlzIHNob3VsZCBqdXN0IG5vb3AuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZHNoYWtlUmVzb2x2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kc2hha2VSZXNvbHZlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbmNlbENhbGxiYWNrc1dpdGhFcnJvcihlcnJvciB8fCBuZXcgRXJyb3IoXCJJbnZvY2F0aW9uIGNhbmNlbGVkIGR1ZSB0byB0aGUgdW5kZXJseWluZyBjb25uZWN0aW9uIGJlaW5nIGNsb3NlZC5cIikpO1xyXG4gICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQoKTtcclxuICAgICAgICB0aGlzLmNsZWFudXBQaW5nVGltZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgPT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5EaXNjb25uZWN0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkICYmIHRoaXMucmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mbG9hdGluZy1wcm9taXNlc1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGlvblN0YXRlID09PSBIdWJDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZShlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElmIG5vbmUgb2YgdGhlIGFib3ZlIGlmIGNvbmRpdGlvbnMgd2VyZSB0cnVlIHdlcmUgY2FsbGVkIHRoZSBIdWJDb25uZWN0aW9uIG11c3QgYmUgaW4gZWl0aGVyOlxyXG4gICAgICAgIC8vIDEuIFRoZSBDb25uZWN0aW5nIHN0YXRlIGluIHdoaWNoIGNhc2UgdGhlIGhhbmRzaGFrZVJlc29sdmVyIHdpbGwgY29tcGxldGUgaXQgYW5kIHN0b3BEdXJpbmdTdGFydEVycm9yIHdpbGwgZmFpbCBpdC5cclxuICAgICAgICAvLyAyLiBUaGUgUmVjb25uZWN0aW5nIHN0YXRlIGluIHdoaWNoIGNhc2UgdGhlIGhhbmRzaGFrZVJlc29sdmVyIHdpbGwgY29tcGxldGUgaXQgYW5kIHN0b3BEdXJpbmdTdGFydEVycm9yIHdpbGwgZmFpbCB0aGUgY3VycmVudCByZWNvbm5lY3QgYXR0ZW1wdFxyXG4gICAgICAgIC8vICAgIGFuZCBwb3RlbnRpYWxseSBjb250aW51ZSB0aGUgcmVjb25uZWN0KCkgbG9vcC5cclxuICAgICAgICAvLyAzLiBUaGUgRGlzY29ubmVjdGVkIHN0YXRlIGluIHdoaWNoIGNhc2Ugd2UncmUgYWxyZWFkeSBkb25lLlxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLmNvbXBsZXRlQ2xvc2UgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGFydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RlZDtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZWRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW2Vycm9yXSk7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiQW4gb25jbG9zZSBjYWxsYmFjayBjYWxsZWQgd2l0aCBlcnJvciAnXCIgKyBlcnJvciArIFwiJyB0aHJldyBlcnJvciAnXCIgKyBlICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZWNvbm5lY3RTdGFydFRpbWUsIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMsIHJldHJ5RXJyb3IsIG5leHRSZXRyeURlbGF5LCBlXzQ7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY29ubmVjdFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzUmVjb25uZWN0QXR0ZW1wdHMgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUVycm9yID0gZXJyb3IgIT09IHVuZGVmaW5lZCA/IGVycm9yIDogbmV3IEVycm9yKFwiQXR0ZW1wdGluZyB0byByZWNvbm5lY3QgZHVlIHRvIGEgdW5rbm93biBlcnJvci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSZXRyeURlbGF5ID0gdGhpcy5nZXROZXh0UmV0cnlEZWxheShwcmV2aW91c1JlY29ubmVjdEF0dGVtcHRzKyssIDAsIHJldHJ5RXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFJldHJ5RGVsYXkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIG5vdCByZWNvbm5lY3RpbmcgYmVjYXVzZSB0aGUgSVJldHJ5UG9saWN5IHJldHVybmVkIG51bGwgb24gdGhlIGZpcnN0IHJlY29ubmVjdCBhdHRlbXB0LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVDbG9zZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBIdWJDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJDb25uZWN0aW9uIHJlY29ubmVjdGluZyBiZWNhdXNlIG9mIGVycm9yICdcIiArIGVycm9yICsgXCInLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJDb25uZWN0aW9uIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25yZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RpbmdDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5hcHBseShfdGhpcywgW2Vycm9yXSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiQW4gb25yZWNvbm5lY3RpbmcgY2FsbGJhY2sgY2FsbGVkIHdpdGggZXJyb3IgJ1wiICsgZXJyb3IgKyBcIicgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGl0IGVhcmx5IGlmIGFuIG9ucmVjb25uZWN0aW5nIGNhbGxiYWNrIGNhbGxlZCBjb25uZWN0aW9uLnN0b3AoKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIGxlZnQgdGhlIHJlY29ubmVjdGluZyBzdGF0ZSBpbiBvbnJlY29ubmVjdGluZyBjYWxsYmFjay4gRG9uZSByZWNvbm5lY3RpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShuZXh0UmV0cnlEZWxheSAhPT0gbnVsbCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiUmVjb25uZWN0IGF0dGVtcHQgbnVtYmVyIFwiICsgcHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cyArIFwiIHdpbGwgc3RhcnQgaW4gXCIgKyBuZXh0UmV0cnlEZWxheSArIFwiIG1zLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWNvbm5lY3REZWxheUhhbmRsZSA9IHNldFRpbWVvdXQocmVzb2x2ZSwgbmV4dFJldHJ5RGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29ubmVjdERlbGF5SGFuZGxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uU3RhdGUgIT09IEh1YkNvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5EZWJ1ZywgXCJDb25uZWN0aW9uIGxlZnQgdGhlIHJlY29ubmVjdGluZyBzdGF0ZSBkdXJpbmcgcmVjb25uZWN0IGRlbGF5LiBEb25lIHJlY29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFszLCA1LCAsIDZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zdGFydEludGVybmFsKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IEh1YkNvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJIdWJDb25uZWN0aW9uIHJlY29ubmVjdGVkIHN1Y2Nlc3NmdWxseS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ucmVjb25uZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RlZENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmFwcGx5KF90aGlzLCBbX3RoaXMuY29ubmVjdGlvbi5jb25uZWN0aW9uSWRdKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJBbiBvbnJlY29ubmVjdGVkIGNhbGxiYWNrIGNhbGxlZCB3aXRoIGNvbm5lY3Rpb25JZCAnXCIgKyB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdGlvbklkICsgXCI7IHRocmV3IGVycm9yICdcIiArIGUgKyBcIicuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfNCA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlJlY29ubmVjdCBhdHRlbXB0IGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yICdcIiArIGVfNCArIFwiJy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSAhPT0gSHViQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLkRlYnVnLCBcIkNvbm5lY3Rpb24gbW92ZWQgdG8gdGhlICdcIiArIHRoaXMuY29ubmVjdGlvblN0YXRlICsgXCInIGZyb20gdGhlIHJlY29ubmVjdGluZyBzdGF0ZSBkdXJpbmcgcmVjb25uZWN0IGF0dGVtcHQuIERvbmUgcmVjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBUeXBlU2NyaXB0IGNvbXBpbGVyIHRoaW5rcyB0aGF0IGNvbm5lY3Rpb25TdGF0ZSBtdXN0IGJlIENvbm5lY3RlZCBoZXJlLiBUaGUgVHlwZVNjcmlwdCBjb21waWxlciBpcyB3cm9uZy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9PT0gSHViQ29ubmVjdGlvblN0YXRlLkRpc2Nvbm5lY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRyeUVycm9yID0gZV80IGluc3RhbmNlb2YgRXJyb3IgPyBlXzQgOiBuZXcgRXJyb3IoZV80LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UmV0cnlEZWxheSA9IHRoaXMuZ2V0TmV4dFJldHJ5RGVsYXkocHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cysrLCBEYXRlLm5vdygpIC0gcmVjb25uZWN0U3RhcnRUaW1lLCByZXRyeUVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMgLypicmVhayovLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJSZWNvbm5lY3QgcmV0cmllcyBoYXZlIGJlZW4gZXhoYXVzdGVkIGFmdGVyIFwiICsgKERhdGUubm93KCkgLSByZWNvbm5lY3RTdGFydFRpbWUpICsgXCIgbXMgYW5kIFwiICsgcHJldmlvdXNSZWNvbm5lY3RBdHRlbXB0cyArIFwiIGZhaWxlZCBhdHRlbXB0cy4gQ29ubmVjdGlvbiBkaXNjb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TmV4dFJldHJ5RGVsYXkgPSBmdW5jdGlvbiAocHJldmlvdXNSZXRyeUNvdW50LCBlbGFwc2VkTWlsbGlzZWNvbmRzLCByZXRyeVJlYXNvbikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlY29ubmVjdFBvbGljeS5uZXh0UmV0cnlEZWxheUluTWlsbGlzZWNvbmRzKHtcclxuICAgICAgICAgICAgICAgIGVsYXBzZWRNaWxsaXNlY29uZHM6IGVsYXBzZWRNaWxsaXNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1JldHJ5Q291bnQ6IHByZXZpb3VzUmV0cnlDb3VudCxcclxuICAgICAgICAgICAgICAgIHJldHJ5UmVhc29uOiByZXRyeVJlYXNvbixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCJJUmV0cnlQb2xpY3kubmV4dFJldHJ5RGVsYXlJbk1pbGxpc2Vjb25kcyhcIiArIHByZXZpb3VzUmV0cnlDb3VudCArIFwiLCBcIiArIGVsYXBzZWRNaWxsaXNlY29uZHMgKyBcIikgdGhyZXcgZXJyb3IgJ1wiICsgZSArIFwiJy5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jYW5jZWxDYWxsYmFja3NXaXRoRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3M7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcclxuICAgICAgICBPYmplY3Qua2V5cyhjYWxsYmFja3MpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW2tleV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jbGVhbnVwUGluZ1RpbWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBpbmdTZXJ2ZXJIYW5kbGUpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1NlcnZlckhhbmRsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucGluZ1NlcnZlckhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xlYW51cFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZW91dEhhbmRsZSkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlSW52b2NhdGlvbiA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBhcmdzLCBub25ibG9ja2luZywgc3RyZWFtSWRzKSB7XHJcbiAgICAgICAgaWYgKG5vbmJsb2NraW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW1JZHMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1JZHM6IHN0cmVhbUlkcyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG1ldGhvZE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuSW52b2NhdGlvbixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3VtZW50czogYXJncyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG1ldGhvZE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuSW52b2NhdGlvbixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uSWQgPSB0aGlzLmludm9jYXRpb25JZDtcclxuICAgICAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQrKztcclxuICAgICAgICAgICAgaWYgKHN0cmVhbUlkcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb25JZDogaW52b2NhdGlvbklkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtSWRzOiBzdHJlYW1JZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkludm9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpbnZvY2F0aW9uSWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG1ldGhvZE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuSW52b2NhdGlvbixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUubGF1bmNoU3RyZWFtcyA9IGZ1bmN0aW9uIChzdHJlYW1zLCBwcm9taXNlUXVldWUpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzdHJlYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN5bmNocm9uaXplIHN0cmVhbSBkYXRhIHNvIHRoZXkgYXJyaXZlIGluLW9yZGVyIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICBpZiAoIXByb21pc2VRdWV1ZSkge1xyXG4gICAgICAgICAgICBwcm9taXNlUXVldWUgPSBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoc3RyZWFtSWQpIHtcclxuICAgICAgICAgICAgc3RyZWFtc1tzdHJlYW1JZF0uc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChfdGhpcy5jcmVhdGVDb21wbGV0aW9uTWVzc2FnZShzdHJlYW1JZCkpOyB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVyciAmJiBlcnIudG9TdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVyci50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiVW5rbm93biBlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlUXVldWUgPSBwcm9taXNlUXVldWUudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zZW5kV2l0aFByb3RvY29sKF90aGlzLmNyZWF0ZUNvbXBsZXRpb25NZXNzYWdlKHN0cmVhbUlkLCBtZXNzYWdlKSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVF1ZXVlID0gcHJvbWlzZVF1ZXVlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc2VuZFdpdGhQcm90b2NvbChfdGhpcy5jcmVhdGVTdHJlYW1JdGVtTWVzc2FnZShzdHJlYW1JZCwgaXRlbSkpOyB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gV2Ugd2FudCB0byBpdGVyYXRlIG92ZXIgdGhlIGtleXMsIHNpbmNlIHRoZSBrZXlzIGFyZSB0aGUgc3RyZWFtIGlkc1xyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxyXG4gICAgICAgIGZvciAodmFyIHN0cmVhbUlkIGluIHN0cmVhbXMpIHtcclxuICAgICAgICAgICAgX2xvb3BfMShzdHJlYW1JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb24ucHJvdG90eXBlLnJlcGxhY2VTdHJlYW1pbmdQYXJhbXMgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHZhciBzdHJlYW1zID0gW107XHJcbiAgICAgICAgdmFyIHN0cmVhbUlkcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYXJndW1lbnQgPSBhcmdzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc09ic2VydmFibGUoYXJndW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyZWFtSWQgPSB0aGlzLmludm9jYXRpb25JZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW52b2NhdGlvbklkKys7XHJcbiAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgc3RyZWFtIGZvciBsYXRlciB1c2VcclxuICAgICAgICAgICAgICAgIHN0cmVhbXNbc3RyZWFtSWRdID0gYXJndW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW1JZHMucHVzaChzdHJlYW1JZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzdHJlYW0gZnJvbSBhcmdzXHJcbiAgICAgICAgICAgICAgICBhcmdzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3N0cmVhbXMsIHN0cmVhbUlkc107XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuaXNPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGFyZykge1xyXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIG90aGVyIHN0cmVhbSBpbXBsZW1lbnRhdGlvbnMgdG8ganVzdCB3b3JrIChsaWtlIHJ4anMpXHJcbiAgICAgICAgcmV0dXJuIGFyZyAmJiBhcmcuc3Vic2NyaWJlICYmIHR5cGVvZiBhcmcuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCI7XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlU3RyZWFtSW52b2NhdGlvbiA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBhcmdzLCBzdHJlYW1JZHMpIHtcclxuICAgICAgICB2YXIgaW52b2NhdGlvbklkID0gdGhpcy5pbnZvY2F0aW9uSWQ7XHJcbiAgICAgICAgdGhpcy5pbnZvY2F0aW9uSWQrKztcclxuICAgICAgICBpZiAoc3RyZWFtSWRzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgYXJndW1lbnRzOiBhcmdzLFxyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpbnZvY2F0aW9uSWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHN0cmVhbUlkczogc3RyZWFtSWRzLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuU3RyZWFtSW52b2NhdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhcmd1bWVudHM6IGFyZ3MsXHJcbiAgICAgICAgICAgICAgICBpbnZvY2F0aW9uSWQ6IGludm9jYXRpb25JZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBtZXRob2ROYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogTWVzc2FnZVR5cGUuU3RyZWFtSW52b2NhdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSHViQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQ2FuY2VsSW52b2NhdGlvbiA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkNhbmNlbEludm9jYXRpb24sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVTdHJlYW1JdGVtTWVzc2FnZSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXHJcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXHJcbiAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLlN0cmVhbUl0ZW0sXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVDb21wbGV0aW9uTWVzc2FnZSA9IGZ1bmN0aW9uIChpZCwgZXJyb3IsIHJlc3VsdCkge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbklkOiBpZCxcclxuICAgICAgICAgICAgICAgIHR5cGU6IE1lc3NhZ2VUeXBlLkNvbXBsZXRpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGludm9jYXRpb25JZDogaWQsXHJcbiAgICAgICAgICAgIHJlc3VsdDogcmVzdWx0LFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNzYWdlVHlwZS5Db21wbGV0aW9uLFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh1YkNvbm5lY3Rpb247XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEh1YkNvbm5lY3Rpb24gfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SHViQ29ubmVjdGlvbi5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbmltcG9ydCB7IERlZmF1bHRSZWNvbm5lY3RQb2xpY3kgfSBmcm9tIFwiLi9EZWZhdWx0UmVjb25uZWN0UG9saWN5XCI7XHJcbmltcG9ydCB7IEh0dHBDb25uZWN0aW9uIH0gZnJvbSBcIi4vSHR0cENvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgSHViQ29ubmVjdGlvbiB9IGZyb20gXCIuL0h1YkNvbm5lY3Rpb25cIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25IdWJQcm90b2NvbCB9IGZyb20gXCIuL0pzb25IdWJQcm90b2NvbFwiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyIH0gZnJvbSBcIi4vTG9nZ2Vyc1wiO1xyXG5pbXBvcnQgeyBBcmcsIENvbnNvbGVMb2dnZXIgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZTpvYmplY3QtbGl0ZXJhbC1zb3J0LWtleXNcclxudmFyIExvZ0xldmVsTmFtZU1hcHBpbmcgPSB7XHJcbiAgICB0cmFjZTogTG9nTGV2ZWwuVHJhY2UsXHJcbiAgICBkZWJ1ZzogTG9nTGV2ZWwuRGVidWcsXHJcbiAgICBpbmZvOiBMb2dMZXZlbC5JbmZvcm1hdGlvbixcclxuICAgIGluZm9ybWF0aW9uOiBMb2dMZXZlbC5JbmZvcm1hdGlvbixcclxuICAgIHdhcm46IExvZ0xldmVsLldhcm5pbmcsXHJcbiAgICB3YXJuaW5nOiBMb2dMZXZlbC5XYXJuaW5nLFxyXG4gICAgZXJyb3I6IExvZ0xldmVsLkVycm9yLFxyXG4gICAgY3JpdGljYWw6IExvZ0xldmVsLkNyaXRpY2FsLFxyXG4gICAgbm9uZTogTG9nTGV2ZWwuTm9uZSxcclxufTtcclxuZnVuY3Rpb24gcGFyc2VMb2dMZXZlbChuYW1lKSB7XHJcbiAgICAvLyBDYXNlLWluc2Vuc2l0aXZlIG1hdGNoaW5nIHZpYSBsb3dlci1jYXNpbmdcclxuICAgIC8vIFllcywgSSBrbm93IGNhc2UtZm9sZGluZyBpcyBhIGNvbXBsaWNhdGVkIHByb2JsZW0gaW4gVW5pY29kZSwgYnV0IHdlIG9ubHkgc3VwcG9ydFxyXG4gICAgLy8gdGhlIEFTQ0lJIHN0cmluZ3MgZGVmaW5lZCBpbiBMb2dMZXZlbE5hbWVNYXBwaW5nIGFueXdheSwgc28gaXQncyBmaW5lIC1hbnVyc2UuXHJcbiAgICB2YXIgbWFwcGluZyA9IExvZ0xldmVsTmFtZU1hcHBpbmdbbmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIGlmICh0eXBlb2YgbWFwcGluZyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHJldHVybiBtYXBwaW5nO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBsb2cgbGV2ZWw6IFwiICsgbmFtZSk7XHJcbiAgICB9XHJcbn1cclxuLyoqIEEgYnVpbGRlciBmb3IgY29uZmlndXJpbmcge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdWJDb25uZWN0aW9ufSBpbnN0YW5jZXMuICovXHJcbnZhciBIdWJDb25uZWN0aW9uQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEh1YkNvbm5lY3Rpb25CdWlsZGVyKCkge1xyXG4gICAgfVxyXG4gICAgSHViQ29ubmVjdGlvbkJ1aWxkZXIucHJvdG90eXBlLmNvbmZpZ3VyZUxvZ2dpbmcgPSBmdW5jdGlvbiAobG9nZ2luZykge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKGxvZ2dpbmcsIFwibG9nZ2luZ1wiKTtcclxuICAgICAgICBpZiAoaXNMb2dnZXIobG9nZ2luZykpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgbG9nZ2luZyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgbG9nTGV2ZWwgPSBwYXJzZUxvZ0xldmVsKGxvZ2dpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBDb25zb2xlTG9nZ2VyKGxvZ0xldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IENvbnNvbGVMb2dnZXIobG9nZ2luZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS53aXRoVXJsID0gZnVuY3Rpb24gKHVybCwgdHJhbnNwb3J0VHlwZU9yT3B0aW9ucykge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgQXJnLmlzTm90RW1wdHkodXJsLCBcInVybFwiKTtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICAvLyBGbG93LXR5cGluZyBrbm93cyB3aGVyZSBpdCdzIGF0LiBTaW5jZSBIdHRwVHJhbnNwb3J0VHlwZSBpcyBhIG51bWJlciBhbmQgSUh0dHBDb25uZWN0aW9uT3B0aW9ucyBpcyBndWFyYW50ZWVkXHJcbiAgICAgICAgLy8gdG8gYmUgYW4gb2JqZWN0LCB3ZSBrbm93IChhcyBkb2VzIFR5cGVTY3JpcHQpIHRoaXMgY29tcGFyaXNvbiBpcyBhbGwgd2UgbmVlZCB0byBmaWd1cmUgb3V0IHdoaWNoIG92ZXJsb2FkIHdhcyBjYWxsZWQuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0cmFuc3BvcnRUeXBlT3JPcHRpb25zID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB0cmFuc3BvcnRUeXBlT3JPcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zLCB7IHRyYW5zcG9ydDogdHJhbnNwb3J0VHlwZU9yT3B0aW9ucyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgLyoqIENvbmZpZ3VyZXMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gdG8gdXNlIHRoZSBzcGVjaWZpZWQgSHViIFByb3RvY29sLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SUh1YlByb3RvY29sfSBwcm90b2NvbCBUaGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JSHViUHJvdG9jb2x9IGltcGxlbWVudGF0aW9uIHRvIHVzZS5cclxuICAgICAqL1xyXG4gICAgSHViQ29ubmVjdGlvbkJ1aWxkZXIucHJvdG90eXBlLndpdGhIdWJQcm90b2NvbCA9IGZ1bmN0aW9uIChwcm90b2NvbCkge1xyXG4gICAgICAgIEFyZy5pc1JlcXVpcmVkKHByb3RvY29sLCBcInByb3RvY29sXCIpO1xyXG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBwcm90b2NvbDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBIdWJDb25uZWN0aW9uQnVpbGRlci5wcm90b3R5cGUud2l0aEF1dG9tYXRpY1JlY29ubmVjdCA9IGZ1bmN0aW9uIChyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkEgcmVjb25uZWN0UG9saWN5IGhhcyBhbHJlYWR5IGJlZW4gc2V0LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0UG9saWN5ID0gbmV3IERlZmF1bHRSZWNvbm5lY3RQb2xpY3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5KSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdFBvbGljeSA9IG5ldyBEZWZhdWx0UmVjb25uZWN0UG9saWN5KHJldHJ5RGVsYXlzT3JSZWNvbm5lY3RQb2xpY3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RQb2xpY3kgPSByZXRyeURlbGF5c09yUmVjb25uZWN0UG9saWN5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICAvKiogQ3JlYXRlcyBhIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0gZnJvbSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHNwZWNpZmllZCBpbiB0aGlzIGJ1aWxkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge0h1YkNvbm5lY3Rpb259IFRoZSBjb25maWd1cmVkIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViQ29ubmVjdGlvbn0uXHJcbiAgICAgKi9cclxuICAgIEh1YkNvbm5lY3Rpb25CdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBJZiBodHRwQ29ubmVjdGlvbk9wdGlvbnMgaGFzIGEgbG9nZ2VyLCB1c2UgaXQuIE90aGVyd2lzZSwgb3ZlcnJpZGUgaXQgd2l0aCB0aGUgb25lXHJcbiAgICAgICAgLy8gcHJvdmlkZWQgdG8gY29uZmlndXJlTG9nZ2VyXHJcbiAgICAgICAgdmFyIGh0dHBDb25uZWN0aW9uT3B0aW9ucyA9IHRoaXMuaHR0cENvbm5lY3Rpb25PcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIC8vIElmIGl0J3MgJ251bGwnLCB0aGUgdXNlciAqKmV4cGxpY2l0bHkqKiBhc2tlZCBmb3IgbnVsbCwgZG9uJ3QgbWVzcyB3aXRoIGl0LlxyXG4gICAgICAgIGlmIChodHRwQ29ubmVjdGlvbk9wdGlvbnMubG9nZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gSWYgb3VyIGxvZ2dlciBpcyB1bmRlZmluZWQgb3IgbnVsbCwgdGhhdCdzIE9LLCB0aGUgSHR0cENvbm5lY3Rpb24gY29uc3RydWN0b3Igd2lsbCBoYW5kbGUgaXQuXHJcbiAgICAgICAgICAgIGh0dHBDb25uZWN0aW9uT3B0aW9ucy5sb2dnZXIgPSB0aGlzLmxvZ2dlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTm93IGNyZWF0ZSB0aGUgY29ubmVjdGlvblxyXG4gICAgICAgIGlmICghdGhpcy51cmwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdIdWJDb25uZWN0aW9uQnVpbGRlci53aXRoVXJsJyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGJ1aWxkaW5nIHRoZSBjb25uZWN0aW9uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgSHR0cENvbm5lY3Rpb24odGhpcy51cmwsIGh0dHBDb25uZWN0aW9uT3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIEh1YkNvbm5lY3Rpb24uY3JlYXRlKGNvbm5lY3Rpb24sIHRoaXMubG9nZ2VyIHx8IE51bGxMb2dnZXIuaW5zdGFuY2UsIHRoaXMucHJvdG9jb2wgfHwgbmV3IEpzb25IdWJQcm90b2NvbCgpLCB0aGlzLnJlY29ubmVjdFBvbGljeSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEh1YkNvbm5lY3Rpb25CdWlsZGVyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uQnVpbGRlciB9O1xyXG5mdW5jdGlvbiBpc0xvZ2dlcihsb2dnZXIpIHtcclxuICAgIHJldHVybiBsb2dnZXIubG9nICE9PSB1bmRlZmluZWQ7XHJcbn1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SHViQ29ubmVjdGlvbkJ1aWxkZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vKiogRGVmaW5lcyB0aGUgdHlwZSBvZiBhIEh1YiBNZXNzYWdlLiAqL1xyXG5leHBvcnQgdmFyIE1lc3NhZ2VUeXBlO1xyXG4oZnVuY3Rpb24gKE1lc3NhZ2VUeXBlKSB7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGFuIEludm9jYXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5JbnZvY2F0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xyXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJJbnZvY2F0aW9uXCJdID0gMV0gPSBcIkludm9jYXRpb25cIjtcclxuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBTdHJlYW1JdGVtIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuU3RyZWFtSXRlbU1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiU3RyZWFtSXRlbVwiXSA9IDJdID0gXCJTdHJlYW1JdGVtXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ29tcGxldGlvbiBtZXNzYWdlIGFuZCBpbXBsZW1lbnRzIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLkNvbXBsZXRpb25NZXNzYWdlfSBpbnRlcmZhY2UuICovXHJcbiAgICBNZXNzYWdlVHlwZVtNZXNzYWdlVHlwZVtcIkNvbXBsZXRpb25cIl0gPSAzXSA9IFwiQ29tcGxldGlvblwiO1xyXG4gICAgLyoqIEluZGljYXRlcyB0aGUgbWVzc2FnZSBpcyBhIFN0cmVhbSBJbnZvY2F0aW9uIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuU3RyZWFtSW52b2NhdGlvbk1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiU3RyZWFtSW52b2NhdGlvblwiXSA9IDRdID0gXCJTdHJlYW1JbnZvY2F0aW9uXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ2FuY2VsIEludm9jYXRpb24gbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5DYW5jZWxJbnZvY2F0aW9uTWVzc2FnZX0gaW50ZXJmYWNlLiAqL1xyXG4gICAgTWVzc2FnZVR5cGVbTWVzc2FnZVR5cGVbXCJDYW5jZWxJbnZvY2F0aW9uXCJdID0gNV0gPSBcIkNhbmNlbEludm9jYXRpb25cIjtcclxuICAgIC8qKiBJbmRpY2F0ZXMgdGhlIG1lc3NhZ2UgaXMgYSBQaW5nIG1lc3NhZ2UgYW5kIGltcGxlbWVudHMgdGhlIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuUGluZ01lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiUGluZ1wiXSA9IDZdID0gXCJQaW5nXCI7XHJcbiAgICAvKiogSW5kaWNhdGVzIHRoZSBtZXNzYWdlIGlzIGEgQ2xvc2UgbWVzc2FnZSBhbmQgaW1wbGVtZW50cyB0aGUge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5DbG9zZU1lc3NhZ2V9IGludGVyZmFjZS4gKi9cclxuICAgIE1lc3NhZ2VUeXBlW01lc3NhZ2VUeXBlW1wiQ2xvc2VcIl0gPSA3XSA9IFwiQ2xvc2VcIjtcclxufSkoTWVzc2FnZVR5cGUgfHwgKE1lc3NhZ2VUeXBlID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SUh1YlByb3RvY29sLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuLy8gVGhlc2UgdmFsdWVzIGFyZSBkZXNpZ25lZCB0byBtYXRjaCB0aGUgQVNQLk5FVCBMb2cgTGV2ZWxzIHNpbmNlIHRoYXQncyB0aGUgcGF0dGVybiB3ZSdyZSBlbXVsYXRpbmcgaGVyZS5cclxuLyoqIEluZGljYXRlcyB0aGUgc2V2ZXJpdHkgb2YgYSBsb2cgbWVzc2FnZS5cclxuICpcclxuICogTG9nIExldmVscyBhcmUgb3JkZXJlZCBpbiBpbmNyZWFzaW5nIHNldmVyaXR5LiBTbyBgRGVidWdgIGlzIG1vcmUgc2V2ZXJlIHRoYW4gYFRyYWNlYCwgZXRjLlxyXG4gKi9cclxuZXhwb3J0IHZhciBMb2dMZXZlbDtcclxuKGZ1bmN0aW9uIChMb2dMZXZlbCkge1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgdmVyeSBsb3cgc2V2ZXJpdHkgZGlhZ25vc3RpYyBtZXNzYWdlcy4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiVHJhY2VcIl0gPSAwXSA9IFwiVHJhY2VcIjtcclxuICAgIC8qKiBMb2cgbGV2ZWwgZm9yIGxvdyBzZXZlcml0eSBkaWFnbm9zdGljIG1lc3NhZ2VzLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJEZWJ1Z1wiXSA9IDFdID0gXCJEZWJ1Z1wiO1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgaW5mb3JtYXRpb25hbCBkaWFnbm9zdGljIG1lc3NhZ2VzLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJJbmZvcm1hdGlvblwiXSA9IDJdID0gXCJJbmZvcm1hdGlvblwiO1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgbm9uLWZhdGFsIHByb2JsZW0uICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIldhcm5pbmdcIl0gPSAzXSA9IFwiV2FybmluZ1wiO1xyXG4gICAgLyoqIExvZyBsZXZlbCBmb3IgZGlhZ25vc3RpYyBtZXNzYWdlcyB0aGF0IGluZGljYXRlIGEgZmFpbHVyZSBpbiB0aGUgY3VycmVudCBvcGVyYXRpb24uICovXHJcbiAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIkVycm9yXCJdID0gNF0gPSBcIkVycm9yXCI7XHJcbiAgICAvKiogTG9nIGxldmVsIGZvciBkaWFnbm9zdGljIG1lc3NhZ2VzIHRoYXQgaW5kaWNhdGUgYSBmYWlsdXJlIHRoYXQgd2lsbCB0ZXJtaW5hdGUgdGhlIGVudGlyZSBhcHBsaWNhdGlvbi4gKi9cclxuICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiQ3JpdGljYWxcIl0gPSA1XSA9IFwiQ3JpdGljYWxcIjtcclxuICAgIC8qKiBUaGUgaGlnaGVzdCBwb3NzaWJsZSBsb2cgbGV2ZWwuIFVzZWQgd2hlbiBjb25maWd1cmluZyBsb2dnaW5nIHRvIGluZGljYXRlIHRoYXQgbm8gbG9nIG1lc3NhZ2VzIHNob3VsZCBiZSBlbWl0dGVkLiAqL1xyXG4gICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJOb25lXCJdID0gNl0gPSBcIk5vbmVcIjtcclxufSkoTG9nTGV2ZWwgfHwgKExvZ0xldmVsID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SUxvZ2dlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbi8vIFRoaXMgd2lsbCBiZSB0cmVhdGVkIGFzIGEgYml0IGZsYWcgaW4gdGhlIGZ1dHVyZSwgc28gd2Uga2VlcCBpdCB1c2luZyBwb3dlci1vZi10d28gdmFsdWVzLlxyXG4vKiogU3BlY2lmaWVzIGEgc3BlY2lmaWMgSFRUUCB0cmFuc3BvcnQgdHlwZS4gKi9cclxuZXhwb3J0IHZhciBIdHRwVHJhbnNwb3J0VHlwZTtcclxuKGZ1bmN0aW9uIChIdHRwVHJhbnNwb3J0VHlwZSkge1xyXG4gICAgLyoqIFNwZWNpZmllcyBubyB0cmFuc3BvcnQgcHJlZmVyZW5jZS4gKi9cclxuICAgIEh0dHBUcmFuc3BvcnRUeXBlW0h0dHBUcmFuc3BvcnRUeXBlW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XHJcbiAgICAvKiogU3BlY2lmaWVzIHRoZSBXZWJTb2NrZXRzIHRyYW5zcG9ydC4gKi9cclxuICAgIEh0dHBUcmFuc3BvcnRUeXBlW0h0dHBUcmFuc3BvcnRUeXBlW1wiV2ViU29ja2V0c1wiXSA9IDFdID0gXCJXZWJTb2NrZXRzXCI7XHJcbiAgICAvKiogU3BlY2lmaWVzIHRoZSBTZXJ2ZXItU2VudCBFdmVudHMgdHJhbnNwb3J0LiAqL1xyXG4gICAgSHR0cFRyYW5zcG9ydFR5cGVbSHR0cFRyYW5zcG9ydFR5cGVbXCJTZXJ2ZXJTZW50RXZlbnRzXCJdID0gMl0gPSBcIlNlcnZlclNlbnRFdmVudHNcIjtcclxuICAgIC8qKiBTcGVjaWZpZXMgdGhlIExvbmcgUG9sbGluZyB0cmFuc3BvcnQuICovXHJcbiAgICBIdHRwVHJhbnNwb3J0VHlwZVtIdHRwVHJhbnNwb3J0VHlwZVtcIkxvbmdQb2xsaW5nXCJdID0gNF0gPSBcIkxvbmdQb2xsaW5nXCI7XHJcbn0pKEh0dHBUcmFuc3BvcnRUeXBlIHx8IChIdHRwVHJhbnNwb3J0VHlwZSA9IHt9KSk7XHJcbi8qKiBTcGVjaWZpZXMgdGhlIHRyYW5zZmVyIGZvcm1hdCBmb3IgYSBjb25uZWN0aW9uLiAqL1xyXG5leHBvcnQgdmFyIFRyYW5zZmVyRm9ybWF0O1xyXG4oZnVuY3Rpb24gKFRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAvKiogU3BlY2lmaWVzIHRoYXQgb25seSB0ZXh0IGRhdGEgd2lsbCBiZSB0cmFuc21pdHRlZCBvdmVyIHRoZSBjb25uZWN0aW9uLiAqL1xyXG4gICAgVHJhbnNmZXJGb3JtYXRbVHJhbnNmZXJGb3JtYXRbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcclxuICAgIC8qKiBTcGVjaWZpZXMgdGhhdCBiaW5hcnkgZGF0YSB3aWxsIGJlIHRyYW5zbWl0dGVkIG92ZXIgdGhlIGNvbm5lY3Rpb24uICovXHJcbiAgICBUcmFuc2ZlckZvcm1hdFtUcmFuc2ZlckZvcm1hdFtcIkJpbmFyeVwiXSA9IDJdID0gXCJCaW5hcnlcIjtcclxufSkoVHJhbnNmZXJGb3JtYXQgfHwgKFRyYW5zZmVyRm9ybWF0ID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SVRyYW5zcG9ydC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcIi4vSUh1YlByb3RvY29sXCI7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG5pbXBvcnQgeyBUcmFuc2ZlckZvcm1hdCB9IGZyb20gXCIuL0lUcmFuc3BvcnRcIjtcclxuaW1wb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuaW1wb3J0IHsgVGV4dE1lc3NhZ2VGb3JtYXQgfSBmcm9tIFwiLi9UZXh0TWVzc2FnZUZvcm1hdFwiO1xyXG52YXIgSlNPTl9IVUJfUFJPVE9DT0xfTkFNRSA9IFwianNvblwiO1xyXG4vKiogSW1wbGVtZW50cyB0aGUgSlNPTiBIdWIgUHJvdG9jb2wuICovXHJcbnZhciBKc29uSHViUHJvdG9jb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBKc29uSHViUHJvdG9jb2woKSB7XHJcbiAgICAgICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICAgICAgdGhpcy5uYW1lID0gSlNPTl9IVUJfUFJPVE9DT0xfTkFNRTtcclxuICAgICAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgICAgICB0aGlzLnZlcnNpb24gPSAxO1xyXG4gICAgICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgICAgIHRoaXMudHJhbnNmZXJGb3JtYXQgPSBUcmFuc2ZlckZvcm1hdC5UZXh0O1xyXG4gICAgfVxyXG4gICAgLyoqIENyZWF0ZXMgYW4gYXJyYXkgb2Yge0BsaW5rIEBtaWNyb3NvZnQvc2lnbmFsci5IdWJNZXNzYWdlfSBvYmplY3RzIGZyb20gdGhlIHNwZWNpZmllZCBzZXJpYWxpemVkIHJlcHJlc2VudGF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCBBIHN0cmluZyBjb250YWluaW5nIHRoZSBzZXJpYWxpemVkIHJlcHJlc2VudGF0aW9uLlxyXG4gICAgICogQHBhcmFtIHtJTG9nZ2VyfSBsb2dnZXIgQSBsb2dnZXIgdGhhdCB3aWxsIGJlIHVzZWQgdG8gbG9nIG1lc3NhZ2VzIHRoYXQgb2NjdXIgZHVyaW5nIHBhcnNpbmcuXHJcbiAgICAgKi9cclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUucGFyc2VNZXNzYWdlcyA9IGZ1bmN0aW9uIChpbnB1dCwgbG9nZ2VyKSB7XHJcbiAgICAgICAgLy8gVGhlIGludGVyZmFjZSBkb2VzIGFsbG93IFwiQXJyYXlCdWZmZXJcIiB0byBiZSBwYXNzZWQgaW4sIGJ1dCB0aGlzIGltcGxlbWVudGF0aW9uIGRvZXMgbm90LiBTbyBsZXQncyB0aHJvdyBhIHVzZWZ1bCBlcnJvci5cclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgZm9yIEpTT04gaHViIHByb3RvY29sLiBFeHBlY3RlZCBhIHN0cmluZy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9nZ2VyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxvZ2dlciA9IE51bGxMb2dnZXIuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFBhcnNlIHRoZSBtZXNzYWdlc1xyXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IFRleHRNZXNzYWdlRm9ybWF0LnBhcnNlKGlucHV0KTtcclxuICAgICAgICB2YXIgaHViTWVzc2FnZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG1lc3NhZ2VzXzEgPSBtZXNzYWdlczsgX2kgPCBtZXNzYWdlc18xLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzXzFbX2ldO1xyXG4gICAgICAgICAgICB2YXIgcGFyc2VkTWVzc2FnZSA9IEpTT04ucGFyc2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkTWVzc2FnZS50eXBlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBheWxvYWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGFyc2VkTWVzc2FnZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkludm9jYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ludm9jYXRpb25NZXNzYWdlKHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlVHlwZS5TdHJlYW1JdGVtOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTdHJlYW1JdGVtTWVzc2FnZShwYXJzZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVR5cGUuQ29tcGxldGlvbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQ29tcGxldGlvbk1lc3NhZ2UocGFyc2VkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLlBpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luZ2xlIHZhbHVlLCBubyBuZWVkIHRvIHZhbGlkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNsb3NlOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFsbCBvcHRpb25hbCB2YWx1ZXMsIG5vIG5lZWQgdG8gdmFsaWRhdGVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRnV0dXJlIHByb3RvY29sIGNoYW5nZXMgY2FuIGFkZCBtZXNzYWdlIHR5cGVzLCBvbGQgY2xpZW50cyBjYW4gaWdub3JlIHRoZW1cclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKExvZ0xldmVsLkluZm9ybWF0aW9uLCBcIlVua25vd24gbWVzc2FnZSB0eXBlICdcIiArIHBhcnNlZE1lc3NhZ2UudHlwZSArIFwiJyBpZ25vcmVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBodWJNZXNzYWdlcy5wdXNoKHBhcnNlZE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHViTWVzc2FnZXM7XHJcbiAgICB9O1xyXG4gICAgLyoqIFdyaXRlcyB0aGUgc3BlY2lmaWVkIHtAbGluayBAbWljcm9zb2Z0L3NpZ25hbHIuSHViTWVzc2FnZX0gdG8gYSBzdHJpbmcgYW5kIHJldHVybnMgaXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtIdWJNZXNzYWdlfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIHdyaXRlLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmcgY29udGFpbmluZyB0aGUgc2VyaWFsaXplZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS53cml0ZU1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiBUZXh0TWVzc2FnZUZvcm1hdC53cml0ZShKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICB9O1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5pc0ludm9jYXRpb25NZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UudGFyZ2V0LCBcIkludmFsaWQgcGF5bG9hZCBmb3IgSW52b2NhdGlvbiBtZXNzYWdlLlwiKTtcclxuICAgICAgICBpZiAobWVzc2FnZS5pbnZvY2F0aW9uSWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuaW52b2NhdGlvbklkLCBcIkludmFsaWQgcGF5bG9hZCBmb3IgSW52b2NhdGlvbiBtZXNzYWdlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgSnNvbkh1YlByb3RvY29sLnByb3RvdHlwZS5pc1N0cmVhbUl0ZW1NZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLmFzc2VydE5vdEVtcHR5U3RyaW5nKG1lc3NhZ2UuaW52b2NhdGlvbklkLCBcIkludmFsaWQgcGF5bG9hZCBmb3IgU3RyZWFtSXRlbSBtZXNzYWdlLlwiKTtcclxuICAgICAgICBpZiAobWVzc2FnZS5pdGVtID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXlsb2FkIGZvciBTdHJlYW1JdGVtIG1lc3NhZ2UuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBKc29uSHViUHJvdG9jb2wucHJvdG90eXBlLmlzQ29tcGxldGlvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlLnJlc3VsdCAmJiBtZXNzYWdlLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGF5bG9hZCBmb3IgQ29tcGxldGlvbiBtZXNzYWdlLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLnJlc3VsdCAmJiBtZXNzYWdlLmVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5lcnJvciwgXCJJbnZhbGlkIHBheWxvYWQgZm9yIENvbXBsZXRpb24gbWVzc2FnZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RW1wdHlTdHJpbmcobWVzc2FnZS5pbnZvY2F0aW9uSWQsIFwiSW52YWxpZCBwYXlsb2FkIGZvciBDb21wbGV0aW9uIG1lc3NhZ2UuXCIpO1xyXG4gICAgfTtcclxuICAgIEpzb25IdWJQcm90b2NvbC5wcm90b3R5cGUuYXNzZXJ0Tm90RW1wdHlTdHJpbmcgPSBmdW5jdGlvbiAodmFsdWUsIGVycm9yTWVzc2FnZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIgfHwgdmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBKc29uSHViUHJvdG9jb2w7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEpzb25IdWJQcm90b2NvbCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Kc29uSHViUHJvdG9jb2wuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vKiogQSBsb2dnZXIgdGhhdCBkb2VzIG5vdGhpbmcgd2hlbiBsb2cgbWVzc2FnZXMgYXJlIHNlbnQgdG8gaXQuICovXHJcbnZhciBOdWxsTG9nZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTnVsbExvZ2dlcigpIHtcclxuICAgIH1cclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICBOdWxsTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAoX2xvZ0xldmVsLCBfbWVzc2FnZSkge1xyXG4gICAgfTtcclxuICAgIC8qKiBUaGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgQG1pY3Jvc29mdC9zaWduYWxyLk51bGxMb2dnZXJ9LiAqL1xyXG4gICAgTnVsbExvZ2dlci5pbnN0YW5jZSA9IG5ldyBOdWxsTG9nZ2VyKCk7XHJcbiAgICByZXR1cm4gTnVsbExvZ2dlcjtcclxufSgpKTtcclxuZXhwb3J0IHsgTnVsbExvZ2dlciB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Mb2dnZXJzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBBYm9ydENvbnRyb2xsZXIgfSBmcm9tIFwiLi9BYm9ydENvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgSHR0cEVycm9yLCBUaW1lb3V0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGdldERhdGFEZXRhaWwsIGdldFVzZXJBZ2VudEhlYWRlciwgc2VuZE1lc3NhZ2UgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyBOb3QgZXhwb3J0ZWQgZnJvbSAnaW5kZXgnLCB0aGlzIHR5cGUgaXMgaW50ZXJuYWwuXHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgTG9uZ1BvbGxpbmdUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMb25nUG9sbGluZ1RyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgaGVhZGVycykge1xyXG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5wb2xsQWJvcnQgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlQ29udGVudCA9IGxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzO1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbnJlY2VpdmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25jbG9zZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLCBcInBvbGxBYm9ydGVkXCIsIHtcclxuICAgICAgICAvLyBUaGlzIGlzIGFuIGludGVybmFsIHR5cGUsIG5vdCBleHBvcnRlZCBmcm9tICdpbmRleCcgc28gdGhpcyBpcyByZWFsbHkganVzdCBpbnRlcm5hbC5cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9sbEFib3J0LmFib3J0ZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBuYW1lLCB2YWx1ZSwgaGVhZGVycywgcG9sbE9wdGlvbnMsIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZTtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzUmVxdWlyZWQodXJsLCBcInVybFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzUmVxdWlyZWQodHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc0luKHRyYW5zZmVyRm9ybWF0LCBUcmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBDb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgYmluYXJ5IGZvcm1hdCBvbiBOb2RlIGFuZCBCcm93c2VycyB0aGF0IHN1cHBvcnQgYmluYXJ5IGNvbnRlbnQgKGluZGljYXRlZCBieSB0aGUgcHJlc2VuY2Ugb2YgcmVzcG9uc2VUeXBlIHByb3BlcnR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgbmV3IFhNTEh0dHBSZXF1ZXN0KCkucmVzcG9uc2VUeXBlICE9PSBcInN0cmluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmluYXJ5IHByb3RvY29scyBvdmVyIFhtbEh0dHBSZXF1ZXN0IG5vdCBpbXBsZW1lbnRpbmcgYWR2YW5jZWQgZmVhdHVyZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gZ2V0VXNlckFnZW50SGVhZGVyKCksIG5hbWUgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IF9fYXNzaWduKChfYSA9IHt9LCBfYVtuYW1lXSA9IHZhbHVlLCBfYSksIHRoaXMuaGVhZGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRTaWduYWw6IHRoaXMucG9sbEFib3J0LnNpZ25hbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9sbE9wdGlvbnMucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihwb2xsT3B0aW9ucywgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsVXJsID0gdXJsICsgXCImXz1cIiArIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBwb2xsaW5nOiBcIiArIHBvbGxVcmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5nZXQocG9sbFVybCwgcG9sbE9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Muc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuRXJyb3IsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgVW5leHBlY3RlZCByZXNwb25zZSBjb2RlOiBcIiArIHJlc3BvbnNlLnN0YXR1c0NvZGUgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIHJ1bm5pbmcgYXMgZmFsc2Ugc28gdGhhdCB0aGUgcG9sbCBpbW1lZGlhdGVseSBlbmRzIGFuZCBydW5zIHRoZSBjbG9zZSBsb2dpY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVycm9yID0gbmV3IEh0dHBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0IHx8IFwiXCIsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2aW5nID0gdGhpcy5wb2xsKHRoaXMudXJsLCBwb2xsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLmdldEFjY2Vzc1Rva2VuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS51cGRhdGVIZWFkZXJUb2tlbiA9IGZ1bmN0aW9uIChyZXF1ZXN0LCB0b2tlbikge1xyXG4gICAgICAgIGlmICghcmVxdWVzdC5oZWFkZXJzKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXHJcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBcIkJlYXJlciBcIiArIHRva2VuO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgIGlmIChyZXF1ZXN0LmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdKSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgICAgICBkZWxldGUgcmVxdWVzdC5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiAodXJsLCBwb2xsT3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuLCBwb2xsVXJsLCByZXNwb25zZSwgZV8xO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsICwgOCwgOV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucnVubmluZykgcmV0dXJuIFszIC8qYnJlYWsqLywgN107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihwb2xsT3B0aW9ucywgdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzMsIDUsICwgNl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xsVXJsID0gdXJsICsgXCImXz1cIiArIERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBwb2xsaW5nOiBcIiArIHBvbGxVcmwgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5nZXQocG9sbFVybCwgcG9sbE9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuSW5mb3JtYXRpb24sIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCB0ZXJtaW5hdGVkIGJ5IHNlcnZlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5FcnJvciwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBVbmV4cGVjdGVkIHJlc3BvbnNlIGNvZGU6IFwiICsgcmVzcG9uc2Uuc3RhdHVzQ29kZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgc3RhdHVzIGNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFcnJvciA9IG5ldyBIdHRwRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCB8fCBcIlwiLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChyZXNwb25zZS5jb250ZW50LCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbnJlY2VpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbnJlY2VpdmUocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbm90aGVyIHdheSB0aW1lb3V0IG1hbmlmZXN0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBQb2xsIHRpbWVkIG91dCwgcmVpc3N1aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMSA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZyBidXQgZGlzcmVnYXJkIGVycm9ycyB0aGF0IG9jY3VyIGFmdGVyIHN0b3BwaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgUG9sbCBlcnJvcmVkIGFmdGVyIHNodXRkb3duOiBcIiArIGVfMS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlXzEgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGltZW91dHMgYW5kIHJlaXNzdWUgdGhlIHBvbGwuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGwgdGltZWQgb3V0LCByZWlzc3VpbmcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2UgdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgZXJyb3IgYXMgdGhlIHJlc3VsdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRXJyb3IgPSBlXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzMgLypicmVhayovLCAxXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIFBvbGxpbmcgY29tcGxldGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSB3aWxsIHJlYWNoIGhlcmUgd2l0aCBwb2xsQWJvcnRlZD09ZmFsc2Ugd2hlbiB0aGUgc2VydmVyIHJldHVybmVkIGEgcmVzcG9uc2UgY2F1c2luZyB0aGUgdHJhbnNwb3J0IHRvIHN0b3AuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHBvbGxBYm9ydGVkPT10cnVlIHRoZW4gY2xpZW50IGluaXRpYXRlZCB0aGUgc3RvcCBhbmQgdGhlIHN0b3AgbWV0aG9kIHdpbGwgcmFpc2UgdGhlIGNsb3NlIGV2ZW50IGFmdGVyIERFTEVURSBpcyBzZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9sbEFib3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VPbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgTG9uZ1BvbGxpbmdUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgdW50aWwgdGhlIHRyYW5zcG9ydCBpcyBjb25uZWN0ZWRcIikpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzZW5kTWVzc2FnZSh0aGlzLmxvZ2dlciwgXCJMb25nUG9sbGluZ1wiLCB0aGlzLmh0dHBDbGllbnQsIHRoaXMudXJsLCB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSwgZGF0YSwgdGhpcy5sb2dNZXNzYWdlQ29udGVudCwgdGhpcy53aXRoQ3JlZGVudGlhbHMsIHRoaXMuaGVhZGVycyldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBMb25nUG9sbGluZ1RyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJzLCBfYSwgbmFtZV8xLCB2YWx1ZSwgZGVsZXRlT3B0aW9ucywgdG9rZW47XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBTdG9wcGluZyBwb2xsaW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGVsbCByZWNlaXZpbmcgbG9vcCB0byBzdG9wLCBhYm9ydCBhbnkgY3VycmVudCByZXF1ZXN0LCBhbmQgdGhlbiB3YWl0IGZvciBpdCB0byBmaW5pc2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9sbEFib3J0LmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnRyeXMucHVzaChbMSwgLCA1LCA2XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucmVjZWl2aW5nXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBERUxFVEUgdG8gY2xlYW4gdXAgbG9uZyBwb2xsaW5nIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIHNlbmRpbmcgREVMRVRFIHJlcXVlc3QgdG8gXCIgKyB0aGlzLnVybCArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgdGhpcy5oZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZ2V0QWNjZXNzVG9rZW4oKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJUb2tlbihkZWxldGVPcHRpb25zLCB0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuaHR0cENsaWVudC5kZWxldGUodGhpcy51cmwsIGRlbGV0ZU9wdGlvbnMpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihMb25nUG9sbGluZyB0cmFuc3BvcnQpIERFTEVURSByZXF1ZXN0IHNlbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA2XTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoTG9uZ1BvbGxpbmcgdHJhbnNwb3J0KSBTdG9wIGZpbmlzaGVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmFpc2UgY2xvc2UgZXZlbnQgaGVyZSBpbnN0ZWFkIG9mIGluIHBvbGxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXQgbmVlZHMgdG8gaGFwcGVuIGFmdGVyIHRoZSBERUxFVEUgcmVxdWVzdCBpcyBzZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFpc2VPbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIExvbmdQb2xsaW5nVHJhbnNwb3J0LnByb3RvdHlwZS5yYWlzZU9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xyXG4gICAgICAgICAgICB2YXIgbG9nTWVzc2FnZSA9IFwiKExvbmdQb2xsaW5nIHRyYW5zcG9ydCkgRmlyaW5nIG9uY2xvc2UgZXZlbnQuXCI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsb3NlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxvZ01lc3NhZ2UgKz0gXCIgRXJyb3I6IFwiICsgdGhpcy5jbG9zZUVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgbG9nTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25jbG9zZSh0aGlzLmNsb3NlRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gTG9uZ1BvbGxpbmdUcmFuc3BvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IExvbmdQb2xsaW5nVHJhbnNwb3J0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxvbmdQb2xsaW5nVHJhbnNwb3J0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxuaW1wb3J0IHsgVHJhbnNmZXJGb3JtYXQgfSBmcm9tIFwiLi9JVHJhbnNwb3J0XCI7XHJcbmltcG9ydCB7IEFyZywgZ2V0RGF0YURldGFpbCwgZ2V0VXNlckFnZW50SGVhZGVyLCBQbGF0Zm9ybSwgc2VuZE1lc3NhZ2UgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBTZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0KGh0dHBDbGllbnQsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgbG9nZ2VyLCBsb2dNZXNzYWdlQ29udGVudCwgZXZlbnRTb3VyY2VDb25zdHJ1Y3Rvciwgd2l0aENyZWRlbnRpYWxzLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gaHR0cENsaWVudDtcclxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSA9IGFjY2Vzc1Rva2VuRmFjdG9yeTtcclxuICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcclxuICAgICAgICB0aGlzLmxvZ01lc3NhZ2VDb250ZW50ID0gbG9nTWVzc2FnZUNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHM7XHJcbiAgICAgICAgdGhpcy5ldmVudFNvdXJjZUNvbnN0cnVjdG9yID0gZXZlbnRTb3VyY2VDb25zdHJ1Y3RvcjtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICh1cmwsIHRyYW5zZmVyRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG9rZW47XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHVybCwgXCJ1cmxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZy5pc1JlcXVpcmVkKHRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNJbih0cmFuc2ZlckZvcm1hdCwgVHJhbnNmZXJGb3JtYXQsIFwidHJhbnNmZXJGb3JtYXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoU1NFIHRyYW5zcG9ydCkgQ29ubmVjdGluZy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB1cmwgYmVmb3JlIGFjY2Vzc1Rva2VuRmFjdG9yeSBiZWNhdXNlIHRoaXMudXJsIGlzIG9ubHkgZm9yIHNlbmQgYW5kIHdlIHNldCB0aGUgYXV0aCBoZWFkZXIgaW5zdGVhZCBvZiB0aGUgcXVlcnkgc3RyaW5nIGZvciBzZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IF9hLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKFwiP1wiKSA8IDAgPyBcIj9cIiA6IFwiJlwiKSArIChcImFjY2Vzc190b2tlbj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgIT09IFRyYW5zZmVyRm9ybWF0LlRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGhlIFNlcnZlci1TZW50IEV2ZW50cyB0cmFuc3BvcnQgb25seSBzdXBwb3J0cyB0aGUgJ1RleHQnIHRyYW5zZmVyIGZvcm1hdFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50U291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBsYXRmb3JtLmlzQnJvd3NlciB8fCBQbGF0Zm9ybS5pc1dlYldvcmtlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlID0gbmV3IF90aGlzLmV2ZW50U291cmNlQ29uc3RydWN0b3IodXJsLCB7IHdpdGhDcmVkZW50aWFsczogX3RoaXMud2l0aENyZWRlbnRpYWxzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm9uLWJyb3dzZXIgcGFzc2VzIGNvb2tpZXMgdmlhIHRoZSBkaWN0aW9uYXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvb2tpZXMgPSBfdGhpcy5odHRwQ2xpZW50LmdldENvb2tpZVN0cmluZyh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycy5Db29raWUgPSBjb29raWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lXzEgPSBfYVswXSwgdmFsdWUgPSBfYVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzW25hbWVfMV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZSA9IG5ldyBfdGhpcy5ldmVudFNvdXJjZUNvbnN0cnVjdG9yKHVybCwgeyB3aXRoQ3JlZGVudGlhbHM6IF90aGlzLndpdGhDcmVkZW50aWFscywgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIF90aGlzLmhlYWRlcnMpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFNvdXJjZS5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFNTRSB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChlLmRhdGEsIF90aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUoZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZS5kYXRhIHx8IFwiRXJyb3Igb2NjdXJyZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJTU0UgY29ubmVjdGVkIHRvIFwiICsgX3RoaXMudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRTb3VyY2UgPSBldmVudFNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHNlbmQgdW50aWwgdGhlIHRyYW5zcG9ydCBpcyBjb25uZWN0ZWRcIikpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBzZW5kTWVzc2FnZSh0aGlzLmxvZ2dlciwgXCJTU0VcIiwgdGhpcy5odHRwQ2xpZW50LCB0aGlzLnVybCwgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnksIGRhdGEsIHRoaXMubG9nTWVzc2FnZUNvbnRlbnQsIHRoaXMud2l0aENyZWRlbnRpYWxzLCB0aGlzLmhlYWRlcnMpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIFNlcnZlclNlbnRFdmVudHNUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50U291cmNlLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTb3VyY2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uY2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydDtcclxufSgpKTtcclxuZXhwb3J0IHsgU2VydmVyU2VudEV2ZW50c1RyYW5zcG9ydCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZXJ2ZXJTZW50RXZlbnRzVHJhbnNwb3J0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgLk5FVCBGb3VuZGF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuaW1wb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbi8qKiBTdHJlYW0gaW1wbGVtZW50YXRpb24gdG8gc3RyZWFtIGl0ZW1zIHRvIHRoZSBzZXJ2ZXIuICovXHJcbnZhciBTdWJqZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3ViamVjdCgpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xyXG4gICAgfVxyXG4gICAgU3ViamVjdC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMub2JzZXJ2ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFN1YmplY3QucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLm9ic2VydmVyczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX2FbX2ldO1xyXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgU3ViamVjdC5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMub2JzZXJ2ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBTdWJqZWN0LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgb2JzZXJ2ZXIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTdWJqZWN0O1xyXG59KCkpO1xyXG5leHBvcnQgeyBTdWJqZWN0IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YmplY3QuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4vLyBOb3QgZXhwb3J0ZWQgZnJvbSBpbmRleFxyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFRleHRNZXNzYWdlRm9ybWF0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVGV4dE1lc3NhZ2VGb3JtYXQoKSB7XHJcbiAgICB9XHJcbiAgICBUZXh0TWVzc2FnZUZvcm1hdC53cml0ZSA9IGZ1bmN0aW9uIChvdXRwdXQpIHtcclxuICAgICAgICByZXR1cm4gXCJcIiArIG91dHB1dCArIFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcjtcclxuICAgIH07XHJcbiAgICBUZXh0TWVzc2FnZUZvcm1hdC5wYXJzZSA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIGlmIChpbnB1dFtpbnB1dC5sZW5ndGggLSAxXSAhPT0gVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1lc3NhZ2UgaXMgaW5jb21wbGV0ZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtZXNzYWdlcyA9IGlucHV0LnNwbGl0KFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvcik7XHJcbiAgICAgICAgbWVzc2FnZXMucG9wKCk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gICAgfTtcclxuICAgIFRleHRNZXNzYWdlRm9ybWF0LlJlY29yZFNlcGFyYXRvckNvZGUgPSAweDFlO1xyXG4gICAgVGV4dE1lc3NhZ2VGb3JtYXQuUmVjb3JkU2VwYXJhdG9yID0gU3RyaW5nLmZyb21DaGFyQ29kZShUZXh0TWVzc2FnZUZvcm1hdC5SZWNvcmRTZXBhcmF0b3JDb2RlKTtcclxuICAgIHJldHVybiBUZXh0TWVzc2FnZUZvcm1hdDtcclxufSgpKTtcclxuZXhwb3J0IHsgVGV4dE1lc3NhZ2VGb3JtYXQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGV4dE1lc3NhZ2VGb3JtYXQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSBcIi4vSUxvZ2dlclwiO1xyXG5pbXBvcnQgeyBOdWxsTG9nZ2VyIH0gZnJvbSBcIi4vTG9nZ2Vyc1wiO1xyXG4vLyBWZXJzaW9uIHRva2VuIHRoYXQgd2lsbCBiZSByZXBsYWNlZCBieSB0aGUgcHJlcGFjayBjb21tYW5kXHJcbi8qKiBUaGUgdmVyc2lvbiBvZiB0aGUgU2lnbmFsUiBjbGllbnQuICovXHJcbmV4cG9ydCB2YXIgVkVSU0lPTiA9IFwiNS4wLjEyXCI7XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG52YXIgQXJnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXJnKCkge1xyXG4gICAgfVxyXG4gICAgQXJnLmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1wiICsgbmFtZSArIFwiJyBhcmd1bWVudCBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc05vdEVtcHR5ID0gZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xyXG4gICAgICAgIGlmICghdmFsIHx8IHZhbC5tYXRjaCgvXlxccyokLykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlICdcIiArIG5hbWUgKyBcIicgYXJndW1lbnQgc2hvdWxkIG5vdCBiZSBlbXB0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIEFyZy5pc0luID0gZnVuY3Rpb24gKHZhbCwgdmFsdWVzLCBuYW1lKSB7XHJcbiAgICAgICAgLy8gVHlwZVNjcmlwdCBlbnVtcyBoYXZlIGtleXMgZm9yICoqYm90aCoqIHRoZSBuYW1lIGFuZCB0aGUgdmFsdWUgb2YgZWFjaCBlbnVtIG1lbWJlciBvbiB0aGUgdHlwZSBpdHNlbGYuXHJcbiAgICAgICAgaWYgKCEodmFsIGluIHZhbHVlcykpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBcIiArIG5hbWUgKyBcIiB2YWx1ZTogXCIgKyB2YWwgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBBcmc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEFyZyB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFBsYXRmb3JtID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUGxhdGZvcm0oKSB7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNCcm93c2VyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUGxhdGZvcm0sIFwiaXNXZWJXb3JrZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgXCJpbXBvcnRTY3JpcHRzXCIgaW4gc2VsZjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQbGF0Zm9ybSwgXCJpc05vZGVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNCcm93c2VyICYmICF0aGlzLmlzV2ViV29ya2VyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFBsYXRmb3JtO1xyXG59KCkpO1xyXG5leHBvcnQgeyBQbGF0Zm9ybSB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERhdGFEZXRhaWwoZGF0YSwgaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgIHZhciBkZXRhaWwgPSBcIlwiO1xyXG4gICAgaWYgKGlzQXJyYXlCdWZmZXIoZGF0YSkpIHtcclxuICAgICAgICBkZXRhaWwgPSBcIkJpbmFyeSBkYXRhIG9mIGxlbmd0aCBcIiArIGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBmb3JtYXRBcnJheUJ1ZmZlcihkYXRhKSArIFwiJ1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgZGV0YWlsID0gXCJTdHJpbmcgZGF0YSBvZiBsZW5ndGggXCIgKyBkYXRhLmxlbmd0aDtcclxuICAgICAgICBpZiAoaW5jbHVkZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgZGV0YWlsICs9IFwiLiBDb250ZW50OiAnXCIgKyBkYXRhICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRldGFpbDtcclxufVxyXG4vKiogQHByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdEFycmF5QnVmZmVyKGRhdGEpIHtcclxuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAvLyBVaW50OEFycmF5Lm1hcCBvbmx5IHN1cHBvcnRzIHJldHVybmluZyBhbm90aGVyIFVpbnQ4QXJyYXk/XHJcbiAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgIHZpZXcuZm9yRWFjaChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgICAgdmFyIHBhZCA9IG51bSA8IDE2ID8gXCIwXCIgOiBcIlwiO1xyXG4gICAgICAgIHN0ciArPSBcIjB4XCIgKyBwYWQgKyBudW0udG9TdHJpbmcoMTYpICsgXCIgXCI7XHJcbiAgICB9KTtcclxuICAgIC8vIFRyaW0gb2YgdHJhaWxpbmcgc3BhY2UuXHJcbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBzdHIubGVuZ3RoIC0gMSk7XHJcbn1cclxuLy8gQWxzbyBpbiBzaWduYWxyLXByb3RvY29sLW1zZ3BhY2svVXRpbHMudHNcclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCAmJiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09IFwidW5kZWZpbmVkXCIgJiZcclxuICAgICAgICAodmFsIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcclxuICAgICAgICAgICAgLy8gU29tZXRpbWVzIHdlIGdldCBhbiBBcnJheUJ1ZmZlciB0aGF0IGRvZXNuJ3Qgc2F0aXNmeSBpbnN0YW5jZW9mXHJcbiAgICAgICAgICAgICh2YWwuY29uc3RydWN0b3IgJiYgdmFsLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiQXJyYXlCdWZmZXJcIikpO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobG9nZ2VyLCB0cmFuc3BvcnROYW1lLCBodHRwQ2xpZW50LCB1cmwsIGFjY2Vzc1Rva2VuRmFjdG9yeSwgY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQsIHdpdGhDcmVkZW50aWFscywgZGVmYXVsdEhlYWRlcnMpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX2EsIGhlYWRlcnMsIHRva2VuLCBfYiwgbmFtZSwgdmFsdWUsIHJlc3BvbnNlVHlwZSwgcmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWNjZXNzVG9rZW5GYWN0b3J5KSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBhY2Nlc3NUb2tlbkZhY3RvcnkoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYy5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSAoX2EgPSB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hW1wiQXV0aG9yaXphdGlvblwiXSA9IFwiQmVhcmVyIFwiICsgdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9jLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBfYiA9IGdldFVzZXJBZ2VudEhlYWRlcigpLCBuYW1lID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFwiICsgdHJhbnNwb3J0TmFtZSArIFwiIHRyYW5zcG9ydCkgc2VuZGluZyBkYXRhLiBcIiArIGdldERhdGFEZXRhaWwoY29udGVudCwgbG9nTWVzc2FnZUNvbnRlbnQpICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9IGlzQXJyYXlCdWZmZXIoY29udGVudCkgPyBcImFycmF5YnVmZmVyXCIgOiBcInRleHRcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBodHRwQ2xpZW50LnBvc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogX19hc3NpZ24oe30sIGhlYWRlcnMsIGRlZmF1bHRIZWFkZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogcmVzcG9uc2VUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB3aXRoQ3JlZGVudGlhbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IF9jLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihcIiArIHRyYW5zcG9ydE5hbWUgKyBcIiB0cmFuc3BvcnQpIHJlcXVlc3QgY29tcGxldGUuIFJlc3BvbnNlIHN0YXR1czogXCIgKyByZXNwb25zZS5zdGF0dXNDb2RlICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2dnZXIobG9nZ2VyKSB7XHJcbiAgICBpZiAobG9nZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnNvbGVMb2dnZXIoTG9nTGV2ZWwuSW5mb3JtYXRpb24pO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlciA9PT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBOdWxsTG9nZ2VyLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGxvZ2dlci5sb2cpIHtcclxuICAgICAgICByZXR1cm4gbG9nZ2VyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBDb25zb2xlTG9nZ2VyKGxvZ2dlcik7XHJcbn1cclxuLyoqIEBwcml2YXRlICovXHJcbnZhciBTdWJqZWN0U3Vic2NyaXB0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU3ViamVjdFN1YnNjcmlwdGlvbihzdWJqZWN0LCBvYnNlcnZlcikge1xyXG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG9ic2VydmVyO1xyXG4gICAgfVxyXG4gICAgU3ViamVjdFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnN1YmplY3Qub2JzZXJ2ZXJzLmluZGV4T2YodGhpcy5vYnNlcnZlcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdWJqZWN0Lm9ic2VydmVycy5sZW5ndGggPT09IDAgJiYgdGhpcy5zdWJqZWN0LmNhbmNlbENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5jYW5jZWxDYWxsYmFjaygpLmNhdGNoKGZ1bmN0aW9uIChfKSB7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gU3ViamVjdFN1YnNjcmlwdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IHsgU3ViamVjdFN1YnNjcmlwdGlvbiB9O1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIENvbnNvbGVMb2dnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb25zb2xlTG9nZ2VyKG1pbmltdW1Mb2dMZXZlbCkge1xyXG4gICAgICAgIHRoaXMubWluaW11bUxvZ0xldmVsID0gbWluaW11bUxvZ0xldmVsO1xyXG4gICAgICAgIHRoaXMub3V0cHV0Q29uc29sZSA9IGNvbnNvbGU7XHJcbiAgICB9XHJcbiAgICBDb25zb2xlTG9nZ2VyLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbiAobG9nTGV2ZWwsIG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAobG9nTGV2ZWwgPj0gdGhpcy5taW5pbXVtTG9nTGV2ZWwpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5Dcml0aWNhbDpcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmVycm9yKFwiW1wiICsgbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgXCJdIFwiICsgTG9nTGV2ZWxbbG9nTGV2ZWxdICsgXCI6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ0xldmVsLldhcm5pbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLndhcm4oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuSW5mb3JtYXRpb246XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmluZm8oXCJbXCIgKyBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyBcIl0gXCIgKyBMb2dMZXZlbFtsb2dMZXZlbF0gKyBcIjogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyBvbmx5IGdvZXMgdG8gYXR0YWNoZWQgZGVidWdnZXJzIGluIE5vZGUsIHNvIHdlIHVzZSBjb25zb2xlLmxvZyBmb3IgVHJhY2UgYW5kIERlYnVnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRDb25zb2xlLmxvZyhcIltcIiArIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSArIFwiXSBcIiArIExvZ0xldmVsW2xvZ0xldmVsXSArIFwiOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBDb25zb2xlTG9nZ2VyO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDb25zb2xlTG9nZ2VyIH07XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFnZW50SGVhZGVyKCkge1xyXG4gICAgdmFyIHVzZXJBZ2VudEhlYWRlck5hbWUgPSBcIlgtU2lnbmFsUi1Vc2VyLUFnZW50XCI7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgdXNlckFnZW50SGVhZGVyTmFtZSA9IFwiVXNlci1BZ2VudFwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt1c2VyQWdlbnRIZWFkZXJOYW1lLCBjb25zdHJ1Y3RVc2VyQWdlbnQoVkVSU0lPTiwgZ2V0T3NOYW1lKCksIGdldFJ1bnRpbWUoKSwgZ2V0UnVudGltZVZlcnNpb24oKSldO1xyXG59XHJcbi8qKiBAcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0VXNlckFnZW50KHZlcnNpb24sIG9zLCBydW50aW1lLCBydW50aW1lVmVyc2lvbikge1xyXG4gICAgLy8gTWljcm9zb2Z0IFNpZ25hbFIvW1ZlcnNpb25dIChbRGV0YWlsZWQgVmVyc2lvbl07IFtPcGVyYXRpbmcgU3lzdGVtXTsgW1J1bnRpbWVdOyBbUnVudGltZSBWZXJzaW9uXSlcclxuICAgIHZhciB1c2VyQWdlbnQgPSBcIk1pY3Jvc29mdCBTaWduYWxSL1wiO1xyXG4gICAgdmFyIG1ham9yQW5kTWlub3IgPSB2ZXJzaW9uLnNwbGl0KFwiLlwiKTtcclxuICAgIHVzZXJBZ2VudCArPSBtYWpvckFuZE1pbm9yWzBdICsgXCIuXCIgKyBtYWpvckFuZE1pbm9yWzFdO1xyXG4gICAgdXNlckFnZW50ICs9IFwiIChcIiArIHZlcnNpb24gKyBcIjsgXCI7XHJcbiAgICBpZiAob3MgJiYgb3MgIT09IFwiXCIpIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gb3MgKyBcIjsgXCI7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB1c2VyQWdlbnQgKz0gXCJVbmtub3duIE9TOyBcIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIlwiICsgcnVudGltZTtcclxuICAgIGlmIChydW50aW1lVmVyc2lvbikge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgXCIgKyBydW50aW1lVmVyc2lvbjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVzZXJBZ2VudCArPSBcIjsgVW5rbm93biBSdW50aW1lIFZlcnNpb25cIjtcclxuICAgIH1cclxuICAgIHVzZXJBZ2VudCArPSBcIilcIjtcclxuICAgIHJldHVybiB1c2VyQWdlbnQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T3NOYW1lKCkge1xyXG4gICAgaWYgKFBsYXRmb3JtLmlzTm9kZSkge1xyXG4gICAgICAgIHN3aXRjaCAocHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICBjYXNlIFwid2luMzJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIldpbmRvd3MgTlRcIjtcclxuICAgICAgICAgICAgY2FzZSBcImRhcndpblwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwibWFjT1NcIjtcclxuICAgICAgICAgICAgY2FzZSBcImxpbnV4XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJMaW51eFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZVZlcnNpb24oKSB7XHJcbiAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UnVudGltZSgpIHtcclxuICAgIGlmIChQbGF0Zm9ybS5pc05vZGUpIHtcclxuICAgICAgICByZXR1cm4gXCJOb2RlSlNcIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIkJyb3dzZXJcIjtcclxuICAgIH1cclxufVxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1VdGlscy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmltcG9ydCB7IFRyYW5zZmVyRm9ybWF0IH0gZnJvbSBcIi4vSVRyYW5zcG9ydFwiO1xyXG5pbXBvcnQgeyBBcmcsIGdldERhdGFEZXRhaWwsIGdldFVzZXJBZ2VudEhlYWRlciwgUGxhdGZvcm0gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vKiogQHByaXZhdGUgKi9cclxudmFyIFdlYlNvY2tldFRyYW5zcG9ydCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlNvY2tldFRyYW5zcG9ydChodHRwQ2xpZW50LCBhY2Nlc3NUb2tlbkZhY3RvcnksIGxvZ2dlciwgbG9nTWVzc2FnZUNvbnRlbnQsIHdlYlNvY2tldENvbnN0cnVjdG9yLCBoZWFkZXJzKSB7XHJcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbkZhY3RvcnkgPSBhY2Nlc3NUb2tlbkZhY3Rvcnk7XHJcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlQ29udGVudCA9IGxvZ01lc3NhZ2VDb250ZW50O1xyXG4gICAgICAgIHRoaXMud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3ZWJTb2NrZXRDb25zdHJ1Y3RvcjtcclxuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xyXG4gICAgICAgIHRoaXMub25yZWNlaXZlID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uY2xvc2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XHJcbiAgICB9XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAodXJsLCB0cmFuc2ZlckZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRva2VuO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh1cmwsIFwidXJsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmcuaXNSZXF1aXJlZCh0cmFuc2ZlckZvcm1hdCwgXCJ0cmFuc2ZlckZvcm1hdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJnLmlzSW4odHJhbnNmZXJGb3JtYXQsIFRyYW5zZmVyRm9ybWF0LCBcInRyYW5zZmVyRm9ybWF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBDb25uZWN0aW5nLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuRmFjdG9yeSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuYWNjZXNzVG9rZW5GYWN0b3J5KCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBfYS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsICs9ICh1cmwuaW5kZXhPZihcIj9cIikgPCAwID8gXCI/XCIgOiBcIiZcIikgKyAoXCJhY2Nlc3NfdG9rZW49XCIgKyBlbmNvZGVVUklDb21wb25lbnQodG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL15odHRwLywgXCJ3c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3ZWJTb2NrZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29va2llcyA9IF90aGlzLmh0dHBDbGllbnQuZ2V0Q29va2llU3RyaW5nKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3BlbmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUGxhdGZvcm0uaXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBnZXRVc2VyQWdlbnRIZWFkZXIoKSwgbmFtZV8xID0gX2FbMF0sIHZhbHVlID0gX2FbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tuYW1lXzFdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvb2tpZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tcIkNvb2tpZVwiXSA9IFwiXCIgKyBjb29raWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHBhc3MgaGVhZGVycyB3aGVuIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldCA9IG5ldyBfdGhpcy53ZWJTb2NrZXRDb25zdHJ1Y3Rvcih1cmwsIHVuZGVmaW5lZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBfX2Fzc2lnbih7fSwgaGVhZGVycywgX3RoaXMuaGVhZGVycyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdlYlNvY2tldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSBpcyBub3QgaGFwcHkgd2l0aCBwYXNzaW5nICd1bmRlZmluZWQnIGFzIHByb3RvY29sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0ID0gbmV3IF90aGlzLndlYlNvY2tldENvbnN0cnVjdG9yKHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNmZXJGb3JtYXQgPT09IFRyYW5zZmVyRm9ybWF0LkJpbmFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoX2V2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5JbmZvcm1hdGlvbiwgXCJXZWJTb2NrZXQgY29ubmVjdGVkIHRvIFwiICsgdXJsICsgXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLndlYlNvY2tldCA9IHdlYlNvY2tldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXJyb3JFdmVudCBpcyBhIGJyb3dzZXIgb25seSB0eXBlIHdlIG5lZWQgdG8gY2hlY2sgaWYgdGhlIHR5cGUgZXhpc3RzIGJlZm9yZSB1c2luZyBpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgRXJyb3JFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBldmVudCBpbnN0YW5jZW9mIEVycm9yRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBldmVudC5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggdGhlIHRyYW5zcG9ydC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5UcmFjZSwgXCIoV2ViU29ja2V0cyB0cmFuc3BvcnQpIGRhdGEgcmVjZWl2ZWQuIFwiICsgZ2V0RGF0YURldGFpbChtZXNzYWdlLmRhdGEsIF90aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub25yZWNlaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbnJlY2VpdmUobWVzc2FnZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJTb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGNhbGwgY2xvc2UgaGFuZGxlciBpZiBjb25uZWN0aW9uIHdhcyBuZXZlciBlc3RhYmxpc2hlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlJ2xsIHJlamVjdCB0aGUgY29ubmVjdCBjYWxsIGluc3RlYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVycm9yRXZlbnQgaXMgYSBicm93c2VyIG9ubHkgdHlwZSB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSB0eXBlIGV4aXN0cyBiZWZvcmUgdXNpbmcgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBFcnJvckV2ZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGV2ZW50IGluc3RhbmNlb2YgRXJyb3JFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBldmVudC5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKFwiVGhlcmUgd2FzIGFuIGVycm9yIHdpdGggdGhlIHRyYW5zcG9ydC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0ICYmIHRoaXMud2ViU29ja2V0LnJlYWR5U3RhdGUgPT09IHRoaXMud2ViU29ja2V0Q29uc3RydWN0b3IuT1BFTikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuVHJhY2UsIFwiKFdlYlNvY2tldHMgdHJhbnNwb3J0KSBzZW5kaW5nIGRhdGEuIFwiICsgZ2V0RGF0YURldGFpbChkYXRhLCB0aGlzLmxvZ01lc3NhZ2VDb250ZW50KSArIFwiLlwiKTtcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQuc2VuZChkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJXZWJTb2NrZXQgaXMgbm90IGluIHRoZSBPUEVOIHN0YXRlXCIpO1xyXG4gICAgfTtcclxuICAgIFdlYlNvY2tldFRyYW5zcG9ydC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy53ZWJTb2NrZXQpIHtcclxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIG9uY2xvc2UgY2FsbGJhY2sgaW5saW5lIHNvIHdlIGtub3cgdGhlIEh0dHBDb25uZWN0aW9uIHdhcyBjbG9zZWQgcHJvcGVybHkgYmVmb3JlIHJldHVybmluZ1xyXG4gICAgICAgICAgICAvLyBUaGlzIGFsc28gc29sdmVzIGFuIGlzc3VlIHdoZXJlIHdlYnNvY2tldC5vbmNsb3NlIGNvdWxkIHRha2UgMTgrIHNlY29uZHMgdG8gdHJpZ2dlciBkdXJpbmcgbmV0d29yayBkaXNjb25uZWN0c1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gd2ViU29ja2V0IHdpbGwgYmUgbnVsbCBpZiB0aGUgdHJhbnNwb3J0IGRpZCBub3Qgc3RhcnQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgaWYgKHRoaXMud2ViU29ja2V0KSB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIHdlYnNvY2tldCBoYW5kbGVycyBiZWNhdXNlIHdlIGFyZSBjb25zaWRlcmluZyB0aGUgc29ja2V0IGNsb3NlZCBub3dcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uICgpIHsgfTtcclxuICAgICAgICAgICAgdGhpcy53ZWJTb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldC5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLndlYlNvY2tldCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dnZXIubG9nKExvZ0xldmVsLlRyYWNlLCBcIihXZWJTb2NrZXRzIHRyYW5zcG9ydCkgc29ja2V0IGNsb3NlZC5cIik7XHJcbiAgICAgICAgaWYgKHRoaXMub25jbG9zZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0Nsb3NlRXZlbnQoZXZlbnQpICYmIChldmVudC53YXNDbGVhbiA9PT0gZmFsc2UgfHwgZXZlbnQuY29kZSAhPT0gMTAwMCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShuZXcgRXJyb3IoXCJXZWJTb2NrZXQgY2xvc2VkIHdpdGggc3RhdHVzIGNvZGU6IFwiICsgZXZlbnQuY29kZSArIFwiIChcIiArIGV2ZW50LnJlYXNvbiArIFwiKS5cIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25jbG9zZShldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXZWJTb2NrZXRUcmFuc3BvcnQucHJvdG90eXBlLmlzQ2xvc2VFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiBldmVudCAmJiB0eXBlb2YgZXZlbnQud2FzQ2xlYW4gPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBldmVudC5jb2RlID09PSBcIm51bWJlclwiO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBXZWJTb2NrZXRUcmFuc3BvcnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFdlYlNvY2tldFRyYW5zcG9ydCB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1XZWJTb2NrZXRUcmFuc3BvcnQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSAuTkVUIEZvdW5kYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgQWJvcnRFcnJvciwgSHR0cEVycm9yLCBUaW1lb3V0RXJyb3IgfSBmcm9tIFwiLi9FcnJvcnNcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4vSHR0cENsaWVudFwiO1xyXG5pbXBvcnQgeyBMb2dMZXZlbCB9IGZyb20gXCIuL0lMb2dnZXJcIjtcclxudmFyIFhockh0dHBDbGllbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoWGhySHR0cENsaWVudCwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFhockh0dHBDbGllbnQobG9nZ2VyKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqIEBpbmhlcml0RG9jICovXHJcbiAgICBYaHJIdHRwQ2xpZW50LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgYWJvcnQgd2FzIG5vdCBzaWduYWxlZCBiZWZvcmUgY2FsbGluZyBzZW5kXHJcbiAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwgJiYgcmVxdWVzdC5hYm9ydFNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQWJvcnRFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0Lm1ldGhvZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gbWV0aG9kIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0LnVybCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiTm8gdXJsIGRlZmluZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpO1xyXG4gICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiByZXF1ZXN0LndpdGhDcmVkZW50aWFscztcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYLVJlcXVlc3RlZC1XaXRoXCIsIFwiWE1MSHR0cFJlcXVlc3RcIik7XHJcbiAgICAgICAgICAgIC8vIEV4cGxpY2l0bHkgc2V0dGluZyB0aGUgQ29udGVudC1UeXBlIGhlYWRlciBmb3IgUmVhY3QgTmF0aXZlIG9uIEFuZHJvaWQgcGxhdGZvcm0uXHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycztcclxuICAgICAgICAgICAgaWYgKGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlc3BvbnNlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LmFib3J0U2lnbmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBYm9ydEVycm9yKCkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC50aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHJlcXVlc3QudGltZW91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRTaWduYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFib3J0U2lnbmFsLm9uYWJvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBIdHRwUmVzcG9uc2UoeGhyLnN0YXR1cywgeGhyLnN0YXR1c1RleHQsIHhoci5yZXNwb25zZSB8fCB4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEh0dHBFcnJvcih4aHIuc3RhdHVzVGV4dCwgeGhyLnN0YXR1cykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIF90aGlzLmxvZ2dlci5sb2coTG9nTGV2ZWwuV2FybmluZywgXCJFcnJvciBmcm9tIEhUVFAgcmVxdWVzdC4gXCIgKyB4aHIuc3RhdHVzICsgXCI6IFwiICsgeGhyLnN0YXR1c1RleHQgKyBcIi5cIik7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEh0dHBFcnJvcih4aHIuc3RhdHVzVGV4dCwgeGhyLnN0YXR1cykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubG9nZ2VyLmxvZyhMb2dMZXZlbC5XYXJuaW5nLCBcIlRpbWVvdXQgZnJvbSBIVFRQIHJlcXVlc3QuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUaW1lb3V0RXJyb3IoKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHJlcXVlc3QuY29udGVudCB8fCBcIlwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gWGhySHR0cENsaWVudDtcclxufShIdHRwQ2xpZW50KSk7XHJcbmV4cG9ydCB7IFhockh0dHBDbGllbnQgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9WGhySHR0cENsaWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIC5ORVQgRm91bmRhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMC4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbmV4cG9ydCB7IEFib3J0RXJyb3IsIEh0dHBFcnJvciwgVGltZW91dEVycm9yIH0gZnJvbSBcIi4vRXJyb3JzXCI7XHJcbmV4cG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gXCIuL0h0dHBDbGllbnRcIjtcclxuZXhwb3J0IHsgRGVmYXVsdEh0dHBDbGllbnQgfSBmcm9tIFwiLi9EZWZhdWx0SHR0cENsaWVudFwiO1xyXG5leHBvcnQgeyBIdWJDb25uZWN0aW9uLCBIdWJDb25uZWN0aW9uU3RhdGUgfSBmcm9tIFwiLi9IdWJDb25uZWN0aW9uXCI7XHJcbmV4cG9ydCB7IEh1YkNvbm5lY3Rpb25CdWlsZGVyIH0gZnJvbSBcIi4vSHViQ29ubmVjdGlvbkJ1aWxkZXJcIjtcclxuZXhwb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tIFwiLi9JSHViUHJvdG9jb2xcIjtcclxuZXhwb3J0IHsgTG9nTGV2ZWwgfSBmcm9tIFwiLi9JTG9nZ2VyXCI7XHJcbmV4cG9ydCB7IEh0dHBUcmFuc3BvcnRUeXBlLCBUcmFuc2ZlckZvcm1hdCB9IGZyb20gXCIuL0lUcmFuc3BvcnRcIjtcclxuZXhwb3J0IHsgTnVsbExvZ2dlciB9IGZyb20gXCIuL0xvZ2dlcnNcIjtcclxuZXhwb3J0IHsgSnNvbkh1YlByb3RvY29sIH0gZnJvbSBcIi4vSnNvbkh1YlByb3RvY29sXCI7XHJcbmV4cG9ydCB7IFN1YmplY3QgfSBmcm9tIFwiLi9TdWJqZWN0XCI7XHJcbmV4cG9ydCB7IFZFUlNJT04gfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLkFXTj1lKCk6dC5BV049ZSgpfShzZWxmLChmdW5jdGlvbigpe3JldHVybigoKT0+e1widXNlIHN0cmljdFwiO3ZhciB0PXtkOihlLG4pPT57Zm9yKHZhciBvIGluIG4pdC5vKG4sbykmJiF0Lm8oZSxvKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbyx7ZW51bWVyYWJsZTohMCxnZXQ6bltvXX0pfSxvOih0LGUpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKSxyOnQ9PntcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfX0sZT17fTtmdW5jdGlvbiBuKHQpe3JldHVybiBuPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9LG4odCl9ZnVuY3Rpb24gbyh0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9ZnVuY3Rpb24gcih0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgbz1lW25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxvLmtleSxvKX19dC5yKGUpLHQuZChlLHtkZWZhdWx0OigpPT5CfSk7dmFyIGk9e21heE5vdGlmaWNhdGlvbnM6MTAsYW5pbWF0aW9uRHVyYXRpb246MzAwLHBvc2l0aW9uOlwiYm90dG9tLXJpZ2h0XCIsbGFiZWxzOnt0aXA6XCJUaXBcIixpbmZvOlwiSW5mb1wiLHN1Y2Nlc3M6XCJTdWNjZXNzXCIsd2FybmluZzpcIkF0dGVudGlvblwiLGFsZXJ0OlwiRXJyb3JcIixhc3luYzpcIkxvYWRpbmdcIixjb25maXJtOlwiQ29uZmlybWF0aW9uIHJlcXVpcmVkXCIsY29uZmlybU9rOlwiT0tcIixjb25maXJtQ2FuY2VsOlwiQ2FuY2VsXCJ9LGljb25zOnt0aXA6XCJxdWVzdGlvbi1jaXJjbGVcIixpbmZvOlwiaW5mby1jaXJjbGVcIixzdWNjZXNzOlwiY2hlY2stY2lyY2xlXCIsd2FybmluZzpcImV4Y2xhbWF0aW9uLWNpcmNsZVwiLGFsZXJ0OlwiZXhjbGFtYXRpb24tdHJpYW5nbGVcIixhc3luYzpcImNvZyBmYS1zcGluXCIsY29uZmlybTpcImV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCIscHJlZml4OlwiPGkgY2xhc3M9J2ZhIGZhcyBmYS1mdyBmYS1cIixzdWZmaXg6XCInPjwvaT5cIixlbmFibGVkOiEwfSxyZXBsYWNlbWVudHM6e3RpcDpudWxsLGluZm86bnVsbCxzdWNjZXNzOm51bGwsd2FybmluZzpudWxsLGFsZXJ0Om51bGwsYXN5bmM6bnVsbCxcImFzeW5jLWJsb2NrXCI6bnVsbCxtb2RhbDpudWxsLGNvbmZpcm06bnVsbCxnZW5lcmFsOntcIjxzY3JpcHQ+XCI6XCJcIixcIjxcXC9zY3JpcHQ+XCI6XCJcIn19LG1lc3NhZ2VzOnt0aXA6XCJcIixpbmZvOlwiXCIsc3VjY2VzczpcIkFjdGlvbiBoYXMgYmVlbiBzdWNjZWVkZWRcIix3YXJuaW5nOlwiXCIsYWxlcnQ6XCJBY3Rpb24gaGFzIGJlZW4gZmFpbGVkXCIsY29uZmlybTpcIlRoaXMgYWN0aW9uIGNhbid0IGJlIHVuZG9uZS4gQ29udGludWU/XCIsYXN5bmM6XCJQbGVhc2UsIHdhaXQuLi5cIixcImFzeW5jLWJsb2NrXCI6XCJMb2FkaW5nXCJ9LGZvcm1hdEVycm9yOmZ1bmN0aW9uKHQpe2lmKHQucmVzcG9uc2Upe2lmKCF0LnJlc3BvbnNlLmRhdGEpcmV0dXJuXCI1MDAgQVBJIFNlcnZlciBFcnJvclwiO2lmKHQucmVzcG9uc2UuZGF0YS5lcnJvcnMpcmV0dXJuIHQucmVzcG9uc2UuZGF0YS5lcnJvcnMubWFwKChmdW5jdGlvbih0KXtyZXR1cm4gdC5kZXRhaWx9KSkuam9pbihcIjxicj5cIik7aWYodC5yZXNwb25zZS5zdGF0dXNUZXh0KXJldHVyblwiXCIuY29uY2F0KHQucmVzcG9uc2Uuc3RhdHVzLFwiIFwiKS5jb25jYXQodC5yZXNwb25zZS5zdGF0dXNUZXh0LFwiOiBcIikuY29uY2F0KHQucmVzcG9uc2UuZGF0YSl9cmV0dXJuIHQubWVzc2FnZT90Lm1lc3NhZ2U6dH0sZHVyYXRpb25zOntnbG9iYWw6NWUzLHN1Y2Nlc3M6bnVsbCxpbmZvOm51bGwsdGlwOm51bGwsd2FybmluZzpudWxsLGFsZXJ0Om51bGx9LG1pbkR1cmF0aW9uczp7YXN5bmM6MWUzLFwiYXN5bmMtYmxvY2tcIjoxZTN9fSxhPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTppO28odGhpcyx0KSxPYmplY3QuYXNzaWduKHRoaXMsdGhpcy5kZWZhdWx0c0RlZXAobixlKSl9dmFyIGUsYTtyZXR1cm4gZT10LGE9W3trZXk6XCJpY29uXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuaWNvbnMuZW5hYmxlZD9cIlwiLmNvbmNhdCh0aGlzLmljb25zLnByZWZpeCkuY29uY2F0KHRoaXMuaWNvbnNbdF0pLmNvbmNhdCh0aGlzLmljb25zLnN1ZmZpeCk6XCJcIn19LHtrZXk6XCJsYWJlbFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmxhYmVsc1t0XX19LHtrZXk6XCJkdXJhdGlvblwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZHVyYXRpb25zW3RdO3JldHVybiBudWxsPT09ZT90aGlzLmR1cmF0aW9ucy5nbG9iYWw6ZX19LHtrZXk6XCJ0b1NlY3NcIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm5cIlwiLmNvbmNhdCh0LzFlMyxcInNcIil9fSx7a2V5OlwiYXBwbHlSZXBsYWNlbWVudHNcIix2YWx1ZTpmdW5jdGlvbih0LGUpe2lmKCF0KXJldHVybiB0aGlzLm1lc3NhZ2VzW2VdfHxcIlwiO2Zvcih2YXIgbj0wLG89W1wiZ2VuZXJhbFwiLGVdO248by5sZW5ndGg7bisrKXt2YXIgcj1vW25dO2lmKHRoaXMucmVwbGFjZW1lbnRzW3JdKWZvcih2YXIgaSBpbiB0aGlzLnJlcGxhY2VtZW50c1tyXSl0PXQucmVwbGFjZShpLHRoaXMucmVwbGFjZW1lbnRzW3JdW2ldKX1yZXR1cm4gdH19LHtrZXk6XCJvdmVycmlkZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBlP25ldyB0KGUsdGhpcyk6dGhpc319LHtrZXk6XCJkZWZhdWx0c0RlZXBcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3ZhciBvPXt9O2Zvcih2YXIgciBpbiB0KWUuaGFzT3duUHJvcGVydHkocik/b1tyXT1cIm9iamVjdFwiPT09bih0W3JdKSYmbnVsbCE9PXRbcl0/dGhpcy5kZWZhdWx0c0RlZXAodFtyXSxlW3JdKTplW3JdOm9bcl09dFtyXTtyZXR1cm4gb319XSxhJiZyKGUucHJvdG90eXBlLGEpLHR9KCksYz1cImF3blwiLHM9e3BvcHVwOlwiXCIuY29uY2F0KGMsXCItcG9wdXBcIiksdG9hc3Q6XCJcIi5jb25jYXQoYyxcIi10b2FzdFwiKSxidG46XCJcIi5jb25jYXQoYyxcIi1idG5cIiksY29uZmlybTpcIlwiLmNvbmNhdChjLFwiLWNvbmZpcm1cIil9LHU9e3ByZWZpeDpzLnRvYXN0LGtsYXNzOntsYWJlbDpcIlwiLmNvbmNhdChzLnRvYXN0LFwiLWxhYmVsXCIpLGNvbnRlbnQ6XCJcIi5jb25jYXQocy50b2FzdCxcIi1jb250ZW50XCIpLGljb246XCJcIi5jb25jYXQocy50b2FzdCxcIi1pY29uXCIpLHByb2dyZXNzQmFyOlwiXCIuY29uY2F0KHMudG9hc3QsXCItcHJvZ3Jlc3MtYmFyXCIpLHByb2dyZXNzQmFyUGF1c2U6XCJcIi5jb25jYXQocy50b2FzdCxcIi1wcm9ncmVzcy1iYXItcGF1c2VkXCIpfSxpZHM6e2NvbnRhaW5lcjpcIlwiLmNvbmNhdChzLnRvYXN0LFwiLWNvbnRhaW5lclwiKX19LGw9e3ByZWZpeDpzLnBvcHVwLGtsYXNzOntidXR0b25zOlwiXCIuY29uY2F0KGMsXCItYnV0dG9uc1wiKSxidXR0b246cy5idG4sc3VjY2Vzc0J0bjpcIlwiLmNvbmNhdChzLmJ0bixcIi1zdWNjZXNzXCIpLGNhbmNlbEJ0bjpcIlwiLmNvbmNhdChzLmJ0bixcIi1jYW5jZWxcIiksdGl0bGU6XCJcIi5jb25jYXQocy5wb3B1cCxcIi10aXRsZVwiKSxib2R5OlwiXCIuY29uY2F0KHMucG9wdXAsXCItYm9keVwiKSxjb250ZW50OlwiXCIuY29uY2F0KHMucG9wdXAsXCItY29udGVudFwiKSxkb3RBbmltYXRpb246XCJcIi5jb25jYXQocy5wb3B1cCxcIi1sb2FkaW5nLWRvdHNcIil9LGlkczp7d3JhcHBlcjpcIlwiLmNvbmNhdChzLnBvcHVwLFwiLXdyYXBwZXJcIiksY29uZmlybU9rOlwiXCIuY29uY2F0KHMuY29uZmlybSxcIi1va1wiKSxjb25maXJtQ2FuY2VsOlwiXCIuY29uY2F0KHMuY29uZmlybSxcIi1jYW5jZWxcIil9fSxmPXtrbGFzczp7aGlkaW5nOlwiXCIuY29uY2F0KGMsXCItaGlkaW5nXCIpfSxsaWI6Y307ZnVuY3Rpb24gcCh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgbz1lW25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxvLmtleSxvKX19dmFyIGQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUsbixvLHIsaSl7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyx0KSx0aGlzLm5ld05vZGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxuJiYodGhpcy5uZXdOb2RlLmlkPW4pLG8mJih0aGlzLm5ld05vZGUuY2xhc3NOYW1lPW8pLHImJih0aGlzLm5ld05vZGUuc3R5bGUuY3NzVGV4dD1yKSx0aGlzLnBhcmVudD1lLHRoaXMub3B0aW9ucz1pfXZhciBlLG47cmV0dXJuIGU9dCxuPVt7a2V5OlwiYmVmb3JlSW5zZXJ0XCIsdmFsdWU6ZnVuY3Rpb24oKXt9fSx7a2V5OlwiYWZ0ZXJJbnNlcnRcIix2YWx1ZTpmdW5jdGlvbigpe319LHtrZXk6XCJpbnNlcnRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmJlZm9yZUluc2VydCgpLHRoaXMuZWw9dGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5uZXdOb2RlKSx0aGlzLmFmdGVySW5zZXJ0KCksdGhpc319LHtrZXk6XCJyZXBsYWNlXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcztpZih0aGlzLmdldEVsZW1lbnQoKSlyZXR1cm4gdGhpcy5iZWZvcmVEZWxldGUoKS50aGVuKChmdW5jdGlvbigpe3JldHVybiBlLnVwZGF0ZVR5cGUodC50eXBlKSxlLnBhcmVudC5yZXBsYWNlQ2hpbGQodC5uZXdOb2RlLGUuZWwpLGUuZWw9ZS5nZXRFbGVtZW50KHQubmV3Tm9kZSksZS5hZnRlckluc2VydCgpLGV9KSl9fSx7a2V5OlwiYmVmb3JlRGVsZXRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMuZWwsbj0wO3JldHVybiB0aGlzLnN0YXJ0JiYobj10aGlzLm9wdGlvbnMubWluRHVyYXRpb25zW3RoaXMudHlwZV0rdGhpcy5zdGFydC1EYXRlLm5vdygpKTwwJiYobj0wKSxuZXcgUHJvbWlzZSgoZnVuY3Rpb24obyl7c2V0VGltZW91dCgoZnVuY3Rpb24oKXtlLmNsYXNzTGlzdC5hZGQoZi5rbGFzcy5oaWRpbmcpLHNldFRpbWVvdXQobyx0Lm9wdGlvbnMuYW5pbWF0aW9uRHVyYXRpb24pfSksbil9KSl9fSx7a2V5OlwiZGVsZXRlXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnRoaXMuZWw7cmV0dXJuIHRoaXMuZ2V0RWxlbWVudChlKT90aGlzLmJlZm9yZURlbGV0ZShlKS50aGVuKChmdW5jdGlvbigpe2UucmVtb3ZlKCksdC5hZnRlckRlbGV0ZSgpfSkpOm51bGx9fSx7a2V5OlwiYWZ0ZXJEZWxldGVcIix2YWx1ZTpmdW5jdGlvbigpe319LHtrZXk6XCJnZXRFbGVtZW50XCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dGhpcy5lbDtyZXR1cm4gdD9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LmlkKTpudWxsfX0se2tleTpcImFkZEV2ZW50XCIsdmFsdWU6ZnVuY3Rpb24odCxlKXt0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIodCxlKX19LHtrZXk6XCJ0b2dnbGVDbGFzc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuZWwuY2xhc3NMaXN0LnRvZ2dsZSh0KX19LHtrZXk6XCJ1cGRhdGVUeXBlXCIsdmFsdWU6ZnVuY3Rpb24odCl7dGhpcy50eXBlPXQsdGhpcy5kdXJhdGlvbj10aGlzLm9wdGlvbnMuZHVyYXRpb24odGhpcy50eXBlKX19XSxuJiZwKGUucHJvdG90eXBlLG4pLHR9KCk7ZnVuY3Rpb24geSh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgbz1lW25dO28uZW51bWVyYWJsZT1vLmVudW1lcmFibGV8fCExLG8uY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIG8mJihvLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxvLmtleSxvKX19dmFyIGg9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUsbil7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyx0KSx0aGlzLmNhbGxiYWNrPWUsdGhpcy5yZW1haW5pbmc9bix0aGlzLnJlc3VtZSgpfXZhciBlLG47cmV0dXJuIGU9dCwobj1be2tleTpcInBhdXNlXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnBhdXNlZD0hMCx3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZCksdGhpcy5yZW1haW5pbmctPW5ldyBEYXRlLXRoaXMuc3RhcnR9fSx7a2V5OlwicmVzdW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucGF1c2VkPSExLHRoaXMuc3RhcnQ9bmV3IERhdGUsd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpLHRoaXMudGltZXJJZD13aW5kb3cuc2V0VGltZW91dCgoZnVuY3Rpb24oKXt3aW5kb3cuY2xlYXJUaW1lb3V0KHQudGltZXJJZCksdC5jYWxsYmFjaygpfSksdGhpcy5yZW1haW5pbmcpfX0se2tleTpcInRvZ2dsZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wYXVzZWQ/dGhpcy5yZXN1bWUoKTp0aGlzLnBhdXNlKCl9fV0pJiZ5KGUucHJvdG90eXBlLG4pLHR9KCk7ZnVuY3Rpb24gbSh0KXtyZXR1cm4gbT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSxtKHQpfWZ1bmN0aW9uIHYodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIG89ZVtuXTtvLmVudW1lcmFibGU9by5lbnVtZXJhYmxlfHwhMSxvLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBvJiYoby53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsby5rZXksbyl9fWZ1bmN0aW9uIGIodCxlKXtyZXR1cm4gYj1PYmplY3Quc2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuX19wcm90b19fPWUsdH0sYih0LGUpfWZ1bmN0aW9uIGsodCxlKXtpZihlJiYoXCJvYmplY3RcIj09PW0oZSl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpKXJldHVybiBlO2lmKHZvaWQgMCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBmdW5jdGlvbih0KXtpZih2b2lkIDA9PT10KXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4gdH0odCl9ZnVuY3Rpb24gZyh0KXtyZXR1cm4gZz1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSxnKHQpfXZhciB3PWZ1bmN0aW9uKHQpeyFmdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTt0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmYih0LGUpfShhLHQpO3ZhciBlLG4sbyxyLGk9KG89YSxyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFJlZmxlY3R8fCFSZWZsZWN0LmNvbnN0cnVjdClyZXR1cm4hMTtpZihSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFByb3h5KXJldHVybiEwO3RyeXtyZXR1cm4gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sW10sKGZ1bmN0aW9uKCl7fSkpKSwhMH1jYXRjaCh0KXtyZXR1cm4hMX19KCksZnVuY3Rpb24oKXt2YXIgdCxlPWcobyk7aWYocil7dmFyIG49Zyh0aGlzKS5jb25zdHJ1Y3Rvcjt0PVJlZmxlY3QuY29uc3RydWN0KGUsYXJndW1lbnRzLG4pfWVsc2UgdD1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gayh0aGlzLHQpfSk7ZnVuY3Rpb24gYSh0LGUsbixvKXt2YXIgcjtyZXR1cm4gZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLGEpLChyPWkuY2FsbCh0aGlzLG8sXCJcIi5jb25jYXQodS5wcmVmaXgsXCItXCIpLmNvbmNhdChNYXRoLmZsb29yKERhdGUubm93KCktMTAwKk1hdGgucmFuZG9tKCkpKSxcIlwiLmNvbmNhdCh1LnByZWZpeCxcIiBcIikuY29uY2F0KHUucHJlZml4LFwiLVwiKS5jb25jYXQoZSksXCJhbmltYXRpb24tZHVyYXRpb246IFwiLmNvbmNhdChuLnRvU2VjcyhuLmFuaW1hdGlvbkR1cmF0aW9uKSxcIjtcIiksbikpLnVwZGF0ZVR5cGUoZSksci5zZXRJbm5lckh0bWwodCkscn1yZXR1cm4gZT1hLG49W3trZXk6XCJzZXRJbm5lckh0bWxcIix2YWx1ZTpmdW5jdGlvbih0KXtcImFsZXJ0XCI9PT10aGlzLnR5cGUmJnQmJih0PXRoaXMub3B0aW9ucy5mb3JtYXRFcnJvcih0KSksdD10aGlzLm9wdGlvbnMuYXBwbHlSZXBsYWNlbWVudHModCx0aGlzLnR5cGUpLHRoaXMubmV3Tm9kZS5pbm5lckhUTUw9JzxkaXYgY2xhc3M9XCJhd24tdG9hc3Qtd3JhcHBlclwiPicuY29uY2F0KHRoaXMucHJvZ3Jlc3NCYXIpLmNvbmNhdCh0aGlzLmxhYmVsLCc8ZGl2IGNsYXNzPVwiJykuY29uY2F0KHUua2xhc3MuY29udGVudCwnXCI+JykuY29uY2F0KHQsJzwvZGl2PjxzcGFuIGNsYXNzPVwiJykuY29uY2F0KHUua2xhc3MuaWNvbiwnXCI+JykuY29uY2F0KHRoaXMub3B0aW9ucy5pY29uKHRoaXMudHlwZSksXCI8L3NwYW4+PC9kaXY+XCIpfX0se2tleTpcImJlZm9yZUluc2VydFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztpZih0aGlzLnBhcmVudC5jaGlsZEVsZW1lbnRDb3VudD49dGhpcy5vcHRpb25zLm1heE5vdGlmaWNhdGlvbnMpe3ZhciBlPUFycmF5LmZyb20odGhpcy5wYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh1LnByZWZpeCkpO3RoaXMuZGVsZXRlKGUuZmluZCgoZnVuY3Rpb24oZSl7cmV0dXJuIXQuaXNEZWxldGVkKGUpfSkpKX19fSx7a2V5OlwiYWZ0ZXJJbnNlcnRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7aWYoXCJhc3luY1wiPT10aGlzLnR5cGUpcmV0dXJuIHRoaXMuc3RhcnQ9RGF0ZS5ub3coKTtpZih0aGlzLmFkZEV2ZW50KFwiY2xpY2tcIiwoZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWxldGUoKX0pKSwhKHRoaXMuZHVyYXRpb248PTApKXt0aGlzLnRpbWVyPW5ldyBoKChmdW5jdGlvbigpe3JldHVybiB0LmRlbGV0ZSgpfSksdGhpcy5kdXJhdGlvbik7Zm9yKHZhciBlPTAsbj1bXCJtb3VzZWVudGVyXCIsXCJtb3VzZWxlYXZlXCJdO2U8bi5sZW5ndGg7ZSsrKXt2YXIgbz1uW2VdO3RoaXMuYWRkRXZlbnQobywoZnVuY3Rpb24oKXt0LmlzRGVsZXRlZCgpfHwodC50b2dnbGVDbGFzcyh1LmtsYXNzLnByb2dyZXNzQmFyUGF1c2UpLHQudGltZXIudG9nZ2xlKCkpfSkpfX19fSx7a2V5OlwiaXNEZWxldGVkXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dGhpcy5lbDtyZXR1cm4gdC5jbGFzc0xpc3QuY29udGFpbnMoZi5rbGFzcy5oaWRpbmcpfX0se2tleTpcInByb2dyZXNzQmFyXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZHVyYXRpb248PTB8fFwiYXN5bmNcIj09PXRoaXMudHlwZT9cIlwiOlwiPGRpdiBjbGFzcz0nXCIuY29uY2F0KHUua2xhc3MucHJvZ3Jlc3NCYXIsXCInIHN0eWxlPVxcXCJhbmltYXRpb24tZHVyYXRpb246XCIpLmNvbmNhdCh0aGlzLm9wdGlvbnMudG9TZWNzKHRoaXMuZHVyYXRpb24pLCc7XCI+PC9kaXY+Jyl9fSx7a2V5OlwibGFiZWxcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4nPGIgY2xhc3M9XCInLmNvbmNhdCh1LmtsYXNzLmxhYmVsLCdcIj4nKS5jb25jYXQodGhpcy5vcHRpb25zLmxhYmVsKHRoaXMudHlwZSksXCI8L2I+XCIpfX1dLG4mJnYoZS5wcm90b3R5cGUsbiksYX0oZCk7ZnVuY3Rpb24gTyh0KXtyZXR1cm4gTz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSxPKHQpfWZ1bmN0aW9uIFQodCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIEUodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIG89ZVtuXTtvLmVudW1lcmFibGU9by5lbnVtZXJhYmxlfHwhMSxvLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBvJiYoby53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsby5rZXksbyl9fWZ1bmN0aW9uIF8odCxlKXtyZXR1cm4gXz1PYmplY3Quc2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuX19wcm90b19fPWUsdH0sXyh0LGUpfWZ1bmN0aW9uIFModCxlKXtpZihlJiYoXCJvYmplY3RcIj09PU8oZSl8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpKXJldHVybiBlO2lmKHZvaWQgMCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBmdW5jdGlvbih0KXtpZih2b2lkIDA9PT10KXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4gdH0odCl9ZnVuY3Rpb24gaih0KXtyZXR1cm4gaj1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSxqKHQpfXZhciBQPWZ1bmN0aW9uKHQpeyFmdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTt0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmXyh0LGUpfShhLHQpO3ZhciBlLG4sbyxyLGk9KG89YSxyPWZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFJlZmxlY3R8fCFSZWZsZWN0LmNvbnN0cnVjdClyZXR1cm4hMTtpZihSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIFByb3h5KXJldHVybiEwO3RyeXtyZXR1cm4gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sW10sKGZ1bmN0aW9uKCl7fSkpKSwhMH1jYXRjaCh0KXtyZXR1cm4hMX19KCksZnVuY3Rpb24oKXt2YXIgdCxlPWoobyk7aWYocil7dmFyIG49aih0aGlzKS5jb25zdHJ1Y3Rvcjt0PVJlZmxlY3QuY29uc3RydWN0KGUsYXJndW1lbnRzLG4pfWVsc2UgdD1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gUyh0aGlzLHQpfSk7ZnVuY3Rpb24gYSh0KXt2YXIgZSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcIm1vZGFsXCIsbz1hcmd1bWVudHMubGVuZ3RoPjI/YXJndW1lbnRzWzJdOnZvaWQgMCxyPWFyZ3VtZW50cy5sZW5ndGg+Mz9hcmd1bWVudHNbM106dm9pZCAwLGM9YXJndW1lbnRzLmxlbmd0aD40P2FyZ3VtZW50c1s0XTp2b2lkIDA7VCh0aGlzLGEpO3ZhciBzPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiBcIi5jb25jYXQoby50b1NlY3Moby5hbmltYXRpb25EdXJhdGlvbiksXCI7XCIpO3JldHVybihlPWkuY2FsbCh0aGlzLGRvY3VtZW50LmJvZHksbC5pZHMud3JhcHBlcixudWxsLHMsbykpW2wuaWRzLmNvbmZpcm1Pa109cixlW2wuaWRzLmNvbmZpcm1DYW5jZWxdPWMsZS5jbGFzc05hbWU9XCJcIi5jb25jYXQobC5wcmVmaXgsXCItXCIpLmNvbmNhdChuKSxbXCJjb25maXJtXCIsXCJhc3luYy1ibG9ja1wiLFwibW9kYWxcIl0uaW5jbHVkZXMobil8fChuPVwibW9kYWxcIiksZS51cGRhdGVUeXBlKG4pLGUuc2V0SW5uZXJIdG1sKHQpLGUuaW5zZXJ0KCksZX1yZXR1cm4gZT1hLChuPVt7a2V5Olwic2V0SW5uZXJIdG1sXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5vcHRpb25zLmFwcGx5UmVwbGFjZW1lbnRzKHQsdGhpcy50eXBlKTtzd2l0Y2godGhpcy50eXBlKXtjYXNlXCJjb25maXJtXCI6dmFyIG49W1wiPGJ1dHRvbiBjbGFzcz0nXCIuY29uY2F0KGwua2xhc3MuYnV0dG9uLFwiIFwiKS5jb25jYXQobC5rbGFzcy5zdWNjZXNzQnRuLFwiJ2lkPSdcIikuY29uY2F0KGwuaWRzLmNvbmZpcm1PayxcIic+XCIpLmNvbmNhdCh0aGlzLm9wdGlvbnMubGFiZWxzLmNvbmZpcm1PayxcIjwvYnV0dG9uPlwiKV07ITEhPT10aGlzW2wuaWRzLmNvbmZpcm1DYW5jZWxdJiZuLnB1c2goXCI8YnV0dG9uIGNsYXNzPSdcIi5jb25jYXQobC5rbGFzcy5idXR0b24sXCIgXCIpLmNvbmNhdChsLmtsYXNzLmNhbmNlbEJ0bixcIidpZD0nXCIpLmNvbmNhdChsLmlkcy5jb25maXJtQ2FuY2VsLFwiJz5cIikuY29uY2F0KHRoaXMub3B0aW9ucy5sYWJlbHMuY29uZmlybUNhbmNlbCxcIjwvYnV0dG9uPlwiKSksZT1cIlwiLmNvbmNhdCh0aGlzLm9wdGlvbnMuaWNvbih0aGlzLnR5cGUpLFwiPGRpdiBjbGFzcz0nXCIpLmNvbmNhdChsLmtsYXNzLnRpdGxlLFwiJz5cIikuY29uY2F0KHRoaXMub3B0aW9ucy5sYWJlbCh0aGlzLnR5cGUpLCc8L2Rpdj48ZGl2IGNsYXNzPVwiJykuY29uY2F0KGwua2xhc3MuY29udGVudCwnXCI+JykuY29uY2F0KGUsXCI8L2Rpdj48ZGl2IGNsYXNzPSdcIikuY29uY2F0KGwua2xhc3MuYnV0dG9ucyxcIiBcIikuY29uY2F0KGwua2xhc3MuYnV0dG9ucyxcIi1cIikuY29uY2F0KG4ubGVuZ3RoLFwiJz5cIikuY29uY2F0KG4uam9pbihcIlwiKSxcIjwvZGl2PlwiKTticmVhaztjYXNlXCJhc3luYy1ibG9ja1wiOmU9XCJcIi5jb25jYXQoZSwnPGRpdiBjbGFzcz1cIicpLmNvbmNhdChsLmtsYXNzLmRvdEFuaW1hdGlvbiwnXCI+PC9kaXY+Jyl9dGhpcy5uZXdOb2RlLmlubmVySFRNTD0nPGRpdiBjbGFzcz1cIicuY29uY2F0KGwua2xhc3MuYm9keSxcIiBcIikuY29uY2F0KHRoaXMuY2xhc3NOYW1lLCdcIj4nKS5jb25jYXQoZSxcIjwvZGl2PlwiKX19LHtrZXk6XCJrZXl1cExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24odCl7aWYoXCJhc3luYy1ibG9ja1wiPT09dGhpcy50eXBlKXJldHVybiB0LnByZXZlbnREZWZhdWx0KCk7c3dpdGNoKHQuY29kZSl7Y2FzZVwiRXNjYXBlXCI6dC5wcmV2ZW50RGVmYXVsdCgpLHRoaXMuZGVsZXRlKCk7Y2FzZVwiVGFiXCI6aWYodC5wcmV2ZW50RGVmYXVsdCgpLFwiY29uZmlybVwiIT09dGhpcy50eXBlfHwhMT09PXRoaXNbbC5pZHMuY29uZmlybUNhbmNlbF0pcmV0dXJuITA7dmFyIGU9dGhpcy5va0J0bjt0LnNoaWZ0S2V5P2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQ9PWwuaWRzLmNvbmZpcm1PayYmKGU9dGhpcy5jYW5jZWxCdG4pOmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQhPT1sLmlkcy5jb25maXJtQ2FuY2VsJiYoZT10aGlzLmNhbmNlbEJ0biksZS5mb2N1cygpfX19LHtrZXk6XCJhZnRlckluc2VydFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztzd2l0Y2godGhpcy5saXN0ZW5lcj1mdW5jdGlvbihlKXtyZXR1cm4gdC5rZXl1cExpc3RlbmVyKGUpfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIix0aGlzLmxpc3RlbmVyKSx0aGlzLnR5cGUpe2Nhc2VcImFzeW5jLWJsb2NrXCI6dGhpcy5zdGFydD1EYXRlLm5vdygpO2JyZWFrO2Nhc2VcImNvbmZpcm1cIjp0aGlzLm9rQnRuLmZvY3VzKCksdGhpcy5hZGRFdmVudChcImNsaWNrXCIsKGZ1bmN0aW9uKGUpe2lmKFwiQlVUVE9OXCIhPT1lLnRhcmdldC5ub2RlTmFtZSlyZXR1cm4hMTt0LmRlbGV0ZSgpLHRbZS50YXJnZXQuaWRdJiZ0W2UudGFyZ2V0LmlkXSgpfSkpO2JyZWFrO2RlZmF1bHQ6ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCksdGhpcy5hZGRFdmVudChcImNsaWNrXCIsKGZ1bmN0aW9uKGUpe2UudGFyZ2V0LmlkPT09dC5uZXdOb2RlLmlkJiZ0LmRlbGV0ZSgpfSkpfX19LHtrZXk6XCJhZnRlckRlbGV0ZVwiLHZhbHVlOmZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5saXN0ZW5lcil9fSx7a2V5Olwib2tCdG5cIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobC5pZHMuY29uZmlybU9rKX19LHtrZXk6XCJjYW5jZWxCdG5cIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobC5pZHMuY29uZmlybUNhbmNlbCl9fV0pJiZFKGUucHJvdG90eXBlLG4pLGF9KGQpO2Z1bmN0aW9uIEModCl7cmV0dXJuIEM9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0sQyh0KX1mdW5jdGlvbiBEKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiB4KHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciBvPWVbbl07by5lbnVtZXJhYmxlPW8uZW51bWVyYWJsZXx8ITEsby5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbyYmKG8ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG8ua2V5LG8pfX12YXIgQj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e307RCh0aGlzLHQpLHRoaXMub3B0aW9ucz1uZXcgYShlKX12YXIgZSxuO3JldHVybiBlPXQsKG49W3trZXk6XCJ0aXBcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLl9hZGRUb2FzdCh0LFwidGlwXCIsZSkuZWx9fSx7a2V5OlwiaW5mb1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJpbmZvXCIsZSkuZWx9fSx7a2V5Olwic3VjY2Vzc1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJzdWNjZXNzXCIsZSkuZWx9fSx7a2V5Olwid2FybmluZ1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuX2FkZFRvYXN0KHQsXCJ3YXJuaW5nXCIsZSkuZWx9fSx7a2V5OlwiYWxlcnRcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLl9hZGRUb2FzdCh0LFwiYWxlcnRcIixlKS5lbH19LHtrZXk6XCJhc3luY1wiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLG8scil7dmFyIGk9dGhpcy5fYWRkVG9hc3QobyxcImFzeW5jXCIscik7cmV0dXJuIHRoaXMuX2FmdGVyQXN5bmModCxlLG4scixpKX19LHtrZXk6XCJjb25maXJtXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4sbyl7cmV0dXJuIHRoaXMuX2FkZFBvcHVwKHQsXCJjb25maXJtXCIsbyxlLG4pfX0se2tleTpcImFzeW5jQmxvY2tcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvLHIpe3ZhciBpPXRoaXMuX2FkZFBvcHVwKG8sXCJhc3luYy1ibG9ja1wiLHIpO3JldHVybiB0aGlzLl9hZnRlckFzeW5jKHQsZSxuLHIsaSl9fSx7a2V5OlwibW9kYWxcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMuX2FkZFBvcHVwKHQsZSxuKX19LHtrZXk6XCJjbG9zZVRvYXN0c1wiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMuY29udGFpbmVyO3QuZmlyc3RDaGlsZDspdC5yZW1vdmVDaGlsZCh0LmZpcnN0Q2hpbGQpfX0se2tleTpcIl9hZGRQb3B1cFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLG8scil7cmV0dXJuIG5ldyBQKHQsZSx0aGlzLm9wdGlvbnMub3ZlcnJpZGUobiksbyxyKX19LHtrZXk6XCJfYWRkVG9hc3RcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvKXtuPXRoaXMub3B0aW9ucy5vdmVycmlkZShuKTt2YXIgcj1uZXcgdyh0LGUsbix0aGlzLmNvbnRhaW5lcik7cmV0dXJuIG8/byBpbnN0YW5jZW9mIFA/by5kZWxldGUoKS50aGVuKChmdW5jdGlvbigpe3JldHVybiByLmluc2VydCgpfSkpOm8ucmVwbGFjZShyKTpyLmluc2VydCgpfX0se2tleTpcIl9hZnRlckFzeW5jXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4sbyxyKXtyZXR1cm4gdC50aGVuKHRoaXMuX3Jlc3BvbnNlSGFuZGxlcihlLFwic3VjY2Vzc1wiLG8sciksdGhpcy5fcmVzcG9uc2VIYW5kbGVyKG4sXCJhbGVydFwiLG8scikpfX0se2tleTpcIl9yZXNwb25zZUhhbmRsZXJcIix2YWx1ZTpmdW5jdGlvbih0LGUsbixvKXt2YXIgcj10aGlzO3JldHVybiBmdW5jdGlvbihpKXtzd2l0Y2goQyh0KSl7Y2FzZVwidW5kZWZpbmVkXCI6Y2FzZVwic3RyaW5nXCI6dmFyIGE9XCJhbGVydFwiPT09ZT90fHxpOnQ7ci5fYWRkVG9hc3QoYSxlLG4sbyk7YnJlYWs7ZGVmYXVsdDpvLmRlbGV0ZSgpLnRoZW4oKGZ1bmN0aW9uKCl7dCYmdChpKX0pKX19fX0se2tleTpcIl9jcmVhdGVDb250YWluZXJcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBuZXcgZChkb2N1bWVudC5ib2R5LHUuaWRzLmNvbnRhaW5lcixcImF3bi1cIi5jb25jYXQodGhpcy5vcHRpb25zLnBvc2l0aW9uKSkuaW5zZXJ0KCkuZWx9fSx7a2V5OlwiY29udGFpbmVyXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHUuaWRzLmNvbnRhaW5lcil8fHRoaXMuX2NyZWF0ZUNvbnRhaW5lcigpfX1dKSYmeChlLnByb3RvdHlwZSxuKSx0fSgpO3JldHVybiBlfSkoKX0pKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImNvbnN0IGNyZWF0ZVJvb21CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lkZS1tZW51X19jcmVhdGUtcm9vbScpO1xyXG5jb25zdCBjcmVhdGVSb29tTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLXJvb20tbW9kYWwnKTtcclxuY29uc3QgY2xvc2VNb2RhbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbF9fYm9keV9fY2xvc2UnKTtcclxuXHJcbmlmIChjcmVhdGVSb29tQnRuKSB7XHJcbiAgICBjcmVhdGVSb29tQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNyZWF0ZVJvb21Nb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbC0tYWN0aXZlJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYgKGNsb3NlTW9kYWxCdG4pIHtcclxuICAgIGNsb3NlTW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY3JlYXRlUm9vbU1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gT3RoZXIgc3R1ZmZcclxuaW1wb3J0IEFXTiBmcm9tICdhd2Vzb21lLW5vdGlmaWNhdGlvbnMnO1xyXG5pbXBvcnQgKiBhcyBzaWduYWxSIGZyb20gXCJAbWljcm9zb2Z0L3NpZ25hbHJcIjtcclxuXHJcbmNvbnN0IGNvbiA9IG5ldyBzaWduYWxSLkh1YkNvbm5lY3Rpb25CdWlsZGVyKClcclxuICAgIC53aXRoVXJsKFwiL25vdGlmaWNhdGlvbkh1YlwiKVxyXG4gICAgLmJ1aWxkKCk7XHJcblxyXG5jb24ub24oXCJOb3RpZnlBbGxcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGNvbnN0IG5vdGlmaWVyID0gbmV3IEFXTih7XHJcbiAgICAgICAgcG9zaXRpb246ICd0b3AtcmlnaHQnLFxyXG4gICAgfSk7XHJcbiAgICBub3RpZmllci5zdWNjZXNzKGRhdGEudGV4dCk7XHJcbn0pO1xyXG5cclxuY29uLnN0YXJ0KCk7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImFwcC5jc3NcIjsiXSwibmFtZXMiOlsiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iXSwic291cmNlUm9vdCI6IiJ9