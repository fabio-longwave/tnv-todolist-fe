import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import LoginFormComponent from './LoginForm.component';
import {ThemeContext} from '../../contexts/ThemeProvider';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '../../reducers/user.slice';
import {BrowserRouter} from 'react-router-dom';
import {userEvent} from "@testing-library/user-event";

//Mock services and hooks
vi.mock('../../services/login.service.js');

const navigateMock = vi.fn((path) => console.log(`Navigating to ${path}`));

vi.mock('react-router-dom', async (importActual) => {
    const actual = await importActual();
    return {
        ...actual,
        useNavigate: () => navigateMock, // Simple mock, can be enhanced
    };
});

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});


const mockThemeContext = {
    theme: 'light',
    switchTheme: vi.fn(),
};

// Helper to render the component with necessary providers
const renderComponent = () => {
    const store = configureStore({
        reducer: {
            user: userSlice.reducer, // Assuming your user slice is set up like this
        },
    });

    return render(
        <Provider store={store}>
            <ThemeContext.Provider value={mockThemeContext}>
                <BrowserRouter>
                    <LoginFormComponent/>
                </BrowserRouter>
            </ThemeContext.Provider>
        </Provider>
    );
};

beforeEach(() => {
    renderComponent()
})

describe('LoginFormComponent', () => {
    it('renders the login form correctly', () => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /accedi/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /registrati/i})).toBeInTheDocument();
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('allows typing into email and password fields', async () => {
        const user = userEvent.setup();
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('shows validation error if email is empty on submit', async () => {
        const user = userEvent.setup();

        const submitButton = screen.getByRole('button', {name: /accedi/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/inserire l'indirizzo email/i)).toBeInTheDocument();
        });
    });

    it('shows validation error if email is invalid on submit', async () => {
        const user = userEvent.setup();

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'test');

        const submitButton = screen.getByRole('button', {name: /accedi/i});
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/l'indirizzo email deve contenere @/i)).toBeInTheDocument();
        });
    });

    it('shows validation error if password is too short on submit', async () => {
        const user = userEvent.setup();

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'test@example.com');

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, 'pass');

        const submitButton = screen.getByRole('button', {name: /accedi/i});
        await user.click(submitButton);

        expect(await screen.findByText(/la password deve contenere almeno 8 caratteri/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/la password deve contenere almeno 8 caratteri/i)).toBeInTheDocument();
        });
    });

    it('calls login service, dispatches user, and navigates on successful login', async () => {
        const {login} = await import('../../services/login.service.js');
        const mockUser = {id: 1, email: 'test@example.com', name: 'Test User'};
        const user = userEvent.setup();

        login.mockResolvedValue(mockUser);

        //renderComponent(); // Re-render with the new navigate mock if needed or ensure it's effective

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', {name: /accedi/i});

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(submitButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({email: 'test@example.com', password: 'password123'});
        });

        // Need to wait for async actions within submitForm to complete
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalled(); // Check if setUser action was dispatched
            // More specific check for setUser:
            // expect(mockDispatch).toHaveBeenCalledWith(setUser(mockUser)); // You'd need to import setUser
        });

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/activities');
        });
    });


    // it('does not call login or navigate if form is invalid', async () => {
    //     const { login } = await import('../../services/login.service.js');
    //     const user = userEvent.setup();
    //
    //     //renderComponent(); // Re-render with the new navigate mock if needed
    //
    //     const submitButton = screen.getByRole('button', { name: /accedi/i });
    //     await user.click(submitButton); // Submit with empty fields
    //
    //     await waitFor(() => {
    //         expect(screen.getByText(/inserire l'indirizzo email/i)).toBeInTheDocument();
    //     });
    //
    //     expect(login).not.toHaveBeenCalled();
    //     expect(mockDispatch).not.toHaveBeenCalled();
    //     expect(navigateMock).not.toHaveBeenCalled();
    // });
});
