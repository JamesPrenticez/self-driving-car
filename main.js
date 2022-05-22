const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 600

const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 600

const carCtx = carCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")

const road = new Road(carCanvas.width/2, carCanvas.width * 0.9)
const car = new Car(road.getLaneCenter(2), 400, 42, 103, "AI", 3, "hsl(208, 100%, 51%)") //"KEYS"
const traffic = [
  new Car(road.getLaneCenter(2), 100, 42, 103, "DUMMY", 2, getRandomColor()),
]

animate()

function animate(time){

  for(let i = 0; i < traffic.length; i++){
    traffic[i].update(road.borders, [])
  }
  
  car.update(road.borders, traffic)
  
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  
  //camera movement
  carCtx.save()
  carCtx.translate(0, -car.y + carCanvas.height * 0.7)
  
  //road
  road.draw(carCtx)

  //skidz
  car.drawSkid(carCtx)

  //traffic
  for(let i = 0; i < traffic.length; i++){
    traffic[i].drawCar(carCtx)
  }

  //player car
  car.drawCar(carCtx)
  
  carCtx.restore()

  networkCtx.lineDashOffset = -time / 50
  Visualizer.drawNetwork(networkCtx, car.brain)
  
  requestAnimationFrame(animate)
}