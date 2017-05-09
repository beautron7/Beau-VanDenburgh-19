var colors
var ORIGIN = {
    x:()=> 0,
    y:()=> 0,
}
var mouse_pos = {
    x:()=>mouseX,
    y:()=>mouseY,
};

function setup() {
  createCanvas(400, 400);
  tracker.add_point(new Pos(10,10))
  tracker.add_point(new Pos(30,40,new Pos(10,10)))
  tracker.add_box(new Pos(100,100),100,100,2,3)
  colors = {
      red: color(255,0,0),
      skyblue: color(158, 246, 255),
      white: color(255,255,255),
      black: color(0,0,0),
      grey: color(128,128,128)
  }
}

function draw() {
    background(220);
    tracker.renderAll()
}

class Pos {
    constructor(x,y,parent){
        if (parent === undefined) {
            this.parent = ORIGIN
        } else {
            this.parent = parent
        }
        this.__x=x
        this.__y=y
    }

    x(){
        return this.__x+this.parent.x()
    }

    y() {
        return this.__y+this.parent.y()
    }

    newParent (new_parent) {
        this.__x = this.x() - new_parent.x()
        this.__y = this.y() - new_parent.y()
        this.parent=new_parent
    }

    unParent() {
        this.newParent(ORIGIN)
    }
}

var tracker = {
    endpoints: [],//contains a list of all points to track
    boxes:[],//contains a list of all boxes to track
    isDragging: false,
    dragging_obj: null,

    hovering_on_terminal () {
        for (var i = 0; i < this.endpoints.length; i++) {
            if(this.endpoints[i].check_colision()){
                return this.endpoints[i]
            }
        }
        return false
    },

    renderAll () {
        for (var i = 0; i < this.endpoints.length; i++) {
            this.endpoints[i].render()
        }
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].render()
        }
    },

    add_point (pos) {
        return this.endpoints[this.endpoints.push(new Wire_End_Point(pos))-1]
    },

    add_box (pos,w,h,inputs,outputs) {
        return this.boxes[this.boxes.push(new Box(pos,w,h,inputs,outputs))-1]
    }
}

class Wire_End_Point {
    constructor(pos){
        this.radius = 10
        this.pos=pos;
        this.connections=[]
        this.isDragging=false;
    }

    check_colision(){
        return ((mouseX<this.pos.x()+this.radius)&&(mouseX>this.pos.x()-this.radius)&&(mouseY<this.pos.y()+this.radius)&&(mouseY>this.pos.y()-this.radius))
    }

    drag(){
        this.isDragging=true;
        tracker.dragging_obj = this
        tracker.isDragging=true
    }

    connect_with(other_node){
        var already_exists = false
        for (var i = 0; i < this.connections.length; i++) {
            if(this.connections[i]==tracker.hovering_on_terminal()){
                already_exists=true
            }
        }
        if (!already_exists){//that we arent already connected to
            console.log("New connection")//make a new connection
            tracker.hovering_on_terminal().connections.push(this)
            this.connections.push(tracker.hovering_on_terminal())
        } else {
            console.log("already exists")
            //TODO: add code to delete connection.
        }
    }

    release(){
        if (this.isDragging){//if dragging,
            if(tracker.hovering_on_terminal()!==false){//if we are hovering on a terminal
                if(tracker.hovering_on_terminal()!=this){//that is not ourselves
                    this.connect_with(tracker.hovering_on_terminal)// TODO: FIX THIS
                }
            }
            this.isDragging=false;
            if(tracker.dragging_obj == this){
                tracker.dragging_obj=false;
                tracker.isDragging=false;
            }
        }
    }

    render(){
        for (var i = 0; i < this.connections.length; i++) { //render lines
            line(this.pos.x(),this.pos.y(),this.connections[i].pos.x(),this.connections[i].pos.y())
        }
        push();
            if (this.isDragging && mouseIsPressed){//middle of drag sequence
                fill(colors.grey)
                line(this.pos.x(),this.pos.y(),mouseX,mouseY)
            } else if(this.check_colision()){//if not in drag sequence but cursor in circle
                if(mouseIsPressed && !tracker.isDragging){//if mouse pressed in circle and not dragging already, begin drag
                    this.drag()//begin drag
                    fill(colors.grey)
                } else if(tracker.isDragging && !this.isDragging) {//if the mouse is dragging another item
                    fill(colors.red)//drag over
                } else {//The mouse must not be dragging or down, but it still is on top of us
                    this.release()
                    fill(colors.skyblue)
                }
            } else {//nothing special
                this.release()
                fill(colors.white)
            }
            ellipse(this.pos.x(),this.pos.y(),this.radius*2)
        pop();
    }
}

class Box {
    constructor(pos,w,h,inputs,outputs) {
        this.width = w;
        this.height = h;
        this.pos=pos
        this.nodes={in:[],out:[]}
        for (var i = 1; i <= inputs; i++) {
            this.nodes.in.push(tracker.add_point(new Pos(0,i*this.height/(inputs+1),this.pos)))
        }
        for (var i = 1; i <= outputs; i++) {
            this.nodes.out.push(tracker.add_point(new Pos(this.width,i*this.height/(outputs+1),this.pos)))
        }
    }

    check_colision () {
        return (mouseX>this.pos.x())&&(mouseX<this.pos.x()+this.width)&&(mouseY>this.pos.y())&&(mouseY<this.pos.y()+this.height)
    }

    release () {
        if(tracker.dragging_obj == this){
            tracker.dragging_obj=false;
            tracker.isDragging=false;
        }
        this.isDragging = false
        this.pos.unParent()
    }

    drag () {
        this.isDragging=true;
        tracker.dragging_obj = this
        tracker.isDragging=true
        this.pos.newParent(mouse_pos)
    }

    render () {
        push()
            if(this.check_colision()){
                if(tracker.hovering_on_terminal()===false){//this just makes sure locationally, it is good
                    fill(colors.skyblue)
                    if (!tracker.isDragging && mouseIsPressed){
                        this.drag()
                    }
                }
            }
            rect(this.pos.x(),this.pos.y(),this.width,this.height)
            for (var i = 0; i < this.nodes.in.length; i++) {
                this.nodes.in[i].render()
            }
            for (var j = 0; j < this.nodes.out.length; j++) {
                this.nodes.out[j].render()
            }
        pop()
        if (this.isDragging&& !mouseIsPressed)
            this.release();
    }
}

class Input extends Wire_End_Point {
    constructor(pos) {
        super(pos)

    }
}
