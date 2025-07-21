// src/api/api.js
// NOVO ARQUIVO: Centraliza a configuração da API.
// É uma boa prática ter a URL base da API em um único lugar.

// !!! IMPORTANTE !!!
// Se estiver a testar num emulador Android, use 'http://10.0.2.2:3000'.
// Se estiver a testar num dispositivo físico, substitua 'SEU_IP_LOCAL' pelo
// endereço IP do seu computador na rede Wi-Fi (ex: 'http://192.168.1.10:3000').
// 'localhost' não funciona com o React Native.
//Para rodar: npm run android
const API_BASE_URL = 'http://10.0.2.2:3000';

export default API_BASE_URL;