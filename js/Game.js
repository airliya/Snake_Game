(function(){
    //所有代码都写在闭包里面，利用window对象暴露唯一的Game类
    window.Game = function(){
        this.rowAmount = 16; //行数
        this.colAmount = 20; //列数
        this.init(); //初始化UI界面，创建表格
        //实例化蛇类
        this.snake = new Snake();
        //实例食物类
        this.food = new Food(this);
        this.bindEvent();
        //开始游戏的定时器
        this.start();
    }

    //初始化UI界面，创建表格
    Game.prototype.init = function(){
        this.dom = document.createElement('table');
        document.getElementById("app").appendChild(this.dom);

        var tr,td;
        for(var i = 0; i < this.rowAmount;i++){
            tr = document.createElement('tr'); //创建tr
            this.dom.appendChild(tr); //tr行上树
            for(var j = 0;j < this.colAmount;j++){
                td = document.createElement('td'); //创建td
                tr.appendChild(td); //td列上树
            }
        }
    }

    //设置蛇身的颜色
    Game.prototype.setColor = function(row,col,color){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].style.background = color;
    }

    //设置食物的位置
    Game.prototype.setHTML = function(row,col,html){
        this.dom.getElementsByTagName('tr')[row].getElementsByTagName('td')[col].innerHTML = html;
    }

    //清屏方法，遍历行和列，设为白色
    Game.prototype.clear = function(){
        for(var i = 0; i < this.rowAmount;i++){
            for(var j = 0; j < this.colAmount;j++){
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].style.background = "#fff";
                this.dom.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].innerHTML = "";
            }
        }
    }

    //游戏开始
    Game.prototype.start = function(){
        var self = this;
        this.f = 0;
        this.timer = setInterval(function(){
            self.f++;
            document.getElementById("info1").innerHTML = "帧编号：" + self.f;
            //清屏
            self.clear();
            //每间隔30帧更新
            var s = self.snake.body.length < 30 ? 30 - self.snake.body.length : 5;
            self.f % s == 0 && self.snake.update();
            //渲染蛇方法
            self.snake.render();
            //渲染食物
            self.food.render();
        },20);
    }

    //绑定键盘监听，调用changeDirection()方法
    Game.prototype.bindEvent = function(){
        var self = this;
        document.onkeydown = function(e){
            if(e.keyCode == 37){
                //按左箭头，如果现在往右走，不允许往左走
                if(self.snake.direction == "R") return;
                self.snake.changeDirection("L");
            }else if(e.keyCode == 38){
                if(self.snake.direction == "D") return;
                self.snake.changeDirection("U");
            }else if(e.keyCode == 39){
                if(self.snake.direction == "L") return;
                self.snake.changeDirection("R");
            }else if(e.keyCode == 40){
                if(self.snake.direction == "U") return;
                self.snake.changeDirection("D");
            }
        }
    }
})();
