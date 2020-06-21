module.exports = {
    
    index(request, response){
        const { entry } = request.body;
        const sortingResult = Math.floor(Math.random() * 3);

        if(entry === sortingResult) return response.json({resultado: "empatou", aiPlayed: sortingResult});
        else if(entry === 0){
            if(sortingResult === 1) return response.json({resultado: "perdeu", aiPlayed: sortingResult});
            else if(sortingResult === 2) return response.json({resultado: "ganhou", aiPlayed: sortingResult});
        }
        else if(entry === 1){
            if(sortingResult === 0) return response.json({resultado: "ganhou", aiPlayed: sortingResult});
            else if(sortingResult === 2) return response.json({resultado: "perdeu", aiPlayed: sortingResult});
        }
        else if(entry === 2){
            if(sortingResult === 0) return response.json({resultado: "perdeu", aiPlayed: sortingResult});
            else if(sortingResult === 1) return response.json({resultado: "ganhou", aiPlayed: sortingResult});
        }

    }

}