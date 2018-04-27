class Manager extends Employee {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth, salary, department);
        this.employees = [];
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        }
    }

    removeEmployee(employeeName) {
        this.employees.filter((employee) => {
            if (employee.name === employeeName) return false;
            return true;
        });
    }
}