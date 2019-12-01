const pong = (function(){

    const $canvas = document.querySelector('#pong')
    const $ctx = $canvas.getContext('2d')

    const game = {
        player1: {
            width: 30,
            height: 100,
            x: 10,
            y: $canvas.height / 2 - 50,
            speed: 50,
            score: 0          
        },
        player2: {
            width: 30,
            height: 100,
            x: $canvas.width - 40,
            y: $canvas.height / 2 - 50,
            speed: 50,
            score: 0   
        },
        ball: {
            width: 30,
            height: 30,
            x: $canvas.width / 2 - 15,
            y: $canvas.height / 2 - 15,
            speed: 1,
            dirY: 1,
            dirX: -1,
            mod: 0
        }
    }
    
    document.addEventListener('keydown', keydownEvent)

    function keydownEvent(){
        const keyEvent = event.key

        if ( keyEvent == 'w' && game.player1.y > 0 ) {
            game.player1.y -= game.player1.speed 
        } 

        if ( keyEvent == 's' && game.player1.y < 400 ) {
            game.player1.y += game.player1.speed 
        }

        if ( keyEvent == 'ArrowUp' && game.player2.y > 0 ) {
            game.player2.y -= game.player2.speed 
        } 

        if ( keyEvent == 'ArrowDown' && game.player2.y < 400 ) {
            game.player2.y += game.player2.speed 
        }
        
    }

    function moveBall(){
        if ( game.ball.y + game.ball.height >= game.player1.y && 
            game.ball.y <= game.player1.y + game.player1.height &&
            game.ball.x <= game.player1.x + game.player1.width
            ) {
            
            game.ball.dirX = 1;
            game.ball.mod += 0.2
        } else if (
            game.ball.y + game.ball.height >= game.player2.y && 
            game.ball.y <= game.player2.y + game.player2.height &&
            game.ball.y <= game.player2.x + game.player2.width
            ){

            game.ball.dirX = -1
            game.ball.mod += 0.2
        } 

        if ( game.ball.y <= 0 ) {
            game.ball.dirY = 1
        } else if ( game.ball.y + game.ball.height >= $canvas.height ) {
            game.ball.dirY = -1;
        }
         
        game.ball.x += (game.ball.speed + game.ball.mod) * game.ball.dirX
        game.ball.y += (game.ball.speed + game.ball.mod) * game.ball.dirY

        if ( game.ball.x < game.player1.x + game.player1.width - 15 ) {
            clearBallPosition()
        } else if ( game.ball.x + game.ball.width > game.player1.x + 15 ) {
            clearBallPosition()
        }

        // renderCanvas()
    }

    function clearBallPosition(){
        // game.player1.y = $canvas.height / 2 - game.player1.height / 2;
        // game.player2.y = game.player1.y;
        // game.ball.y = $canvas.height / 2 - 15;
        // game.ball.x = $canvas.width / 2 - 152;
        game.ball.mod = 0;
    }

    function renderPlayers(){
        $ctx.fillStyle = 'white'
        $ctx.fillRect(game.player1.x,game.player1.y,game.player1.width, game.player1.height)
        $ctx.fillRect(game.player2.x,game.player2.y,game.player2.width, game.player2.height)
        $ctx.fillRect(game.ball.x,game.ball.y,game.ball.width, game.ball.height)
    }


    function renderCanvas(){
        $ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        $ctx.fillStyle = 'black'
        $ctx.fillRect(0, 0, 700, 500)
        renderPlayers()
        moveBall()
    }


    setInterval(renderCanvas, 20)

    // return {
    //     renderCanvas: renderCanvas(),
    //     moveBall: moveBall()
    // }
    
})();