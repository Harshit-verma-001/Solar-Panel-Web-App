import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import {
  Sun,
  Users,
  Mail,
  Phone,
  Trash2,
  Loader2,
  ArrowLeft,
  RefreshCw,
  Inbox,
  UserCheck,
  Target,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  closed: "bg-green-100 text-green-700",
};

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, isAdmin } = useAuth();
  const utils = trpc.useUtils();

  // Route guard: redirect non-admin users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    } else if (!isLoading && isAuthenticated && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  const { data: contacts, isLoading: contactsLoading } =
    trpc.contact.list.useQuery(undefined, {
      enabled: isAdmin,
    });

  const { data: stats } = trpc.contact.stats.useQuery(undefined, {
    enabled: isAdmin,
  });

  const updateMutation = trpc.contact.updateStatus.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      utils.contact.stats.invalidate();
    },
  });

  const deleteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      utils.contact.stats.invalidate();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 size={32} className="animate-spin text-amber-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const statCards = [
    { label: "Total Leads", value: stats?.total ?? 0, icon: Users, color: "text-neutral-700" },
    { label: "New", value: stats?.new ?? 0, icon: Inbox, color: "text-blue-600" },
    { label: "Contacted", value: stats?.contacted ?? 0, icon: UserCheck, color: "text-amber-600" },
    { label: "Qualified", value: stats?.qualified ?? 0, icon: Target, color: "text-purple-600" },
    { label: "Closed", value: stats?.closed ?? 0, icon: CheckCircle, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back</span>
            </Link>
            <div className="w-px h-6 bg-neutral-200" />
            <div className="flex items-center gap-2">
              <Sun size={20} className="text-amber-500" />
              <span
                className="font-bold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#171717" }}
              >
                Solara
              </span>
              <span className="text-sm text-neutral-400">/ Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">{user?.name}</span>
            <button
              onClick={() => {
                utils.contact.list.invalidate();
                utils.contact.stats.invalidate();
              }}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className="text-neutral-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 border border-neutral-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className={stat.color} />
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#171717" }}
                >
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contacts table */}
        <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ fontFamily: "Outfit, sans-serif", color: "#171717" }}
            >
              Contact Submissions
            </h2>
            <span className="text-sm text-neutral-400">
              {contacts?.length ?? 0} total
            </span>
          </div>

          {contactsLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-amber-500" />
            </div>
          ) : !contacts || contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Inbox size={40} className="text-neutral-300 mb-3" />
              <p className="text-neutral-500">No submissions yet</p>
              <p className="text-sm text-neutral-400 mt-1">
                Contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider hidden md:table-cell">
                      Address
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider hidden lg:table-cell">
                      Message
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#171717" }}
                        >
                          {contact.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-neutral-600">
                            <Mail size={12} />
                            {contact.email}
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                              <Phone size={12} />
                              {contact.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-neutral-500 max-w-[200px] truncate">
                          {contact.address || "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <p className="text-sm text-neutral-500 max-w-[250px] truncate">
                          {contact.message || "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            updateMutation.mutate({
                              id: contact.id,
                              status: e.target.value as
                                | "new"
                                | "contacted"
                                | "qualified"
                                | "closed",
                            })
                          }
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 cursor-pointer outline-none ${STATUS_COLORS[contact.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-xs text-neutral-400">
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : "—"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Delete this contact submission?"
                              )
                            ) {
                              deleteMutation.mutate({ id: contact.id });
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
