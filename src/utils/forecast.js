//console.log('Allah Almighty Is Greatest Of all');
const request = require('request');
const forecast=(lat,long,callback)=>{
    const url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=2f8dbfd79423557165e60bd7c8e24042";
    request({url:url,json:true},(err,request,response)=>{
        if(err){  //internet connectivity error
            callback('Unable to connect to location services!',undefined);
        }else if(response.message){  //if invalid lattitude or longitude
            callback("Unable To find Location.Try another Search.",undefined);
        }else{
            callback(undefined,{
                summary:response.weather[0].description,
                min_temp:response.main.temp_min,
                max_temp:response.main.temp_max,
                name:response.name
            });
        }
    })
}
module.exports=forecast
