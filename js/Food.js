(function(){
    window.Food = function(mediator){
        //随机食物位置，不能在蛇的身上
        var self = this;
        do{
            this.row = ~~(Math.random() * mediator.rowAmount);
            this.col = ~~(Math.random() * mediator.colAmount);
        }while((function(){ //IIFE执行，返回true或false
            //防止食物随机在蛇身，遍历蛇的身体，通过中介者得到蛇的信息
            for(var i = 0;i < mediator.snake.body.length;i++){
                //判断食物在不在蛇的身体，如果在，返回true，while语句会继续执行
                if(mediator.snake.body[i].row == self.row && mediator.snake.body[i].col == self.col){
                    return true;
                }
            }
            return false; //如果食物不在蛇身上，终止循环
        })())
    }

    Food.prototype.render = function(){
        game.setHTML(this.row, this.col, "♥");
    }
})();