import { Application } from "./src/application"
import { debug } from 'console'

const app = new Application({
    port: 3001
})

debug('app start')

app.listen()

// test request
app.get('/', ():string => {
    return 'root'
})
app.get('/get', ():string => {
    return 'get'
})
app.post('/item', ():string => {
    return 'item'
})