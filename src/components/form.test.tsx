import { beforeEach, describe, expect, it, vi} from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormInput } from './form';

describe('components/form', () => {
    const onFormSubmit = vi.fn();

    beforeEach(() => {
        cleanup(); // cleanup DOM
        vi.clearAllMocks(); // cleanup submit data
    })

    it('load and display', () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        
        // Act
        fireEvent.change(fullNameTextField, { target: {value: 'Tana'}});

        // Assert
        expect(fullNameTextField.value).toBe('Tana');
    });

    it('should call onSubmit function when user click on submit', async () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

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
            expect(onFormSubmit).toBeCalled();
        });
    });

    it('should not call onFormSubmit function when user click on submit while some of input fields is empty', async () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        // const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        // const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        // const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        const submitButton = screen.getByRole('button', {name: 'submit'});
        
        // Act
        fireEvent.change(fullNameTextField, { target: {value: 'Nanda'}});
        // fireEvent.change(emailTextField, { target: {value: 'tana@example.com'}});
        // fireEvent.change(ageTextField, { target: {value: '25'}});
        // fireEvent.change(roleSelect, { target: {value: 'front end'}});
        fireEvent.click(submitButton);

        // Assert
        await waitFor(() => {
            expect(onFormSubmit).not.toBeCalled();
        });
    });

    it('should not call onFormSubmit while every input fields are empty and user clicks submit', async () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

        // Arrange
        const submitButton = screen.getByRole('button', {name: 'submit'});
        
        // Act
        fireEvent.click(submitButton);

        // Assert
        await waitFor(() => {
            expect(onFormSubmit).not.toBeCalled();
        });
    });

    it('should get formik error from invalid value in input field', async () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

        // Arrange
        const fullNameTextField = screen.getByRole('textbox', {name: 'fullName'}) as HTMLInputElement
        const emailTextField = screen.getByRole('textbox', {name: 'email'}) as HTMLInputElement
        const ageTextField = screen.getByRole('textbox', {name: 'age'}) as HTMLInputElement
        const roleSelect = screen.getByRole('combobox', {name: 'role'}) as HTMLSelectElement
        
        // Act
        fireEvent.change(fullNameTextField, { target: {value: ''}});
        fireEvent.change(emailTextField, { target: {value: 'jinjinjin'}});
        fireEvent.change(ageTextField, { target: {value: '888'}});
        fireEvent.change(roleSelect, { target: {value: 'FE'}});


        // Assert
        await waitFor(() => {
            expect(screen.getByText('Full name is required')).toBeDefined();
            expect(screen.getByText('Invalid email format')).toBeDefined();
            expect(screen.getByText('Age must be between 10 and 99')).toBeDefined();
            expect(screen.getByText('Role is required')).toBeDefined();
        });
    });

    it('should not call onFormSubmit when fields are empty and user clicks submit', async () => {
        render(<FormInput
            onFormSubmit={onFormSubmit}
        />)

        // Arrange
        const submitButton = screen.getByRole('button', {name: 'submit'});
        
        // Act
        fireEvent.click(submitButton);

        // Assert
        await waitFor(() => {
            expect(onFormSubmit).not.toBeCalled();
        });
    });
});