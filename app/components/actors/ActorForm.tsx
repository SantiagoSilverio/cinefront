import React, { useState, useEffect } from 'react';
import { ActorAdd, Actor } from '../../types/actors';
import Link from 'next/link';

interface ActorFormProps {
      actor?: Actor;
      onSave: (actor: ActorAdd) => void;
}

const ActorForm: React.FC<ActorFormProps> = ({ actor, onSave }) => {
      const [name, setName] = useState(actor ? actor.name : '');

      useEffect(() => {
            if (actor) {
                  setName(actor.name);
            }
      }, [actor]);

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSave({ name });
            setName('');
      };

      return (
            <form onSubmit={handleSubmit} className="actor-form">
                  <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre completo del actor"
                        required
                        className="input-field"
                  />

                  <div className="button-container1">
                        <Link href="/actors">
                              <button className="btn">Cancelar</button>
                        </Link>
                        <button type="submit" className="submit-button">Guardar</button>
                  </div>
            </form>
      );
};

export default ActorForm;
