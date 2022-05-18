class Controls{
  constructor(){
    this.foward = false
    this.left = false
    this.reverse = false
    this.right = false
    this.handbreak = false

    this.#addKeyboardListeners() //# = private 
  }

  #addKeyboardListeners(){
    document.onkeydown = (e) => {
      switch(e.key){
        case "w":
          this.foward = true
          break
        case "a":
          this.left = true
          break
        case "s":
          this.reverse = true
          break
        case "d":
          this.right = true
          break
        case " ":
          this.handbreak = true
          break
      }
      //console.table(this)
    }
    document.onkeyup = (e) => {
      switch(e.key){
        case "w":
          this.foward = false
          break
        case "a":
          this.left = false
          break
        case "s":
          this.reverse = false
          break
        case "d":
          this.right = false
          break
        case " ":
          this.handbreak = false
          break
      }
      //console.table(this)
    }
  }
}