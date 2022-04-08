import admin from "firebase-admin";
import { config } from "firebase-functions";
const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  storage_bucket,
} = config().development;

admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key: private_key.replace(/\\n/g, "\n"),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url,
  }),
  storageBucket: storage_bucket,
});

export const database = admin.firestore;
export const storage = admin.storage;
export const auth = admin.auth;
