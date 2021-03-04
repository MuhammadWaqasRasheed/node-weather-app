const path=require('path')
const express=require('express');
const hbs=require('hbs');  //to work with partials
const chalk=require('chalk');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express();

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'templates','views');
const partialsPath = path.join(__dirname,'templates','partials')

//process.env.PORT will be set by heroku on runtime and ||3000 we are providibng as a fallback to run on our local machine
const port = process.env.PORT || 3000

//telling server about our view engine
app.set('view engine', 'hbs');
//telling express that views folder is at locatiion viewsPath and we chnaged its name from views to templates.
app.set('views',viewsPath);
//registering partials
hbs.registerPartials(partialsPath);

//make file accessible in that folder
//in url if we write filename than we can view its content
app.use(express.static(publicDirectoryPath))

//rendering an html page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Muhammad Waqas Rasheed.'
    });  //automatically checks the views folder and render the views.hbs file to browser.
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Muhammad Waqas Rasheed.'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Muhammad Waqas Rasheed.'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Help Article Not Found'
    });
});

app.get('/weather',(req,res)=>{
    address = req.query.address
    if(!address){
        return res.send({
            error:'Address Missing.'
        }) 
    }
    geocode(address,(err,{longitude,latitude,name}={})=>{
        if(err){
            return res.send({
                error:err
            });
        }
        console.log(longitude,latitude)
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }
            return res.send(forecastData)            
        })
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)  //getting query parameters
    res.send('Allah Almighty is Greatest OF All.');
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:'Page Not Found.'
    });
})

app.get('/weather',(req,res)=>{
    res.send('Weather Page.');
})

//starting the server 
//here 3000 is port no
app.listen(port,()=>{
    console.log('Server Is Up and Running on Port '+port);
})