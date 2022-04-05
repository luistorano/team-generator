const Employee = require('../lib/Employee');

test('Creates a new employee.', () => {
    const employee = new Employee('name', 'id', 'email',);

    expect(employee.name).toBe('name');
    expect(employee.id).toBe('id');
    expect(employee.email).toBe('email');
});