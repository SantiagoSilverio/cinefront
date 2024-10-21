import React from 'react';
import { Projection } from '../../types/projections';

export interface ProjectionListProps {
  projections: Projection[];
  onEdit: (projection: Projection) => React.ReactNode;
  onDelete: (id: number) => void;
  onSort: (column: keyof Projection) => void; // Cambiar a keyof Projection
  sortColumn: keyof Projection | null;
  sortOrder: 'asc' | 'desc';
}

const ProjectionList: React.FC<ProjectionListProps> = ({
  projections,
  onEdit,
  onDelete,
  onSort,
  sortColumn,
  sortOrder,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('date')}>Fecha {sortColumn === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => onSort('start_time')}>Hora de Inicio {sortColumn === 'start_time' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => onSort('duration')}>Duración {sortColumn === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {projections.map((projection) => (
          <tr key={projection.id}>
            <td>{projection.date}</td>
            <td>{projection.start_time}</td>
            <td>{projection.duration}</td>
            <td>
              {onEdit(projection)}
              <button onClick={() => onDelete(projection.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectionList;

