import Cryptr from "cryptr";

export function encrypt(decryptedPassword){
    const cryptrKey = process.env.CRYPTR_KEY || 'cryptr';
    const cryptr = new Cryptr(cryptrKey);

    const encryptedPassword = cryptr.encrypt(decryptedPassword);

    return encryptedPassword;
};

export function decrypt(encryptedPassword){
    const cryptrKey = process.env.CRYPTR_KEY || 'cryptr';
    const cryptr = new Cryptr(cryptrKey);

    const decryptedPassword = cryptr.decrypt(encryptedPassword);

    return decryptedPassword;
};

export function compare(password,encryptedPassword){
    const cryptrKey = process.env.CRYPTR_KEY || 'cryptr';
    const cryptr = new Cryptr(cryptrKey);

    const decryptedPassword = cryptr.decrypt(encryptedPassword);

    if ( decryptedPassword === password ) return true 
    else return false
};