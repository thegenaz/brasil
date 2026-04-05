// Gerencia leitura e escrita no Google Sheets via Apps Script
class GoogleSheetsManager {
    constructor() {
        this.enabled = false;
        this.scriptUrl = null;
    }

    init(scriptUrl) {
        if (!scriptUrl) {
            console.warn('⚠️ Google Apps Script URL não configurada.');
            return;
        }

        this.scriptUrl = scriptUrl;
        this.enabled = true;
        console.log('✅ Google Sheets inicializado');
    }

    async saveCandidate(candidate) {
        if (!this.enabled) return false;
        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'saveCandidate',
                    data: candidate
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log(`✅ Candidato "${candidate.name}" salvo no Google Sheets`);
                return true;
            } else {
                console.error('❌ Erro ao salvar candidato:', result.error);
                return false;
            }
        } catch (e) {
            console.error('❌ Erro ao salvar candidato no Google Sheets:', e);
            return false;
        }
    }

    async getCandidates() {
        if (!this.enabled) return [];
        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getCandidates'
                })
            });

            const result = await response.json();
            if (result.success) {
                return result.data || [];
            } else {
                console.error('❌ Erro ao carregar candidatos:', result.error);
                return [];
            }
        } catch (e) {
            console.error('❌ Erro ao carregar candidatos do Google Sheets:', e);
            return [];
        }
    }

    async saveUserResponse(user) {
        if (!this.enabled) return false;
        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'saveUserResponse',
                    data: user
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('✅ Resposta do usuário salva no Google Sheets');
                return true;
            } else {
                console.error('❌ Erro ao salvar resposta do usuário:', result.error);
                return false;
            }
        } catch (e) {
            console.error('❌ Erro ao salvar resposta do usuário no Google Sheets:', e);
            return false;
        }
    }

    async getUserResponses() {
        if (!this.enabled) return [];
        try {
            const response = await fetch(this.scriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getUserResponses'
                })
            });

            const result = await response.json();
            if (result.success) {
                return result.data || [];
            } else {
                console.error('❌ Erro ao carregar respostas de usuários:', result.error);
                return [];
            }
        } catch (e) {
            console.error('❌ Erro ao carregar respostas de usuários do Google Sheets:', e);
            return [];
        }
    }
}

const googleSheetsManager = new GoogleSheetsManager();