## Web Push Notification

> This is a example of implementation of Web Push Notification
> Using Firebase as GCM and NodeJS as backend

#### Getting Started

Clone this repository to your localhost machine, you should run this command

`git clone https://github.com/johuder33/web-push-notification-sample.git`

once you have cloned this, please go to web-push-notification-sample directory and run these commands

`npm install`

the above command will install all dependencies about our WPN (Web Push Notification) app.

Now go to `package.json` file and search `VAR_APIKEY_VALUE` and replace it with this the APIKEY that you got in Firebase platform, once you have done that, run this command

`npm run app`

Now we can open a new window in our browser, could be Google Chrome or Firefox, and type into the AddressBar `http://localhost:3000`, this will open the app that will be listen in port 3000, when you have opened the app, the app will propm you about Push Notifications, so you need to accept this promp.

Once you have accepted this, you will see a JSON object with and information, something like this:

```javascript
{
  "endpoint": "https://android.googleapis.com/gcm/send/dACZtweOhWE:APA91bFpyYikbZZIIpqC64JGOJ14G2-ICFE2RoBZne8a0eaxiJ8-pqDr0lnZjK-MhlBfK5NEOo6tow26XffOzlXxP33OhPUcQT2evOB2-dWYgwdAID0macXuKgpM9TS7arqdM8bXvAUn",
  "keys": {
    "p256dh": "BDoogUe9vD52QD6fXl-TMOb88fJZou08K0Xb8XzrQPRB0FYNFpbu-4IcfSM4tWCAC_VqXxG2ZuibMoMz7BDJN4k=",
    "auth": "l2IC9VkD5IsqIEA3_ofb6g=="
  }
}
```

Please copy this JSON, and then go to Postman or another HTTP App, where you can make a POST request to `http://localhost:3000/notification`, you need to pass a JSON attributes like this:

```javascript
{
    "subscription": {
    "endpoint": "https://updates.push.services.mozilla.com/wpush/v1/gAAAAABZUxaUAD8pXiIU1d4Us8eCzPo62qOynDXkQHkQI9iPgXysGfwE5URgxMfZkfylUOhKDBkno5DrSngDD_gBqcafDZTW3353UoHDX-wwL6qyPOv0-QaXtqRT0c_ILqokGpuuJACL",
    "keys": {
        "auth": "B1JliiSAPzKwgYdKqAuuSw",
        "p256dh": "BE-HsKLeap49dY3rThXEuq1pHngvQyP4XmsV7DMXSuCov1pO3C3jDhEqlr4aoikLPMtLtqH1taUsXVfL02-68pc"
    }
    },
    "message": "Hola como te va este es m imensaje"
}
```

Where `subscription` will be the JSON object that you copied in the last step, and `message` will contain the message itself to be render in the WPN.

#### Happy coding... :D