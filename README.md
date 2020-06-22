# Jokenpo Online

Um simples jogo de Jokenpo feito utilizando o **ReactJS** e sua nova tecnologia dos Hooks da versão **16.8**

O jogador deve escolher uma aposta entre pedra, papel e tesoura clicar no respectivo botão. Ao clicar no botão, uma função makeTheGame é chamada. Essa função manda uma requisição post para a rota /game com a entrada numérica da opção do jogador (a pedra manda 0, o papel manda 1 e a tesoura manda 2). Na API em NodeJS que utiliza a framework Express, existe uma rota post /game que ao ser chamada invoca a função index do gameController.

## routes.js
```
routes.post('/game', gameController.index);
```

## gameController.js
O gameController.js por sua vez, pega a entrada numérica que ele recebe e compara com um valor aleatório entre 0 e 2

```
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
```
Então, após isso, ele manda no corpo da resposta o resultado da rodada e a aposta do algorítimo jogando como
```
return response.json({resultado: "ganhou", aiPlayed: sortingResult});
```

Voltando pro frontend, nós pegamos a resposta e armazenamos na constante result
```
const result = await api.post('/game', {entry})
```
e depois pegamos o resultado e a aposta do algorítimo e salvamos em um estado useState.
