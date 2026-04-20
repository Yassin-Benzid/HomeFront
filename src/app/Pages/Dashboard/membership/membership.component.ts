import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardNavbarComponent],
  templateUrl: './membership.component.html'
})
export class MembershipComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;

  currentUserRole = '';
  allowedRoles: Array<{ value: string; label: string }> = [];

  showForm = false;
  showDetailsModal = false;
  showDeleteModal = false;

  userToDelete: any = null;

  user = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    password: '',
    role: 'client'
  };

  message = '';
  messageType = 'success';

  roleCards = [
    { label: 'Admins', value: 0 },
    { label: 'Clients', value: 0 },
    { label: 'Managers hôtels', value: 0 },
    { label: 'Managers agences', value: 0 }
  ];

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserRole = this.authService.getRole();
    this.getUsers();
  }

  // ================= GET USERS =================
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
        this.calculateRoles();
        this.showMessage('Utilisateurs chargés ✔', 'success');
      },
      error: () => this.showMessage('Erreur chargement ❌', 'error')
    });
  }

  // ================= VIEW USER =================
  viewUser(user: any) {
    this.selectedUser = user;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
  }

  // ================= DELETE (OPEN MODAL) =================
  deleteUser(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    const id = this.userToDelete?.iduser ?? this.userToDelete?.id ?? this.userToDelete?.idUser ?? this.userToDelete?.userId;
    if (!id) {
      this.showMessage('Identifiant utilisateur introuvable ❌', 'error');
      this.cancelDelete();
      return;
    }

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
        this.cancelDelete();
        this.showMessage('Utilisateur supprimé 🗑️', 'success');
      },
      error: () => this.showMessage('Erreur suppression ❌', 'error')
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  // ================= FORM =================
  openForm() {
    this.showForm = true;
    if (this.currentUserRole === 'admin') {
      this.allowedRoles = [
        { value: 'admin', label: 'Admin' },
        { value: 'hotel-manager', label: 'Hotel Manager' },
        { value: 'agence-manager', label: 'Agence Manager' }
      ];
      this.user.role = this.allowedRoles[0].value;
    } else {
      this.allowedRoles = [ { value: 'client', label: 'Client' } ];
      this.user.role = 'client';
    }
  }

  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  addUser() {
    this.userService.addUser(this.user).subscribe({
      next: () => {
        this.getUsers();
        this.closeForm();
        this.showMessage('Utilisateur ajouté 🎉', 'success');
      },
      error: () => this.showMessage('Erreur ajout ❌', 'error')
    });
  }

  resetForm() {
    this.user = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      password: '',
      role: 'client'
    };
  }

  // ================= STATS =================
  calculateRoles() {
    this.roleCards[0].value = this.users.filter(u => u.role === 'admin').length;
    this.roleCards[1].value = this.users.filter(u => u.role === 'client').length;
    this.roleCards[2].value = this.users.filter(u => u.role === 'hotel-manager').length;
    this.roleCards[3].value = this.users.filter(u => u.role === 'agence-manager').length;
  }

  // ================= MESSAGE =================
  showMessage(msg: string, type: string) {
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  // ================= LABEL =================
  getRoleLabel(role: string) {
    switch (role) {
      case 'admin': return 'Admin';
      case 'client': return 'Client';
      case 'hotel-manager': return 'Hotel Manager';
      case 'agence-manager': return 'Agence Manager';
      default: return role;
    }
  }
}