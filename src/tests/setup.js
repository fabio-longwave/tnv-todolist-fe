import { vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { userSelector } from '../reducers/user.slice.js';
import { activitySelector } from '../reducers/activity.slice.js';

// --- Mocking di socket.io-client ---
// Questo mock ci permette di controllare il comportamento del socket
// e attivare eventi in modo programmatico.
const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    close: vi.fn(),
    removeAllListeners: vi.fn(),
    connected: false,
    disconnected: true,
    id: 'mock-socket-id',
    // Aggiungi altri metodi se il tuo componente interagisce con essi
};

vi.mock('socket.io-client', () => {
    const io = vi.fn(() => mockSocket);
    // Ci permette di reimpostare il mock in ogni test
    io.__mockSocket = mockSocket;
    return { default: io };
});

// --- Simulazione di Redux ---
// Dichiariamo una variabile per contenere l'implementazione mock per useSelector
// Questo ci permette di modificare il suo comportamento dai singoli test
let mockUseSelectorImplementation

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch,
        useSelector: vi.fn((selector) => mockUseSelectorImplementation(selector)),
    };
});

// --- Simulazione della configurazione ---
vi.mock('../../config', () => ({
    config: {
        socket: {
            SERVER_URL: 'http://mock-server',
            NAMESPACE: '/mock-namespace',
            events: {
                CONNECTED: 'connected',
                CLOSED: 'closed',
                ERROR: 'error',
                CONNECT_ERROR: 'connect_error',
            },
        },
    },
}));

// Opzionale: beforeEach globale per ripulire i mock
beforeEach(() => {
    vi.clearAllMocks();
    // Assicura che il mock del socket sia in uno stato pulito per ogni test
    mockSocket.on.mockClear();
    mockSocket.emit.mockClear();
    mockSocket.close.mockClear();
    mockSocket.removeAllListeners.mockClear();
    mockSocket.connected = false;
    mockSocket.disconnected = true;

    // Reimposta mockUseSelectorImplementation al suo valore predefinito per ogni test
    mockUseSelectorImplementation = (selector) => {
        // Confronta per riferimento per affidabilità
        if (selector === userSelector) {
            // Restituisce un oggetto utente mock che corrisponde alla forma dello stato dello slice
            return {
                email: 'mock.user@example.com',
                username: 'Mock User',
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            };
        }
        if (selector === activitySelector) {
            // Restituisce un array di attività mock
            return [
                { _id: 'act1', name: 'First mock activity' },
                { _id: 'act2', name: 'Second mock activity' },
            ];
        }
        // Importante: restituisce undefined per qualsiasi selettore non gestito
        return undefined;
    };
});
