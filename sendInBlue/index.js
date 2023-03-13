import pkg from "sib-api-v3-sdk";
import config from "../config/index.js";

const { ApiClient, TransactionalEmailsApi } = pkg;
const defaultClient = ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = config.SENDINBLUE_API_KEY;

const apiInstance = new TransactionalEmailsApi();

export default apiInstance;
