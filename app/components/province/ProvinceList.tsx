"use client";

import React from 'react';
import { Province } from '../../types/country';

interface ProvinceListProps {
      provinces: Province[];
      onEdit: (province: Province) => void;
      onDelete: (id: number) => void;
}

const ProvinceList: React.FC<ProvinceListProps> = ({ provinces, onEdit, onDelete }) => {
      if (!Array.isArray(provinces)) {
            return <div>No provinces available</div>;
      }

      return (
            <ul>
                  {provinces.map((province) => (
                        <li key={province.id}>
                              {province.name} - {province.country.name}
                              <button onClick={() => onEdit(province)}>Edit</button>
                              <button onClick={() => onDelete(province.id)}>Delete</button>
                        </li>
                  ))}
            </ul>
      );
};

export default ProvinceList;
