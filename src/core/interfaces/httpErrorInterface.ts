import { AxiosResponse } from 'axios';


interface httpErrorI {
  errors: string;
  message: string;
  statusCode: number;
}


export interface httpAxiosErrorI {
  response: AxiosResponse<httpErrorI>; 
}



