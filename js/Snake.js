(function(){
    window.Snake = function(){
        //蛇的身体，可以让蛇 头增尾删 运动起来
        //让蛇动起来的套路是，每一帧都清屏，然后更新蛇、渲染蛇...
        this.body = [
            {"row":3, "col": 7},
            {"row":3, "col": 6},
            {"row":3, "col": 5},
            {"row":3, "col": 4},
            {"row":3, "col": 3}
        ]
        //蛇当前动态的方向
        this.direction = "R";
        //即将设置的方向，这里为了防止用户按很快出bug
        this.willDirection = "R";
    }

    //渲染蛇
    Snake.prototype.render = function(){
        //遍历自己的每一个身体小格，在table中的对应小格渲染颜色
        game.setColor(this.body[0].row, this.body[0].col,'green')
        for(var i = 1;i < this.body.length;i++){
            game.setColor(this.body[i].row, this.body[i].col,'red')
        }
    }
    //更新蛇，运动
    Snake.prototype.update = function(){
        //根据方向头插
        //让当前的方向和即将设置的方向一致
        this.direction = this.willDirection;
        switch(this.direction){
            case "R":
                var toucha = {"row":this.body[0].row, "col": this.body[0].col + 1};
                this.body.unshift(toucha);
                break;
            case "L":
                var toucha = {"row":this.body[0].row, "col": this.body[0].col - 1};
                this.body.unshift(toucha);
                break;
            case "U":
                var toucha = {"row":this.body[0].row - 1, "col": this.body[0].col};
                this.body.unshift(toucha);
                break;
            case "D":
                var toucha = {"row":this.body[0].row + 1, "col": this.body[0].col};
                this.body.unshift(toucha);
                break;
        }

        //食物判断
        //当吃到食物时，不需要删尾巴，需要重新new一个食物
        if(toucha.row == game.food.row && toucha.col == game.food.col){
            //中介者是game，所以要传递中介者
            game.food = new Food(game);
        }else{
            //没有吃到食物，就删除尾巴一项
            this.body.pop();
        }

        //撞墙判断
        if(toucha.row < 0 || toucha.col < 0 || toucha.col > game.colAmount-1 || toucha.row > game.rowAmount - 1){
            alert("你撞墙了，长度是：" + this.body.length);
            //撞墙后继续头插不合理
            this.body.shift();
            clearInterval(game.timer);
        }

        //撞自己判断
        for(var i = 1; i < this.body.length;i++){
            if(toucha.row == this.body[i].row && toucha.col == this.body[i].col){
                alert("你撞墙了，长度是：" + this.body.length);
                //撞墙后继续头插不合理
                this.body.shift();
                clearInterval(game.timer);
            }
        }
    }
    //改变方向
    Snake.prototype.changeDirection = function(str){
        this.willDirection = str;
    }
})()