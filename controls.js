class Controls{
  constructor(type){
    this.forward = false
    this.left = false
    this.reverse = false
    this.right = false
    this.handbreak = false

    switch(type){
      case "KEYS":
        this.#addKeyboardListeners()
        break
      case "DUMMY":
        this.forward = true
        break
    }
  }

  #addKeyboardListeners(){
    document.onkeydown = (e) => {
      switch(e.key){
        case "w":
          this.forward = true
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
          this.forward = false
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