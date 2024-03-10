// TablePage.tsx

import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import ChevronDownIcon from "../Icons/ChevronDown";
import { useCallback, useEffect, useState } from "react";
import { fetchCustomers } from "../../api/api";
import { CustomerList } from "../../types/ClientsType";
import CreateCustomerForm from "../CreateCustomerForm/CreateCustomerForm";
import { useToast } from "../ui/use-toast";
import RouteList from "../RouteList/RouteList";
import FilterBar from "../FilterBar/FilterBar";

export default function TablePage() {
  const { toast } = useToast();

  const [customers, setCustomers] = useState<CustomerList[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isRouteModalOpen, setRouteModalOpen] = useState(false);
  const [filter, setFilter] = useState<Record<string, string> | undefined>(); // Defina o tipo corretamente

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchCustomers(filter);
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: `Erro ao buscar cliente: ${error}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [toast, filter]);
  


  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    fetchData();
  };

  const openRouteModal = () => {
    setRouteModalOpen(true);
  };

  const closeRouteModal = () => {
    setRouteModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-14 px-4 border-b lg:h-20 dark:border-gray-800 bg-blue-200 rounded-lg">
        <Button className="rounded-md w-8 h-8 mr-2 lg:hidden" variant="default">
          <ChevronDownIcon className="w-4 h-4" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h2 className="font-semibold text-lg lg:text-2xl">Clientes</h2>
        <Button className="lg:ml-auto lg:mr-2 bg-blue-500 hover:bg-blue-600" size="sm" variant="default" onClick={openCreateModal}>
          Criar novo cliente
        </Button>
        {isCreateModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-lg relative gap-4">
              <button onClick={closeCreateModal} className="absolute top-0 right-0 mr-2 h-4 w-4 text-2xl">&times;</button>
              <CreateCustomerForm />
            </div>
          </div>
        )}
        <Button className="bg-blue-50 border border-blue-300 hover:bg-blue-100" size="sm" variant="secondary" onClick={openRouteModal}>
          Create Melhor Rota
        </Button>
        {isRouteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-lg relative gap-4">
              <button onClick={closeRouteModal} className="absolute top-0 right-0 mr-2 h-4 w-4 text-2xl">&times;</button>
              <RouteList/>
            </div>
          </div>
        )}
      </header>
      <div className="flex items-center p-4">
        <div className="flex justify-around border rounded-lg bg-blue-100 w-full">
        <h2 className="flex items-center p-4">Filtrar</h2>
          <FilterBar setFilter={setFilter} />
        </div>
      </div>
      <main className="flex-1 p-4 grid items-start gap-4 md:p-6 ">
        <div className="border rounded-lg w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="text-center">{customer.name}</TableCell>
                  <TableCell className="text-center">{customer.email}</TableCell>
                  <TableCell className="text-center">{customer.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
