class Human {
    constructor(name, age, dateOfBirth) {
        this.name = name;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
    }

    displayInfo() {
        return `Name: ${this.name}, age: ${this.age}, date of birthday: ${this.dateOfBirth}`;
    }
}