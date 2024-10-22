"use client";

import { CreateUserRequest } from "@/app/types/user";
import { User } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const createUser = (user: CreateUserRequest) =>
  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

interface UsersResponse {
  data: User[];
}

export default function UsersPage() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { data: usersResponse, error } = useSWR<UsersResponse>(
    "/api/users",
    fetcher
  );
  const users = usersResponse?.data ?? [];

  if (error) return <p>Error loading users.</p>;
  if (!usersResponse) return <p>Loading users...</p>;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submit", {
      name,
      surname,
      nickname,
      email,
    });

    const response = await createUser({
      name,
      surname,
      nickname,
      email,
    });
    const newUser = await response.json();
    console.log("newUser ->", newUser);
  }

  console.log("watch", {
    name,
    surname,
    nickname,
    email,
  });

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      <div>
        <h2>Add user</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="surname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Surname
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nickname
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
