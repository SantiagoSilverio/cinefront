import React, { useState, useEffect } from 'react';
import { ActorAdd, Actor } from '../../types/actors';

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
            <form onSubmit={handleSubmit}>
                  <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                        />
                  </div>
                  <button type="submit">Guardar</button>
            </form>
      );
};

export default ActorForm;
