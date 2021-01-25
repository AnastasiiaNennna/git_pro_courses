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

    getAverageStudentMark() {
        let studentMarks = this.marks.flat();
        return studentMarks.reduce((sum, item) => sum + item)/studentMarks.length;
    }
};

const feGroup = new Group();

const firstStudent = new Student('John Doe', [10, 10, 9]);
const secondStudent = new Student('Alex Smith', [10, 9, 8]);
const thirdStudent = new Student('Bob Johnson', [9, 10, 10, 8]);

feGroup.addStudent(firstStudent);
feGroup.addStudent(secondStudent);
feGroup.addStudent(thirdStudent);

console.log(feGroup._students);
console.log(feGroup.getAverageMark(this._students, 'marks'));
console.log(`Front-End Group avarage mark is ${feGroup.getAverageMark(this._students, 'marks')}`);

console.log(`${firstStudent.name} avarage mark is ${firstStudent.getAverageStudentMark(this.marks)}`);
console.log(`${secondStudent.name} avarage mark is ${secondStudent.getAverageStudentMark(this.marks)}`);
console.log(`${thirdStudent.name} avarage mark is ${thirdStudent.getAverageStudentMark(this.marks)}`);
