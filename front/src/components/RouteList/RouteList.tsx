import { useState, useEffect } from 'react';
import { CheckIcon, ClockIcon } from '@radix-ui/react-icons';
import { bestRouteCustomers } from '../../api/api';
import { useToast } from '../ui/use-toast';
import { CustomerRoute } from '../../types/ClientsType';

export default function RouteList() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<CustomerRoute[]>([]);
  const [visitedClients, setVisitedClients] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await bestRouteCustomers();
        setCustomers(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: `Erro ao calcular a melhor rota: ${error}`,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
    fetchData();
  }, [toast]);

  const handleClientClick = (id: string) => {
    if (visitedClients.has(id)) {
      visitedClients.delete(id);
    } else {
      visitedClients.add(id);
    }
    setVisitedClients(new Set(visitedClients));
  };

  return (
    <div className='flex flex-col gap-2 pt-3'>
        <h2 className="text-xl pt-2 font-bold">Clientes a serem visitados</h2>
        <div>Lista de clientes com suas respectivas coordenadas.</div>
      <div className="flex flex-col gap-4 p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
        {customers.slice(1,-1).map((customer, index) => (
          <div key={customer.id} className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg cursor-pointer" onClick={() => handleClientClick(customer.id)}>
            <span className="font-semibold text-lg">{index + 1}.</span>
            {visitedClients.has(customer.id) ? <CheckIcon className="w-6 h-6 text-green-500" /> : <ClockIcon className="w-6 h-6" />}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Coordenadas: ({customer.x_axis}, {customer.y_axis})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
