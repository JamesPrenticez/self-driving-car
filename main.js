const carCanvas = document.getElementById("carCanvas")
carCanvas.width = 300

const networkCanvas = document.getElementById("networkCanvas")
networkCanvas.width = 600

const carCtx = carCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")

const road = new Road(carCanvas.width/2, carCanvas.width * 0.9)

let N = 100
const cars = generateCars(N)
let bestCar = cars[0]

if(localStorage.getItem("bestBrain")){
  for(i = 0; i < cars.length; i++){
    cars[i].brain = JSON.parse(
      localStorage.getItem("bestBrain")
    )
    if(i != 0){
      NeuralNetwork.mutate(cars[i].brain, 0.2)
    }
  }
}

const traffic = [
  new Car(road.getLaneCenter(1), -400, 42, 103, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(0), -800, 42, 103, "DUMMY", 2, getRandomColor()),
  new Car(road.getLaneCenter(2), -800, 42, 103, "DUMMY", 2, getRandomColor()),
]

animate()

function save(){
  localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain)
  )
  document.getElementById("confirmation").innerHTML = "saved" //JSON.stringify(bestCar.brain)
}

function discard(){
  localStorage.removeItem("bestBrain")
}

function generateCars(N){
  const cars = []
  for(let i = 0; i <= N; i++){
    cars.push(new Car(road.getLaneCenter(1), 100, 42, 103, "AI", 3, "hsl(208, 100%, 51%)"))
  }
  return cars
}

function animate(time){
  for(let i = 0; i < traffic.length; i++){
    traffic[i].update(road.borders, [])
  }

  for(let i = 0; i < cars.length; i++){
    cars[i].update(road.borders, traffic)
  }
  
  bestCar = cars.find(
    c => c.y == Math.min(
      ...cars.map(c => c.y)
    )
  )

  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  
  //camera movement
  carCtx.save()
  carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7)
  
  //road
  road.draw(carCtx)

  //skidz
  cars[0].drawSkid(carCtx)

  //traffic
  for(let i = 0; i < traffic.length; i++){
    traffic[i].drawCar(carCtx)
  }

  //player/AI car
  carCtx.globalAlpha = 0.2
  for(let i = 0; i < cars.length; i++){
    cars[i].drawCar(carCtx)
  }
  carCtx.globalAlpha = 1
  bestCar.drawCar(carCtx, true)
  
  carCtx.restore()

  networkCtx.lineDashOffset = -time / 50
  Visualizer.drawNetwork(networkCtx, bestCar.brain)
  
  requestAnimationFrame(animate)
}