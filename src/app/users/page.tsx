"use client";

import { User } from "@/app/types/user";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const { data: users, error } = useSWR<User[]>("/api/users", fetcher);

  if (error) return <p>Error loading users.</p>;
  if (!users) return <p>Loading users...</p>;

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
    </div>
  );
}
