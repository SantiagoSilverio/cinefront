import React, { useState, useEffect } from 'react';
import { BandAdd } from '../../types/bands';
import '../../bands/bands.css';
import Link from 'next/link';

interface BandFormProps {
  band: BandAdd | null;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ title, composer });
    setTitle('');
    setComposer('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter band title"
          />
        </div>
        <div>
          <label>Composer:</label>
          <input
            type="text"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            placeholder="Enter composer name"
          />
        </div>
        <div className="button-container">
          <Link href="/">
            <button className="btn">Volver</button>
          </Link>
          <button type="submit" className="submit-button">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default BandForm;
