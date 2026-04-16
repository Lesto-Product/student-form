function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Дата', 'Име', 'Клас', 'Отбор', 'Планове', 'Хобита', 'Умения', 'Друго умение', 'Посоки', 'Проекти', 'Своя идея', 'Проблем', 'Целева група', 'Валидация', 'Роля', 'Приоритет', 'AI инструменти', 'Допълнително']);
  }

  sheet.appendRow([
    new Date().toLocaleString('bg-BG'),
    data.name || '',
    data.grade || '',
    data.team || '',
    data.future || '',
    data.hobbies || '',
    data.skills || '',
    data.otherSkill || '',
    data.categories || '',
    data.projects || '',
    data.ownIdea || '',
    data.ownProblem || '',
    data.ownTarget || '',
    data.ownValidation || '',
    data.role || '',
    data.priority || '',
    data.aiTools || '',
    data.extra || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
}
