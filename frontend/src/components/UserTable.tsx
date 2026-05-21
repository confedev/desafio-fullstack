import React from 'react';
import { User } from '../types/user';
import { Button } from './Button';
import { Edit2, Trash2 } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>RUT</th>
            <th>Nombre Completo</th>
            <th>Correo</th>
            <th>Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No hay usuarios registrados.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.rut}-{user.dv}</td>
                <td>{user.nombres} {user.apellidos}</td>
                <td>{user.correoElectronico}</td>
                <td>{user.fechaNacimiento}</td>
                <td className="actions-cell">
                  <Button variant="outline" icon onClick={() => onEdit(user)} title="Editar">
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="danger" icon onClick={() => onDelete(user.id)} title="Eliminar">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
