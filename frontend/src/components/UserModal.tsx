import React, { useState, useEffect } from 'react';
import { User, UserRequest } from '../types/user';
import { Button } from './Button';
import { X } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: UserRequest, id?: number) => Promise<void>;
  editingUser?: User | null;
}

const initialForm: UserRequest = {
  nombres: '',
  apellidos: '',
  rut: '',
  dv: '',
  fechaNacimiento: '',
  correoElectronico: '',
  contrasena: ''
};

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, editingUser }) => {
  const [formData, setFormData] = useState<UserRequest>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        nombres: editingUser.nombres,
        apellidos: editingUser.apellidos,
        rut: editingUser.rut,
        dv: editingUser.dv,
        fechaNacimiento: editingUser.fechaNacimiento,
        correoElectronico: editingUser.correoElectronico,
        contrasena: editingUser.contrasena // Depending on backend, might need to be empty or kept
      });
      setErrors({});
    } else {
      setFormData(initialForm);
      setErrors({});
    }
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es obligatorio";
    if (!formData.apellidos.trim()) newErrors.apellidos = "El apellido es obligatorio";
    if (formData.rut === '' || formData.rut <= 0) newErrors.rut = "El RUT es obligatorio y debe ser mayor a 0";
    if (!formData.dv.trim()) newErrors.dv = "El DV es obligatorio";
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    if (!formData.correoElectronico.trim() || !/^\S+@\S+\.\S+$/.test(formData.correoElectronico)) {
      newErrors.correoElectronico = "Ingrese un correo válido";
    }
    if (!formData.contrasena.trim()) newErrors.contrasena = "La contraseña es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'rut' ? (value ? Number(value) : '') : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData, editingUser?.id);
    } catch (error) {
      // Error is handled in Home.tsx via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
          <button className="modal-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form id="userForm" onSubmit={handleSubmit}>
            {editingUser && (
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  value={editingUser.id}
                  disabled
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="rut">RUT</label>
              <input
                type="number"
                id="rut"
                name="rut"
                className="form-control"
                value={formData.rut}
                onChange={handleChange}
              />
              {errors.rut && <span className="form-error">{errors.rut}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dv">Dígito Verificador</label>
              <input
                type="text"
                id="dv"
                name="dv"
                className="form-control"
                value={formData.dv}
                onChange={handleChange}
                maxLength={1}
              />
              {errors.dv && <span className="form-error">{errors.dv}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="nombres">Nombres</label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                className="form-control"
                value={formData.nombres}
                onChange={handleChange}
              />
              {errors.nombres && <span className="form-error">{errors.nombres}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                id="apellidos"
                name="apellidos"
                className="form-control"
                value={formData.apellidos}
                onChange={handleChange}
              />
              {errors.apellidos && <span className="form-error">{errors.apellidos}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                className="form-control"
                value={formData.fechaNacimiento}
                onChange={handleChange}
              />
              {errors.fechaNacimiento && <span className="form-error">{errors.fechaNacimiento}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="correoElectronico">Correo Electrónico</label>
              <input
                type="email"
                id="correoElectronico"
                name="correoElectronico"
                className="form-control"
                value={formData.correoElectronico}
                onChange={handleChange}
              />
              {errors.correoElectronico && <span className="form-error">{errors.correoElectronico}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                className="form-control"
                value={formData.contrasena}
                onChange={handleChange}
              />
              {errors.contrasena && <span className="form-error">{errors.contrasena}</span>}
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" form="userForm" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </div>
  );
};
