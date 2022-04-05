
const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');

test('Creates an engineer on the team.', () => {
    const engineer = new Engineer('name', 'id', 'email', 'github');

    expect(engineer.name).toBe('name')
    expect(engineer.id).toBe('id')
    expect(engineer.email).toBe('email')
    expect(engineer.github).toBe('github')
});