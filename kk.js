var CrudClient = (function (ns) {
  ns.isSandbox = false;
  ns.config = {};

  ns.init = function (config) {
    this.config = { ...config };
    // this.fileList=this.getFileList();
    // this.eventHistory=this.getEventHistory();
    // this.webhookList=this.getWebhookList();

    this.fileSheet = {
      cols: ["webhookId", "userId", "eventType", "createdAt", "modifiedAt"],
      object: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Files"),
    };
    this.eventSheet = {
      cols: [
        "eventId",
        "fileId",
        "eventType",
        "eventTimestamp",
        "webhookDeliveredUrl",
        "webhookDeliveredTimestamp",
        "deliveredResponse",
      ],
      object:
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Event-History"),
    };
    this.webhookSheet = {
      cols: ["webhookId", "userId", "eventType", "createdAt", "modifiedAt"],
      object: SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
        "Webhook-Subscriptions"
      ),
    };

    this.fileSheet.values = this.getSheetData(
      this.webhookSheet.object,
      "A1:E1000"
    );
    this.eventSheet.values = this.getSheetData(
      this.eventSheet.object,
      "A1:E1000"
    );
    this.webhookSheet.values = this.getSheetData(
      this.webhookSheet.object,
      "A1:E1000"
    );
  };

  ns.getSheetData = function (sheetObject, range) {
    return sheetObject.getDataRange().getDisplayValues();
  };

  //Webhook Related

  ns.getWebhooks = function (url) {
    const dataValues = this.webhookSheet.values;
    return dataValues;
  };

  ns.createWebhook = function (payload) {
    payload.webhookId = getUUID();
    const rowValues = this.fileSheet.cols.map((p) => {
      return payload[p];
    });

    this.webhookSheet.object.appendRow(rowValues);
    return payload;
  };

  ns.deleteWebhook = function (webhookId) {
    const dataValues = this.webhookSheet.values;
    const item = dataValues.filter((f) => f.webhookId == webhookId)[0];
    this.webhookSheet.object.deleteRow(item.rowId + 1);
    SpreadsheetApp.flush();
    return {};
  };

  ns.getWebhook = function (webhookId) {
    const dataValues = this.webhookSheet.values;
    const item = dataValues.filter((f) => f.webhookId == webhookId)[0];
    return item;
  };

  ns.updateWebhook = function (webhookId, payload) {
    const dataValues = this.webhookSheet.values;
    const item = dataValues.filter((f) => f.webhookId == webhookId)[0];
    //update Row
    return item;
  };

  //file related
  ns.createFile = function (payload) {};

  ns.getFiles = function () {
    const dataValues = this.fileSheet.values;
  };

  ns.getFile = function (fileId) {
    const dataValues = this.fileSheet.values;
  };
  ns.updateFile = function (fileId, payload) {
    const dataValues = this.fileSheet.values;
  };

  ns.deleteFile = function (fileId) {
    const dataValues = this.fileSheet.values;
  };

  ns.postDelivery = function (payload) {
    this.eventSheet.object.appendRow(["delivered"]);
  };

  //event history related

  return ns;
})(CrudClient || {});

function testCrudClient() {
  CrudClient.init({});
  Browser.msgBox(CrudClient.fileSheet.values);
  //CrudClient.createWebhook({webhookId:'2223'});
  //CrudClient.deleteWebhook();
}
