const express = require("express");
const cors = require("cors");
const body_parse = require("body-parser")
const path = require("path");
const carritoService = require("./carritoService.js");

const app = express();
const port = 8084;

app.use(cors());
app.use(body_parse.json());

const pathName = "/carrito";

app.get(pathName,
    (req, res)=>{
        console.log("Se recibío la peticion GET");
        res.send(carritoService.carritosGetExport());
    }
    );

    app.post(pathName,
        async (req, res)=>{
            console.log("peticion carrito")
            console.log(req.body)
            let carritos = await carritoService.carritoSetExport(req.body)
            console.log(carritos)
            res.send({"mensaje":"carrito guardado", "carritos":carritos})
        }

    )



app.listen(port,
    ()=>{
        console.log("Se subio la app carrito en el puerto" + port);
    }
    );