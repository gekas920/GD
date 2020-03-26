import axios, {AxiosInstance} from 'axios'

class BasicRequests {
    private api:string = '/gd';
    private instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL:'http://localhost:3000',
            timeout:1000,
            headers:{
                'Authorization':''
            }
        })
    }

    public setToken(token:string):void{
        localStorage.setItem('accessToken',token);
    }

    public async create(url:string,body:object){
        return await this.instance.post(url,body);
    }
    public async update(url:string,body:object){
        return await this.instance.put(url,body)
    }

    public async get(url:string){
        return await this.instance.get(url)
    }

    public async delete(url:string){
        return await this.instance.delete(url)
    }
}

const Requests = new BasicRequests();

export default Requests

