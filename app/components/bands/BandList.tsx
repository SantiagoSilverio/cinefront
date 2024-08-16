import React from 'react';
import { Band } from '../../types/bands';


interface BandListProps {
  bands: Band[];
  onEdit: (band: Band) => void;
  onDelete: (id: number) => void;
}

const BandList: React.FC<BandListProps> = ({ bands, onEdit, onDelete }) => {
  return (
    <div className="list-container">
      <table className="centered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Composer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <tr key={band.id}>
              <td>{band.id}</td>
              <td>{band.title}</td>
              <td>{band.composer}</td>
              <td>
                <div className="button-container-table">
                  <button className="btn" onClick={() => onEdit(band)}>Edit</button>
                  <button className="btn" onClick={() => onDelete(band.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BandList;
