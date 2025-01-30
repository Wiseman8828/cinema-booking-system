const dbCredentials  = () => {
    return {
        "connectionLimit": 10,
        "host":  process.env.DB_HOST || "127.0.0.1",
        "user": process.env.DB_USER || "root",
        "password": process.env.DB_PASSWORD || "Root@2075137",
        "port": process.env.DB_PORT || "3306",
        "database": process.env.DB_NAME ||"cinemaBooking",
        "debug": false
    } 
}

export {
    dbCredentials
}