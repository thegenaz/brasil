// Código completo para Google Apps Script
// Cole este código INTEIRO no Apps Script da sua planilha Google Sheets

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();

  try {
    if (data.action === 'saveCandidate') {
      const candidatesSheet = sheet.getSheetByName('Candidates');
      if (!candidatesSheet) throw new Error('Aba Candidates não encontrada');

      const candidate = data.data;
      candidatesSheet.appendRow([
        candidate.name,
        JSON.stringify(candidate.answers),
        candidate.savedAt || new Date().toISOString()
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);

    } else if (data.action === 'getCandidates') {
      const candidatesSheet = sheet.getSheetByName('Candidates');
      if (!candidatesSheet) throw new Error('Aba Candidates não encontrada');

      const data = candidatesSheet.getDataRange().getValues();
      const candidates = [];

      // Pular cabeçalho
      for (let i = 1; i < data.length; i++) {
        if (data[i][0]) { // Se tem nome
          candidates.push({
            name: data[i][0],
            answers: JSON.parse(data[i][1] || '[]'),
            savedAt: data[i][2] || new Date().toISOString()
          });
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({success: true, data: candidates}))
        .setMimeType(ContentService.MimeType.JSON);

    } else if (data.action === 'saveUserResponse') {
      const responsesSheet = sheet.getSheetByName('UserResponses');
      if (!responsesSheet) throw new Error('Aba UserResponses não encontrada');

      const user = data.data;
      responsesSheet.appendRow([
        user.id,
        JSON.stringify(user.answers),
        user.timestamp || new Date().toISOString()
      ]);

      return ContentService
        .createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);

    } else if (data.action === 'getUserResponses') {
      const responsesSheet = sheet.getSheetByName('UserResponses');
      if (!responsesSheet) throw new Error('Aba UserResponses não encontrada');

      const data = responsesSheet.getDataRange().getValues();
      const responses = [];

      // Pular cabeçalho
      for (let i = 1; i < data.length; i++) {
        if (data[i][0]) { // Se tem ID
          responses.push({
            id: data[i][0],
            answers: JSON.parse(data[i][1] || '[]'),
            timestamp: data[i][2] || new Date().toISOString()
          });
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({success: true, data: responses}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Ação desconhecida'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}