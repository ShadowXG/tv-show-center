// Import Dependencies
const express = require('express')
const Show = require('../models/tv-show')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
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

// POST -> Create a comment
// only logged in users can comment
router.post('/:showId', (req,res) => {
    const showId = req.params.showId
    if (req.session.loggedIn) {
        // make the logged in user the author of the comment
        req.body.author = req.session.userId
        // save req.body for easy reference later
        const theComment = req.body
        // find the specific show
        Show.findById(showId)
            .then(show => {
                console.log('testing the comment')
                console.log(theComment.username)
                show.comments.push(theComment)
                return show.save()
            })
            .then(show => {
                res.redirect(`/shows/${show.id}`)
            })
            .catch(err => {
                console.log(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        res.redirect(`/error?error=You%20are%20now%20allowed%20to%20comment%20on%20this%20show`)
    }
})

// DELETE -> Delete a comment
// only logged in users can delete their own comments
router.delete('/delete/:showId/:commId', (req, res) => {
    // isolate the ids and save to a variable
    const { showId, commId } = req.params
    // find the show
    Show.findById(showId)
        .then(show => {
            // find the comment
            const theComment = show.comments.id(commId)
            // make sure they are logged in and the author of the comment
            if (req.session.loggedIn) {
                // if they are the author allow them to delete
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    show.save()
                    res.redirect(`/shows/${show.id}`)
                } else {
                    // otherwise they are unauthorized
                    res.redirect(`/error?error=You%20are%20now%20allowed%20to%20delete%20this%20comment`)
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})

// Export the Router
module.exports = router