import { ActorAdd, Actor } from '../../types/actors';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
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
        if (!name.trim()) {
            alert('El nombre del actor es requerido');
            return;
        }
        onSave({ name });
        setName('');
    };

        return (
            <form id="actor-form" onSubmit={handleSubmit} className="actor-form">
                <input
                    id="actor-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo del actor"
                    required
                    className="input-field" // Reutiliza el estilo de "input-field" de BandForm
                />

                <div id="button-container" className="button-container1"> {/* Misma clase usada en BandForm */}
                    <Link href="/admin/actors">
                        <button id="back-button" type="button" className="btn">Ir a la lista</button> {/* Reutiliza el estilo de "btn" */}
                    </Link>
                    <button id="save-button" type="submit" className="submit-button">Guardar</button> {/* Reutiliza el estilo de "submit-button" */}
                </div>
            </form>
        );
    };
    export default ActorForm;