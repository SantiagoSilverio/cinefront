import React, { useState, useEffect } from 'react';
import { DistributorAdd, Distributor } from '../../types/distributors';
import Link from 'next/link';

interface DistributorFormProps {
  distributor?: Distributor;
  onSave: (distributor: DistributorAdd) => void;
}

const DistributorForm: React.FC<DistributorFormProps> = ({ distributor, onSave }) => {
  const [name, setName] = useState(distributor ? distributor.name : '');

  useEffect(() => {
    if (distributor) {
      setName(distributor.name);
    }
  }, [distributor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="distributor-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del distribuidor"
        required
        className="input-field"
      />
      <div className="button-container1">
        <Link href="/admin/distributors">
          <button className="btn">Ir a la lista</button>
        </Link>
        <button type="submit" className="submit-button">Guardar</button>
      </div>
    </form>
  );
};

export default DistributorForm;
