import axios, {AxiosInstance, AxiosPromise} from 'axios'

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

    public create(url:string,body:object):AxiosPromise{
        return this.instance.post(url,body);
    }
    public update(url:string,body:object):AxiosPromise<any>{
        return this.instance.put(url,body)
    }

    public get(url:string):AxiosPromise<any>{
        return this.instance.get(url)
    }

    public delete(url:string):AxiosPromise<any>{
        return this.instance.delete(url)
    }
}

const Requests = new BasicRequests();

export default Requests

