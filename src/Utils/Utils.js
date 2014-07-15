/*
* Copyright (c) 2014 Jose Carlos Lama. www.typedom.org
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
*/
var Utils = (function () {
    function Utils() {
    }
    // This code is not mine. I found it on th web. I am look for author.
    Utils.generateRandomUUID = function () {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = ['', '', '', '', '', '', '', '', '-', '', '', '', '', '-', '4', '', '', '', '-', '', '', '', '', '-', '', '', '', '', '', '', '', '', '', '', '', ''], i = 36, rnd = 0, r;

        while (i--) {
            if (uuid[i] === '') {
                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                }
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }

        return uuid.join('');
    };
    return Utils;
})();
//# sourceMappingURL=Utils.js.map
