//console.log('Allah Almighty Is Greatest Of all');
const request = require('request');
const geocode=(address,callback)=>{
    url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibXVoYW1tYWR3YXFhc3Jhc2hlZWQiLCJhIjoiY2tsbzFkYnNxMG9uZTJva2R4NHFrMjh3cSJ9.Yz_H5ViLHnT4SPl5atEArw&limit=1";
    request({url:url,json:true},(err,request,response)=>{
        if(err){  //if internet issue
            callback('Unable to connect to location services!',undefined)
        } else if (response.features.length===0){   //if location not found
            callback("Unable To find Location.Try another Search.",undefined)
        }
        else{
            callback(undefined,{
                //longitude : response.coord.lon,
                latitude : response.features[0].center[1],
                longitude : response.features[0].center[0],
                name:response.features[0].text
            })
        }
    })
}


module.exports=geocode
