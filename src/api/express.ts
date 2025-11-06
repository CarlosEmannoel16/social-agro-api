import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import publicRoutes from "./routes/public.routes";
import privateRoutes from "./routes/private.routes";
import morgan from "morgan";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import { UserAuthMiddleware } from "./middlewares/UserMiddleware";

const app: Express = express(); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("short"));
app.use("/images", express.static(__dirname + "/../uploads"));

const specs = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Agro Api",
      version: "1.0.0",
      description: "API para gerenciamento de animais, produção de leite e usuários no contexto agrícola",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento"
      }
    ]
  },
  apis: ["src/api/routes/*.ts", "src/api/swaggerDoc.yaml"],
});

// Swagger UI - Interface padrão
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Scalar - Interface moderna usando CDN
app.get("/docs", (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Social Agro API - Documentação Scalar</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <script
          id="api-reference"
          data-url="/api-docs-json"></script>
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </body>
    </html>
  `);
});

// Endpoint para servir o JSON do Swagger
app.get("/api-docs-json", (req, res) => {
  res.json(specs);
});

// Página inicial da documentação
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Social Agro API - Documentação</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .container {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
          color: #1a202c;
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-align: center;
        }
        
        .subtitle {
          color: #718096;
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 40px;
        }
        
        .featured {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px;
          border-radius: 15px;
          color: white;
          text-decoration: none;
          display: block;
          margin-bottom: 30px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .featured:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .featured h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .featured p {
          opacity: 0.95;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .featured-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.3);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: auto;
        }
        
        .options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .option-card {
          background: #f7fafc;
          padding: 25px;
          border-radius: 12px;
          color: #2d3748;
          text-decoration: none;
          transition: all 0.3s;
          display: block;
          border: 2px solid transparent;
        }
        
        .option-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
        }
        
        .option-card h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .option-card p {
          color: #718096;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .badge {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 3px 10px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-left: 8px;
        }
        
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #718096;
          font-size: 0.9rem;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 40px 20px;
          }
          
          h1 {
            font-size: 2rem;
          }
          
          .featured h2 {
            font-size: 1.6rem;
          }
          
          .options {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🌾 Social Agro API</h1>
        <p class="subtitle">Documentação Interativa da API</p>
        
        <a href="/docs" class="featured">
          <h2>
            ✨ Documentação Scalar
            <span class="featured-badge">RECOMENDADO</span>
          </h2>
          <p>
            Interface ultra moderna com tema escuro, navegação intuitiva e recursos avançados.
            Teste todos os endpoints, veja exemplos de código em múltiplas linguagens e
            explore a API de forma interativa. Experiência de desenvolvedor premium! 🚀
          </p>
        </a>
        
        <div class="options">
          <a href="/api-docs" class="option-card">
            <h3>
              📋 Swagger UI
              <span class="badge">CLÁSSICO</span>
            </h3>
            <p>
              Interface tradicional do Swagger. Teste direto no navegador com autenticação JWT integrada.
            </p>
          </a>
          
          <a href="/api-docs-json" class="option-card">
            <h3>
              📄 OpenAPI JSON
              <span class="badge">RAW</span>
            </h3>
            <p>
              Especificação OpenAPI em JSON. Importe no Postman, Insomnia ou gere código automaticamente.
            </p>
          </a>
        </div>
        
        <div class="footer">
          <p><strong>Social Agro API v1.0.0</strong></p>
          <p>Made with ❤️ by Carlos Emannoel dos Santos Carneiro</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

const auth = new UserAuthMiddleware().execute;

app.use(publicRoutes);
app.use(auth, privateRoutes);

// Middleware de erro
const errorMiddleware = new ErrorMiddleware();
app.use(errorMiddleware.execute);

export default app;
