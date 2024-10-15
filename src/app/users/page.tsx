"use client";

import { PaginationMeta } from "@/app/types/pagination";
import { User } from "@/app/types/user";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  useEffect(() => {
    async function fetchUsers(page: number) {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/users?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.users);
        setMeta(data.meta);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers(currentPage);
  }, [currentPage]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

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

      <div style={{ marginTop: "20px" }}>
        {meta && (
          <div>
            <span>
              {" "}
              Page {meta.page} of {meta.totalPages}{" "}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, meta.totalPages))
              }
              disabled={currentPage === meta.totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
