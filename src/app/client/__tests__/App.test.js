import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App.js';
import { fetchRomanNumeral } from '../../../utils/api-client.js';
import '@testing-library/jest-dom';

jest.mock('../../../utils/api-client.js', () => ({
    fetchRomanNumeral: jest.fn(),
}));

describe('Roman Numeral Converter', () => {
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByText('Roman Numeral Converter')).toBeInTheDocument();
    });

    it('should display an error message for invalid input', async () => {
        fetchRomanNumeral.mockRejectedValueOnce(new Error('Please provide a number between 1 and 3999.'));
        render(<App />);
        const inputField = screen.getByLabelText(/enter a number/i);
        const button = screen.getByRole('button', { name: /convert to roman numeral/i });

        fireEvent.change(inputField, { target: { value: 'abc' } });
        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText('Please provide a number between 1 and 3999.')).toBeInTheDocument());
    });

    it('should convert a valid number to Roman numeral', async () => {
        fetchRomanNumeral.mockResolvedValueOnce({ output: 'V' });
        render(<App />);
        const inputField = screen.getByLabelText(/enter a number/i);
        const button = screen.getByRole('button', { name: /convert to roman numeral/i });

        fireEvent.change(inputField, { target: { value: '5' } });
        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText('Roman Numeral: V')).toBeInTheDocument());
    });

    it('should display error message for out-of-range numbers', async () => {
        fetchRomanNumeral.mockRejectedValueOnce(new Error('Please provide a number between 1 and 3999.'));
        render(<App />);

        const inputField = screen.getByLabelText(/enter a number/i);
        const button = screen.getByRole('button', { name: /convert to roman numeral/i });

        fireEvent.change(inputField, { target: { value: '5000' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Please provide a number between 1 and 3999/i)).toBeInTheDocument();
        });
    });

    it('should disable the button when input is empty and enable it when input is provided', () => {
        render(<App />);
        const inputField = screen.getByLabelText(/enter a number/i);
        const button = screen.getByRole('button', { name: /convert to roman numeral/i });

        expect(button).toBeDisabled();

        fireEvent.change(inputField, { target: { value: '10' } });

        expect(button).not.toBeDisabled();
    });
});
