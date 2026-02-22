"use strict";

function TableTemplate(template) {
  this.template = template;
}

TableTemplate.fillIn = function (tableId, dictionary, columnName) {

    const table = document.getElementById(tableId);

    if (!table) {
        return;
    }

    const rows = table.rows;

    if (!rows || rows.length === 0) {
        return;
    }

    const headerRow = rows[0];
    const headerCells = headerRow.cells;

    for (let i = 0; i < headerCells.length; i++) {
        const cell = headerCells[i];
        let text = cell.innerHTML;

        text = text.replace(/{{(.*?)}}/g, function(match, property) {
            property = property.trim();
            if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
                return dictionary[property];
            }
            return "";
        });

        cell.innerHTML = text;
    }

};