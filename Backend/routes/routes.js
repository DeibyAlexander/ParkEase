import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

const base = process.env.MONGO_ELN
const nombrebase = 'Parking'

//TODO -> CRUD collection the Usuarios -----------------------------------------------------------------------------------

    //! GET

router.get('/getUsuarios', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Usuarios");
        const result = await collection.find().toArray()

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! POST

router.post("/postUsuario", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {nombre, correo, contraseña, telefono} = req.body;

        const usuario = {
            nombre,
            correo,
            contraseña,
            telefono,
        };
   
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Usuarios');
        const result = await collection.insertOne(usuario)



        res.json({
            "message":"Enviado Correctamente",
            result
        })       
    } catch (error) {
        console.log(error);
    }finally{
        client.close()
    }
})

    //! DELETE

router.delete("/deleteUsuario/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Usuarios');
        const result = await collection.findOneAndDelete({_id : new ObjectId(id)})

        if (!result.value) {
            res.json({
                "message": "Usuario eliminado correctamente",
                result
            });
        } else if (result.value) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! UPDATE

router.patch("/updateUsuario/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {nombre, correo, contraseña, telefono} = req.body;

        const usuario = {
            nombre,
            correo,
            contraseña,
            telefono,
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Usuarios');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: usuario})


        if (!result.value) {
            res.json({
                "message": "Usuario actualizado correctamente",
                result
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})


//TODO -> CRUD collection the Clientes Frecuentes -----------------------------------------------------------------------------------

        //! GET

router.get('/getClientesFre', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Clientes_Frecuentes");
        const result = await collection.aggregate([
            {
                $lookup:{
                    from: "Usuarios",
                    localField: "usuario_id",
                    foreignField: "_id",
                    as: "usuario_id"
                }

            },
            {
                $unwind: "$usuario_id"
            }
        ]).toArray()

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! POST

router.post("/postClienteFre", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {usuario_id, puntos} = req.body;

        const clienteFre = {
            usuario_id : new ObjectId(usuario_id),
            puntos
        };
   
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Clientes_Frecuentes');
        const result = await collection.insertOne(clienteFre)



        res.json({
            "message":"Enviado Correctamente",
            result
        })       
    } catch (error) {
        console.log(error);
    }finally{
        client.close()
    }
})

    //! DELETE

router.delete("/deleteClienteFre/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Clientes_Frecuentes');
        const result = await collection.findOneAndDelete({_id : new ObjectId(id)})

        if (!result.value) {
            res.json({
                "message": "Usuario eliminado correctamente",
                result
            });
        } else if (result.value) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! UPDATE

router.patch("/updateClienteFre/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {usuario_id, puntos} = req.body;

        const clienteFre = {
            usuario_id: new ObjectId(usuario_id),
            puntos
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Clientes_Frecuentes');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: clienteFre})


        if (!result.value) {
            res.json({
                "message": "Usuario actualizado correctamente",
                result
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

//TODO -> CRUD collection the Tarifas -----------------------------------------------------------------------------------

    //! GET

router.get('/getTarifas', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Tarifas");
        const result = await collection.find().toArray()

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! POST

router.post("/postTarifa", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {tipo, precio_por_hora} = req.body;

        const tarifa = {
            tipo,
            precio_por_hora
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Tarifas');
        const result = await collection.insertOne(tarifa)



        res.json({
            "message":"Enviado Correctamente",
            result
        })       
    } catch (error) {
        console.log(error);
    }finally{
        client.close()
    }
})

    //! DELETE

router.delete("/deleteTarifa/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Tarifas');
        const result = await collection.findOneAndDelete({_id : new ObjectId(id)})

        if (!result.value) {
            res.json({
                "message": "Usuario eliminado correctamente",
                result
            });
        } else if (result.value) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! UPDATE

router.patch("/updateTarifa/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {tipo, precio_por_hora} = req.body;

        const tarifa = {
            tipo,
            precio_por_hora
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Tarifas');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: tarifa})


        if (!result.value) {
            res.json({
                "message": "Usuario actualizado correctamente",
                result
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})


//TODO -> CRUD collection the Espacios -----------------------------------------------------------------------------------

    //! GET

router.get('/getEspacios', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Espacios");
        const result = await collection.find().toArray()

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! POST

router.post("/postEspacio", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {numero, tipo, disponible} = req.body;

        const espacios = {
            numero,
            tipo,
            disponible
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Espacios');
        const result = await collection.insertOne(espacios)



        res.json({
            "message":"Enviado Correctamente",
            result
        })       
    } catch (error) {
        console.log(error);
    }finally{
        client.close()
    }
})

    //! DELETE

router.delete("/deleteEspacio/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Espacios');
        const result = await collection.findOneAndDelete({_id : new ObjectId(id)})

        if (!result.value) {
            res.json({
                "message": "Usuario eliminado correctamente",
                result
            });
        } else if (result.value) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! UPDATE

router.patch("/updateEspacio/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {numero, tipo, disponible} = req.body;

        const tarifa = {
            numero,
            tipo,
            disponible
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Espacios');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: tarifa})


        if (!result.value) {
            res.json({
                "message": "Usuario actualizado correctamente",
                result
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})


//TODO -> CRUD collection the Reservas -----------------------------------------------------------------------------------

    //! GET

router.get('/getReservas', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Reservas");
        const result = await collection.aggregate([
            {
                $lookup:{
                    from: "Espacios",
                    localField: "espacio_estacionamiento_id",
                    foreignField: "_id",
                    as: "espacio_estacionamiento_id"
                }
            },
            {
                $unwind: "$espacio_estacionamiento_id"
            }
        ]).toArray()

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! POST

router.post("/postReserva", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {fecha_inicio, fecha_fin, espacio_estacionamiento_id, monto} = req.body;

        const reservas = {
            fecha_inicio: new Date(fecha_inicio),
            fecha_fin: new Date(fecha_fin),
            espacio_estacionamiento_id: new ObjectId(espacio_estacionamiento_id),
            monto
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reservas');
        const result = await collection.insertOne(reservas)



        res.json({
            "message":"Enviado Correctamente",
            result
        })       
    } catch (error) {
        console.log(error);
    }finally{
        client.close()
    }
})

    //! DELETE

router.delete("/deleteReserva/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reservas');
        const result = await collection.findOneAndDelete({_id : new ObjectId(id)})

        if (!result.value) {
            res.json({
                "message": "Usuario eliminado correctamente",
                result
            });
        } else if (result.value) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

    //! UPDATE

router.patch("/updateReserva/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {fecha_inicio, fecha_fin, espacio_estacionamiento_id, monto} = req.body;

        const reservas = {
            fecha_inicio: new Date(fecha_inicio),
            fecha_fin: new Date(fecha_fin),
            espacio_estacionamiento_id: new ObjectId(espacio_estacionamiento_id),
            monto
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reservas');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: reservas})


        if (!result.value) {
            res.json({
                "message": "Usuario actualizado correctamente",
                result
            });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }finally{
        client.close()
        console.log('Servidor Cerrado');

    }
})

//TODO -> CRUD collection the Reservas -----------------------------------------------------------------------------------

    //! GET

    router.get('/getVehiculos', async(req,res)=>{

        const client = new MongoClient(base);
    
        try {
            await client.connect();
            const db = client.db(nombrebase);
            const collection = db.collection("Vehiculos");
            const result = await collection.aggregate([
                {
                    $lookup:{
                        from: "Usuarios",
                        localField: "propietario_id",
                        foreignField: "_id",
                        as: "propietario_id"
                    }
                },
                {
                    $unwind: "$propietario_id"
                }
            ]).toArray()
    
            res.json(result)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
    
        }finally{
            client.close()
            console.log('Servidor Cerrado');
    
        }
    })
    
        //! POST
    
    router.post("/postVehiculo", async(req,res)=>{
        
        const client = new MongoClient(base)
        try {
            const {propietario_id, placa, marca, modelo, color} = req.body;
    
            const vehiculos = {
                propietario_id: new ObjectId(propietario_id),
                placa,
                marca,
                modelo,
                color
            };
        
            await client.connect();
            const db = client.db(nombrebase);
            const collection = db.collection('Vehiculos');
            const result = await collection.insertOne(vehiculos)
    
    
    
            res.json({
                "message":"Enviado Correctamente",
                result
            })       
        } catch (error) {
            console.log(error);
        }finally{
            client.close()
        }
    })
    
        //! DELETE
    
    router.delete("/deleteVehiculo/:id", async(req,res)=>{
        
        const client = new MongoClient(base)
        try {
    
            const id = req.params.id
            
            await client.connect();
            const db = client.db(nombrebase);
            const collection = db.collection('Vehiculos');
            const result = await collection.findOneAndDelete({_id : new ObjectId(id)})
    
            if (!result.value) {
                res.json({
                    "message": "Usuario eliminado correctamente",
                    result
                });
            } else if (result.value) {
                res.status(404).json({ error: "Usuario no encontrado" });
            }
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
    
        }finally{
            client.close()
            console.log('Servidor Cerrado');
    
        }
    })
    
        //! UPDATE
    
    router.patch("/updateVehiculo/:id", async(req,res)=>{
    
        const client = new MongoClient(base)
        try {
    
            const id = req.params.id
    
            const {propietario_id, placa, marca, modelo, color} = req.body;
    
            const vehiculos = {
                propietario_id: new ObjectId(propietario_id),
                placa,
                marca,
                modelo,
                color
            };
            
    
            
            await client.connect();
            const db = client.db(nombrebase);
            const collection = db.collection('Vehiculos');
            const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: vehiculos})
    
    
            if (!result.value) {
                res.json({
                    "message": "Usuario actualizado correctamente",
                    result
                });
            } else {
                res.status(404).json({ error: "Usuario no encontrado" });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
    
        }finally{
            client.close()
            console.log('Servidor Cerrado');
    
        }
    })

export default router;