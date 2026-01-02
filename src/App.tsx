import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { ContactForm } from "@/components/ContactForm";
import { ContactTable, type Contact } from "@/components/ContactTable";
import "./index.css";

const API_URL = "http://localhost:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch contacts on mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to load contacts");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (contactData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      const response = await axios.post(API_URL, contactData);
      const newContact = response.data;
      setContacts((prev) => [newContact, ...prev]);
      toast.success("Contact added successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to add contact";
      toast.error(message);
      throw error;
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted to-secondary dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
     
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#083344",
            color: "#E3FDFD",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#71C9CE",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Header */}
      <header className="border-b border-primary/20 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-primary via-cyan-500 to-teal-400 bg-clip-text text-transparent">
            Contact Manager
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your contacts with ease
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Contact Form */}
        <section>
          <ContactForm onSubmit={handleAddContact} />
        </section>

        {/* Contacts Table */}
        <section>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
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
                <p className="text-muted-foreground">Loading contacts...</p>
              </div>
            </div>
          ) : (
            <ContactTable contacts={contacts} onDelete={handleDeleteContact} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-gray-900/50 mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Contact Manager. Built with 💖 by Jeet
          Das
        </div>
      </footer>
    </div>
  );
}

export default App;
