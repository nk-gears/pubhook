const express = require("express");
const dataService = require("./dataService");
const app = express();
const port = process.env.PORT || 3000;
const EventEmitter = require("events");
const ee = new EventEmitter();
import { nanoid } from "nanoid";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

ee.on("notify-file-event", function (_paramsString) {
  const _params = JSON.parse(_paramsString);
  //loop through all the registered webhook urls and deliver them
  const hooks = await dataService.getWebhooks();
  for (let hook of hooks) {
    dataService.deliverToSubscriber(hook, _params);
  }
  // once delivered log the status
});

const notifyEventEmitter = async (_params) => {
  ee.emit("notify-file-event", JSON.stringify(_params));
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Managing Entity CRUD
app.get("/files", async (req, res) => {
  res.send("Returns files");
});

app.get("/files/:fileId", async (req, res) => {
  res.send("Returns Single file");
});

app.patch("/files/:fileId", async (req, res) => {
  notifyEventEmitter({
    eventId: nanoid(),
    eventType: "updated",
    eventData: _fileInfo,
  });
  res.send("Patch single file");
});

app.delete("/files/:fileId", async (req, res) => {
  notifyEventEmitter({
    eventId: nanoid(),
    eventType: "deleted",
    eventData: _fileInfo,
  });
  res.send("Patch single file");
});

app.post("/files", async (req, res) => {
  //Emit events
  let _fileInfo = {};
  notifyEventEmitter({
    eventId: nanoid(),
    eventType: "created",
    eventData: _fileInfo,
  });
  res.send("Creates new files");
});

//Managing Webhooks
app.get("/webhooks", async (req, res) => {
  // res.send(dataService.getWebhooks());
  const resp = await dataService.getWebhooks();
  res.json(resp);
});

app.get("/webhooks/:webhookId", async (req, res) => {
  const resp = await dataService.getWebhook(req.params.webhookId);
  res.json(resp);
});

app.post("/webhooks", async (req, res) => {
  const resp = await dataService.createWebhook(req.body);
  res.setHeader("Location", BASE_URL + "/webhooks/" + resp.webhookId);
  res.json(resp);
});

app.patch("/webhooks/:webhookId", async (req, res) => {
  const resp = await dataService.patchWebhook(req.params.webhookId, req.body);

  res.json(resp);
});

app.delete("/webhooks/:webhookId", async (req, res) => {
  const resp = await dataService.deleteWebhook(req.params.webhookId);
  res.json(resp);
});

app.listen(port, () => {
  console.log(`Pubhook sample app ${port}`);
});
