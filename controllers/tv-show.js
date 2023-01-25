// Import Dependencies
const express = require('express')
const Show = require('../models/tv-show')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Show.find({})
		.then(shows => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('shows/index', { shows, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's shows
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Show.find({ owner: userId })
		.then(shows => {
			res.render('shows/mine', { shows, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('shows/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Show.create(req.body)
		.then(show => {
			console.log('this was returned from create', show)
			res.redirect('/shows')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const showId = req.params.id
	Show.findById(showId)
		.then(show => {
			res.render('shows/edit', { show })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const showId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Show.findByIdAndUpdate(showId, req.body, { new: true })
		.then(show => {
			res.redirect(`/shows/${show.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const showId = req.params.id
	Show.findById(showId)
		.populate('comments.author', 'username')
		.then(show => {
            const {username, loggedIn, userId} = req.session
			console.log(show.comments)
			res.render('shows/show', { show, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const showId = req.params.id
	Show.findByIdAndRemove(showId)
		.then(show => {
			res.redirect('/shows')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
