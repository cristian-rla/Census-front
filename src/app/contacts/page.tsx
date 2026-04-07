import Table from "@/components/Table/table";
import Image from "next/image";

interface Contact {
  contactInfo: {
    imgUrl: string;
    name: string;
    email: string;
  };
  company: string;
  //   status: "overdue" | "customer" | "completed" | "lead";
  status: string;
  lastActivity: string;
}

interface ContactRow extends Contact {
  actions: {
    deleteFn: () => void;
    updateFn: () => void;
    createFn: () => void;
  };
}

interface Column {
  key: keyof ContactRow;
  label: string;
  render?: (row: ContactRow) => React.ReactNode;
}

const employees: ContactRow[] = [
  {
    contactInfo: {
      imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Carlos Martínez",
      email: "carlos@example.com",
    },
    company: "Wayne Enterprises",
    status: "customer",
    lastActivity: "4 days ago",
    actions: {
      deleteFn: () => {},
      updateFn: () => {},
      createFn: () => {},
    },
  },
  {
    contactInfo: {
      imgUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Sofia Hernández",
      email: "sofia@example.com",
    },
    company: "Stark Industries",
    status: "lead",
    lastActivity: "2 weeks ago",
    actions: {
      deleteFn: () => {},
      updateFn: () => {},
      createFn: () => {},
    },
  },
  {
    contactInfo: {
      imgUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "David López",
      email: "david@example.com",
    },
    company: "Oscorp",
    status: "lead",
    lastActivity: "6 hours ago",
    actions: {
      deleteFn: () => {},
      updateFn: () => {},
      createFn: () => {},
    },
  },
  {
    contactInfo: {
      imgUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Mariana Torres",
      email: "mariana@example.com",
    },
    company: "Tyrell Corp.",
    status: "overdue",
    lastActivity: "yesterday",
    actions: {
      deleteFn: () => {},
      updateFn: () => {},
      createFn: () => {},
    },
  },
  {
    contactInfo: {
      imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      name: "Andrés Gómez",
      email: "andres@example.com",
    },
    company: "Cyberdyne Systems",
    status: "customer",
    lastActivity: "30 minutes ago",
    actions: {
      deleteFn: () => {},
      updateFn: () => {},
      createFn: () => {},
    },
  },
];

const colorPerStatus = {
  overdue: "bg-surface-error text-on-surface-error",
  customer: "bg-primary-4 text-surface-container-lowest",
  lead: "bg-neutral-2 text-on-surface-container",
};

// poner que los rows siempre sea obligatorio pero que en unos casos no se utilice
const columns: Column[] = [
  {
    key: "contactInfo",
    label: "Contact",
    render: (row) => {
      return (
        <div className="flex flex-row items-center gap-4 rounded-sm">
          <Image
            src={row.contactInfo.imgUrl}
            width={40}
            height={40}
            alt={`${row.contactInfo.name} profile pic`}
            className="object-cover rounded-lg"
          ></Image>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm">{row.contactInfo.name}</p>
            <p className="text-xs">{row.contactInfo.email}</p>
          </div>
        </div>
      );
    },
  },
  { key: "company", label: "Company" },
  {
    key: "status",
    label: "Status",
    render: (row: ContactRow) => {
      return (
        <div
          className={`${colorPerStatus[row.status as keyof typeof colorPerStatus]} text-center rounded-lg uppercase font-semibold`} // corregir esto, se ve horrible
        >
          {row?.status}
        </div>
      );
    },
  },
  { key: "lastActivity", label: "Last Activity" },
  {
    key: "actions",
    label: "Actions",
    render: () => {
      return (
        <div className="w-full flex flex-row gap-2">
          <button className="flex-1 bg-primary-4 rounded-sm text-surface-container-lowest px-4 py-2">
            View
          </button>
          <button className="flex-1 bg-surface-container-high rounded-sm text-on-surface px-4 py-2">
            Edit
          </button>
        </div>
      );
    },
  },
];

export default function Contacts() {
  return (
    <section className="bg-background h-full p-8 justify-start items-start flex flex-col gap-4">
      <div className="flex flex-row w-full">
        <div className="flex flex-col flex-1 gap-1">
          <h2 className={`font-headline font-bold text-3xl `}>Contacts</h2>
          <p className="text-md text-gray-500 font-bold">Manage your network</p>
        </div>
        <div className="flex flex-row gap-4 text-on-secondary-container font-light my-auto">
          <label className="flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container  rounded-md ">
            <span className="material-symbols-outlined">filter_list</span>
            Filter
          </label>
          <label className="flex flex-row items-center gap-2 px-4 py-2 bg-secondary-container rounded-md ">
            <span className="material-symbols-outlined">ios_share</span>
            Export
          </label>
        </div>
      </div>
      <Table<ContactRow> data={employees} columns={columns} />
    </section>
  );
}
