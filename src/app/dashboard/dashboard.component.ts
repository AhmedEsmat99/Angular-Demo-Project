import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Employee } from '../employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showEmployees: boolean = true
  showForm: boolean = false
  errors: string[] = []
  success: string = ''
  currentEmployee: Employee | null = null
  employees: Employee[] = []
  dataSource: Employee[] = []

  searchQuery: string = ''
  search(query: string): void {
    if (!query) {
      this.dataSource = this.employees
    }
    else {
      console.log(this.dataSource)
      this.dataSource = this.employees.filter(emp =>
        emp.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  }
  constructor(private auth: AuthService) { }
  ngOnInit(): void {
    this.loadEmployees();
  }
  toggleViews(): void {
    this.showEmployees = !this.showEmployees;
    this.showForm = !this.showForm;
  }
  insertEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    resume: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
    updateEmployeeForm : FormGroup= new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    resume: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)])
    })
    loadEmployees(): void {
      this.auth.GetEmployees().subscribe({
        next: (employees) => {this.employees = employees
          this.dataSource = employees
        },
        error: (err) => this.errors = [err.error.message]
      });
    }
    updateEmployee(): void {
      if (this.updateEmployeeForm.valid) {
        this.auth.updateEmployee(this.updateEmployeeForm.value).subscribe({
          next: (res) => {
            this.success = res.message;
            setTimeout(() => {this.success = ''}, 3000);
            this.errors = [];
            this.updateEmployeeForm.reset();
            this.loadEmployees();
          },
          error: (err) => {
            this.errors = err.error.message;
            console.log(this.errors)
            console.log(err)
            this.success = '';
          }
        });
      }
    }
    deleteEmployee(employeeId: number): void {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.auth.deleteEmployee(employeeId).subscribe({
          next: () => {
            this.success = 'Deleted successfully';
            setTimeout(() => { this.success = ''; }, 1000);
            this.loadEmployees();
            console.log('success');
          },
          error: (err) => {
            console.error('An error occurred while deleting the employee:', err);
          }
        });
      }
    }
  submitInsertForm(data: FormGroup): void {
    if (data.valid) {
      this.auth.insertEmployee(data.value).subscribe({
        next: (res) => {
          this.success = res.message;
          setTimeout(() => {
            this.success = ''
        }, 3000);
          this.errors = [];
          data.reset();
          this.loadEmployees();
        },
        error: (err) => {
          console.log(err)
          this.errors = err.error.message.split(';');
          this.success = '';
        }
      });
    }
  }
  prepareModal(employee: Employee) {
    this.updateEmployeeForm.reset();
    this.updateEmployeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
      address: employee.address,
      phone: employee.phone,
      gender: employee.gender,
      age: employee.age,
      resume: employee.resume
    });
  }
}
