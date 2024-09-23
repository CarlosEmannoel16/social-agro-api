import winston from "winston";

const { combine, timestamp, label, printf } = winston.format;

export const Logger = winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} - ${level}: ${message}`;
        })
    ),
    defaultMeta:{},
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log" }),
    ],

});

