import Link from 'next/link';
import { Projection } from '../../types/projection'; 
import '../../app/admin/general.css';

type ProjectionListProps = {
    projections: Projection[];
    onEdit: (projection: Projection) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: keyof Projection) => void; 
    sortColumn: keyof Projection | null;
    sortOrder: 'asc' | 'desc';
};

const ProjectionList: React.FC<ProjectionListProps> = ({
    projections,
    onEdit,
    onDelete,
    onSort,
    sortColumn,
    sortOrder,
}) => {
    return (
        <table id="projection-table" className="table-margin table-striped table-centered">
            <thead id="projection-table-head">
                <tr>
                    <th id="id-header">
                        ID
                        <button id="id-sort-button" onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="date-header">
                        Fecha
                        <button id="date-sort-button" onClick={() => onSort('date')}>
                            {sortColumn === 'date' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="start-time-header">
                        Hora de inicio
                        <button id="start-time-sort-button" onClick={() => onSort('start_time')}>
                            {sortColumn === 'start_time' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="duration-header">
                        Duración
                        <button id="duration-sort-button" onClick={() => onSort('duration')}>
                            {sortColumn === 'duration' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="price-total-header">
                        Precio Total
                        <button id="price-total-sort-button" onClick={() => onSort('price_total')}>
                            {sortColumn === 'price_total' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="language-header">
                        Idioma
                        <button id="language-sort-button" onClick={() => onSort('language')}>
                            {sortColumn === 'language' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="subtitles-header">
                        Subtítulos
                        <button id="subtitles-sort-button" onClick={() => onSort('subtitles')}>
                            {sortColumn === 'subtitles' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="room-header">
                        Sala
                        <button id="room-sort-button" onClick={() => onSort('room')}>
                            {sortColumn === 'room' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="id-header">
                        Precio
                        <button id="id-sort-button" onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="movie-header">
                        Película
                        <button id="movie-sort-button" onClick={() => onSort('movie')}>
                            {sortColumn === 'movie' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="actions-header">Acciones</th>
                </tr>
            </thead>
            <tbody id="projection-table-body">
  {projections.map((projection) => (
    <tr key={projection.id}>
      <td id="id-projection-row">{projection.id}</td>
      <td id="date-projection-row">{projection.date}</td>
      <td id="start-time-projection-row">{projection.start_time}</td>
      <td id="duration-projection-row">{projection.duration}</td>
      <td id="price-total-projection-row">{projection.price_total}</td>
      <td id="language-projection-row">{projection.language}</td>
      <td id="subtitles-projection-row">{projection.subtitles}</td>
      <td id="room-projection-row">{projection.room?.name || 'N/A'}</td>
      <td id="movie-projection-row">{projection.movie?.title || 'N/A'}</td>
      <td id="price-projection-row">{projection.price?.amount || 'N/A'}</td>
      <td id="actions-projection-row">
        <Link href={`/admin/editprojection/${projection.id}`}>
          <button
            id="edit-button"
            className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            Editar
          </button>
        </Link>
        <button
          id="delete-button"
          onClick={() => onDelete(projection.id)}
          className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500"
        >
          Eliminar
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
    );
};

export default ProjectionList;
