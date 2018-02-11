"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatList(list) {
    let newList = list.replace(', ', '');
    newList = newList.replace(/,\s([^,]+)$/, ' y $1');
    return newList;
}
exports.formatList = formatList;
//# sourceMappingURL=stringFormat.js.map