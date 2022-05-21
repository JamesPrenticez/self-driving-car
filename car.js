let skidMarks = [];
let skidPoint = 0;

class Car{
  constructor(x, y, width, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.speed = 0
    this.acceleration = 0.25
    this.maxSpeed = 3
    this.friction = 0.125 //half acceleration
    this.angle = 0
    this.damaged = false

    this.sensor = new Sensor(this)
    this.controls = new Controls()
  }

  update(roadBorders){
    if(!this.damaged){
      this.#move()
      this.polygon = this.#createPolygon()
      this.damaged = this.#assessDamage(roadBorders)
    }
    this.sensor.update(roadBorders)
  }

  #assessDamage(roadBorders){
    for(let i = 0; i < roadBorders.length; i++){
      if(polysIntersect(this.polygon, roadBorders[i])){
        return true
      }
    }
  }

  //hit box for car due to rotation
  #createPolygon(){
    const points = []
    const rad = Math.hypot(this.width, this.height) / 2
    const alpha = Math.atan2(this.width, this.height)
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad
    })
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad
    })
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
    })
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
    })
    return points
  }

  #move(){
    if(this.controls.foward){
      this.speed += this.acceleration
    }

    if(this.controls.reverse){
      this.speed -= this.acceleration
    }

    if(this.speed > this.maxSpeed){
      this.speed = this.maxSpeed
    }

    if(this.speed <- this.maxSpeed / 2){
      this.speed =- this.maxSpeed / 2
    }

    if(this.speed > 0){
      this.speed -= this.friction
    }

    if(this.speed < 0){
      this.speed += this.friction
    }

    //fix slight movement bug
    if(Math.abs(this.speed) < this.friction){
      this.speed = 0
    }
    
    //prevent spin in place
    if(this.speed != 0){
      //flip controls when reversing
      const flip = this.speed > 0 ? 1 : -1
    
      if(this.controls.left){
        this.angle += 0.03 * flip
      }

      if(this.controls.right){
        this.angle -= 0.03 * flip
      }
    }

    if(!this.controls.handbreak){
      this.friction = 0.10
      this.acceleration = 0.25
    }
    
    if(this.controls.handbreak){
      this.x += (Math.sin(this.angle) * (this.speed * 0.5))
      this.y += (Math.cos(this.angle) * (this.speed * 0.5))
      this.friction = 0.03 //180 degree
      if(skidMarks.length > 500) this.acceleration = 0.15, this.friction = 0.06 //90 degree
      if(skidMarks.length > 1000) this.acceleration = 0.05, this.friction = 0.10
      if(skidMarks.length > 1500) this.acceleration = 0
    } 

    this.x -= Math.sin(this.angle) * this.speed
    this.y -= Math.cos(this.angle) * this.speed

  }

  drawSkid(ctx){
    if(!this.controls.handbreak) {
      skidMarks = [];
      skidPoint = 0;
    }

    if(skidMarks.length > 1501) return
  
    skidMarks.push(this.x, this.y); // this happends 144 times per second

    ctx.beginPath()
    ctx.strokeStyle = "#808080"
    ctx.lineWidth = 25
    ctx.moveTo(skidMarks[0], skidMarks[1]);
    for(let i=0; i < skidMarks.length; i = i + 2){ //distance between points

        skidPoint = Math.abs(skidMarks[(skidMarks.length-4)]) - Math.abs(skidMarks[(skidMarks.length-2)]);

        //console.log(skidPoint)

        if(skidPoint > 20){
            ctx.moveTo(skidMarks[i], skidMarks[i + 1]);
        }
        else{
            ctx.lineTo(skidMarks[i],skidMarks[i + 1]);    
        }
    }
    ctx.stroke()
  }
      
  drawCar(ctx){
    if(this.damaged){
      ctx.fillStyle = "red"
    } else {
      ctx.fillStyle = "black"
    }
    this.sensor.draw(ctx)
    ctx.beginPath()
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
    for(let i = 0; i < this.polygon.length; i++){
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
    }
    ctx.fill()
  }

}