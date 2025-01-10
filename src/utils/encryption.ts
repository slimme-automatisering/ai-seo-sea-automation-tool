import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Configuratie
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY as string; // 32 bytes
const IV_LENGTH = 16; // Voor AES-256-CBC
const SALT_ROUNDS = 12; // Voor bcrypt

// Data encryptie
export const encrypt = (text: string): string => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  } catch (error) {
    throw new Error('Encryptie mislukt');
  }
};

// Data decryptie
export const decrypt = (text: string): string => {
  try {
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
  } catch (error) {
    throw new Error('Decryptie mislukt');
  }
};

// Wachtwoord hashing
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Wachtwoord hashing mislukt');
  }
};

// Wachtwoord verificatie
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error('Wachtwoord verificatie mislukt');
  }
};

// Veilige random token generatie
export const generateSecureToken = (length: number = 32): string => {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, length);
};

// API key hashing
export const hashApiKey = (apiKey: string): string => {
  return crypto
    .createHash('sha256')
    .update(apiKey)
    .digest('hex');
};

// Constante tijd string vergelijking
export const secureCompare = (a: string, b: string): boolean => {
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
};
