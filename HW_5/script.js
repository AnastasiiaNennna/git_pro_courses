const students = [
    {
        id: 10,
        name: 'John Smith',
        marks: [10, 8, 6, 9, 8, 7 ]
    },
    {
        id: 11,
        name: 'John Doe',
        marks: [ 9, 8, 7, 6, 7 ]
    },
    {
        id: 12,
        name: 'Thomas Anderson',
        marks: [6, 7, 10, 8 ]
    },
    {
        id: 13,
        name: 'Jean-Baptiste Emanuel Zorg',
        marks: [10, 9, 8, 9 ]
    },
];

function averageGroupMark(students) {
    let groupMarks = students.map(({marks}) => marks);
    let getGroupMarks = [].concat.apply([], groupMarks);
    let avgGroupMark = getGroupMarks.reduce((acc, getGroupMarks) => 
                        acc + getGroupMarks, 0)/getGroupMarks.length;
    return avgGroupMark;
};

function averageStudentMark(id) {
    let getId = students.find(el => el.id === id);
    if(getId){
        let getIdMarks = getId.marks;
        let avgIdMark = getIdMarks.reduce((acc, el) => acc + el, 0)/getIdMarks.length;
        return avgIdMark;
    } else {
        console.log('not found');
    };
};

averageStudentMark(10); 

averageGroupMark(students);
