const express = require('express');
const User = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    User.get()
    .then( projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'error getting projects'});
    })
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.get(id)
        .then(projects => {
            if(projects){
                res.status(200).json(projects)
            }else{
                res.status(404).json({error: 'projects with id does not match'})
            }
        })
    });

router.put('/:id', (req, res) => {
    console.log('updating project')
    const { id } = req.params;
    const { name } = req.body;
    User.update(id, { name })
    .then(updated => {
        if(updated){
            User.getById(id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'error updatig project'})
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error updating project'})
    })
})
router.post('/', (req, res) => {
    const project = req.body;
    User.insert(project)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error inserting project'})
    })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
    .then(() => {
        res.status(204).end()
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({error: 'error deleting projects'})
    })
});


module.exports= router;