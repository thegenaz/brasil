// ⚠️ TEMPLATE DE CONFIGURAÇÃO
// Copie este arquivo para config.js e adicione as credenciais do Firebase ou Google Apps Script
// NÃO FAÇA COMMIT do config.js com dados sensíveis!

const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyDRpbo28T2bYmyrfHwHzMJG-CG23qAQcCQ',
    authDomain: 'quizwar-b4bc7.firebaseapp.com',
    projectId: 'quizwar-b4bc7',
    storageBucket: 'quizwar-b4bc7.firebasestorage.app',
    messagingSenderId: '747141031490',
    appId: '1:747141031490:web:26f314c265d46b161c2fdb',
    measurementId: 'G-Q2YZYVV66N'
};

// Google Apps Script URL (para alternativa gratuita ao Firebase)
const GOOGLE_APPS_SCRIPT_URL = 'SEU_APPS_SCRIPT_URL_AQUI'; // Cole aqui a URL do seu Apps Script

// Inicializar Firebase (se configurado)
if (typeof firebaseManager !== 'undefined' && FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.apiKey !== 'SEU_API_KEY_AQUI') {
    firebaseManager.init(FIREBASE_CONFIG);
} else {
    console.warn('⚠️ Firebase não configurado. Use config.js para definir FIREBASE_CONFIG.');
}

// Inicializar Google Sheets (se configurado)
if (typeof googleSheetsManager !== 'undefined' && GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL !== 'SEU_APPS_SCRIPT_URL_AQUI') {
    googleSheetsManager.init(GOOGLE_APPS_SCRIPT_URL);
} else {
    console.warn('⚠️ Google Apps Script não configurado. Use config.js para definir GOOGLE_APPS_SCRIPT_URL.');
}
