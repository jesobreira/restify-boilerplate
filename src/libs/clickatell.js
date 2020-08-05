import fetch from 'node-fetch'

async function sms(to, text) {
  fetch("https://platform.clickatell.com/messages/http/send?apiKey=" + process.env.CLICKATELL_KEY + "&to=" + encodeURIComponent(to) + "&content=" + encodeURIComponent(text))
}

export default sms
