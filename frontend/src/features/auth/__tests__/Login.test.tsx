import Login from '../components/Login';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { setupTestServer } from '../../../test/server/server';
import { db } from '../../../test/server/db';
import { randomUUID } from 'crypto';

setupTestServer();

describe('Auth feature component', () => {
  const setCurrentUser = jest.fn();
  const username = 'testuser';
  const password = 'testpass';

  test('should render the form', () => {
    const { getByRole } = render(<Login setCurrentUser={setCurrentUser} />);
    const form = getByRole('form');
    expect(form).toBeInTheDocument();
  });

  test('should change values on user input', () => {
    const { getByPlaceholderText } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  test('should toggle new account form on button click', () => {
    const { getByText, getByPlaceholderText } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const toggleButton = getByText('Need an account?');
    fireEvent.click(toggleButton);
    expect(getByText('Create an Account')).toBeInTheDocument();
    expect(usernameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('should submit the form successfully on user register', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const toggleButton = getByText('Need an account?');
    const button = getByRole('button');
    fireEvent.click(toggleButton);
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(button);
    await waitFor(() => expect(setCurrentUser).toHaveBeenCalledTimes(1));
  });

  test('displays error message on invalid login credentials submission', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const toggleButton = getByText('Need an account?');
    const button = getByRole('button');
    fireEvent.click(toggleButton);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(button);
    await waitFor(() => expect(getByText('password is required')).toBeInTheDocument());
  });

  test('logs in on valid username and password', async () => {

    const { getByPlaceholderText, getByRole } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const button = getByRole('button');

    db.user.create({
      _id: randomUUID(),
      username,
      password
    })

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(button);
  
    await waitFor(() => expect(setCurrentUser).toHaveBeenCalledTimes(1));
  })

  test('displays error message if username taken', async () => {

    const { getByPlaceholderText, getByRole, getByText } = render(<Login setCurrentUser={setCurrentUser} />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const button = getByRole('button');
    const toggleButton = getByText('Need an account?');

    db.user.create({
      _id: randomUUID(),
      username,
      password
    })

    fireEvent.click(toggleButton)
    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(button);
  
    await waitFor(() => expect(getByText('username taken')).toBeInTheDocument());
  });

});
