import { useEffect, useState } from 'react';
import { User, UserRequest } from '../types/user';
import { UserService } from '../services/api';
import { UserTable } from '../components/UserTable';
import { UserModal } from '../components/UserModal';
import { ConfirmModal } from '../components/ConfirmModal';
import { Button } from '../components/Button';
import { PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  // Confirm delete state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await UserService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Error al cargar usuarios', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = async (userData: UserRequest, id?: number) => {
    try {
      if (id) {
        await UserService.updateUser(id, userData);
        showToast('Usuario actualizado exitosamente', 'success');
      } else {
        await UserService.createUser(userData);
        showToast('Usuario creado exitosamente', 'success');
      }
      handleCloseModal();
      await fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Ocurrió un error al guardar el usuario', 'error');
      throw error; // Let the modal know it failed
    }
  };

  const confirmDelete = (id: number) => {
    setUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await UserService.deleteUser(userToDelete);
        showToast('Usuario eliminado exitosamente', 'success');
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        showToast('Error al eliminar usuario', 'error');
      }
    }
  };

  return (
    <div>
      <div className="table-header-actions" style={{ padding: 0, paddingBottom: '1.5rem', borderBottom: 'none' }}>
        <h2>Lista de Usuarios</h2>
        <Button variant="primary" onClick={handleOpenCreateModal}>
          <PlusCircle size={18} />
          Agregar
        </Button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando usuarios...</div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleOpenEditModal}
          onDelete={confirmDelete}
        />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveUser}
        editingUser={editingUser}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteUser}
        title="Eliminar Usuario"
        message="¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer."
        confirmText="Eliminar"
      />

      {toastMessage && (
        <div className="toast-container">
          <div className={`toast ${toastMessage.type === 'error' ? 'toast-error' : ''}`} style={toastMessage.type === 'error' ? { backgroundColor: 'var(--danger)' } : {}}>
            {toastMessage.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            {toastMessage.text}
          </div>
        </div>
      )}
    </div>
  );
}
