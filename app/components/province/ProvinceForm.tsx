import React, { useState, useEffect } from 'react';
import { Province, ProvinceAdd, Country } from '../../types/country';

interface ProvinceFormProps {
      province: Province | null;
      countrys: Country[];
      onSave: (province: ProvinceAdd | Province) => void;
}

const ProvinceForm: React.FC<ProvinceFormProps> = ({ province, countrys, onSave }) => {
      const [name, setName] = useState(province?.name || '');
      const [country, setCountry] = useState<number | string>(province?.country?.id || '');

      useEffect(() => {
            if (province) {
                  setName(province.name);
                  setCountry(province.country.id);
            }
      }, [province]);

      const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            const provinceData: ProvinceAdd = {
                  name,
                  country: country ? parseInt(country.toString(), 10) : 0, // Asegúrate de que country es un número
            };

            console.log('Submitting province data:', provinceData);

            if (province && province.id) {
                  onSave({ ...provinceData, id: province.id }); // Añadir id si existe
            } else {
                  onSave(provinceData);
            }
      };

      return (
            <form onSubmit={handleSubmit}>
                  <div>
                        <label>Nombre de la Provincia</label>
                        <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                        />
                  </div>
                  <div>
                        <label>País</label>
                        <select
                              value={country}
                              onChange={(e) => setCountry(parseInt(e.target.value))}   //UseState tengo que usar para llamarlo ya que no me llama bien.
                        >
                              <option value="">Seleccione un país</option>
                              {countrys.map((country) => (
                                    <option key={country.id} value={country.id}>
                                          {country.name}
                                    </option>
                              ))}
                        </select>
                  </div>
                  <button type="submit">Guardar</button>
            </form>
      );
};

export default ProvinceForm;