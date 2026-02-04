import { beforeEach, describe, expect, it} from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
            }
        ];
    const mockDeletedResults: Form[] = [
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

        render(<>
            <FormResults 
                results={mockResults}
            />
            <FormResults
                results={mockDeletedResults}
            />
        </>);

        // Assert
        await waitFor(() => {
            expect(screen.getByText('Id: abc123')).toBeDefined();
            expect(screen.getByText('Full name: Tana')).toBeDefined();
            expect(screen.getByText('Email: tana@example.com')).toBeDefined();
            expect(screen.getByText('Age: 25')).toBeDefined();
            expect(screen.getByText('Role: front end')).toBeDefined();

            expect(screen.getByText('Id: def456')).toBeDefined();
            expect(screen.getByText('Full name: Alex')).toBeDefined();
            expect(screen.getByText('Email: alex@example.com')).toBeDefined();
            expect(screen.getByText('Age: 30')).toBeDefined();
            expect(screen.getByText('Role: back end')).toBeDefined();
        });
    });
    
    it('shouldn\'t display any results when given an empty array', async () => {


        render(<>
            <FormResults 
                results={[]}
                onRemove={() => {
                    // do nothing
                }}
                buttonText="Remove"
                result="Results"
            />
            <FormResults
                results={[]}
                onRemove={() => {
                    // do nothing
                }}
                buttonText="Recover"
                result="Deleted"
            />
        </>);

        // Arrange
        const resultListBody = screen.getAllByText('No results to display.');

        // Assert
        await waitFor(() => {
            expect(resultListBody).toBeDefined();
        });
    });

    it('Item should moved from results list to deleted list', async () => {
        let currentResults = [...mockResults];
        let currentDeleted = [...mockDeletedResults];

        const { rerender } = render(
            <>
                <FormResults 
                    results={currentResults}
                    onRemove={() => {
                        // simulate remove logic
                        const item = currentResults.shift();
                        if (item) currentDeleted.push(item);
                    }}
                    buttonText="Remove"
                    result="Results"
                />
                <FormResults
                    results={currentDeleted}
                    onRemove={() => {
                        // simulate recover logic
                        const item = currentDeleted.shift();
                        if (item) currentResults.push(item);
                    }}
                    buttonText="Recover"
                    result="Deleted"
                />
            </>
        );

        // Arrange
        const removeButton = screen.getByRole('button', { name: 'Remove' });
        
        // Act
        fireEvent.click(removeButton);

        // re-render component with updated data
        rerender(
            <>
                <FormResults 
                    results={currentResults}
                    onRemove={() => {
                        // simulate remove logic
                        const item = currentResults.shift();
                        if (item) currentDeleted.push(item);
                    }}
                    buttonText="Remove"
                    result="Results"
                />
                <FormResults
                    results={currentDeleted}
                    onRemove={() => {
                        // simulate recover logic
                        const item = currentDeleted.shift();
                        if (item) currentResults.push(item);
                    }}
                    buttonText="Recover"
                    result="Deleted"
                />
            </>
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByText('No results to display.')).toBeDefined();
            expect(currentResults.length).toBe(0);
            expect(currentDeleted.length).toBe(2);
        });
    });

    it('Item should moved from deleted list to result list', async () => {
        let currentResults = [...mockResults];
        let currentDeleted = [...mockDeletedResults];

        const { rerender } = render(
            <>
                <FormResults 
                    results={currentResults}
                    onRemove={() => {
                        const item = currentResults.shift();
                        if (item) currentDeleted.push(item);
                    }}
                    buttonText="Remove"
                    result="Results"
                />
                <FormResults
                    results={currentDeleted}
                    onRemove={() => {
                        const item = currentDeleted.shift();
                        if (item) currentResults.push(item);
                    }}
                    buttonText="Recover"
                    result="Deleted"
                />
            </>
        );

        // Arrange
        const recoverButton = screen.getByRole('button', { name: 'Recover' });
        
        // Act
        fireEvent.click(recoverButton);

        // re-render component with updated data
        rerender(
            <>
                <FormResults 
                    results={currentResults}
                    onRemove={() => {
                        const item = currentResults.shift();
                        if (item) currentDeleted.push(item);
                    }}
                    buttonText="Remove"
                    result="Results"
                />
                <FormResults
                    results={currentDeleted}
                    onRemove={() => {
                        const item = currentDeleted.shift();
                        if (item) currentResults.push(item);
                    }}
                    buttonText="Recover"
                    result="Deleted"
                />
            </>
        );

        // Assert
        await waitFor(() => {
            expect(screen.getByText('No results to display.')).toBeDefined();
            expect(currentResults.length).toBe(2);
            expect(currentDeleted.length).toBe(0);
        });
    });
})