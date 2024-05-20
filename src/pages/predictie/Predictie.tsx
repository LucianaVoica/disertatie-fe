import { ChangeEvent, useRef, useState } from 'react';
import axiosInstance from '@/lib/interceptor.ts';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast.ts';
import { data } from 'autoprefixer';
import ChartPredictie from './chart/ChartPredictie';
import { Header } from '@/components/ui/header.tsx';

export type Prediction = {
  label: string;
  score: number;
};

export default function Predictie() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<Prediction[] | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const url = import.meta.env.VITE_API_URL;
  const token = import.meta.env.VITE_AUTH_TOKEN;

  const fetchPrediction = async (file: File | null) => {
    if (!file) {
      return;
    }

    const arrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
    const response = await axiosInstance.post(url, arrayBuffer, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.type,
      },
    });
    return response.data;
  };

  const reset = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: File | null) => fetchPrediction(data),
    onSuccess: (data: Prediction[]) => {
      setPrediction(data);
      setUploadedFile(file);
      toast({
        title: 'Succes',
        description: 'Operație efectuată cu succes!',
      });
      reset();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className={'card'}>
        <Header title={`Generare predicție`} />
        <div className="flex flex-row gap-2 p-6">
          <Input
            className={'rounded-xl border-0'}
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            disabled={!file || isPending}
            onClick={() => mutate(file)}>
            Generare predicție
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-6 card">
        <div className="w-3/4">
          {prediction && (
            <ChartPredictie
              data={prediction}
              key={JSON.stringify(data)}
            />
          )}
        </div>
        <div className="w-1/4 flex flex-row justify-center items-center object-scale-down">
          {uploadedFile && (
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded file"
            />
          )}
        </div>
      </div>
    </div>
  );
}
