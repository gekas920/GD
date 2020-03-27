import axios, {AxiosInstance} from 'axios'

class BasicRequests {
    private api:string = '/drive';
    private readonly instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL:'http://localhost:3000',
            timeout:1000,
            headers:{
                'Authorization':localStorage.getItem('accessToken')
            }
        })
    }

    public setToken(token:string):void{
        this.instance.defaults.headers.Authorization = token;
        localStorage.setItem('accessToken',token);
    }

    public async logCreate(url:string,body:object){
        return await this.instance.post(url,body);
    }
    public async Create(url:string,body:object){
        return await this.instance.post(this.api+url,body);
    }

    public async update(url:string,body:object){
        return await this.instance.put(this.api+url,body)
    }

    public async get(url:string){
        return await this.instance.get(this.api+url)
    }

    public async delete(url:string){
        return await this.instance.delete(this.api+url)
    }
}

const Requests = new BasicRequests();

export default Requests

