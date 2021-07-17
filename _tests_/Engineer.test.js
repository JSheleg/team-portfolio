const { test } = require('@jest/globals');
const Engineer = require('../lib/Engineer');

test('create an engineer object', () => {
    const engineer = new Engineer('James', 2, "james@somecompany.com", "jsmith");

    expect(engineer.name).toBe('James');
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
});

test('get role', ()=>{
    const engineer = new Engineer('James');       
    expect(engineer.getRole()).toEqual(expect.stringContaining('Engineer'));
    
});

test('get github information', ()=>{
    const engineer = new Engineer('James');       
    expect(engineer.getGithub()).toEqual(expect.any(String));
    
});