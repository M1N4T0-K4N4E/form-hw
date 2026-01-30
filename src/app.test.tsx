import { beforeEach, describe, expect, it} from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App';


describe('App', () => {
    beforeEach(() => {
        cleanup(); // cleanup DOM
    })

    it('load and display', () => {
        render(<App/>)

        // Arrange
        const headingElement = screen.getByText('Form');

        // Assert
        expect(headingElement).toBeDefined();
    });

    it('should display input form and form results correctly after click submit', async () => {
        render(<App/>)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});

        // Act 
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);

        // Assert
        await waitFor(() => {
            expect(screen.getByText('Sequence: 1')).toBeDefined();
            expect(screen.getByText('Full name: Tana')).toBeDefined();
            expect(screen.getByText('Email: tana@example.com')).toBeDefined();
            expect(screen.getByText('Age: 25')).toBeDefined();
            expect(screen.getByText('Role: front end')).toBeDefined();
        });
    });

    it('should not call onFormSubmit if not clicked submit', async () => {
        render(<App/>);

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement

        // Act 
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});

        // Assert
        await waitFor(() => {
            expect(screen.getAllByText('No results to display.')).toBeDefined();
        });
    });

    it('should not call onSubmit if input fields is not correct', async () => {
        render(<App/>);

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});

        // Act 
        fireEvent.change(fullNameTextField, { target: {value: ''}});
        fireEvent.change(emailTextField, { target: {value: 'invalid-email'}});
        fireEvent.change(ageTextField, { target: {value: '-5'}});
        fireEvent.change(roleSelect, { target: {value: ''}});
        fireEvent.click(submitButton);

        // Assert
        await waitFor(() => {
            expect(screen.getByText('Full name is required')).toBeDefined();
            expect(screen.getByText('Invalid email format')).toBeDefined();
            expect(screen.getByText('Age must be between 10 and 99')).toBeDefined();
            expect(screen.getByText('Role is required')).toBeDefined();
            expect(screen.getAllByText('No results to display.')).toBeDefined();
        });
    });

    it('submit then remove it should remove a form result when user clicks delete button', async () => {
        render(<App/>)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});

        // Act
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';
        });
        
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';    
        });
        
        const deleteButton = screen.getAllByRole('button', {name: 'remove'});
        fireEvent.click(deleteButton[0]);

        // Assert
        await waitFor(() => {
            expect(screen.getAllByText('remove').length).toBe(1);
            expect(screen.getAllByText('recover').length).toBe(1);
        });
    });

    it('submit twice then remove it twice should be removed from result when user clicks delete button twice', async () => {
        render(<App/>)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});

        // Act
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';
        });
        
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';    
        });
        
        const deleteButton = screen.getAllByRole('button', {name: 'remove'});
        fireEvent.click(deleteButton[1]);
        fireEvent.click(deleteButton[0]);

        // Assert
        await waitFor(() => {
            expect(screen.getAllByText('No results to display.').length).toBe(1);
            expect(screen.getAllByText('recover').length).toBe(2);
        });
    });

    it('submit twice then remove it twice then recover twice it should recover like original', async () => {
        render(<App/>)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});

        // Act
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);

        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';
        });
        
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});
        fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        fireEvent.change(ageTextField, { target: {value: '25'}});
        fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            fullNameTextField.value = '';
            emailTextField.value = '';
            ageTextField.value = '';
            roleSelect.value = '';    
        });
        
        const deleteButton = screen.getAllByRole('button', {name: 'remove'});
        fireEvent.click(deleteButton[1]);
        fireEvent.click(deleteButton[0]);

        await  waitFor(() => {
            screen.getAllByText('recover').length == 2;
        });

        const recoverButton = screen.getAllByRole('button', {name: 'recover'});
        fireEvent.click(recoverButton[1]);
        fireEvent.click(recoverButton[0]);


        // Assert
        await waitFor(() => {
            expect(screen.getAllByText('No results to display.').length).toBe(1);
            expect(screen.getAllByText('remove').length).toBe(2);
        });
    });
});
