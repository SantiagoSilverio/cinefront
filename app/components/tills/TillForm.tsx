import React, { useState, useEffect } from 'react';
import { TillAdd, Till } from '../../types/tills';
import Link from 'next/link';

interface TillFormProps {
    till ?: TillAdd | null ;
    onSave: (till: TillAdd) => void;
}

const TillForm: React.FC<TillFormProps> = ({ till, onSave }) => {
    const [name, setName] = useState(till ? till.name : '');
    const [datail, setDetail] = useState(till ? till.detail : '');


    useEffect(() => {
        if (till) {
            setName(till.name);
            setDetail(till.detail);
        }
    }, [till]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name: name, detail:datail });
        setName('');
        setDetail(' ');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                        <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Nombre "
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                </div>
                <div className="input-field">
                        <input
                              type="text"
                              value={datail}
                              onChange={(e) => setDetail(e.target.value)}
                              placeholder="Detalles"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                <div className="button-container1">
                        <Link href="/admin/tills">
                              <button className="btn">Ir a la lista</button>
                        </Link>
                        <button type="submit" className="submit-button">Guardar</button>
                  </div>
            </form>
        </div>
    );
};

export default TillForm;
