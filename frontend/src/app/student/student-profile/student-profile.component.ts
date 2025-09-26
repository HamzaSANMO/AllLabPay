import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';

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
  profileForm: FormGroup;
  passwordForm: FormGroup;
  showPasswordForm = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', [Validators.required]],
      phone: ['', [Validators.pattern(/^[0-9]{8,10}$/)]],
      address: [''],
      birthDate: [''],
      emergencyContact: [''],
      emergencyPhone: ['', [Validators.pattern(/^[0-9]{8,10}$/)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un étudiant
    if (!this.roleService.isStudent()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      if (state.user) {
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        nom: this.currentUser.nom,
        prenom: this.currentUser.prenom,
        email: this.currentUser.email,
        matricule: this.currentUser.matricule,
        phone: this.currentUser.phone || '',
        address: this.currentUser.address || '',
        birthDate: this.currentUser.birthDate || '',
        emergencyContact: this.currentUser.emergencyContact || '',
        emergencyPhone: this.currentUser.emergencyPhone || ''
      });
      this.isLoading = false;
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.successMessage = '';
    this.errorMessage = '';
    
    if (!this.isEditing) {
      // Annuler les modifications
      this.loadUserProfile();
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      this.successMessage = '';
      this.errorMessage = '';

      const updatedData = this.profileForm.value;
      
      // Simuler la sauvegarde
      setTimeout(() => {
        // Mettre à jour l'utilisateur local
        if (this.currentUser) {
          this.currentUser = { ...this.currentUser, ...updatedData };
          localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
          
          // Mettre à jour l'état d'authentification
          this.authService.refreshUserInfo().subscribe({
            next: () => {
              this.isSaving = false;
              this.isEditing = false;
              this.successMessage = 'Profil mis à jour avec succès';
            },
            error: (error) => {
              this.isSaving = false;
              this.errorMessage = 'Erreur lors de la mise à jour du profil';
              console.error('Erreur:', error);
            }
          });
        }
      }, 1000);
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      this.isSaving = true;
      this.successMessage = '';
      this.errorMessage = '';

      const passwordData = this.passwordForm.value;
      
      // Simuler le changement de mot de passe
      setTimeout(() => {
        this.isSaving = false;
        this.showPasswordForm = false;
        this.passwordForm.reset();
        this.successMessage = 'Mot de passe modifié avec succès';
      }, 1000);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  isPasswordFieldInvalid(fieldName: string): boolean {
    const field = this.passwordForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
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