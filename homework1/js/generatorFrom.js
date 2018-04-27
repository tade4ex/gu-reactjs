function* generatorFrom() {
    let obj = {};
    obj.answer1 = prompt("1 question?");
    yield 1;
    obj.answer2 = prompt("2 question?");
    yield 2;
    obj.answer3 = prompt("3 question?");
    yield 3;
    obj.answer4 = prompt("4 question?");
    yield 4;
    return obj;
}