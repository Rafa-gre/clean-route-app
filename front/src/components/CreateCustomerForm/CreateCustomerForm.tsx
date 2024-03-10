import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createCustomer } from "../../api/api";
import { CustomerRequestType } from '../../types/ClientsType';
import { useToast } from '../ui/use-toast';



export default function CreateCustomerForm() {
  const {toast} = useToast()

  const [formData, setFormData] = useState<CustomerRequestType>({
    name: '',
    email: '',
    phone: '',
    x_axis: 0,
    y_axis: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) {
      newErrors.name = 'Campo obrigatório';
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone) {
      newErrors.phone = 'Campo obrigatório';
    }

    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await createCustomer(formData);
        // Limpar os campos após o envio bem-sucedido, se necessário
        setFormData({
          name: '',
          email: '',
          phone: '',
          x_axis: 0,
          y_axis: 0
        });
        // Exibir uma mensagem de sucesso para o usuário, se necessário
        toast({
          title: "Sucesso!",
          description: "Cliente criado com sucesso.",
          variant: "success",
          duration: 3000,
          })
      } catch (error: Error | unknown) {
        // Lidar com erros da API, se necessário
        console.error('Erro ao criar cliente:', error);
        // Exibir uma mensagem de erro para o usuário, se necessário
        toast({
          title: "Erro",
          description: `Erro ao criar cliente: ${error}`,
          variant: "destructive",
          duration: 3000,
          });
      }
    }
  };

  return (
    <form className="max-w-m" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="text-xl pt-2 font-bold">Criar Cliente</div>
        <div>Entre com as informações e as coordenadas do seu cliente.</div>
      </div>
      <div className="space-y-4 pt-4">
        <div className="space-y-2 flex flex-col items-start">
          <Label htmlFor="name" className="pl-2">Nome</Label>
          <Input 
            id="name" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Digite o nome"
            className={errors.name && 'border border-red-500'} 
          />
          {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
        </div>
        <div className="space-y-2 flex flex-col items-start">
          <Label htmlFor="email" className="pl-2">E-mail</Label>
          <Input 
            id="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Digite o e-mail"
            className={errors.email && 'border border-red-500'}
          />
          {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
        </div>
        <div className="space-y-2 flex flex-col items-start">
          <Label htmlFor="phone" className="pl-2">Telefone</Label>
          <Input 
            id="phone" 
            name="phone"
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Digite o telefone"
            className={errors.phone && 'border border-red-500'} 
          />
          {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="x" className="pl-2">X</Label>
            <Input 
              id="x" 
              name="x_axis"
              type="number"
              value={formData.x_axis} 
              onChange={handleNumberChange} 
              placeholder="Digite a coordenada X"
            />
          </div>
          <div className="space-y-2 flex flex-col items-start">
            <Label htmlFor="y" className="pl-2">Y</Label>
            <Input 
              id="y" 
              name="y_axis"
              type="number"
              value={formData.y_axis} 
              onChange={handleNumberChange} 
              placeholder="Digite a coordenada Y"
            />
          </div>
        </div>
      </div>
      <div className="pt-4">
        <Button type="submit" variant="default" className="lg:ml-auto lg:mr-2 bg-blue-500 hover:bg-blue-600 w-full">Criar</Button>
      </div>
    </form>
  );
}
