const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Liad'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Liad'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Liad',
        description: 'This is where you get help'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide an address'
        })}

   geocode (req.query.search, (error, {lat, long, location}= {}) => {
    
        if (error){
            return res.send({error})
        }
            
        forecast(lat, long, (error, forecastData) => {
                    
            if (error){
                return res.send({error})
            }
                
            res.send({
                locationSearched: req.query.search,
                location,
                forecastData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })}
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'liad',
        description:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'Liad',
        description:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})