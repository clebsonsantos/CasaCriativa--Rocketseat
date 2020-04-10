const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')


db.serialize(function() {

    
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
link, 
) VALUES(?,?,?,?,?);`)


/* const values = [

    
"https://image.flaticon.com/icons/svg/1688/1688400.svg",
"Cursos de Programação",
"Estudo",
"Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sequi elig",
"https://rocketseat.com.br/starter"

]

db.run(query, values, function(err) {
if (err) return console.log(err)

console.log(this) } )   */





//deletar um dado da tabela
//db.run(`DELET FROM ideas WHERE ID = ?`, [1], function(err){
//if (err) return console.log(err)

//  console.log("DELETEI", this)
//})

//consultar dado na tabela
/* db.all(`SELECT * FROM ideas`, function(err, rows){
if (err) return console.log(err)

console.log(rows) }) */

})

module.exports = db
