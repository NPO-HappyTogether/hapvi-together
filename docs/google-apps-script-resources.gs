/**
 * HapVi Together — community_resources CMS (read-only GET)
 * 스프레드시트 탭 이름: community_resources
 * 배포: 웹 앱 → exec URL → RESOURCES_CMS_URL
 */
const SHEET_NAME = "community_resources";

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return jsonResponse({resources: [], error: "sheet_not_found"});
  }

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) {
    return jsonResponse({resources: []});
  }

  const headers = rows[0].map(String);
  const resources = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    headers.forEach((h, j) => {
      obj[h] = row[j];
    });

    const active = String(obj.active || "").toUpperCase() === "TRUE";
    if (!active) continue;

    resources.push({
      id: String(obj.id || "").trim(),
      category: String(obj.category || "other").trim().toLowerCase(),
      title_ko: String(obj.title_ko || "").trim(),
      title_en: String(obj.title_en || "").trim(),
      title_es: String(obj.title_es || "").trim(),
      description_ko: String(obj.description_ko || "").trim(),
      description_en: String(obj.description_en || "").trim(),
      description_es: String(obj.description_es || "").trim(),
      url: String(obj.url || "").trim(),
      sort_order: Number(obj.sort_order) || 999,
      last_verified: String(obj.last_verified || "").trim(),
    });
  }

  resources.sort((a, b) => a.sort_order - b.sort_order);
  return jsonResponse({resources});
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
