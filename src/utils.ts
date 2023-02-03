import { IncomingMessage } from "http";

function getReqData(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";

            req.on("data", () => {
                
            })

        } catch (error) {
            
        }
    })
}