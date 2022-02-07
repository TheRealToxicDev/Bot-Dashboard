import { Cipher, createCipheriv, createDecipheriv, Encoding, randomBytes } from "crypto";
const {cryptKeys } = require('../../crypt.json');

const [key, initVector] = JSON.parse(cryptKeys).map(
  (key: string) => Buffer.from(key, "base64")
);

function crypt(
  cipher: Cipher,
  data: any,
  inputType: Encoding,
  outputType: BufferEncoding
) {
  return Buffer.concat([
    cipher.update(data, inputType),
    cipher.final(),
  ]).toString(outputType);
}

export function encrypt(
  data: any,
  inputType: Encoding = "utf8",
  outputType: BufferEncoding = "base64"
) {
  return crypt(
    createCipheriv("aes-256-ctr", key, initVector),
    data,
    inputType,
    outputType,
  );
}

export function decrypt(
  data: any,
  inputType: Encoding = "base64",
  outputType: BufferEncoding = "utf8"
) {
  crypt(
    createDecipheriv("aes-256-ctr", key, initVector),
    data,
    inputType,
    outputType
  );
}
