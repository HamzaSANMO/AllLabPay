import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  isEditing = false;
  isSaving = false;
  showPasswordForm = false;
  successMessage = '';
  errorMessage = '';

  // Variables pour remplacer les formulaires
  nom = '';
  prenom = '';
  email = '';
  matricule = '';
  phone = '';
  address = '';
  birthDate = '';
  emergencyContact = '';
  emergencyPhone = '';

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.roleService.isStudent()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user as User;
      if (this.currentUser) {
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile(): void {
    if (!this.currentUser) return;

    this.nom = this.currentUser.firstName || '';
    this.prenom = this.currentUser.lastName || '';
    this.email = this.currentUser.email || '';
    this.matricule = this.currentUser.matricule || '';
    this.phone = this.currentUser.phone || '';
    this.address = this.currentUser.address || '';
    this.birthDate = this.currentUser.birthDate || '';
    this.emergencyContact = this.currentUser.emergencyContact || '';
    this.emergencyPhone = this.currentUser.emergencyPhone || '';

    this.isLoading = false;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.isEditing) {
      this.loadUserProfile();
    }
  }

  saveProfile(): void {
    if (!this.currentUser) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updatedData: User = {
      ...this.currentUser,
      firstName: this.nom,
      lastName: this.prenom,
      email: this.email,
      matricule: this.matricule,
      phone: this.phone,
      address: this.address,
      birthDate: this.birthDate,
      emergencyContact: this.emergencyContact,
      emergencyPhone: this.emergencyPhone
    };

    setTimeout(() => {
      this.currentUser = { ...updatedData };
      localStorage.setItem('auth_user', JSON.stringify(this.currentUser));

      this.authService.refreshUserInfo().subscribe({
        next: () => {
          this.isSaving = false;
          this.isEditing = false;
          this.successMessage = 'Profil mis à jour avec succès';
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = 'Erreur lors de la mise à jour du profil';
          console.error(err);
        }
      });
    }, 1000);
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    setTimeout(() => {
      this.isSaving = false;
      this.showPasswordForm = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.successMessage = 'Mot de passe modifié avec succès';
    }, 1000);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/student/dashboard']);
  }

  logout(): void {
    this.authService.logout();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
