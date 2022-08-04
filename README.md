# Next.js OperaJira App
Para correr localmente se necesita base de datos

```
docker-compose up -d
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

* Reconstruir los módulos de node y levantar Next
```
npm install
npm run dev
```

## Configurar las variables de entorno 
Renombrar el archivo __.env.template__ a __.env__

## llenar la base de datos con informacion de pruebas

url:
```http://localhost:3000/api/seed```


