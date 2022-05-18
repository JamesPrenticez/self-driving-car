const canvas = document.getElementById("myCanvas")

canvas.width = 600

const ctx = canvas.getContext("2d")

const car = new Car(300, 400, 30, 50)

car.drawCar(ctx)
animate()

function animate(){
  car.update()
  
  canvas.height = window.innerHeight;
  car.drawSkid(ctx)
  car.drawCar(ctx)
  
  requestAnimationFrame(animate)
}