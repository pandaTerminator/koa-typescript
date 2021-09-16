import * as http from 'http'
import { debug, log, error } from 'console'

declare module 'http' {
    interface IncomingMessage {
        body: any;
    }
}


export class Application {

    port: number
    router: Object = {}

    constructor (options?: { port?: number }) {
        const opts = options || {}
        this.port = opts.port || 3000
    }


    get(path:string, fn: Function) {
        this.router[path] = fn
    }

    post(path:string, fn: Function) {
        this.router[path] = fn
    }

    readBody(req: any):any {
        return new Promise((resolve, reject) => {
            let body: string = ""
            req.on('data', (chunk: any) => {
                body += chunk
            })
            req.on('end', () => {
                resolve(body)
            })
            req.on('error', (err: any) => {
                reject(err)
            })
        })
    }

    routerHandle(req: any, res:any): void {
        try {
            if (this.router[req.url]) {
                const result:string = this.router[req.url](req, res)
                res.write(result)
            } else {
                res.write('Not Found')
            }
            res.end()
        } catch (err: any) {
            error(err)
        }
    }

    listen (): void {

        const server = http.createServer(async (req, res): Promise<any> => {
            req.body = await this.readBody(req)
            return this.routerHandle(req, res) 
        })

        server.listen(this.port)

        log('http server run', this.port);
    }

}