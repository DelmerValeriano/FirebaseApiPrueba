import { config } from "firebase-functions";
const { sendgrid_key } = config().development;

export const key = sendgrid_key;
