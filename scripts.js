function onOff(){
    document
    .querySelector("#modal")
    .classList
    .toggle("hide")

   }


   function checkFields (event) {
       const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",

       ]

       const isEmpty = valuesToCheck.find(function(){

        const checkIfIsString = typeof event.target[value].value === "string"
    
        const checkIsEmpty = !event.target[value].value.trim()
               if (checkIfIsString && checkIsEmpty) {
                   return true 

    }
  })

  if (isEmpty) {
      event.preventDefaut()
      alert("Por favor, preencha todos os campos")
  }

       /* for (let value of valuesToCheck) {
           event.target[value].value
       } */
   }

