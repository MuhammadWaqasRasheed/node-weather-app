console.log("Client Side JavaScripot is running!");

// const url="http://puzzle.mead.io/puzzle";
// fetch(url).then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

// const url="http://localhost:3000/weather?address=lahore";
// fetch(url).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data)
//         }
//     })
// })

const weatherForm=document.querySelector('form');
const searchWidget=document.querySelector('input')
const msg=document.querySelector("#msg-1");
//msg_1.textContent = "Allah Almighty IS Greatest Of All."

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg.textContent="Loading..."
    const location = searchWidget.value
        const url="/weather?address="+location;
        //now fetching data from server
        fetch(url).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    //console.log(data.error)
                    msg.textContent=data.error;
                    msg.style.color="red";
                }
                else{
                    console.log(data)
                    
                    summary="weather summary is "+data.summary+", min temperature : "+(data.min_temp-273).toFixed(2)+" C, max_temperature : "+(data.max_temp-273).toFixed(2)+" C,location name : "+data.name;
                    msg.textContent=summary;
                    msg.style.color="#777";                    
                }
            })
        })          
})