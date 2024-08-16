"use client";

import React from 'react';
import { Actor } from '../../types/actors';

interface ActorListProps {
      actors: Actor[];
      onEdit: (actor: Actor) => void;
      onDelete: (id: number) => void;
}

const ActorList: React.FC<ActorListProps> = ({ actors, onEdit, onDelete }) => {
      if (!Array.isArray(actors)) {
            return <div>No actors available</div>;
      }

      return (
            <ul>
                  {actors.map((actor) => (
                        <li key={actor.id}>
                              {actor.name}
                              <button onClick={() => onEdit(actor)}>Edit</button>
                              <button onClick={() => onDelete(actor.id)}>Delete</button>
                        </li>
                  ))}
            </ul>
      );
};

export default ActorList;
