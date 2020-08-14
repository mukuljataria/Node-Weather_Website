const request=require('request')

const geocode=(address, callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&appid=b1c3e0897eb3a95256eda104c306e178&units=metric'

    request({url,json:true},(error,{body}={})=>{
            if(error)
            {
                callback('Unable to connect to weather service!!',undefined)
                //console.log('Unable to connect to weather service!!')
            }
            else if(body.message)
            {
                callback('Unable to find location',undefined)
                //console.log('Unable to find location')
            }
            else
            callback(undefined,body.main.temp)
           // console.log(response.body)
    })
}

module.exports=geocode