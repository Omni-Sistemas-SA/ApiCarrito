
let carritos = require("./carritos.json");
let request = require("axios");

const carritosGet = () => {
    return carritos;
};

const setEstadoCarrito = (carritoPago) => {

    for (let i = 0; i < carritos.length; i++) {
        if (carritos[i].id === carritoPago.idCarrito) {
            carritos[i].estadoPago = carritoPago.estadoPago;
            i = carritos.length
        }
    }
    return "Carrito con pago confirmado"
};

const carritosSet = async (carrito) => {
    console.log("llama a carrito a guardar");
    let productos =[]
    console.log("*********************************************************************")
    console.log(carrito.productos)
    const listarProductos = request.get(
        "http://localhost:8081/carrito/productos", {
            "params":{
                "lista": carrito.productos
            } 
        }
    )
    const cliente = request.get(
        "http://localhost:8082/clientes?id=" + carrito.idCliente
    )
    let mensajes = []
    const reservarProductos = async (carrito)=>{
        console.log("peticion para reservar productos");
        

    }
    // const reservarProductos = carrito.productos.forEach(element => {
    //     let mensaje = request.patch(
    //         "http://localhost:8081/cantidad?id=" + element.id,
    //         element.cantidad
    //     )
    //     mensajes.push(mensaje)
        
    // });

    await request.all([listarProductos, cliente, reservarProductos])
    .then(
        (res)=>{
            console.log("Se recibió la peticion");
            console.log("=================================================================")
            console.log(res[0].data , "----------productos--------")
            // console.log(res[1].data)
            // console.log(res[3].data)
            console.log("=================================================================")
            console.log(mensajes)
            carrito.listaProductos = res[0].data
            carrito.cliente = res[1].data
            carrito.mensajes = mensajes
        }
    )
    .catch(
        (res)=>{
            console.log("Error")
        }
    )
    console.log(carrito);
    carritos.push(carrito);
    console.log(carritos)
    return carritos;
}

module.exports.carritosGetExport = carritosGet;
module.exports.setEstadoCarritoExport = setEstadoCarrito;
module.exports.carritoSetExport = carritosSet;