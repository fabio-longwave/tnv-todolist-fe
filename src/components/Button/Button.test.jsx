import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
    it('should render the text provided via props', () => {
        render(<Button buttonText="Cliccami" />);
        // Questo test fallirà perché Button non esiste o non usa buttonText
        expect(screen.getByRole('button', { name: /cliccami/i })).toBeInTheDocument();
    });
});





