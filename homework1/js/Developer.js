class Developer extends Employee {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth, salary, department);
        this.manager = null;
    }

    changeManager(manager) {
        if (manager instanceof Manager) {
            this.manager = manager;
        }
    }
}