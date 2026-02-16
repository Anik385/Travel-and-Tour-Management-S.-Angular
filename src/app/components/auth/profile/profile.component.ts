import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;
  isLoading = false;
  message: { type: string, text: string } | null = null;
  passwordStrength = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.loadProfile();
    
    // Password strength checker
    this.profileForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrength = '';
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let strength = 0;
    if (length >= 6) strength++;
    if (length >= 8) strength++;
    if (hasLetters && hasNumbers) strength++;
    if (hasSpecial) strength++;

    if (strength <= 2) {
      this.passwordStrength = 'weak';
    } else if (strength === 3) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  loadProfile() {
    this.isLoading = true;
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.showMessage('error', 'Failed to load profile data');
        this.isLoading = false;
      }
    });
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched(this.profileForm);
      return;
    }

    this.isLoading = true;
    const formValue = this.profileForm.value;
    
    // Don't send password if empty
    if (!formValue.password) {
      delete formValue.password;
      delete formValue.confirmPassword;
    }

    this.userService.updateProfile(formValue).subscribe({
      next: (response) => {
        this.showMessage('success', 'Profile updated successfully');
        this.isLoading = false;
        
        // Clear password fields after successful update
        this.profileForm.patchValue({
          password: '',
          confirmPassword: ''
        });
        this.passwordStrength = '';
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.showMessage('error', err.error?.message || 'Failed to update profile');
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showMessage(type: string, text: string) {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get email() { return this.profileForm.get('email'); }
  get phone() { return this.profileForm.get('phone'); }
  get password() { return this.profileForm.get('password'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
}

// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../../services/user.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html'
// })
// export class ProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   user: any;

//   constructor(
//     private userService: UserService,
//     private fb: FormBuilder
//   ) {
//     this.profileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: [''],
//       password: [''],
//       confirmPassword: ['']
//     });
//   }

//   ngOnInit() {
//     this.loadProfile();
//   }

//   loadProfile() {
//     this.userService.getProfile().subscribe(user => {
//       this.user = user;
//       this.profileForm.patchValue(user);
//     });
//   }

//   updateProfile() {
//     if (this.profileForm.valid) {
//       this.userService.updateProfile(this.profileForm.value).subscribe(() => {
//         alert('Profile updated successfully');
//       });
//     }
//   }
// }