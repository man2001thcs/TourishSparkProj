import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class HashService {

  private CryptoJSAesJson = {
    stringify: function (cipherParams: any) {
      const vbJsonString = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
        iv: cipherParams.iv.toString() ?? '',
        s: cipherParams.salt.toString() ?? '',
      };
      if (cipherParams.iv) {
        vbJsonString['iv'] = cipherParams.iv.toString();
      }
      if (cipherParams.salt) {
        vbJsonString['s'] = cipherParams.salt.toString();
      }
      return JSON.stringify(vbJsonString);
    },
    parse: function (jsonStr: any) {
      const vbJsonParse = JSON.parse(jsonStr);
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(vbJsonParse.ct),
      });
      if (vbJsonParse.iv) {
        cipherParams['iv'] = CryptoJS.enc.Hex.parse(vbJsonParse.iv);
      }
      if (vbJsonParse['s']) {
        cipherParams.salt = CryptoJS.enc.Hex.parse(vbJsonParse.s);
      }
      return cipherParams;
    },
  };

  encrypted_string(message: any, password: string): string {
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(message), password, {
      format: this.CryptoJSAesJson,
    }).toString();
    console.log(`typeof encrypted:`, typeof encrypted);
    console.log(`encrypted:`, encrypted);
    return encrypted;
  }

  dencrypted_array(encrypted: any, password: string): string {
    let decrypted = JSON.parse(
      CryptoJS.AES.decrypt(encrypted, password, {
        format: this.CryptoJSAesJson,
      }).toString(CryptoJS.enc.Utf8)
    );
    console.log(`decryptedFromPHP:`, decrypted);
    return decrypted;
  }
}
