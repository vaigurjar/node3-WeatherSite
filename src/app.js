const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {

        title: 'Weather App',
        name: 'Index Vaibhav',
        creator: 'Morphius'
    }

    )
})

app.get('/about', (req, res) => {
    res.render('about', {

        title: 'About Page',
        name: 'About Vaibhav',
        creator: 'Silvyster'
    }

    )
})


app.get('/help', (req, res) => {
    res.render('help', {

        title: 'Help Page!',
        name: 'Help Vaibhav !',
        creator: 'Arnold'

    }

    )
})

//vghelp.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    // Call to geocode function
    geocode(req.query.address, (error, {latitude,longitude,location} ={}) => {
        if (error) {
         return res.send({error})
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                res.send({error})
            }
            res.send({
                Location: location,
                Forecast: forcastData,
                Address: req.query.address
            })

        })
    })

    // res.send({

    //     forecast: 'It is raining',
    //     location: 'Hyderabad',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search criteria'
        })
    }

    
    // console.log(req.query)
    // res.send({

    //     products: []

    // })

})

app.get('/help/*', (req, res) => {

    res.render('404', {

        title: '404',
        name: 'Error Page !',
        creator: 'vaibhav',
        errorMessage: 'Help article not found'

    })

})

// 404 page should be the last handler
app.get('*', (req, res) => {

    res.render('404', {

        title: '404',
        name: 'Error Page !',
        creator: 'vaibhav',
        errorMessage: 'Page not found'

    })

})

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
  });
  
// app.listen(3000, () => {

//     console.log('Server is up')

// })

// ----------------------------------------------------------------------------------------------
// // vgapp.com
// app.get('', (req, res) => {

//     res.send('<h1>Hello express</h1>')

// })

//vgapp.com/help
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Vaibhav',
//         Age: 32

//     })
// })


// //vghelp.com/about
// app.get('/about', (req, res) => {
//     res.send('<h2>About Page</h2>')
// })



