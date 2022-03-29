const dataUrl =
  "https://script.google.com/macros/s/AKfycbyFBP6yIcopM6H9Hf8n8aNg9_ZQk-kD1-mdRT8O6HlCPCZWguM/exec";
const axios = require("axios");
//# File related
const createFile = async (payload) => {
  const resp = await axios.post(dataUrl + `?q=create-file`, payload);
  return resp.data;
};

const deleteFile = async (fileId) => {
  const resp = await axios.post(dataUrl + `?q=delete-file&id=${fileId}`,{});
  return resp.data;
};

const updateFile = async (fileId, payload) => {
  const resp = await axios.post(
    dataUrl + `?q=update-file&id=${fileId}`,
    payload
  );
  return resp.data;
};

const getFile = async (fileId) => {
  const resp = await axios.post(dataUrl + `?q=get-file&id=${fileId}`,{});
  return resp.data;
};

const getFiles = async (query) => {
  const resp = await axios.post(dataUrl + `?q=get-files`,{...query});
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
  const resp = await axios.post(dataUrl + `?q=delete-webhook&id=${webhookId}`,{});
  return resp.data;
};

const createWebhook = async (payload) => {
  const resp = await axios.post(dataUrl + "?q=create-webhook", payload);
  return resp.data;
};

const deliverToSubscriber = async (webhookInfo, payload) => {
  if(webhookInfo.url && webhookInfo.url!=""){
  const resp = await axios.post(webhookInfo.url, payload);
  await axios.post(dataUrl + "?q=post-delivery", resp.data);
  return resp.data;
  }
  else{
    return {"status":"No valid url found"};
  }
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
