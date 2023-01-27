// Import Dependencies
const express = require('express')
const Show = require('../models/tv-show')
const Comment = require('../models/comments')

// Create router
const router = express.Router()

// POST -> Reply to a comment
// only logged in users can reply
router.post('/:showId/:commId', (req,res) => {
    const { showId, commId } = req.params
    if (req.session.loggedIn) {
        // make the logged in user the author of the comment
        req.body.author = req.session.userId
        const theReply = req.body
        console.log(theReply)
        // find the specific show
        Show.findById(showId)
            .then(show => {
                // find the comment
                const theComment = show.comments.id(commId)
                // push the reply
                theComment.replies.push(theReply)
                console.log(theComment.replies)
                // save the comment
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
        res.redirect(`/error?error=You%20are%20now%20allowed%20to%20reply%20on%20this%20show`)
    }
})

// DELETE -> Delete a comment
// only logged in users can delete their own comments
router.delete('/delete/:showId/:replyId', (req, res) => {
    // isolate the ids and save to a variable
    const { showId, replyId } = req.params
    // find the show
    Show.findById(showId)
        .then(show => {
            // find the reply
            const theReply = show.comments[0].replies.id(replyId)
            // make sure they are logged in and the author of the comment
            if (req.session.loggedIn) {
                // if they are the author allow them to delete
                if (theReply.author == req.session.userId) {
                    theReply.remove()
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