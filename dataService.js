const dataUrl =
  "https://script.google.com/macros/s/AKfycbyFBP6yIcopM6H9Hf8n8aNg9_ZQk-kD1-mdRT8O6HlCPCZWguM/exec";
const axios = require("axios");
//# File related
const createFile = async () => {
  const resp = await axios.post(dataUrl + `?q=create-files`, payload);
  return resp.data;
};

const deleteFile = async (fileId) => {
  const resp = await axios.post(dataUrl + `?q=delete-files&id=${fileId}`);
  return resp.data;
};

const updateFile = async (fileId, payload) => {
  const resp = await axios.post(
    dataUrl + `?q=update-files&id=${fileId}`,
    payload
  );
  return resp.data;
};

const getFile = async (fileId) => {
  const resp = await axios.post(dataUrl + `?q=get-file&id=${fileId}`,{});
  return resp.data;
};

const getFiles = async () => {
  const resp = await axios.post(dataUrl + `?q=get-files`,{});
  return resp.data;
};

//#Webhook Related
const getWebhooks = async () => {
  const resp = await axios.post(dataUrl + `?q=get-webhooks`,{});
  return resp.data;
};

const getWebhook = async (webhookId) => {
  const resp = await axios.post(dataUrl + `?q=get-webhook&id=${webhookId}`,{});
  return resp.data;
};

const updateWebhook = async (webhookId, payload) => {
  const resp = await axios.post(
    dataUrl + `?q=update-webhooks&id=${webhookId}`,
    payload
  );
  return resp.data;
};

const deleteWebhook = async (webhookId) => {
  const resp = await axios.post(dataUrl + `?q=delete-webhooks&id=${webhookId}`,{});
  return resp.data;
};

const createWebhook = async (payload) => {
  const resp = await axios.post(dataUrl + "?q=create-webhooks", payload);
  return resp.data;
};

const deliverToSubscriber = async (webhookInfo, payload) => {
  const resp = await axios.post(webhookInfo.url, payload);
  await axios.post(dataUrl + "?q=post-delivery", resp.data);
  return resp.data;
};

module.exports = {
  createFile,
  updateFile,
  getFiles,
  getFile,
  deleteFile,
  deliverToSubscriber,
  getWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  createWebhook,
};
