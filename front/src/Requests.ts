import axios, {AxiosError, AxiosInstance} from 'axios'

class BasicRequests {
    private api:string = '/drive';
    private readonly instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL:'http://localhost:3000',
            timeout:1000,
            headers: {
                Authorization: {
                    toString () {
                        return `${localStorage.getItem('accessToken')}`
                    }
                }
            }
        });
        this.instance.interceptors.response.use((res)=>{
            return res
        },(error:AxiosError) => {
            switch (error.response?.status) {
                case 409:
                    this.get('-check',{
                        headers:
                            {
                                'Authorization':localStorage.getItem('refreshToken')
                            }
                    })
                        .then(res=>{
                            console.log(res);
                            localStorage.setItem('accessToken',res.data.accessToken);
                            localStorage.setItem('refreshToken',res.data.refreshToken);


                        });
                    break;
                case 401:
                    localStorage.clear();
                    window.location.href = '/'
            }
        });
    }

    public setAccessToken(token:string):void{
        this.instance.defaults.headers.Authorization = token;
        localStorage.setItem('accessToken',token);
    }

    public setRefreshToken(refreshToken:string):void{
        localStorage.setItem('refreshToken',refreshToken);
    }

    public async logCreate(url:string,body:object){
        return await this.instance.post(url,body);
    }
    public async create(url:string,body:object,options?){
        return await this.instance.post(this.api+url,body);
    }

    public async update(url:string,body:object){
        return await this.instance.put(this.api+url,body)
    }

    public async get(url:string,options?:object){
        return await this.instance.get(this.api+url,options)
    }

    public async delete(url:string){
        return await this.instance.delete(this.api+url)
    }
}

const Requests = new BasicRequests();

export default Requests

