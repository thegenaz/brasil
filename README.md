# brasil
Eleição do Brasil

Este repositório agora está configurado para funcionar com Firebase Firestore ou Google Sheets via Apps Script. Você pode copiar os arquivos para o repositório `rodrigueshstoria` e testar lá.

## Configuração do Firebase (Opção 1 - Recomendada)

Para usar o app, crie um aplicativo web no Firebase e preencha `FIREBASE_CONFIG` em `config.js` com as credenciais do seu projeto.

O arquivo deve ter este formato:

```javascript
const FIREBASE_CONFIG = {
    apiKey: 'SEU_API_KEY_AQUI',
    authDomain: 'SEU_PROJECT_ID.firebaseapp.com',
    projectId: 'SEU_PROJECT_ID',
    storageBucket: 'SEU_PROJECT_ID.appspot.com',
    messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
    appId: 'SEU_APP_ID',
    measurementId: 'SEU_MEASUREMENT_ID'
};
```

### Importante
- Não faça commit de `config.js` com credenciais reais.
- Verifique as regras do Firestore para permitir gravação/leitura enquanto estiver testando.
- O app salva respostas de usuários e candidatos no Firestore quando o Firebase estiver configurado.

## Configuração do Google Sheets (Opção 2 - Gratuita e Simples)

Se preferir uma alternativa gratuita sem Firebase, use Google Sheets + Apps Script:

### 1. Criar uma planilha no Google Sheets
- Acesse [sheets.google.com](https://sheets.google.com)
- Crie uma nova planilha
- Nomeie as abas como "Candidates" e "UserResponses"

### 2. Criar um Apps Script
- Na planilha, vá em `Extensões` → `Apps Script`
- **Apague qualquer código existente**
- **Cole exatamente este código completo** (também disponível no arquivo `apps-script-code.js`):

```javascript
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
```

**IMPORTANTE:** O código deve estar dentro da função `doPost(e)` - é assim que o Google Apps Script funciona para receber requisições web.

```javascript
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
```

### 3. Publicar o Apps Script
- Clique em `Salvar` e depois `Executar` para testar
- Vá em `Publicar` → `Implantar como aplicativo da web`
- Execute como "Eu", acesso "Qualquer pessoa"
- Copie a URL gerada

### 4. Configurar no config.js
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_SCRIPT_ID/exec';
```

### Vantagens do Google Sheets
- 100% gratuito
- Não precisa de servidor
- Dados ficam visíveis na planilha
- Fácil de editar/manter
