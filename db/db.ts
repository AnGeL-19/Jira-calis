import mongoose from "mongoose";

/**
0 = desconectado
1 = conectado
2 = conectando
3 = desconectando 
**/

const mongoConnetion = {
    isConnected: 0
}

export const connect = async () => {
    if (mongoConnetion.isConnected) {
        console.log('tamos conectados');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnetion.isConnected = mongoose.connections[0].readyState;

        if (mongoConnetion.isConnected === 1) {
            console.log('Usando conexion anterior');
            return;
        } 

        await mongoose.disconnect();
    }
    
    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnetion.isConnected = 1;

    console.log("conectado a mongo", process.env.MONGO_URL);
    
}

export const disconnect = async() => {

    if(process.env.NODE_ENV === 'development') return;

    if(mongoConnetion.isConnected === 0) {return}

    await mongoose.disconnect(); 
    mongoConnetion.isConnected = 0;
    console.log('desconectado de mongodb');
    
}

