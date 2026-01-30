import { beforeEach, describe, expect, it} from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { FormResults } from './form-result';
import type { Form } from '../types/form';


describe('components/result', () => {
    const mockResults: Form[] = [
            {
                id: 'abc123',
                fullName: 'Tana',
                email: 'tana@example.com',
                age: 25,
                role: 'front end'
            },
            {
                id: 'def456',
                fullName: 'Alex',
                email: 'alex@example.com',
                age: 30,
                role: 'back end'
            }
        ];

    beforeEach(() => {
        cleanup(); // cleanup DOM
    });

    it('should display form results correctly', async () => {

        render(<FormResults results={mockResults} />);

        // Assert
        await waitFor(() => {
            expect(screen.getByText('Sequence: 1')).toBeDefined();
            expect(screen.getByText('Id: abc123')).toBeDefined();
            expect(screen.getByText('Full name: Tana')).toBeDefined();
            expect(screen.getByText('Email: tana@example.com')).toBeDefined();
            expect(screen.getByText('Age: 25')).toBeDefined();
            expect(screen.getByText('Role: front end')).toBeDefined();

            expect(screen.getByText('Sequence: 2')).toBeDefined();
            expect(screen.getByText('Id: def456')).toBeDefined();
            expect(screen.getByText('Full name: Alex')).toBeDefined();
            expect(screen.getByText('Email: alex@example.com')).toBeDefined();
            expect(screen.getByText('Age: 30')).toBeDefined();
            expect(screen.getByText('Role: back end')).toBeDefined();
        });
    });
    
    it('shouldn\'t display any results when given an empty array', async () => {

        render(<FormResults results={[]} />);

        // Arrange
        const resultListBody = screen.getByText('No results to display.');

        // Assert
        await waitFor(() => {
            expect(resultListBody).toBeDefined();
        });
    });
})