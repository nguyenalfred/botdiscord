import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('test temperature paris', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/weather?q=Paris&APPID=b05787eda8d8f7967925692ea52134d2')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})

test('test temperature forecast', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&APPID=b05787eda8d8f7967925692ea52134d2')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
