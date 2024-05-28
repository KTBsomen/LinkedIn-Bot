const express = require('express');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

function generateUUID() {
    return uuidv4();
}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(express.json())
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;
function generateTrackingIdAsCharString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 16;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


app.post('/getProfile/:id', async (req, res) => {
 var x= await fetch(`https://www.linkedin.com/voyager/api/identity/profiles/${req.params.id}`, {
    "headers":req.body?.headers|| {
      "accept": "application/json",
      "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,en-IN;q=0.7",
      "cache-control": "no-cache",
      "content-type": "text/plain;charset=UTF-8",
      "csrf-token": "ajax:62298749csrf",
      "pragma": "no-cache",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "none",
      "x-li-lang": "en_US",
      "x-li-page-instance": "urn:li:page:d_flagship3_people_connections;/ykeP8H/SJK+c0CdNBjJ/w==",
      "x-li-track": "{\"clientVersion\":\"1.13.17226\",\"mpVersion\":\"1.13.17226\",\"osName\":\"web\",\"timezoneOffset\":5.5,\"timezone\":\"Asia/Calcutta\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.25,\"displayWidth\":1920,\"displayHeight\":1080}",
      "x-restli-protocol-version": "2.0.0",
      "cookie":req.body?.cookie|| "DEFAULT COOKIE i=1716897020:t=1716983420:v=2:sig=AQGGuZbXfGIVLOBDDeOuvnY1N93CKqI6\""
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
  });
  res.json(await x.json());
});


app.post('/send/:receiverId', async (req, res) => {
    const messageBody = {
        "message": {
            "body": {
                "attributes": "[]",
                "text":req.body?.text || "Hi How are you?"
            },
            "originToken": generateUUID(),
            "renderContentUnions": "[]"
        },
        "mailboxUrn": req.body?.senderId||"urn:li:fsd_profile:ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk",
        "trackingId": generateTrackingIdAsCharString(),
        "dedupeByClientGeneratedToken": "false",
        "hostRecipientUrns": JSON.stringify([`urn:li:fsd_profile:${req.params.receiverId}`])
    };
    console.log(req.body.text)
    const response = await fetch("https://www.linkedin.com/voyager/api/voyagerMessagingDashMessengerMessages?action=createMessage", {
        "headers":req.body?.headers|| {
          "accept": "application/json",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,en-IN;q=0.7",
          "cache-control": "no-cache",
          "content-type": "text/plain;charset=UTF-8",
          "csrf-token": "ajax:23432csrf",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "none",
          "x-li-lang": "en_US",
          "x-li-page-instance": "urn:li:page:d_flagship3_people_connections;/ykeP8H/SJK+c0CdNBjJ/w==",
          "x-li-track": "{\"clientVersion\":\"1.13.17226\",\"mpVersion\":\"1.13.17226\",\"osName\":\"web\",\"timezoneOffset\":5.5,\"timezone\":\"Asia/Calcutta\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.25,\"displayWidth\":1920,\"displayHeight\":1080}",
          "x-restli-protocol-version": "2.0.0",
          "cookie": ""
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"message\":{\"body\":{\"attributes\":[],\"text\":\""+(req.body?.text || "Hi, How are you.")+"\"},\"originToken\":\""+generateUUID()+"\",\"renderContentUnions\":[]},\"mailboxUrn\":\"urn:li:fsd_profile:"+(req.body?.senderId||"ACoAADFPm0wBD8_2w8dpux66aLduR0lOhqN2zKk")+"\",\"trackingId\":\""+generateTrackingIdAsCharString()+"\",\"dedupeByClientGeneratedToken\":false,\"hostRecipientUrns\":[\"urn:li:fsd_profile:"+req.params.receiverId+"\"]}",
        "method": "POST"
      });

    res.json(await response.json())
})

app.post("/getConnections/:start/:count",async (req,res)=>{

    var x=await fetch(`https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=${req.params.count}&q=search&sortType=RECENTLY_ADDED&start=${req.params.start}`, {
        "headers":req.body?.headers|| {
          "accept": "application/vnd.linkedin.normalized+json+2.1",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,en-IN;q=0.7",
          "cache-control": "no-cache",
          "csrf-token": "ajax:6229874999csrf",
          "pragma": "no-cache",
          "priority": "u=1, i",
          "referrer-policy": "strict-origin-when-cross-origin",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "none",
          "x-li-lang": "en_US",
          "x-li-page-instance": "urn:li:page:d_flagship3_people_connections;71qfRk7KRdKeB1+HgdQobg==",
          "x-li-track": "{\"clientVersion\":\"1.13.17226\",\"mpVersion\":\"1.13.17226\",\"osName\":\"web\",\"timezoneOffset\":5.5,\"timezone\":\"Asia/Calcutta\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.25,\"displayWidth\":1920,\"displayHeight\":1080}",
          "x-restli-protocol-version": "2.0.0",
          "cookie": ""
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
      });
      res.json(await x.json())
})












app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
