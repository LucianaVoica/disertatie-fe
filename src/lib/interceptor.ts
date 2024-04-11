import axios from 'axios';
import { toast } from '@/components/ui/use-toast.ts';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    toast({
      title: 'Eroare',
      duration: 3000,
      variant: 'destructive',
      description: 'Ceva nu a mers bine. Vă rugăm să încercați din nou.',
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
