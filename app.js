const express = require("express");
const dataService = require("./dataService");
const app = express();
const port = parseInt(process.env.PORT) || 3000;
const EventEmitter = require("events");
const ee = new EventEmitter();
const nanoid=require('nanoid');
const cors = require('cors')

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

app.use(cors());
ee.on("notify-file-event", async function  (_paramsString) {
  const _params = JSON.parse(_paramsString);
  //loop through all the registered webhook urls and deliver them
  const hooks = await dataService.getWebhooks();
  for (let hook of hooks) {
    dataService.deliverToSubscriber(hook, _params);
  }
  // once delivered log the status
});

const notifyEventEmitter =  (_params) => {
  _params.eventId=nanoid.nanoid(),
  _params.eventTS= Date.now(),
  ee.emit("notify-file-event", JSON.stringify(_params));
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
app.use(errorHandler)


//Managing Entity CRUD
app.get("/files", async (req, res) => {
  let resp = await dataService.getFiles(req.query);
  res.json(resp);
});

app.get("/file-list", async (req, res) => {
  let resp = await dataService.getFiles(req.query);
  res.json({data:resp});
});



app.get("/files/:fileId", async (req, res) => {
  const resp = await dataService.getFile(req.params.fileId);
  res.json(resp);
});

app.patch("/files/:fileId", async (req, res) => {
  
  let _fileInfo = req.body;
  notifyEventEmitter({
    eventType: "updated",
    eventData: _fileInfo
  });
  const resp = await dataService.updateFile(req.params.fileId,_fileInfo);
  res.json(resp);
});

app.delete("/files/:fileId", async (req, res) => {
  notifyEventEmitter({
    eventType: "deleted",
    eventData: { "fileId":req.params.fileId},
  });
  const resp = await dataService.deleteFile(req.params.fileId);
  res.json(resp);
});

app.post("/files", async (req, res) => {
  //Emit events
  let _fileInfo = req.body;
  const resp = await dataService.createFile(_fileInfo);
  notifyEventEmitter({
    eventType: "created",
    eventData: resp,
  });

  res.json(resp);
 
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


app.post("/subscribedemo", async (req, res) => {
  const resp = await dataService.createWebhook(req.body);
  res.setHeader("Location", BASE_URL + "/webhooks/" + resp.webhookId);
  res.statusCode=201;
  res.json(resp);
});

app.post("/subscribe", async (req, res) => {
  const resp = await dataService.createWebhook(req.body);
  res.setHeader("Location", BASE_URL + "/webhooks/" + resp.webhookId);
  res.statusCode=201;
  res.json(resp);
});

app.post("/webhooks", async (req, res) => {
  const resp = await dataService.createWebhook(req.body);
  res.setHeader("Location", BASE_URL + "/webhooks/" + resp.webhookId);
  res.json(resp);
});

app.patch("/webhooks/:webhookId", async (req, res) => {
  const resp = await dataService.updateWebhook(req.params.webhookId, req.body);

  res.json(resp);
});

app.delete("/webhooks/:webhookId", async (req, res) => {
  const resp = await dataService.deleteWebhook(req.params.webhookId);
  res.json(resp);
});


const server =app.listen(port, () => {
  console.log(`Pubhook sample app ${port}`);
});
server.setTimeout(60*60*1000);


