import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService
  ) {
    this.teacherForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      matricule: ['', [Validators.required, Validators.minLength(3)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      grade: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un administrateur
    if (!this.roleService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.teacherForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // TODO: Appeler le service pour créer l'enseignant
      // Pour l'instant, on simule la création
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Compte enseignant créé avec succès !';
        this.teacherForm.reset();
      }, 2000);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
