import UsersSection from "../components/users/UsersSection";
import { render, screen, waitFor } from '@testing-library/react';
import { User } from "../models/User";

const users: Array<User> = [
    {
        id: 1,
        login: "Andre",
        followers:100,
        avatarUrl: "https://loremflickr.com/320/240"
    },
    {
        id: 2,
        login: "João",
        followers:150,
        avatarUrl: "https://loremflickr.com/320/240"
    },
    {
        id: 3,
        login: "Carlos",
        followers:200,
        avatarUrl: "https://loremflickr.com/320/240"
    },
    {
        id: 4,
        login: "Filipe",
        followers:250,
        avatarUrl: "https://loremflickr.com/320/240"
    }
]

test('Users are rendered with their data', async () => {

    const headerTitleStr = "Trending Users";
    const statusStr = "Success";
    render(<UsersSection headerTitle={headerTitleStr} status={statusStr} error={undefined} userList={users}/>);

    await waitFor(() => {
        const loadingText = screen.queryByTestId('loading-h2');
        expect(loadingText).not.toBeInTheDocument();
      });

    const userCards = screen.getAllByTestId("");
    expect(userCards).toHaveLength(3);
  });
  