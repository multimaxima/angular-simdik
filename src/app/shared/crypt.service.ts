import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptService {
  private key = CryptoJS.enc.Utf16.parse('mjnFba55OxIDxGxLSoeBK6Nmbwhwf/LZYzNlfz5iQy4=');
  private iv = CryptoJS.enc.Utf16.parse('dUSVtGvze4lwSp7Ff90aNifj1hzy7TPaALhFN1z7vl6kOSEgC53oFe1hCUMnRDXI');
  
  constructor() { }

  encryptUsingAES256(text: any) {
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
      keySize: 512 / 32,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encodeURIComponent(encrypted.toString());
  }

  decryptUsingAES256(text: any) {
    var decrypted = CryptoJS.AES.decrypt(decodeURIComponent(text), this.key, {
      keySize: 512 / 32,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
