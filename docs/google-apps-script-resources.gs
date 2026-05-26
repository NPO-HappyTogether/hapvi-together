/**
 * HapVi Together — community resources CMS (Phase 9)
 * Deploy as web app: Execute as Me, Access: Anyone
 * GET ?type=resources → { "data": [ ... ] }
 *
 * Sheet tab: community_resources (or filter by type column)
 * Columns: id, category, name_ko, name_en, name_es, desc_ko, desc_en, desc_es, url, active
 */
function doGet(e) {
  const type = (e && e.parameter && e.parameter.type) || "";
  if (type !== "resources") {
    return ContentService.createTextOutput(JSON.stringify({data: []})).setMimeType(
      ContentService.MimeType.JSON,
    );
  }

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("community_resources") ||
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) {
    return jsonResponse({data: []});
  }

  const headers = rows[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });
  const data = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    var active = String(obj.active || "TRUE").toUpperCase();
    if (active === "FALSE" || active === "0" || active === "NO") continue;
    data.push({
      id: String(obj.id || ""),
      category: String(obj.category || "").toLowerCase(),
      name_ko: String(obj.name_ko || ""),
      name_en: String(obj.name_en || ""),
      name_es: String(obj.name_es || ""),
      desc_ko: String(obj.desc_ko || ""),
      desc_en: String(obj.desc_en || ""),
      desc_es: String(obj.desc_es || ""),
      url: String(obj.url || ""),
    });
  }

  return jsonResponse({data: data});
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
