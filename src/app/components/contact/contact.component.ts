import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  isSubmitting: boolean = false;
  showSuccessModal: boolean = false;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  };

  onSubmit() {
    // Basic validation
    if (!this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    if (!this.isValidEmail(this.formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      this.showSuccessModal = true;
      this.resetForm();
    }, 2000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      newsletter: false
    };
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
