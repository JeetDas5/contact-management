import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpDown, Mail, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface ContactTableProps {
  contacts: Contact[];
  onDelete: (id: string) => Promise<void>;
}

type SortField = "name" | "email" | "createdAt";
type SortOrder = "asc" | "desc";

export function ContactTable({ contacts, onDelete }: ContactTableProps) {
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    let comparison = 0;
    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === "email") {
      comparison = a.email.localeCompare(b.email);
    } else if (sortField === "createdAt") {
      comparison =
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-linear-to-br from-card to-muted dark:from-gray-900 dark:to-gray-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-linear-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Contacts
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            ({contacts.length} total)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No contacts yet</p>
            <p className="text-sm">
              Add your first contact using the form above
            </p>
          </div>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 font-semibold -ml-3"
                    >
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("email")}
                      className="flex items-center gap-1 font-semibold -ml-3"
                    >
                      Email
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Message
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-1 font-semibold -ml-3"
                    >
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedContacts.map((contact) => (
                  <TableRow
                    key={contact._id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <TableCell className="font-medium">
                      {contact.name}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-1 text-primary hover:text-cyan-700 transition-colors"
                      >
                        <Mail className="h-3 w-3 hidden sm:inline" />
                        <span className="truncate max-w-[150px]">
                          {contact.email}
                        </span>
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </a>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[200px]">
                      <span className="truncate block text-muted-foreground">
                        {contact.message || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(contact.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(contact._id)}
                        disabled={deletingId === contact._id}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        {deletingId === contact._id ? (
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
