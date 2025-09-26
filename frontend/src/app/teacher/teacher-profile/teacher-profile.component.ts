import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  isPasswordLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      departement: ['', Validators.required],
      grade: ['', Validators.required],
      speciality: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      if (this.currentUser) {
        this.profileForm.patchValue({
          firstName: this.currentUser.firstName || '',
          lastName: this.currentUser.lastName || '',
          email: this.currentUser.email || '',
          phone: this.currentUser.phone || '',
          departement: this.currentUser.departement || '',
          grade: this.currentUser.grade || '',
          speciality: this.currentUser.speciality || ''
        });
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword?.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const profileData = this.profileForm.value;
      
      // Simuler la mise à jour du profil
      // Dans une vraie application, vous appelleriez this.authService.updateProfile(profileData)
      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Profil mis à jour avec succès', 'Fermer', { duration: 3000 });
      }, 1000);
    }
  }

  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      this.isPasswordLoading = true;
      const passwordData = this.passwordForm.value;
      
      // Simuler le changement de mot de passe
      // Dans une vraie application, vous appelleriez this.authService.changePassword(passwordData)
      setTimeout(() => {
        this.isPasswordLoading = false;
        this.passwordForm.reset();
        this.snackBar.open('Mot de passe modifié avec succès', 'Fermer', { duration: 3000 });
      }, 1000);
    }
  }

  getProfileErrorMessage(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} est requis`;
    }
    if (field?.hasError('email')) {
      return 'Email invalide';
    }
    return '';
  }

  getPasswordErrorMessage(fieldName: string): string {
    const field = this.passwordForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName} est requis`;
    }
    if (field?.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (field?.hasError('passwordMismatch')) {
      return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }
}