# PubHook - WIP

Site : pubhook.appdews.com


---

Publish Events to a Webhook : A Web Utility App (Tool) for Developers to quickly test the Webhook Integration in any System. 



**Features**

- Developers can subscribe for any pre-configured events or any custom defined events.
- Configure Single or Multiple Endpoints via Workspaces
- Each workspace expects Webhook Url to which the events will be published.
- Basically it provides a mock API to which once can subscribe for selected event and trigger the event by sending some mock data.



How it works :

- Initial Release : No Login Required. Similar to Webhook.site
- New Session creates a New Workspace
  - pubhook.site/#w232123
  - Subscribe via API
    - pubhook.site/#w232123/hooks/hook-id
  - Add Receiver Clients (Array)
    - Prompts the user with the following
      - Enter the Webhook Url to which the Event needs to be Delivered
      - Supported Events
        - Clients
        - Sales
        - Stripe
        - Custom Events

Technology :

- User Initiates a Event from  Pubhook.site for a given Workspace
- User can choose what type of event they are looking for?
- Once the user initiated that event for that workspace, all the receiver clients will receive the content changes





Why we need this ?



How different from Webhook.site ?

- Webhook.site provides Webhook urls through which one can send request and monitor the payloads.
- Pubhook expects a webhook Url end point to which the events will be published.


gcloud builds submit --pack image=us-east1-docker.pkg.dev/rafa-dev/cloud-run-source-deploy/zonedrive /Users/Nirmal/projects/appdews/pubhook" and "gcloud run deploy zonedrive --image us-east1-docker.pkg.dev/rafa-dev/cloud-run-source-deploy/zonedrive

gcloud run services update zonedrive --update-env-vars BASE_URL=https://zonedrive.appdews.com