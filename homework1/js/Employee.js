class Employee extends Human {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth);
        this.salary = salary;
        this.department = department;
    }

    displayInfo() {
        return `${super.displayInfo()}, salary: ${this.salary}, department: ${this.department}`;
    }
}