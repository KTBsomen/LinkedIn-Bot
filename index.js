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
      "csrf-token": "ajax:6229874999188323659",
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
      "cookie":req.body?.cookie|| "li_sugr=fe1f4eb3-f85e-4529-8945-e84d4e2e74ab; bcookie=\"v=2&640234ba-7291-418c-8aa0-3db2c1231ae5\"; bscookie=\"v=1&202401171719299e45c142-1d5b-44fd-8b15-3330e2e5a566AQFXoPrn5vPS6YwaMJan6tywcxEgN-QP\"; liap=true; JSESSIONID=\"ajax:6229874999188323659\"; li_theme=light; li_theme_set=app; dfpfpt=c8edd91436d5488f935dca1cae40e6bd; AnalyticsSyncHistory=AQLseWhvDk5cpwAAAY-y9z_0AJM5Xpa2epbXGEIH88Ay9i-gQ4n32fIfnvu1UQw9v1VR4hOr8n5fVkfJBaG1TQ; lms_ads=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; lms_analytics=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; li_at=AQEDATFPm0wEvefeAAABjW38uOgAAAGP1wPFmVYAOMcK-B5fXT6m6rLZDlvepWmpQeXeBbp0v9qNIFRaZHjMYcIlZ4cUwcpu7zDxFXecx0YPd0i-USssWlX2RnHCIHAc1bsCem8AMwM3l-lkrU4PbVrh; lang=v=2&lang=en-us; timezone=Asia/Calcutta; _guid=b255fbea-f77a-4277-aa6f-6f5485109a38; aam_uuid=31085156336245323272761694159446525012; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19872%7CMCMID%7C31650511628902539962782288919761663903%7CMCAAMLH-1717483277%7C12%7CMCAAMB-1717483277%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1716885677s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1667123878; fptctx2=taBcrIH61PuCVH7eNCyH0HyAAKgSb15ZEqidLg30r8NPKzV9dUSPYuPDD8yzj%252btai1%252buGCL14mhNPjxhHjF8bUMi8XoidisR%252fRRmCN48NPSTPi8XjfNUrSXjrhFjiXlGBK5AyqaKKZlxEb2Hl9k3F4trbS7%252fh26km9sR3g6CAuFGAkEtBbhn1qOGO3UgEZ8yt80x7GKUH4EmA%252fkQAbYOb09GRnHqN6joGHX7gxRTDU4RXVxY00KIl7B7JTakDKp9T%252bIEjxpzISquvMvcIpfWbGRJtZKq%252fE6pizibBKrcrDdfYOcxHbITWTyC080FjKD50Q9RJoWicaW2MyG9RywV7xLB8NOS1BOUOb0lwOtQL00%253d; UserMatchHistory=AQJtBoB4lQhG5AAAAY--uOn2sE02Sdjod6sH9I9MaHjno-8hqJhgmL4KDmKrx0DyTYHJ39_gm4ECZp0HxTkui_Gy0ZrDv7GfK6pP8wJTbIWvJ9gh2P_eBZH_9UabY-Q1v5WriMKkHA3gfcF_fZ8ihuc75FHelTqqdykEMKz2ikMlZeOXPbJSxWWjIi7ilV6MarDgiEuTBCR8hIsTI3ojdVOFG8pHkjdFjng3NyIkhgw8mY5K-_288m7Do_wLpiCSC0QZPEPTsrpHxB-YMLDfNONeJZs549OJJ582AMrYuEnCL9-j6iiGiqOg_zKOEPkmt6dES3IdMSXL3mBt6-XqpX6pNj5V3wTb0l9Q6cpk4WRwRXOg5g; lidc=\"b=OB84:s=O:r=O:a=O:p=O:g=3479:u=356:x=1:i=1716897020:t=1716983420:v=2:sig=AQGGuZbXfGIVLOBDDeOuvnY1N93CKqI6\""
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
        "headers": {
          "accept": "application/json",
          "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,en-IN;q=0.7",
          "cache-control": "no-cache",
          "content-type": "text/plain;charset=UTF-8",
          "csrf-token": "ajax:6229874999188323659",
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
          "cookie": "li_sugr=fe1f4eb3-f85e-4529-8945-e84d4e2e74ab; bcookie=\"v=2&640234ba-7291-418c-8aa0-3db2c1231ae5\"; bscookie=\"v=1&202401171719299e45c142-1d5b-44fd-8b15-3330e2e5a566AQFXoPrn5vPS6YwaMJan6tywcxEgN-QP\"; liap=true; JSESSIONID=\"ajax:6229874999188323659\"; li_theme=light; li_theme_set=app; dfpfpt=c8edd91436d5488f935dca1cae40e6bd; AnalyticsSyncHistory=AQLseWhvDk5cpwAAAY-y9z_0AJM5Xpa2epbXGEIH88Ay9i-gQ4n32fIfnvu1UQw9v1VR4hOr8n5fVkfJBaG1TQ; lms_ads=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; lms_analytics=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; li_at=AQEDATFPm0wEvefeAAABjW38uOgAAAGP1wPFmVYAOMcK-B5fXT6m6rLZDlvepWmpQeXeBbp0v9qNIFRaZHjMYcIlZ4cUwcpu7zDxFXecx0YPd0i-USssWlX2RnHCIHAc1bsCem8AMwM3l-lkrU4PbVrh; lang=v=2&lang=en-us; timezone=Asia/Calcutta; _guid=b255fbea-f77a-4277-aa6f-6f5485109a38; aam_uuid=31085156336245323272761694159446525012; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19872%7CMCMID%7C31650511628902539962782288919761663903%7CMCAAMLH-1717483277%7C12%7CMCAAMB-1717483277%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1716885677s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1667123878; fptctx2=taBcrIH61PuCVH7eNCyH0HyAAKgSb15ZEqidLg30r8NPKzV9dUSPYuPDD8yzj%252btai1%252buGCL14mhNPjxhHjF8bUMi8XoidisR%252fRRmCN48NPSTPi8XjfNUrSXjrhFjiXlGBK5AyqaKKZlxEb2Hl9k3F4trbS7%252fh26km9sR3g6CAuFGAkEtBbhn1qOGO3UgEZ8yt80x7GKUH4EmA%252fkQAbYOb09GRnHqN6joGHX7gxRTDU4RXVxY00KIl7B7JTakDKp9T%252bIEjxpzISquvMvcIpfWbGRJtZKq%252fE6pizibBKrcrDdfYOcxHbITWTyC080FjKD50Q9RJoWicaW2MyG9RywV7xLB8NOS1BOUOb0lwOtQL00%253d; UserMatchHistory=AQKaWCSSKSUaQQAAAY-_VRg8yTsqOZsVgfxYi_cR_ez-5b5A2H3Mu-CddPDzosqQpWmqjxzb8Rlco7U4bPApDsMoEofWxnRJf0hC4jWDSFFcJBbeqmWMKnhnirI1nR0jlB6OI9Brl9qYvfezebQafSO3TDJXFgeV97GgAUHE7MjqznxV4fNyiLNA4Ld6idRfGsnlqPFOUgudkUnonpDRgn_f6vmyNNJ7h2TV1seZmbnZOqhRvDga1P3wjXQYM4z41FY2xqFmXcnV1c1B6p9ypWxEyjhF0zbt0cOoePRf7e4guQ1Ku4TgSWolyDkwTp0uhoyFMPOJz8LJNm5FZjWB6uzgi7tzXD_b99ROHu_t7YxDOz5YLg; lidc=\"b=OB84:s=O:r=O:a=O:p=O:g=3479:u=356:x=1:i=1716901982:t=1716983420:v=2:sig=AQFbOiS0-24m0TwQ-AD8e6hKF5zpyZ2m\""
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
          "csrf-token": "ajax:6229874999188323659",
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
          "cookie": "li_sugr=fe1f4eb3-f85e-4529-8945-e84d4e2e74ab; bcookie=\"v=2&640234ba-7291-418c-8aa0-3db2c1231ae5\"; bscookie=\"v=1&202401171719299e45c142-1d5b-44fd-8b15-3330e2e5a566AQFXoPrn5vPS6YwaMJan6tywcxEgN-QP\"; liap=true; JSESSIONID=\"ajax:6229874999188323659\"; li_theme=light; li_theme_set=app; dfpfpt=c8edd91436d5488f935dca1cae40e6bd; AnalyticsSyncHistory=AQLseWhvDk5cpwAAAY-y9z_0AJM5Xpa2epbXGEIH88Ay9i-gQ4n32fIfnvu1UQw9v1VR4hOr8n5fVkfJBaG1TQ; lms_ads=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; lms_analytics=AQGWeHQOPic-kgAAAY-y90HCwU3KwVIxkEbqX9aIwyUQtArLpuA-CfBEXnutJYuRDGWn-DtsBxIFUVIfejOO9THs_hsdVzLh; li_at=AQEDATFPm0wEvefeAAABjW38uOgAAAGP1wPFmVYAOMcK-B5fXT6m6rLZDlvepWmpQeXeBbp0v9qNIFRaZHjMYcIlZ4cUwcpu7zDxFXecx0YPd0i-USssWlX2RnHCIHAc1bsCem8AMwM3l-lkrU4PbVrh; lang=v=2&lang=en-us; timezone=Asia/Calcutta; _guid=b255fbea-f77a-4277-aa6f-6f5485109a38; aam_uuid=31085156336245323272761694159446525012; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19872%7CMCMID%7C31650511628902539962782288919761663903%7CMCAAMLH-1717483277%7C12%7CMCAAMB-1717483277%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1716885677s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C1667123878; fptctx2=taBcrIH61PuCVH7eNCyH0HyAAKgSb15ZEqidLg30r8NPKzV9dUSPYuPDD8yzj%252btai1%252buGCL14mhNPjxhHjF8bUMi8XoidisR%252fRRmCN48NPSTPi8XjfNUrSXjrhFjiXlGBK5AyqaKKZlxEb2Hl9k3F4trbS7%252fh26km9sR3g6CAuFGAkEtBbhn1qOGO3UgEZ8yt80x7GKUH4EmA%252fkQAbYOb09GRnHqN6joGHX7gxRTDU4RXVxY00KIl7B7JTakDKp9T%252bIEjxpzISquvMvcIpfWbGRJtZKq%252fE6pizibBKrcrDdfYOcxHbITWTyC080FjKD50Q9RJoWicaW2MyG9RywV7xLB8NOS1BOUOb0lwOtQL00%253d; UserMatchHistory=AQKaWCSSKSUaQQAAAY-_VRg8yTsqOZsVgfxYi_cR_ez-5b5A2H3Mu-CddPDzosqQpWmqjxzb8Rlco7U4bPApDsMoEofWxnRJf0hC4jWDSFFcJBbeqmWMKnhnirI1nR0jlB6OI9Brl9qYvfezebQafSO3TDJXFgeV97GgAUHE7MjqznxV4fNyiLNA4Ld6idRfGsnlqPFOUgudkUnonpDRgn_f6vmyNNJ7h2TV1seZmbnZOqhRvDga1P3wjXQYM4z41FY2xqFmXcnV1c1B6p9ypWxEyjhF0zbt0cOoePRf7e4guQ1Ku4TgSWolyDkwTp0uhoyFMPOJz8LJNm5FZjWB6uzgi7tzXD_b99ROHu_t7YxDOz5YLg; lidc=\"b=OB84:s=O:r=O:a=O:p=O:g=3479:u=356:x=1:i=1716916735:t=1716983420:v=2:sig=AQEF3MGLmFlfKQFBEdsQzq3MMnI5VXnH\""
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