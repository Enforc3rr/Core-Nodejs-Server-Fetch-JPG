const http = require("http");
const fs  = require("fs");
const PORT = process.env.PORT || 8000;

http.createServer((req,res)=>{
    switch (req.method) {
        case "POST":
            if(req.url === "/"){
                let requestData = "";
                req.on("data",chunk => {
                    requestData += chunk;
                    requestData =  JSON.parse(requestData);
                });
                req.on("end",()=>{
                    res.setHeader("Content-Type","application/json");
                    const responseData = [];
                    fs.readdirSync(requestData.filePath).forEach(value => {
                        if(value.split(".")[1].toLowerCase() === "jpg" || value.split(".")[1].toLowerCase() === "jpeg")
                            responseData.push(value);
                    });
                    res.write(JSON.stringify(responseData));
                    res.end();
                });
            }
            return
        default :
            res.statusCode = 404;
            res.write("This server works only for POST request");
            res.end();
            break;
    }
}).listen(PORT , ()=>console.log(`Server started at ${PORT}`));