const crypto = require("crypto");
const cryptoKey = "AppProntoPowerByAppland";

export const encrypt = (input, callback) => {
  let m = crypto.createHash("md5");
  m.update(cryptoKey);
  let key = m.digest("hex");
  let data = Buffer.from(input, "utf8").toString("binary");
  let cipher = crypto.createCipheriv("aes-256-cbc", key, cryptoKey.slice(0, 16));
  let nodev = process.version.match(/^v(\d+)\.(\d+)/);
  let encrypted;
  if (nodev[1] === "0" && parseInt(nodev[2]) < 10) {
    encrypted = cipher.update(data, "binary") + cipher.final("binary");
  } else {
    encrypted = cipher.update(data, "utf8", "binary") + cipher.final("binary");
  }
  let encoded = Buffer.from(encrypted, "binary").toString("base64");
  for (let i = 0; i < encoded.length; i++) {
    encoded = encoded.replace("/", "PRONTO");
  }
  callback(encoded);
};

export const decrypt = (input, callback) => {
  for (let i = 0; i < input.length; i++) {
    input = input.replace("PRONTO", "/");
  }
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  let edata = Buffer.from(input, "base64").toString("binary");
  let m = crypto.createHash("md5");
  m.update(cryptoKey);
  let key = m.digest("hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    cryptoKey.slice(0, 16)
  );
  let nodev = process.version.match(/^v(\d+)\.(\d+)/);
  let decrypted, plaintext;
  if (nodev[1] === "0" && parseInt(nodev[2]) < 10) {
    decrypted = decipher.update(edata, "binary") + decipher.final("binary");
    plaintext = Buffer.from(decrypted, "binary").toString("utf8");
  } else {
    plaintext =
      decipher.update(edata, "binary", "utf8") + decipher.final("utf8");
  }
  callback(plaintext);
};
