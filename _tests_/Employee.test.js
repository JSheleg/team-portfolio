const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee.js');

test('creates an employee object', () =>{
    const employee = new Employee('James', 1, "james@somecompany.com");

    expect(employee.name).toBe('James');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test('get employee role', () => {
    const employee = new Employee('employee')
    expect(employee.getRole()).toEqual(expect.stringContaining('Employee'));
})

