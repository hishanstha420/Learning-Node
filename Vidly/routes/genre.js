const express =require('express');
const router=express.Router();



const genres=[
    {
        id:1 ,
        genre:'Comedy',
        movie:["yo","la"]
    },
    {
        id:2 ,
        genre:'Action',
        movie:["red table","was"]
        
    },
    {
        id:3 ,
        genre:'Horror',
        movie:["Monsterous","Evil Dead"]
    },
    {
        id:4 ,
        genre:'Adventure',
        movie:["Uncharted","Jumanji"]
    },
];

router.get('/',(req,res)=>{
    res.send(genres);
});

router.post('/',(req,res)=>{
    const { error }=validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    
    const genre={
        id:req.body.id,
        //id: genres.length+1,
        genre:req.body.genre,
        movie:req.body.movie    
    };
    
    genres.push(genre);
    res.send(genre);

});


router.put('/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with ID isnot available!!!');
    res.send(genre);

    const { error}=validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.genre=req.body.genre;
    res.send(genre);
});



router.delete('/:id', (req,res) =>{
    const genre=genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with Id is not found!!!');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


router.get('/:id',(req,res)=>{
    const genre=genres.find(g=>g.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with ID isnot available!!!');
    res.send(genre);
});

validateGenre=(genre)=>
{
    const schema  =Joi.object({
        id:Joi.number().min(2).required(),
        genre: Joi.string().min(3).required(),
        movie:Joi.array().items(Joi.string()).length(3).required()
    });

    return schema.validate(genre);

}

module.exports=router;
