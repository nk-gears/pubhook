
const dataUrl="https://script.google.com/macros/s/AKfycbyFBP6yIcopM6H9Hf8n8aNg9_ZQk-kD1-mdRT8O6HlCPCZWguM/exec";
const unirest=require("unirest");
const axios=require("axios");

const getWebhooks=async ()=>{

    const resp=await unirest.get(dataUrl + '?q=webhooks');
    return resp.body;

};

const getWebhook=async ()=>{
    
};

const patchWebhook=async ()=>{
    
};


const deleteWebhook=async ()=>{

    const resp=await unirest
    .post(dataUrl + '?q=delete-webhook&id=' + "555")
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    return resp.body;

    
};


const createWebhook=async (payload)=>{

    const resp = await axios.post(dataUrl + '?q=post-webhooks', payload);
    // const resp=await unirest
    // .post(dataUrl + '?q=post-webhooks')
    // .headers({'content-type': 'application/json'})
    // .send(payload);
    return resp.data;
    
};

const deliverToSubscriber=async (webhookInfo,payload)=>{

    const resp = await axios.post(webhookInfo.url, payload);
    return resp.data;

}

module.exports={deliverToSubscriber, getWebhooks,getWebhook,patchWebhook,deleteWebhook,createWebhook};