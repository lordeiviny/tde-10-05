const express = require('express');
const bodyParser = require('body-parser');


const server = express();
server.use(express.json());

server.use(bodyParser.json());

server.get("/toDoList", (req, res) => {
    res.json({
        toDoList
    })
})

let  toDoList = [
    {
        id: 1,
        name: "caminhar",
        descricao: "saude",
    },
    {
        id: 2,
        name: "estudar",
        descricao: "educacao"
    },
    {
        id: 3,
        name: "lazer",
        descricao: "jogar"
    }
]

server.get("/toDoList", (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
        toDoList: toDoList
            .filter((toDoList) => {
                return moreThan < toDoList.descricao
        })
    })
})

server.get("/toDoList/:id", (req, res) => {
    const id = Number(req.params.id);
    const toDoList = toDoList.find((toDoList) => {
        return toDoList.id === id;
    });
    res.json({
        toDoList
    })
})

server.post("/toDoList", (req, res) => {
    const newtoDoList = {
        id: toDoList.length + 1,
        name: req.body.name,
        descricao: req.body.descricao
    }
    toDoList.push(newtoDoList)
    res.json({
        toDoList: newtoDoList
    })
})

server.put("/toDoList/:id", (req, res) => {
    const id = Number(req.params.id);
    const toDoList = toDoList.find((toDoList) => {
        return toDoList.id === id;
    })
    if (!toDoList) {
        return res.status(404).json({message: "Product not found"});
    }
    toDoList.name = req.body.name;
    toDoList.descricao = req.body.descricao;
    res.json({
        toDoList
    })
})

server.delete("/toDoList/:id", (req, res) => {
    const id = Number(req.params.id);
    toDoList = toDoList.filter((toDoList) => {
        return toDoList.id !== id;
    })
    res.status(204).send();
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});