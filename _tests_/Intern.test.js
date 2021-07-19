const { test } = require('@jest/globals');
const Intern = require('../lib/Intern');

test('create an intern object', () => {
    const intern = new Intern('James', 2, "james@someSchool.com", "veryLargeUniversity");

    expect(intern.name).toBe('James');
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
});

test('get role', ()=>{
    const intern = new Intern('James', 2, "james@someSchool.com", "veryLargeUniversity")       
    expect(intern.getRole()).toEqual(expect.stringContaining('Intern'));
});

test('get school', ()=>{
    const intern = new Intern('James', 2, "james@someSchool.com", "veryLargeUniversity");       
    expect(intern.getSchool()).toEqual(expect.any(String));
});