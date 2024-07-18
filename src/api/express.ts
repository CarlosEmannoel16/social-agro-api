import express, {Express} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

export const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(__dirname +'/../uploads'))

const specs = swaggerJsDoc({
    definition:{
        openapi: "3.0.0",
        info:{
            title: 'Social Agro Api',
            version: '1.0.0',
        },  
    },
    apis: ['src/api/routes/*.ts', 'src/api/swaggerDoc.yaml']
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))





