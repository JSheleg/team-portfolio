const { test } = require('@jest/globals');
const Manager = require('../lib/Manager');

test('create a Manager object', () => {
    const manager = new Manager('James', 3, "james@somecompany.com", "A306");

    expect(manager.name).toBe('James');
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
});

test('get role', ()=>{
    const manager = new Manager('James');       
    expect(manager.getRole()).toEqual(expect.stringContaining('Manager'));
    
});

