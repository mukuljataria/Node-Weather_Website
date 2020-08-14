const path = require('path')
const express = require('express')
const hbs =require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000


//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
	res.render('index',{
		title: 'Weather App',
		name: 'Mukul Jataria'
	})
})

app.get('/about', (req,res)=>{
	res.render('about',{
		title: 'About',
		name: 'Mukul Jataria'
	})
})

app.get('/help',(req,res) =>{
	res.render('help',{
		title: 'Help',
		name: 'Mukul Jataria',
		msg: 'I am Here to help, But i suck at help People so it better you Try to get help from SomeWhere else, I hope you Got me.'
	})
})


app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'YOU MUST PROVIDE SEARCH-TERM'   
		   })
	}
	geocode(req.query.address,(error,data)=>{
		if(error==undefined)
		return res.send({
			temp:data
		})
		else{
			return res.send({error})
		}
	})
	
})

app.get('/products',(req,res)=>{
	if(!req.query.search){
           return res.send({
			error:'YOU MUST PROVIDE SEARCH-TERM'   
		   })
	}
	
	
	
	console.log(req.query.search)
    res.send({
		products: []
	})

})





app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'404',
		error:'Help Article Not Found',
		name:'Mukul Jataria'
	})
})

app.get('*',(req,res) =>{
	res.render('404',{
		title:'404',
		error:'Page Not Found',
		name:'Mukul Jataria'
	})
})

app.listen(port,()=>{
	console.log('Server is up on port '+ port)
})