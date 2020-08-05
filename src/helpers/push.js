import fetch from 'node-fetch'

function sendPushFcm(to, title, body, icon, url) {
  let postData = JSON.stringify({
    notification: {
      title, body, icon, click_action: url
    },
    to
  })

  return new Promise((resolve, reject) => {
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'key=' + process.env.FCM_KEY
      },
      body: postData
    }).then(res => res.json())
    .then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default sendPushFcm
