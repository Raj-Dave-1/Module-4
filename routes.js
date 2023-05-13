// Dada Ki Jay Ho



const fs = require("fs");


const requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Parents", "Shree SitaRamHanumanJi");

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write("<html>");
        res.write("<body>");
        res.write("<form action='/message' method='post'><input type='text' name='MyMessage'><button type='submit'>Send</button></form> </body>");
        res.write("</html>");
        return res.end();
    }

    if (url === '/message' && method === "POST") {
        // request is comming as a stream hence lets first collect all the chunks 
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            console.log("Another callback for end is also executed");
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", "SitaRamHanumanJi message is: " + message, (err) => {
                // to redirect we must use this two things "statusCode:302" & "setHeader("Location", "PATH")"
                // statusCode: 301 - for permanent redirect 
                // statusCode: 302 - for "this currently lives on ..."
                // statusCode: 307 - for an intentional temporary redirect
                res.statusCode = 302;
                res.setHeader("Location", "/dadakijayho");
                return res.end();
            });
        });
    }

    let fileContent = fs.readFileSync("message.txt");
    res.write("<html>");
    res.write("<body> File Content is:  <h1> " + fileContent);
    res.write("</h1> </body>");
    res.write("</html>");
    res.end();
}

module.exports = requestHandler;

// below three are aleternatives of each other
// module.exports = {
//     requestHandler: requestHandler,
//     someText: "Some Hard Coded Text"
// };

// module.exports.requestHandler = requestHandler;
// module.exports.someText = "Some Hard Coded Text";

// exports.requestHandler = requestHandler;
// exports.someText = "Some Hard Coded Text";


