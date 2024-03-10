import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '../ui/input';

interface FilterBarProps {
  setFilter: Dispatch<SetStateAction<{ [key: string]: string } | undefined>>;
}

export default function FilterBar({ setFilter }: FilterBarProps) {
  const [selectedField, setSelectedField] = useState<string>(''); 
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSelectChange = (newValue: string) => {
    setSelectedField(newValue === "clear" ? '' : newValue);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    console.log("Search Value", value);
  };

  useEffect(() => {
    setFilter({ [selectedField]: searchValue });
  }, [selectedField, searchValue, setFilter]);

  return (
    <div className="flex items-center space-x-4 m-4">
      <div className="w-48">
        <Select value={selectedField} onValueChange={handleSelectChange}>
          <SelectTrigger className="border-blue-500">
            <SelectValue placeholder="Selecione o campo">{selectedField === 'name' ? 'Nome' : selectedField === 'email' ? 'E-mail' : 'Telefone'}</SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Campos</SelectLabel>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="email">E-mail</SelectItem>
              <SelectItem value="phone">Telefone</SelectItem>
              <SelectItem value="clear">Nenhum filtro</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Input
        id="search"
        name="search"
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={`${selectedField === 'name' ? 'Buscar por nome' : selectedField === 'email' ? 'Buscar por e-mail' :  selectedField === 'phone' ? 'Buscar por telefone' : 'Digite o valor'}`}
        className="w-48 border border-blue-500 rounded-md p-2"
      />
    </div>
  );
}
