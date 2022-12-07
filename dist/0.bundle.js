(window["webpackJsonpPersonaQuote"] = window["webpackJsonpPersonaQuote"] || []).push([[0],{

/***/ "./node_modules/node-fetch/src/utils/multipart-parser.js":
/*!***************************************************************!*\
  !*** ./node_modules/node-fetch/src/utils/multipart-parser.js ***!
  \***************************************************************/
/*! exports provided: toFormData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toFormData\", function() { return toFormData; });\n/* harmony import */ var fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fetch-blob/from.js */ \"./node_modules/fetch-blob/from.js\");\n/* harmony import */ var fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formdata-polyfill/esm.min.js */ \"./node_modules/formdata-polyfill/esm.min.js\");\n/* harmony import */ var formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nlet s = 0;\nconst S = {\n\tSTART_BOUNDARY: s++,\n\tHEADER_FIELD_START: s++,\n\tHEADER_FIELD: s++,\n\tHEADER_VALUE_START: s++,\n\tHEADER_VALUE: s++,\n\tHEADER_VALUE_ALMOST_DONE: s++,\n\tHEADERS_ALMOST_DONE: s++,\n\tPART_DATA_START: s++,\n\tPART_DATA: s++,\n\tEND: s++\n};\n\nlet f = 1;\nconst F = {\n\tPART_BOUNDARY: f,\n\tLAST_BOUNDARY: f *= 2\n};\n\nconst LF = 10;\nconst CR = 13;\nconst SPACE = 32;\nconst HYPHEN = 45;\nconst COLON = 58;\nconst A = 97;\nconst Z = 122;\n\nconst lower = c => c | 0x20;\n\nconst noop = () => {};\n\nclass MultipartParser {\n\t/**\n\t * @param {string} boundary\n\t */\n\tconstructor(boundary) {\n\t\tthis.index = 0;\n\t\tthis.flags = 0;\n\n\t\tthis.onHeaderEnd = noop;\n\t\tthis.onHeaderField = noop;\n\t\tthis.onHeadersEnd = noop;\n\t\tthis.onHeaderValue = noop;\n\t\tthis.onPartBegin = noop;\n\t\tthis.onPartData = noop;\n\t\tthis.onPartEnd = noop;\n\n\t\tthis.boundaryChars = {};\n\n\t\tboundary = '\\r\\n--' + boundary;\n\t\tconst ui8a = new Uint8Array(boundary.length);\n\t\tfor (let i = 0; i < boundary.length; i++) {\n\t\t\tui8a[i] = boundary.charCodeAt(i);\n\t\t\tthis.boundaryChars[ui8a[i]] = true;\n\t\t}\n\n\t\tthis.boundary = ui8a;\n\t\tthis.lookbehind = new Uint8Array(this.boundary.length + 8);\n\t\tthis.state = S.START_BOUNDARY;\n\t}\n\n\t/**\n\t * @param {Uint8Array} data\n\t */\n\twrite(data) {\n\t\tlet i = 0;\n\t\tconst length_ = data.length;\n\t\tlet previousIndex = this.index;\n\t\tlet {lookbehind, boundary, boundaryChars, index, state, flags} = this;\n\t\tconst boundaryLength = this.boundary.length;\n\t\tconst boundaryEnd = boundaryLength - 1;\n\t\tconst bufferLength = data.length;\n\t\tlet c;\n\t\tlet cl;\n\n\t\tconst mark = name => {\n\t\t\tthis[name + 'Mark'] = i;\n\t\t};\n\n\t\tconst clear = name => {\n\t\t\tdelete this[name + 'Mark'];\n\t\t};\n\n\t\tconst callback = (callbackSymbol, start, end, ui8a) => {\n\t\t\tif (start === undefined || start !== end) {\n\t\t\t\tthis[callbackSymbol](ui8a && ui8a.subarray(start, end));\n\t\t\t}\n\t\t};\n\n\t\tconst dataCallback = (name, clear) => {\n\t\t\tconst markSymbol = name + 'Mark';\n\t\t\tif (!(markSymbol in this)) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif (clear) {\n\t\t\t\tcallback(name, this[markSymbol], i, data);\n\t\t\t\tdelete this[markSymbol];\n\t\t\t} else {\n\t\t\t\tcallback(name, this[markSymbol], data.length, data);\n\t\t\t\tthis[markSymbol] = 0;\n\t\t\t}\n\t\t};\n\n\t\tfor (i = 0; i < length_; i++) {\n\t\t\tc = data[i];\n\n\t\t\tswitch (state) {\n\t\t\t\tcase S.START_BOUNDARY:\n\t\t\t\t\tif (index === boundary.length - 2) {\n\t\t\t\t\t\tif (c === HYPHEN) {\n\t\t\t\t\t\t\tflags |= F.LAST_BOUNDARY;\n\t\t\t\t\t\t} else if (c !== CR) {\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tindex++;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t} else if (index - 1 === boundary.length - 2) {\n\t\t\t\t\t\tif (flags & F.LAST_BOUNDARY && c === HYPHEN) {\n\t\t\t\t\t\t\tstate = S.END;\n\t\t\t\t\t\t\tflags = 0;\n\t\t\t\t\t\t} else if (!(flags & F.LAST_BOUNDARY) && c === LF) {\n\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t\tcallback('onPartBegin');\n\t\t\t\t\t\t\tstate = S.HEADER_FIELD_START;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (c !== boundary[index + 2]) {\n\t\t\t\t\t\tindex = -2;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (c === boundary[index + 2]) {\n\t\t\t\t\t\tindex++;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.HEADER_FIELD_START:\n\t\t\t\t\tstate = S.HEADER_FIELD;\n\t\t\t\t\tmark('onHeaderField');\n\t\t\t\t\tindex = 0;\n\t\t\t\t\t// falls through\n\t\t\t\tcase S.HEADER_FIELD:\n\t\t\t\t\tif (c === CR) {\n\t\t\t\t\t\tclear('onHeaderField');\n\t\t\t\t\t\tstate = S.HEADERS_ALMOST_DONE;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t\tindex++;\n\t\t\t\t\tif (c === HYPHEN) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (c === COLON) {\n\t\t\t\t\t\tif (index === 1) {\n\t\t\t\t\t\t\t// empty header field\n\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tdataCallback('onHeaderField', true);\n\t\t\t\t\t\tstate = S.HEADER_VALUE_START;\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t\tcl = lower(c);\n\t\t\t\t\tif (cl < A || cl > Z) {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.HEADER_VALUE_START:\n\t\t\t\t\tif (c === SPACE) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\n\t\t\t\t\tmark('onHeaderValue');\n\t\t\t\t\tstate = S.HEADER_VALUE;\n\t\t\t\t\t// falls through\n\t\t\t\tcase S.HEADER_VALUE:\n\t\t\t\t\tif (c === CR) {\n\t\t\t\t\t\tdataCallback('onHeaderValue', true);\n\t\t\t\t\t\tcallback('onHeaderEnd');\n\t\t\t\t\t\tstate = S.HEADER_VALUE_ALMOST_DONE;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.HEADER_VALUE_ALMOST_DONE:\n\t\t\t\t\tif (c !== LF) {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tstate = S.HEADER_FIELD_START;\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.HEADERS_ALMOST_DONE:\n\t\t\t\t\tif (c !== LF) {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tcallback('onHeadersEnd');\n\t\t\t\t\tstate = S.PART_DATA_START;\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.PART_DATA_START:\n\t\t\t\t\tstate = S.PART_DATA;\n\t\t\t\t\tmark('onPartData');\n\t\t\t\t\t// falls through\n\t\t\t\tcase S.PART_DATA:\n\t\t\t\t\tpreviousIndex = index;\n\n\t\t\t\t\tif (index === 0) {\n\t\t\t\t\t\t// boyer-moore derrived algorithm to safely skip non-boundary data\n\t\t\t\t\t\ti += boundaryEnd;\n\t\t\t\t\t\twhile (i < bufferLength && !(data[i] in boundaryChars)) {\n\t\t\t\t\t\t\ti += boundaryLength;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\ti -= boundaryEnd;\n\t\t\t\t\t\tc = data[i];\n\t\t\t\t\t}\n\n\t\t\t\t\tif (index < boundary.length) {\n\t\t\t\t\t\tif (boundary[index] === c) {\n\t\t\t\t\t\t\tif (index === 0) {\n\t\t\t\t\t\t\t\tdataCallback('onPartData', true);\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tindex++;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if (index === boundary.length) {\n\t\t\t\t\t\tindex++;\n\t\t\t\t\t\tif (c === CR) {\n\t\t\t\t\t\t\t// CR = part boundary\n\t\t\t\t\t\t\tflags |= F.PART_BOUNDARY;\n\t\t\t\t\t\t} else if (c === HYPHEN) {\n\t\t\t\t\t\t\t// HYPHEN = end boundary\n\t\t\t\t\t\t\tflags |= F.LAST_BOUNDARY;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if (index - 1 === boundary.length) {\n\t\t\t\t\t\tif (flags & F.PART_BOUNDARY) {\n\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t\tif (c === LF) {\n\t\t\t\t\t\t\t\t// unset the PART_BOUNDARY flag\n\t\t\t\t\t\t\t\tflags &= ~F.PART_BOUNDARY;\n\t\t\t\t\t\t\t\tcallback('onPartEnd');\n\t\t\t\t\t\t\t\tcallback('onPartBegin');\n\t\t\t\t\t\t\t\tstate = S.HEADER_FIELD_START;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else if (flags & F.LAST_BOUNDARY) {\n\t\t\t\t\t\t\tif (c === HYPHEN) {\n\t\t\t\t\t\t\t\tcallback('onPartEnd');\n\t\t\t\t\t\t\t\tstate = S.END;\n\t\t\t\t\t\t\t\tflags = 0;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tindex = 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tif (index > 0) {\n\t\t\t\t\t\t// when matching a possible boundary, keep a lookbehind reference\n\t\t\t\t\t\t// in case it turns out to be a false lead\n\t\t\t\t\t\tlookbehind[index - 1] = c;\n\t\t\t\t\t} else if (previousIndex > 0) {\n\t\t\t\t\t\t// if our boundary turned out to be rubbish, the captured lookbehind\n\t\t\t\t\t\t// belongs to partData\n\t\t\t\t\t\tconst _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);\n\t\t\t\t\t\tcallback('onPartData', 0, previousIndex, _lookbehind);\n\t\t\t\t\t\tpreviousIndex = 0;\n\t\t\t\t\t\tmark('onPartData');\n\n\t\t\t\t\t\t// reconsider the current character even so it interrupted the sequence\n\t\t\t\t\t\t// it could be the beginning of a new sequence\n\t\t\t\t\t\ti--;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\tcase S.END:\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\tthrow new Error(`Unexpected state entered: ${state}`);\n\t\t\t}\n\t\t}\n\n\t\tdataCallback('onHeaderField');\n\t\tdataCallback('onHeaderValue');\n\t\tdataCallback('onPartData');\n\n\t\t// Update properties for the next call\n\t\tthis.index = index;\n\t\tthis.state = state;\n\t\tthis.flags = flags;\n\t}\n\n\tend() {\n\t\tif ((this.state === S.HEADER_FIELD_START && this.index === 0) ||\n\t\t\t(this.state === S.PART_DATA && this.index === this.boundary.length)) {\n\t\t\tthis.onPartEnd();\n\t\t} else if (this.state !== S.END) {\n\t\t\tthrow new Error('MultipartParser.end(): stream ended unexpectedly');\n\t\t}\n\t}\n}\n\nfunction _fileName(headerValue) {\n\t// matches either a quoted-string or a token (RFC 2616 section 19.5.1)\n\tconst m = headerValue.match(/\\bfilename=(\"(.*?)\"|([^()<>@,;:\\\\\"/[\\]?={}\\s\\t]+))($|;\\s)/i);\n\tif (!m) {\n\t\treturn;\n\t}\n\n\tconst match = m[2] || m[3] || '';\n\tlet filename = match.slice(match.lastIndexOf('\\\\') + 1);\n\tfilename = filename.replace(/%22/g, '\"');\n\tfilename = filename.replace(/&#(\\d{4});/g, (m, code) => {\n\t\treturn String.fromCharCode(code);\n\t});\n\treturn filename;\n}\n\nasync function toFormData(Body, ct) {\n\tif (!/multipart/i.test(ct)) {\n\t\tthrow new TypeError('Failed to fetch');\n\t}\n\n\tconst m = ct.match(/boundary=(?:\"([^\"]+)\"|([^;]+))/i);\n\n\tif (!m) {\n\t\tthrow new TypeError('no or bad content-type header, no multipart boundary');\n\t}\n\n\tconst parser = new MultipartParser(m[1] || m[2]);\n\n\tlet headerField;\n\tlet headerValue;\n\tlet entryValue;\n\tlet entryName;\n\tlet contentType;\n\tlet filename;\n\tconst entryChunks = [];\n\tconst formData = new formdata_polyfill_esm_min_js__WEBPACK_IMPORTED_MODULE_1__[\"FormData\"]();\n\n\tconst onPartData = ui8a => {\n\t\tentryValue += decoder.decode(ui8a, {stream: true});\n\t};\n\n\tconst appendToFile = ui8a => {\n\t\tentryChunks.push(ui8a);\n\t};\n\n\tconst appendFileToFormData = () => {\n\t\tconst file = new fetch_blob_from_js__WEBPACK_IMPORTED_MODULE_0__[\"File\"](entryChunks, filename, {type: contentType});\n\t\tformData.append(entryName, file);\n\t};\n\n\tconst appendEntryToFormData = () => {\n\t\tformData.append(entryName, entryValue);\n\t};\n\n\tconst decoder = new TextDecoder('utf-8');\n\tdecoder.decode();\n\n\tparser.onPartBegin = function () {\n\t\tparser.onPartData = onPartData;\n\t\tparser.onPartEnd = appendEntryToFormData;\n\n\t\theaderField = '';\n\t\theaderValue = '';\n\t\tentryValue = '';\n\t\tentryName = '';\n\t\tcontentType = '';\n\t\tfilename = null;\n\t\tentryChunks.length = 0;\n\t};\n\n\tparser.onHeaderField = function (ui8a) {\n\t\theaderField += decoder.decode(ui8a, {stream: true});\n\t};\n\n\tparser.onHeaderValue = function (ui8a) {\n\t\theaderValue += decoder.decode(ui8a, {stream: true});\n\t};\n\n\tparser.onHeaderEnd = function () {\n\t\theaderValue += decoder.decode();\n\t\theaderField = headerField.toLowerCase();\n\n\t\tif (headerField === 'content-disposition') {\n\t\t\t// matches either a quoted-string or a token (RFC 2616 section 19.5.1)\n\t\t\tconst m = headerValue.match(/\\bname=(\"([^\"]*)\"|([^()<>@,;:\\\\\"/[\\]?={}\\s\\t]+))/i);\n\n\t\t\tif (m) {\n\t\t\t\tentryName = m[2] || m[3] || '';\n\t\t\t}\n\n\t\t\tfilename = _fileName(headerValue);\n\n\t\t\tif (filename) {\n\t\t\t\tparser.onPartData = appendToFile;\n\t\t\t\tparser.onPartEnd = appendFileToFormData;\n\t\t\t}\n\t\t} else if (headerField === 'content-type') {\n\t\t\tcontentType = headerValue;\n\t\t}\n\n\t\theaderValue = '';\n\t\theaderField = '';\n\t};\n\n\tfor await (const chunk of Body) {\n\t\tparser.write(chunk);\n\t}\n\n\tparser.end();\n\n\treturn formData;\n}\n\n\n//# sourceURL=webpack://PersonaQuote/./node_modules/node-fetch/src/utils/multipart-parser.js?");

/***/ })

}]);