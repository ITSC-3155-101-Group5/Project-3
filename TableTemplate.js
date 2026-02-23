"use strict";

function TableTemplate(template) {
  this.template = template;
}

TableTemplate.fillIn = function (tableId, dictionary, columnName) {

    const table = document.getElementById(tableId);
    if (!table) return;

    const rows = table.rows;
    if (!rows || rows.length === 0) return;

    const headerRow = rows[0];
    const headerCells = headerRow.cells;

    let columnIndex = -1;

    // Process Header Row
    for (let i = 0; i < headerCells.length; i++) {
        const cell = headerCells[i];

        // Use TemplateProcessor as required
        const processor = new TemplateProcessor(cell.innerHTML);
        cell.innerHTML = processor.fillIn(dictionary);

        // Determine column index AFTER header replacement
        if (columnName && cell.textContent.trim() === columnName) {
            columnIndex = i;
        }
    }

    // If columnName provided but not found,
    // return without modifying body (header already processed)
    if (columnName && columnIndex === -1) {
        if (table.style.visibility === "hidden") {
            table.style.visibility = "visible";
        }
        return;
    }

    // Process body rows
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;

        for (let j = 0; j < cells.length; j++) {

            // If columnName specified, only process that column
            if (columnName && j !== columnIndex) continue;

            const cell = cells[j];

            const processor = new TemplateProcessor(cell.innerHTML);
            cell.innerHTML = processor.fillIn(dictionary);
        }
    }

    // Make Table Visible
    if (table.style.visibility === "hidden") {
        table.style.visibility = "visible";
    }
};
