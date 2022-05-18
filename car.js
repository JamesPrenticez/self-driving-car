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

    this.controls = new Controls()
  }

  update(){
    this.#move()
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
      this.friction = 0.125
      this.acceleration = 0.25
    }
    
    if(this.controls.handbreak){
      // if(this.speed <= 0) return
      // this.speed -= 0.04
      // this.acceleration = 0.1
      this.x += (Math.sin(this.angle) * (this.speed * 0.5))
      this.y += (Math.cos(this.angle) * (this.speed * 0.5))
      this.friction = 0.0625 //90 degree
      //this.friction = 0.03125 //180 degree
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
    
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.angle)

    ctx.beginPath()
    ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    ctx.fill()

    ctx.restore()
  }

}