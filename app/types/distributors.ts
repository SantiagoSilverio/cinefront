export interface Distributor {
    id: number;
    name: string;
    state: boolean;
  }
  
  export interface DistributorAdd {
    name: string;
  }

  export interface DistributorListProps {
    distributors: Distributor[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: "asc" | "desc";
    onEdit: (id: number) => void; // Asegúrate de que esta propiedad esté incluida
}