const canvas = document.getElementById("myCanvas")

canvas.width = 600

const ctx = canvas.getContext("2d")

const road = new Road(canvas.width/2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(2), 400, 30, 50)

animate()

function animate(){
  car.update()
  
  canvas.height = window.innerHeight;

  //camera movement
  ctx.save()
  ctx.translate(0, -car.y + canvas.height * 0.7)

  road.draw(ctx)
  car.drawSkid(ctx)
  car.drawCar(ctx)

  ctx.restore()
  
  requestAnimationFrame(animate)
}