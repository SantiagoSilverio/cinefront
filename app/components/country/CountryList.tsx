"use client";

import React from 'react';
import { Country } from '../../types/country';

interface CountryListProps {
      countrys: Country[];
      onEdit: (country: Country) => void;
      onDelete: (id: number) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countrys, onEdit, onDelete }) => {
      if (!Array.isArray(countrys)) {
            return <div>No countrys available</div>;
      }

      return (
            <ul>
                  {countrys.map((country) => (
                        <li key={country.id}>
                              {country.name}
                              <button onClick={() => onEdit(country)}>Edit</button>
                              <button onClick={() => onDelete(country.id)}>Delete</button>
                        </li>
                  ))}
            </ul>
      );
};

export default CountryList;
