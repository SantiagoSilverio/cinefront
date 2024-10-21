import React, { useState, useEffect } from 'react';
import { BandAdd, Band } from '../../types/bands';
import Link from 'next/link';

interface BandFormProps {
      band?: Band;
      onSave: (band: BandAdd) => void;
}

const BandForm: React.FC<BandFormProps> = ({ band, onSave }) => {
      const [title, setTitle] = useState(band ? band.title : '');
      const [composer, setComposer] = useState(band ? band.composer : '');

      useEffect(() => {
            if (band) {
                  setTitle(band.title);
                  setComposer(band.composer);
            }
      }, [band]);

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSave({ title, composer });
            setTitle('');
            setComposer('');
      };

      return (
            <form onSubmit={handleSubmit} className="band-form">
                  <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título de la banda"
                        required
                        className="input-field"
                  />
                  <input
                        type="text"
                        value={composer}
                        onChange={(e) => setComposer(e.target.value)}
                        placeholder="Compositor de la banda"
                        required
                        className="input-field"
                  />

                  <div className="button-container1">
                        <Link href="/admin/bands">
                              <button className="btn">Ir a la lista</button>
                        </Link>
                        <button type="submit" className="submit-button">Guardar</button>
                  </div>
            </form>
      );
};

export default BandForm;

