const apiKey = process.env.API_KEY

const renderHome = async (req, res) => {
    res.render('home.pug')
}

const getfilms = async (req, res) => {
    const title = req.params.title;

    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "False") {
            return res.status(404).render('error.pug', { 
                error: `La película "${title}" no se encontró. Por favor, intenta con otro título.` 
            });
        }

        res.status(200).render('film.pug', { 
            title: data.Title,              
            year: data.Year,                
            img: data.Poster,
            director: data.Director,
            genre: data.Genre,
            description: data.Plot
        });

    } catch (error) {
        console.error('Error loading films', error);
        res.status(500).render('error.pug', { 
            error: "Hubo un problema al cargar la película. Inténtalo nuevamente más tarde." 
        });
    }
};


const postfilms = async (req, res) => {
    const title = req.body.film;
    if (!title || title.trim() === '') {
        return res.render('film', { film: null, error: "Por favor, ingresa un título de película." });
      }
    res.redirect(`/film/${title}`) 
};

    // console.log(title)

    // try {
    //     const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
    //     const data = await response.json();
    //     console.log(data)
    //     console.log(data.Poster)

    //         res.status(200).render('film.pug', {
    //             title: data.Title,
    //             year: data.Year,
    //             img: data.Poster,
    //             director: data.Director,
    //             genre: data.Genre,
    //             description: data.Plot
    //         })
            
    // } catch (error) {
    //     console.error('Error loading films', error);
    // }





module.exports = {
    renderHome,
    getfilms,
    postfilms
};
