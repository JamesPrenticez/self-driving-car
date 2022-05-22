const canvas = document.getElementById("myCanvas")

canvas.width = 600

const ctx = canvas.getContext("2d")

const road = new Road(canvas.width/2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(2), 400, 42, 103, "KEYS", 3, "blue")
const traffic = [
  new Car(road.getLaneCenter(2), 100, 42, 103, "DUMMY", 2, getRandomColor()),
]

animate()

function animate(){

  for(let i = 0; i < traffic.length; i++){
    traffic[i].update(road.borders, [])
  }
  
  car.update(road.borders, traffic)
  
  canvas.height = window.innerHeight;
  
  //camera movement
  ctx.save()
  ctx.translate(0, -car.y + canvas.height * 0.7)
  
  //road
  road.draw(ctx)

  //skidz
  car.drawSkid(ctx)

  //traffic
  for(let i = 0; i < traffic.length; i++){
    traffic[i].drawCar(ctx)
  }

  //player car
  car.drawCar(ctx)
  
  ctx.restore()
  
  requestAnimationFrame(animate)
}