import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router()

const base = process.env.MONGO_ELN
const nombrebase = 'Parking'

//TODO -> CRUD collection the Usuarios -----------------------------------------------------------------------------------

    /**
     * @swagger
     * components:
     *  schemas:
     *      Usuario:
     *          type: object
     *          properties:
     *              nombre:
     *                  type: string
     *                  description: nombre de usuario
     *              correo:
     *                  type: string
     *                  description: Correo del usuario
     *              contraseña:
     *                  type: string
     *                  description: contraseña del usuario
     *              telefono:
     *                  type: integer
     *                  description: numero del usuario
     *          required:
     *              - nombre
     *              - correo
     *              - contraseña
     *              - telefono
     *          example: 
     *              nombre: Alan Kay
     *              correo: alan@gmail.com
     *              contraseña: 12345
     *              telefono: 3123123
     */

    //! GET

     /**
     * @swagger
     * /parkease/getUsuarios:
     *  get:
     *      summary: Retornar todos los usuarios
     *      tags: [Usuario]
     *      responses:
     *          200:
     *              description: Todos los usuarios enontrados!
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Usuario'
     */

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

    /**
     * @swagger
     * /parkease/postUsuario:
     *  post:
     *      summary: Create new User 
     *      tags: [Usuario]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Usuario'
     *      responses:
     *          200:
     *              description: Nuevo usuario fue creado!
     */

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

     /**
     * @swagger
     * /parkease/deleteUsuario/{id}:
     *  delete:
     *      summary: Eliminar un usuario
     *      tags: [Usuario]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el usuario id
     *      responses:
     *          200:
     *              description: Usuario eliminado
     *          404:
     *              description: Usuario no encontrado
     */

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

     /**
     * @swagger
     * /parkease/updateUsuario/{id}:
     *  patch:
     *      summary: Actualizar un usuario
     *      tags: [Usuario]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el usuario id
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Usuario'
     *      responses:
     *          200:
     *              description: Usuario Actualizado
     *          404:
     *              description: Usuario no encontrado
     */


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
    /**
     * @swagger
     * components:
     *  schemas:
     *      Clientes Frecuentes:
     *          type: object
     *          properties:
     *              usuario_id:
     *                  type: objectId
     *                  description: id traido desde la collecion de usuarios
     *              puntos:
     *                  type: integer
     *                  description: Puntos del usuario

     *          required:
     *              - usuario_id
     *              - puntos
     *          example: 
     *              usuario_id: 651c53fd781e3b9035b9ce1f
     *              puntos: 2500
     */


    //! GET
    /**
     * @swagger
     * /parkease/getClientesFre:
     *  get:
     *      summary: Retornar todos los usuarios Frecuentes
     *      tags: [Clientes Frecuentes]
     *      responses:
     *          200:
     *              description: Todos los usuarios retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Clientes Frecuentes'
     */

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

    
    /**
     * @swagger
     * /parkease/postClienteFre:
     *  post:
     *      summary: Crear nuevo usuario Frecuente 
     *      tags: [Clientes Frecuentes]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Clientes Frecuentes'
     *      responses:
     *          200:
     *              description: Nuevo usuario frecuente fue creado!
     */

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

    /**
     * @swagger
     * /parkease/deleteClienteFre/{id}:
     *  delete:
     *      summary: Eliminar un usuario frecuente
     *      tags: [Clientes Frecuentes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el usuario frecuente id
     *      responses:
     *          200:
     *              description: Usuario frecuente eliminado
     *          404:
     *              description: Usuario frecuente no encontrado
     */


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

         /**
     * @swagger
     * /parkease/updateClienteFre/{id}:
     *  patch:
     *      summary: Actualizar un usuario frecuente
     *      tags: [Clientes Frecuentes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del usuario frecuente
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Clientes Frecuentes'
     *      responses:
     *          200:
     *              description: Usuario frecuente Actualizado
     *          404:
     *              description: Usuario frecuente no encontrado
     */


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

    /**
     * @swagger
     * components:
     *  schemas:
     *      Tarifas:
     *          type: object
     *          properties:
     *              tipo:
     *                  type: string
     *                  description: tipo de tarifa
     *              precio_por_hora:
     *                  type: double
     *                  description: precio por hora

     *          required:
     *              - tipo
     *              - precio_por_hora
     *          example: 
     *              tipo: Normal
     *              precio_por_hora: 2.5
     */


    //! GET

    /**
     * @swagger
     * /parkease/getTarifas:
     *  get:
     *      summary: Retornar todos los usuarios Frecuentes
     *      tags: [Tarifas]
     *      responses:
     *          200:
     *              description: Todos las tarifas retornadas
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Tarifas'
     */

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

        
    /**
     * @swagger
     * /parkease/postTarifa:
     *  post:
     *      summary: Crear nueva tarifa 
     *      tags: [Tarifas]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Tarifas'
     *      responses:
     *          200:
     *              description: Nuevo usuario frecuente fue creado!
     */


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

        /**
     * @swagger
     * /parkease/deleteTarifa/{id}:
     *  delete:
     *      summary: Eliminar una tarifa
     *      tags: [Tarifas]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id de la tarifa
     *      responses:
     *          200:
     *              description: Tarifa eliminado
     *          404:
     *              description: Tarifa no encontrado
     */


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

    /**
     * @swagger
     * /parkease/updateTarifa/{id}:
     *  patch:
     *      summary: Actualizar una Tarifa
     *      tags: [Tarifas]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id de la Tarifa
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Tarifas'
     *      responses:
     *          200:
     *              description: Tarifa Actualizado
     *          404:
     *              description: Tarifa no encontrado
     */


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

    /**
     * @swagger
     * components:
     *  schemas:
     *      Espacios:
     *          type: object
     *          properties:
     *              numero:
     *                  type: intereg
     *                  description: numero de espacio
     *              tipo:
     *                  type: string
     *                  description: tipo de espacio
     *              disponible:
     *                  type: boolean
     *                  description: esta disponible o no

     *          required:
     *              - numero
     *              - tipo
     *              - disponible
     *          example: 
     *              numero: 120
     *              tipo: VIP
     *              disponible: true
     */

    //! GET


    /**
     * @swagger
     * /parkease/getEspacios:
     *  get:
     *      summary: Retornar Todos los espacios disponibles y no disponibles
     *      tags: [Espacios]
     *      responses:
     *          200:
     *              description: Todos los espacios retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Espacios'
     */

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

    /**
     * @swagger
     * /parkease/postEspacio:
     *  post:
     *      summary: Crear nueva Espacio
     *      tags: [Espacios]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Espacios'
     *      responses:
     *          200:
     *              description: Nuevo Espacio fue creado
     */

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


    /**
     * @swagger
     * /parkease/deleteEspacio/{id}:
     *  delete:
     *      summary: Eliminar un Espacio
     *      tags: [Espacios]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Espacio
     *      responses:
     *          200:
     *              description: Espacio eliminado
     *          404:
     *              description: Espacio no encontrado
     */

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

    /**
     * @swagger
     * /parkease/updateEspacio/{id}:
     *  patch:
     *      summary: Actualizar un Espacio
     *      tags: [Espacios]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del espacio
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Espacios'
     *      responses:
     *          200:
     *              description: Espacio Actualizado
     *          404:
     *              description: Espacio no encontrado
     */

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


    /**
     * @swagger
     * components:
     *  schemas:
     *      Reservas:
     *          type: object
     *          properties:
     *              fecha_inicio:
     *                  type: Date
     *                  description: fecha de inicio de reserva
     *              fecha_fin:
     *                  type: Date
     *                  description: fecha de finalizacion de reserva
     *              espacio_estacionamiento_id:
     *                  type: objectId
     *                  description: id del espacio de estacionamiento
     *              monto:
     *                  type: intereg
     *                  description: precio a pagar

     *          required:
     *              - fecha_inicio
     *              - fecha_fin
     *              - espacio_estacionamiento_id
     *              - monto
     *          example: 
     *              fecha_inicio: 2023-09-22
     *              fecha_fin: 2023-09-22
     *              espacio_estacionamiento_id: 651c5bae781e3b9035b9ce3b
     *              monto: 8000
     */


    //! GET

    /**
     * @swagger
     * /parkease/getReservas:
     *  get:
     *      summary: Retornar Todos las reservas
     *      tags: [Reservas]
     *      responses:
     *          200:
     *              description: Todos las Reservas retornadas
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Reservas'
     */


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


    /**
     * @swagger
     * /parkease/postReserva:
     *  post:
     *      summary: Crear nueva Reserva
     *      tags: [Reservas]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Reservas'
     *      responses:
     *          200:
     *              description: Nuevo Reserva fue creada
     */


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

    /**
     * @swagger
     * /parkease/deleteReserva/{id}:
     *  delete:
     *      summary: Eliminar una Reserva
     *      tags: [Reservas]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id de la Reserva
     *      responses:
     *          200:
     *              description: Reserva eliminado
     *          404:
     *              description: Reserva no encontrado
     */

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

    /**
     * @swagger
     * /parkease/updateReserva/{id}:
     *  patch:
     *      summary: Actualizar una Reserva
     *      tags: [Reservas]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id de la Reservas
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Reservas'
     *      responses:
     *          200:
     *              description: Reserva Actualizado
     *          404:
     *              description: Reserva no encontrado
     */


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

//TODO -> CRUD collection the Vehiculos -----------------------------------------------------------------------------------


    /**
     * @swagger
     * components:
     *  schemas:
     *      Vehiculos:
     *          type: object
     *          properties:
     *              propietario_id:
     *                  type: objectId
     *                  description: datos del propietario del vehiculo
     *              placa:
     *                  type: string
     *                  description: placa del vehiculo
     *              marca:
     *                  type: string
     *                  description: marca del vehiculo
     *              modelo:
     *                  type: string
     *                  description: modelo del vehiculo
     *              color:
     *                  type: string
     *                  description: color del vehiculo

     *          required:
     *              - propietario_id
     *              - placa
     *              - marca
     *              - modelo
     *              - color
     *          example: 
     *              propietario_id: 651c5331781e3b9035b9ce0d
     *              placa: WDE456
     *              marca: Audi
     *              modelo: Civic
     *              color: Negro
     */


    //! GET

    /**
     * @swagger
     * /parkease/getVehiculos:
     *  get:
     *      summary: Retornar Todos los Vehiculos
     *      tags: [Vehiculos]
     *      responses:
     *          200:
     *              description: Todos los Vehiculos retornadas
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Vehiculos'
     */


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
    

    /**
     * @swagger
     * /parkease/postVehiculo:
     *  post:
     *      summary: Crear nuevo Vehiculo
     *      tags: [Vehiculos]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Vehiculos'
     *      responses:
     *          200:
     *              description: Nuevo Vehiculo fue creado
     */

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
    
    /**
     * @swagger
     * /parkease/deleteVehiculo/{id}:
     *  delete:
     *      summary: Eliminar un Vehiculo
     *      tags: [Vehiculos]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Vehiculo
     *      responses:
     *          200:
     *              description: Vehiculo eliminado
     *          404:
     *              description: Vehiculo no encontrado
     */


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
    
    /**
     * @swagger
     * /parkease/updateVehiculo/{id}:
     *  patch:
     *      summary: Actualizar un Vehiculo
     *      tags: [Vehiculos]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Vehiculo
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Vehiculos'
     *      responses:
     *          200:
     *              description: Vehiculo Actualizado
     *          404:
     *              description: Vehiculo no encontrado
     */

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

//TODO -> CRUD collection the Registro Entrada/Salida -----------------------------------------------------------------------------------

   /**
     * @swagger
     * components:
     *  schemas:
     *      Registro E_S:
     *          type: object
     *          properties:
     *              vehiculo_id:
     *                  type: objectId
     *                  description: id del vehiculo
     *              espacio_id:
     *                  type: objectId
     *                  description: id del espacio de estacionamiento
     *              fecha_entrada:
     *                  type: Date
     *                  description: fecha de entrada
     *              fecha_salida:
     *                  type: Date
     *                  description: fecha de salida
     *              tarifa_id:
     *                  type: objectId
     *                  description: id de la tarifa
     *              monto_pagado:
     *                  type: double
     *                  description: precio a pagar

     *          required:
     *              - vehiculo_id
     *              - espacio_id
     *              - fecha_entrada
     *              - fecha_salida
     *              - tarifa_id
     *              - monto_pagado
     *          example: 
     *              vehiculo_id: 651c57ce781e3b9035b9ce2c
     *              espacio_id: 651c5bae781e3b9035b9ce3b
     *              fecha_inicio: 2023-09-22
     *              fecha_fin: 2023-09-22
     *              tarifa_id: 651c591e781e3b9035b9ce31
     *              monto_pagado: 29.8
     */


    //! GET

    /**
     * @swagger
     * /parkease/getRegistrosES:
     *  get:
     *      summary: Retornar Todos los Registro E_S
     *      tags: [Registro E_S]
     *      responses:
     *          200:
     *              description: Todos los Registro E_S retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Registro E_S'
     */


router.get('/getRegistrosES', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Registros_E_S");
        const result = await collection.aggregate([
            {
                $lookup:{
                    from: "Vehiculos",
                    localField: "vehiculo_id",
                    foreignField: "_id",
                    as: "vehiculo_id"
                }
            },
            {
                $unwind: "$vehiculo_id"
            },
            {
                $lookup:{
                    from: "Espacios",
                    localField: "espacio_id",
                    foreignField: "_id",
                    as: "espacio_id"
                }
            },
            {
                $unwind: "$espacio_id"
            },
            {
                $lookup:{
                    from: "Tarifas",
                    localField: "tarifa_id",
                    foreignField: "_id",
                    as: "tarifa_id"
                }
            },
            {
                $unwind: "$tarifa_id"
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

   /**
     * @swagger
     * /parkease/postRegistroES:
     *  post:
     *      summary: Crear nuevo Registro E_S
     *      tags: [Registro E_S]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Registro E_S'
     *      responses:
     *          200:
     *              description: Nuevo Registro E_S fue creado
     */

router.post("/postRegistroES", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {vehiculo_id, espacio_id, fecha_entrada, fecha_salida, tarifa_id, monto_pagado} = req.body;

        const registroES = {
            vehiculo_id: new ObjectId(vehiculo_id),
            espacio_id: new ObjectId(espacio_id),
            fecha_entrada: new Date(fecha_entrada),
            fecha_salida : new Date(fecha_salida),
            tarifa_id: new ObjectId(tarifa_id),
            monto_pagado
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registros_E_S');
        const result = await collection.insertOne(registroES)



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

    /**
     * @swagger
     * /parkease/deleteRegistroES/{id}:
     *  delete:
     *      summary: Eliminar un Registro E_S
     *      tags: [Registro E_S]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Registro E_S
     *      responses:
     *          200:
     *              description: Registro E_S eliminado
     *          404:
     *              description: Registro E_S no encontrado
     */


router.delete("/deleteRegistroES/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registros_E_S');
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

    /**
     * @swagger
     * /parkease/updateRegistroES/{id}:
     *  patch:
     *      summary: Actualizar un Registro E_S
     *      tags: [Registro E_S]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Registro E_S
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Registro E_S'
     *      responses:
     *          200:
     *              description: Registro E_S Actualizado
     *          404:
     *              description: Registro E_S no encontrado
     */

router.patch("/updateRegistroES/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {vehiculo_id, espacio_id, fecha_entrada, fecha_salida, tarifa_id, monto_pagado} = req.body;

        const registroES = {
            vehiculo_id: new ObjectId(vehiculo_id),
            espacio_id: new ObjectId(espacio_id),
            fecha_entrada: new Date(fecha_entrada),
            fecha_salida : new Date(fecha_salida),
            tarifa_id: new ObjectId(tarifa_id),
            monto_pagado
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registros_E_S');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: registroES})


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

//TODO -> CRUD collection the Registro Incidentes -----------------------------------------------------------------------------------

   /**
     * @swagger
     * components:
     *  schemas:
     *      Registro Incidentes:
     *          type: object
     *          properties:
     *              fecha:
     *                  type: Dato
     *                  description: Fecha del incidente
     *              descripcion:
     *                  type: string
     *                  description: descripcion del incidente
     *              tipo:
     *                  type: string
     *                  description: tipo de incidente
     *          required:
     *              - fecha
     *              - descripcion
     *              - tipo
     *          example: 
     *              fecha: 2023-09-22
     *              descripcion: Ejemplo de una abolladora en el carro
     *              tipo: Accidente
     *             
     */


    //! GET

   /**
     * @swagger
     * /parkease/getRegistrosInci:
     *  get:
     *      summary: Retornar Todos los Registros de Incidentes
     *      tags: [Registro Incidentes]
     *      responses:
     *          200:
     *              description: Todos los Registros de Incidentes retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Registro Incidentes'
     */


router.get('/getRegistrosInci', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Registro_Incidentes");
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
    
   /**
     * @swagger
     * /parkease/postRegistroInci:
     *  post:
     *      summary: Crear nuevo Registro de Incidente
     *      tags: [Registro Incidentes]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Registro Incidentes'
     *      responses:
     *          200:
     *              description: Nuevo Registro de Incidente fue creado
     */


router.post("/postRegistroInci", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {fecha, descripcion, tipo} = req.body;

        const registroInci = {
            fecha: new Date(fecha),
            descripcion,
            tipo
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registro_Incidentes');
        const result = await collection.insertOne(registroInci)



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

    /**
     * @swagger
     * /parkease/deleteRegistroInci/{id}:
     *  delete:
     *      summary: Eliminar un Registro de Incidentes
     *      tags: [Registro Incidentes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Registro de Incidentes
     *      responses:
     *          200:
     *              description: Registro de Incidentes eliminado
     *          404:
     *              description: Registro de Incidentes no encontrado
     */


router.delete("/deleteRegistroInci/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registro_Incidentes');
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

    /**
     * @swagger
     * /parkease/updateRegistroInci/{id}:
     *  patch:
     *      summary: Actualizar un Registro de Incidentes
     *      tags: [Registro Incidentes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Registro de Incidentes
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Registro Incidentes'
     *      responses:
     *          200:
     *              description: Registro de Incidentes Actualizado
     *          404:
     *              description: Registro de Incidentes no encontrado
     */


router.patch("/updateRegistroInci/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {fecha, descripcion, tipo} = req.body;

        const registroInci = {
            fecha: new Date(fecha),
            descripcion,
            tipo
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Registro_Incidentes');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: registroInci})


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


//TODO -> CRUD collection the Resporte de ingresos -----------------------------------------------------------------------------------

   /**
     * @swagger
     * components:
     *  schemas:
     *      Reporte Ingresos:
     *          type: object
     *          properties:
     *              fecha:
     *                  type: Dato
     *                  description: Fecha del reporte
     *              monto:
     *                  type: intereg
     *                  description: cantidad de ingresos
     *          required:
     *              - fecha
     *              - monto

     *          example: 
     *              fecha: 2023-09-22
     *              monto: 2000
     *             
     *             
     */


    //! GET

    /**
     * @swagger
     * /parkease/getReporteIngre:
     *  get:
     *      summary: Retornar Todos los Reportes de Ingresos
     *      tags: [Reporte Ingresos]
     *      responses:
     *          200:
     *              description: Todos los Reportes de Ingresos retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Reporte Ingresos'
     */


router.get('/getReporteIngre', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Reporte_Ingresos");
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
    
   /**
     * @swagger
     * /parkease/postReporteIngre:
     *  post:
     *      summary: Crear nuevo Reporte de Ingresos
     *      tags: [Reporte Ingresos]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Reporte Ingresos'
     *      responses:
     *          200:
     *              description: Nuevo Reporte de Ingresos fue creado
     */


router.post("/postReporteIngre", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {fecha, monto} = req.body;

        const reporteIngre = {
            fecha: new Date(fecha),
            monto,
            
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reporte_Ingresos');
        const result = await collection.insertOne(reporteIngre)



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

    /**
     * @swagger
     * /parkease/deleteReporteIngre/{id}:
     *  delete:
     *      summary: Eliminar un Reporte de Ingresos
     *      tags: [Reporte Ingresos]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Reporte de Ingresos
     *      responses:
     *          200:
     *              description: Reporte de Ingresos eliminado
     *          404:
     *              description: Reporte de Ingresos no encontrado
     */


router.delete("/deleteReporteIngre/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reporte_Ingresos');
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

    /**
     * @swagger
     * /parkease/updateReporteIngre/{id}:
     *  patch:
     *      summary: Actualizar un Reporte de Ingresos
     *      tags: [Reporte Ingresos]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Reporte de Ingresos
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Reporte Ingresos'
     *      responses:
     *          200:
     *              description: Reporte de Ingresos Actualizado
     *          404:
     *              description: Reporte de Ingresos no encontrado
     */


router.patch("/updateReporteIngre/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {fecha, monto} = req.body;

        const reporteIngre = {
            fecha: new Date(fecha),
            monto
            
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Reporte_Ingresos');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: reporteIngre})


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



//TODO -> CRUD collection the Empleados -----------------------------------------------------------------------------------

   /**
     * @swagger
     * components:
     *  schemas:
     *      Empleados:
     *          type: object
     *          properties:
     *              nombre:
     *                  type: string
     *                  description: nombre del empleado
     *              puesto:
     *                  type: string
     *                  description: puesto del empleado
     *              correo:
     *                  type: string
     *                  description: correo del empleado
     *              telefono:
     *                  type: intereg
     *                  description: telefono del empleado
     *          required:
     *              - nombre
     *              - puesto
     *              - correo
     *              - telefono
     *          example: 
     *              nombre: Paola
     *              puesto: Gerente
     *              correo: paola@gmail.com
     *              telefono: 1431432
     *             
     *             
     */


    //! GET

    /**
     * @swagger
     * /parkease/getEmpleados:
     *  get:
     *      summary: Retornar Todos los Empleados
     *      tags: [Empleados]
     *      responses:
     *          200:
     *              description: Todos los Empleados retornados
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Empleados'
     */


router.get('/getEmpleados', async(req,res)=>{

    const client = new MongoClient(base);

    try {
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection("Empleados");
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
    
   /**
     * @swagger
     * /parkease/postEmpleados:
     *  post:
     *      summary: Crear nuevo Empleados
     *      tags: [Empleados]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Empleados'
     *      responses:
     *          200:
     *              description: Nuevo Empleado fue creado
     */


router.post("/postEmpleados", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {
        const {nombre, puesto, correo, telefono} = req.body;

        const empleados = {
            nombre,
            puesto,
            correo,
            telefono
            
        };
    
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Empleados');
        const result = await collection.insertOne(empleados)



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

    /**
     * @swagger
     * /parkease/deleteEmpleados/{id}:
     *  delete:
     *      summary: Eliminar un Empleado
     *      tags: [Empleados]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Empleado
     *      responses:
     *          200:
     *              description: Empleado eliminado
     *          404:
     *              description: Empleado no encontrado
     */


router.delete("/deleteEmpleados/:id", async(req,res)=>{
    
    const client = new MongoClient(base)
    try {

        const id = req.params.id
        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Empleados');
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

    /**
     * @swagger
     * /parkease/updateEmpleados/{id}:
     *  patch:
     *      summary: Actualizar un Empleado
     *      tags: [Empleados]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: el id del Empleado
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Empleados'
     *      responses:
     *          200:
     *              description: Empleado Actualizado
     *          404:
     *              description: Empleado no encontrado
     */

router.patch("/updateEmpleados/:id", async(req,res)=>{

    const client = new MongoClient(base)
    try {

        const id = req.params.id

        const {nombre, puesto, correo, telefono} = req.body;

        const empleados = {
            nombre,
            puesto,
            correo,
            telefono
            
        };
        

        
        await client.connect();
        const db = client.db(nombrebase);
        const collection = db.collection('Empleados');
        const result = await collection.findOneAndUpdate({_id: new ObjectId(id)},{$set: empleados})


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