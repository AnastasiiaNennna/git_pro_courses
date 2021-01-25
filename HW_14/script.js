'use strict'

class Group {
    constructor() {
        this._students = [];
    };
    
    get student() {
        return this._students;
    };

    addStudent(student) {
        return this._students.push(student);
    };

    getAverageMark() {
        let groupMarks = this._students.flatMap(({marks}) => marks).flat();
        return groupMarks.reduce((sum, item) => sum + item)/groupMarks.length;
    };
};

class Student{
    constructor(name, marks) {
        this.name = name;
        this.marks = [marks];
    };
};

const feGroup = new Group();

feGroup.addStudent(new Student('John Doe', [10, 10, 7]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));

console.log(feGroup._students);
console.log(feGroup.getAverageMark(this._students, 'marks'));