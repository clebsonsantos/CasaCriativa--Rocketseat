//usei o express para criar e configurar servidor


const express = require("express")
const server = express()

const db = require("./db")


/* const ideas = [
{
img:"https://image.flaticon.com/icons/svg/1688/1688400.svg",
title: "Cursos de Programação",
category: "Estudo",
description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi elig",
url: "https://rocketseat.com.br/starter"
},
{
img:"https://image.flaticon.com/icons/svg/1830/1830774.svg",
title: "Meditação",
category: "Mentalidade",
description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi elig",
url: "https://www.youtube.com/watch?v=zGwuWzCyqgs"
},
{
img:"https://image.flaticon.com/icons/svg/2043/2043952.svg",
title: "Treine em casa",
category: "Saúde",
description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi elig",
url: "https://www.youtube.com/channel/UCvM_AO_Icn4jPFNzydozyxw"
},
{
img:"https://image.flaticon.com/icons/svg/1688/1688400.svg",
title: "Cursos de Programação",
category: "Estudo",
description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi elig",
url: "https://rocketseat.com.br/starter"
},

]
*/




//configurar o nunjcks
const nunjcks =  require("nunjucks")
nunjcks.configure("views", {
express: server,
noCache: true, //boolean - interruptor liga/desliga

})


//config arquivos estaticos
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))


//criar rota e capturar pedido do cliente
server.get("/", function(req,res){

db.all(`SELECT * FROM ideas`, function(err, rows){
if (err) return console.log(err)



const reversedIdeas = [...rows].reverse()

let lastIdeas = []
for (let idea of reversedIdeas){

if (lastIdeas.length < 2){
lastIdeas.push(idea)
}
}


return res.render("index.html", { ideas: lastIdeas})
})


})

server.get("/ideias", function(req,res){


db.all(`SELECT * FROM ideas`, function(err, rows){
   if (err) {
      console.log(err)
   
      return res.send("Erro de banco de Dados")
   }


const reversedIdeas = [...rows].reverse()
return res.render("ideias.html", {ideas: reversedIdeas})


})
})


server.post("/", function (req, res) {

// criar tabela

db.run(`
CREATE TABLE IF NOT EXISTS ideas(
id INTEGER PRIMARY KEY AUTOINCREMENT,
image TEXT,
title TEXT, 
category TEXT,
description TEXT,
link TEXT
);
`)

//inserir dado na tabela
const query = (`
INSERT INTO ideas(
image,
title,
category,
description,
link
) VALUES(?,?,?,?,?);`
)

const values = [

   req.body.image,
   req.body.title,
   req.body.category,
   req.body.description,
   req.body.link,
]

db.run(query, values, function(err) {
if (err) {
   console.log(err)

   return res.send("Erro de banco de Dados")
}

return res.redirect( "/ideias")

} )
})

server.listen(3000)
